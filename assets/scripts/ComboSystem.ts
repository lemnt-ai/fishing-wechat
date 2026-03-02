import { _decorator, Component, Node, Label, sys } from 'cc';
const { ccclass, property } = _decorator;

/**
 * 连击系统管理器
 * 管理连击计数和连击奖励
 */
@ccclass('ComboSystem')
export class ComboSystem extends Component {
    @property(Label)
    public comboLabel: Label = null!;
    
    @property
    public comboDecayTime: number = 3; // 连击衰减时间（秒）
    
    @property
    public maxCombo: number = 20; // 最大连击数
    
    private currentCombo: number = 0;
    private maxComboThisGame: number = 0;
    private comboTimer: number = 0;
    private isComboActive: boolean = false;
    
    // 连击奖励倍率
    private comboMultipliers: number[] = [
        1.0,  // 0-4 连击
        1.1,  // 5-9 连击
        1.2,  // 10-14 连击
        1.3,  // 15-19 连击
        1.5   // 20+ 连击
    ];
    
    // 单例
    private static instance: ComboSystem | null = null;
    public static getInstance(): ComboSystem | null {
        return ComboSystem.instance;
    }
    
    onLoad() {
        ComboSystem.instance = this;
    }
    
    start() {
        this.resetCombo();
    }
    
    /**
     * 开始新游戏时重置连击
     */
    resetCombo() {
        this.currentCombo = 0;
        this.maxComboThisGame = 0;
        this.comboTimer = 0;
        this.isComboActive = false;
        this.updateComboUI();
    }
    
    /**
     * 增加连击
     */
    addCombo() {
        this.currentCombo++;
        
        if (this.currentCombo > this.maxComboThisGame) {
            this.maxComboThisGame = this.currentCombo;
        }
        
        this.isComboActive = true;
        this.comboTimer = this.comboDecayTime;
        
        console.log(`🔥 连击！${this.currentCombo}连击`);
        
        // 检查连击成就
        this.checkComboAchievements();
        
        this.updateComboUI();
    }
    
    /**
     * 连击中断
     */
    breakCombo() {
        if (this.currentCombo > 0) {
            console.log(`💔 连击中断！最终 ${this.currentCombo}连击`);
        }
        this.currentCombo = 0;
        this.isComboActive = false;
        this.updateComboUI();
    }
    
    /**
     * 获取连击奖励倍率
     */
    getComboMultiplier(): number {
        const index = Math.min(Math.floor(this.currentCombo / 5), this.comboMultipliers.length - 1);
        return this.comboMultipliers[index];
    }
    
    /**
     * 计算带连击奖励的分数
     */
    calculateScore(baseScore: number): number {
        const multiplier = this.getComboMultiplier();
        const bonus = Math.floor(baseScore * (multiplier - 1));
        return baseScore + bonus;
    }
    
    /**
     * 检查连击成就
     */
    checkComboAchievements() {
        const AchievementManager = require('./AchievementManager').AchievementManager;
        const achievementManager = AchievementManager.getInstance();
        
        if (!achievementManager) {
            return;
        }
        
        // 更新成就进度
        if (this.currentCombo >= 5) {
            achievementManager.updateStats(0, 0, false, 5);
        }
        if (this.currentCombo >= 10) {
            achievementManager.updateStats(0, 0, false, 10);
        }
    }
    
    /**
     * 更新连击 UI
     */
    updateComboUI() {
        if (this.comboLabel) {
            if (this.currentCombo > 1) {
                const multiplier = this.getComboMultiplier();
                this.comboLabel.string = `${this.currentCombo}连击 x${multiplier.toFixed(1)}`;
                this.comboLabel.node.active = true;
            } else {
                this.comboLabel.node.active = false;
            }
        }
    }
    
    /**
     * 获取当前连击数
     */
    getCurrentCombo(): number {
        return this.currentCombo;
    }
    
    /**
     * 获取本局最大连击
     */
    getMaxComboThisGame(): number {
        return this.maxComboThisGame;
    }
    
    update(deltaTime: number) {
        if (this.isComboActive && this.currentCombo > 0) {
            this.comboTimer -= deltaTime;
            
            if (this.comboTimer <= 0) {
                this.breakCombo();
            }
        }
    }
    
    onDestroy() {
        ComboSystem.instance = null;
    }
}
