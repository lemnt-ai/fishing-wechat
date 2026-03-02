import { _decorator, Component, Node, sys, randomRange } from 'cc';
const { ccclass, property } = _decorator;

/**
 * 特殊事件类型
 */
export enum SpecialEventType {
    NONE = 0,
    GOLDEN_RUSH = 1,      // 黄金狂潮：金龙鱼出现率提升
    TIME_BONUS = 2,       // 时间奖励：额外增加时间
    DOUBLE_SCORE = 3,     // 双倍分数：所有得分翻倍
    DEEP_SEA = 4,         // 深海挑战：只出现深海鱼
    TREASURE = 5          // 宝藏出现：出现特殊宝藏鱼
}

/**
 * 特殊事件管理器
 * 管理随机特殊事件的发生和效果
 */
@ccclass('SpecialEventManager')
export class SpecialEventManager extends Component {
    @property
    public eventDuration: number = 15; // 事件持续时间（秒）
    
    @property
    public minEventInterval: number = 30; // 最小事件间隔（秒）
    
    @property
    public maxEventInterval: number = 60; // 最大事件间隔（秒）
    
    private currentEvent: SpecialEventType = SpecialEventType.NONE;
    private eventTimer: number = 0;
    private nextEventTime: number = 0;
    private isEventActive: boolean = false;
    private eventEndTime: number = 0;
    
    // 事件权重（权重越高越容易出现）
    private eventWeights: number[] = [
        0,    // NONE (不使用)
        25,   // GOLDEN_RUSH
        25,   // TIME_BONUS
        25,   // DOUBLE_SCORE
        15,   // DEEP_SEA
        10    // TREASURE
    ];
    
    // 单例
    private static instance: SpecialEventManager | null = null;
    public static getInstance(): SpecialEventManager | null {
        return SpecialEventManager.instance;
    }
    
    onLoad() {
        SpecialEventManager.instance = this;
    }
    
    start() {
        this.scheduleNextEvent();
    }
    
    /**
     * 安排下一个事件
     */
    scheduleNextEvent() {
        this.nextEventTime = randomRange(this.minEventInterval, this.maxEventInterval);
        this.eventTimer = 0;
        console.log(`Next special event in ${this.nextEventTime.toFixed(1)}s`);
    }
    
    /**
     * 开始随机事件
     */
    startRandomEvent() {
        // 根据权重随机选择事件
        const totalWeight = this.eventWeights.reduce((a, b) => a + b, 0);
        const random = Math.random() * totalWeight;
        
        let cumulative = 0;
        let selectedEvent = SpecialEventType.GOLDEN_RUSH;
        
        for (let i = 1; i < this.eventWeights.length; i++) {
            cumulative += this.eventWeights[i];
            if (random <= cumulative) {
                selectedEvent = i as SpecialEventType;
                break;
            }
        }
        
        this.activateEvent(selectedEvent);
    }
    
    /**
     * 激活事件
     */
    activateEvent(eventType: SpecialEventType) {
        this.currentEvent = eventType;
        this.isEventActive = true;
        this.eventEndTime = this.eventDuration;
        
        console.log(`🎉 特殊事件开始：${this.getEventName(eventType)}`);
        console.log(`   持续时间：${this.eventDuration}秒`);
        
        // 通知其他系统
        this.onEventStart(eventType);
        
        // 安排下一个事件
        this.scheduleNextEvent();
    }
    
    /**
     * 事件开始时调用
     */
    onEventStart(eventType: SpecialEventType) {
        // 通知 FishManager 调整生成概率
        const FishManager = require('./FishManager').FishManager;
        // 这里可以通过事件系统通知
        
        // 播放特效或提示
        this.showEventNotification(eventType);
    }
    
    /**
     * 事件结束时调用
     */
    onEventEnd(eventType: SpecialEventType) {
        console.log(`📍 特殊事件结束：${this.getEventName(eventType)}`);
        
        // 恢复默认设置
        this.currentEvent = SpecialEventType.NONE;
        this.isEventActive = false;
    }
    
    /**
     * 显示事件通知
     */
    showEventNotification(eventType: SpecialEventType) {
        const name = this.getEventName(eventType);
        const messages: Record<number, string> = {
            [SpecialEventType.GOLDEN_RUSH]: '🌟 黄金狂潮！金龙鱼出现率提升！',
            [SpecialEventType.TIME_BONUS]: '⏰ 时间奖励！额外增加 10 秒！',
            [SpecialEventType.DOUBLE_SCORE]: '💎 双倍分数！所有得分翻倍！',
            [SpecialEventType.DEEP_SEA]: '🌊 深海挑战！只出现深海鱼！',
            [SpecialEventType.TREASURE]: '💰 宝藏出现！寻找特殊宝藏鱼！'
        };
        
        console.log(messages[eventType] || '特殊事件开始！');
    }
    
    /**
     * 获取事件名称
     */
    getEventName(eventType: SpecialEventType): string {
        const names: Record<number, string> = {
            [SpecialEventType.NONE]: '无',
            [SpecialEventType.GOLDEN_RUSH]: '黄金狂潮',
            [SpecialEventType.TIME_BONUS]: '时间奖励',
            [SpecialEventType.DOUBLE_SCORE]: '双倍分数',
            [SpecialEventType.DEEP_SEA]: '深海挑战',
            [SpecialEventType.TREASURE]: '宝藏出现'
        };
        return names[eventType] || '未知';
    }
    
    /**
     * 检查是否是双倍分数事件
     */
    isDoubleScore(): boolean {
        return this.currentEvent === SpecialEventType.DOUBLE_SCORE;
    }
    
    /**
     * 获取当前事件类型
     */
    getCurrentEvent(): SpecialEventType {
        return this.currentEvent;
    }
    
    /**
     * 检查事件是否激活
     */
    isEventActive(): boolean {
        return this.isEventActive;
    }
    
    /**
     * 应用事件效果
     */
    applyEventEffects(score: number, time: number): { score: number, time: number } {
        let finalScore = score;
        let finalTime = time;
        
        switch (this.currentEvent) {
            case SpecialEventType.DOUBLE_SCORE:
                finalScore *= 2;
                break;
            case SpecialEventType.TIME_BONUS:
                // 在事件开始时已经加了时间，这里不需要额外处理
                break;
        }
        
        return { score: finalScore, time: finalTime };
    }
    
    /**
     * 调整鱼类生成概率
     */
    getFishSpawnModifiers(): any {
        const modifiers: any = {
            goldenRush: false,
            deepSeaOnly: false,
            treasureSpawn: false
        };
        
        switch (this.currentEvent) {
            case SpecialEventType.GOLDEN_RUSH:
                modifiers.goldenRush = true;
                break;
            case SpecialEventType.DEEP_SEA:
                modifiers.deepSeaOnly = true;
                break;
            case SpecialEventType.TREASURE:
                modifiers.treasureSpawn = true;
                break;
        }
        
        return modifiers;
    }
    
    update(deltaTime: number) {
        if (!this.isEventActive) {
            // 等待下一个事件
            this.eventTimer += deltaTime;
            if (this.eventTimer >= this.nextEventTime) {
                this.startRandomEvent();
            }
        } else {
            // 事件进行中
            this.eventEndTime -= deltaTime;
            if (this.eventEndTime <= 0) {
                this.onEventEnd(this.currentEvent);
            }
        }
    }
    
    onDestroy() {
        SpecialEventManager.instance = null;
    }
}
