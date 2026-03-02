import { _decorator, Component, Node, Prefab, instantiate, Vec3, math, Label, UITransform, director, Collider } from 'cc';
const { ccclass, property } = _decorator;

/**
 * 鱼类定义
 */
export interface FishType {
    name: string;
    score: number;
    speed: number;
    rarity: number; // 稀有度 1-5
    minDepth: number;
    maxDepth: number;
}

/**
 * 鱼的数据组件
 */
@ccclass('FishData')
export class FishData extends Component {
    @property
    public score: number = 10;
    
    @property
    public rarity: number = 1;
    
    @property
    public fishName: string = '小鲤鱼';
}

/**
 * 鱼类管理器
 * 管理鱼的生成、移动和消失
 */
@ccclass('FishManager')
export class FishManager extends Component {
    @property([Node])
    public fishPrefabs: Node[] = []; // 鱼类预制体数组
    
    @property
    public maxFishCount: number = 10; // 最大鱼数量
    
    @property
    public spawnInterval: number = 2; // 生成间隔（秒）
    
    // 鱼类配置
    private fishTypes: FishType[] = [
        { name: '小鲤鱼', score: 10, speed: 50, rarity: 1, minDepth: 100, maxDepth: 300 },
        { name: '鲫鱼', score: 20, speed: 60, rarity: 2, minDepth: 200, maxDepth: 400 },
        { name: '草鱼', score: 30, speed: 70, rarity: 2, minDepth: 300, maxDepth: 500 },
        { name: '鲤鱼王', score: 50, speed: 80, rarity: 3, minDepth: 400, maxDepth: 600 },
        { name: '金龙鱼', score: 100, speed: 100, rarity: 4, minDepth: 500, maxDepth: 700 },
        { name: '神秘鱼', score: 200, speed: 120, rarity: 5, minDepth: 600, maxDepth: 800 },
    ];
    
    private spawnTimer: number = 0;
    private activeFish: Node[] = [];
    private gameAreaWidth: number = 600;
    private gameAreaHeight: number = 800;
    
    start() {
        this.gameAreaWidth = director.getVisibleSize().width;
        this.gameAreaHeight = director.getVisibleSize().height;
    }
    
    /**
     * 生成鱼
     */
    spawnFish() {
        if (this.activeFish.length >= this.maxFishCount) {
            return;
        }
        
        // 根据稀有度权重选择鱼类
        const fishType = this.selectFishByRarity();
        
        // 选择预制体（如果没有对应预制体，使用第一个）
        const prefabIndex = Math.min(fishType.rarity - 1, this.fishPrefabs.length - 1);
        const prefab = this.fishPrefabs.length > 0 ? this.fishPrefabs[Math.max(0, prefabIndex)] : null;
        
        if (!prefab) {
            console.warn('No fish prefab available');
            return;
        }
        
        // 创建鱼实例
        const fishNode = instantiate(prefab);
        fishNode.setParent(this.node);
        
        // 设置初始位置（从左侧或右侧生成）
        const fromLeft = math.random() > 0.5;
        const startX = fromLeft ? -this.gameAreaWidth / 2 - 50 : this.gameAreaWidth / 2 + 50;
        const depth = math.randomRange(fishType.minDepth, fishType.maxDepth);
        const startY = this.gameAreaHeight / 2 - depth;
        
        fishNode.setPosition(new Vec3(startX, startY, 0));
        
        // 添加鱼数据组件
        let fishData = fishNode.getComponent(FishData);
        if (!fishData) {
            fishData = fishNode.addComponent(FishData);
        }
        fishData.score = fishType.score;
        fishData.rarity = fishType.rarity;
        fishData.fishName = fishType.name;
        
        // 添加移动组件
        let fishMove = fishNode.getComponent(FishMovement);
        if (!fishMove) {
            fishMove = fishNode.addComponent(FishMovement);
        }
        fishMove.speed = fishType.speed;
        fishMove.direction = fromLeft ? 1 : -1;
        fishMove.gameAreaWidth = this.gameAreaWidth;
        
        // 设置朝向
        fishNode.setScale(new Vec3(fishMove.direction, 1, 1));
        
        this.activeFish.push(fishNode);
        
        // 监听鱼被移除的事件
        fishNode.on(Node.EventType.NODE_DESTROYED, () => {
            const index = this.activeFish.indexOf(fishNode);
            if (index > -1) {
                this.activeFish.splice(index, 1);
            }
        });
    }
    
    /**
     * 根据稀有度权重选择鱼类
     */
    private selectFishByRarity(): FishType {
        // 检查特殊事件
        const SpecialEventManager = require('./SpecialEventManager').SpecialEventManager;
        const specialEventManager = SpecialEventManager.getInstance();
        
        let modifiers: any = { goldenRush: false, deepSeaOnly: false, treasureSpawn: false };
        if (specialEventManager) {
            modifiers = specialEventManager.getFishSpawnModifiers();
        }
        
        // 基础权重
        let weights = [40, 30, 15, 10, 4, 1]; // 对应 6 种鱼
        
        // 应用黄金狂潮事件
        if (modifiers.goldenRush) {
            weights[4] *= 3; // 金龙鱼概率提升 3 倍
            weights[5] *= 2; // 神秘鱼概率提升 2 倍
            console.log('🌟 Golden Rush event active!');
        }
        
        // 应用宝藏事件
        if (modifiers.treasureSpawn) {
            weights[5] *= 5; // 神秘鱼概率大幅提升
            console.log('💰 Treasure event active!');
        }
        
        // 应用深海挑战事件
        if (modifiers.deepSeaOnly) {
            weights = [0, 0, 0, 10, 20, 10]; // 只出现深海鱼
            console.log('🌊 Deep sea challenge active!');
        }
        
        const totalWeight = weights.reduce((a, b) => a + b, 0);
        const random = Math.random() * totalWeight;
        
        let cumulative = 0;
        for (let i = 0; i < this.fishTypes.length; i++) {
            cumulative += weights[i];
            if (random <= cumulative) {
                return this.fishTypes[i];
            }
        }
        
        return this.fishTypes[0];
    }
    
    /**
     * 移除鱼
     */
    removeFish(fishNode: Node) {
        const index = this.activeFish.indexOf(fishNode);
        if (index > -1) {
            this.activeFish.splice(index, 1);
        }
        fishNode.destroy();
    }
    
    /**
     * 清除所有鱼
     */
    clearAllFish() {
        for (const fish of this.activeFish) {
            fish.destroy();
        }
        this.activeFish = [];
    }
    
    update(deltaTime: number) {
        // 生成鱼
        this.spawnTimer += deltaTime;
        if (this.spawnTimer >= this.spawnInterval) {
            this.spawnTimer = 0;
            this.spawnFish();
        }
        
        // 检查并移除超出边界的鱼
        for (let i = this.activeFish.length - 1; i >= 0; i--) {
            const fish = this.activeFish[i];
            if (fish && fish.isValid) {
                const pos = fish.position;
                if (Math.abs(pos.x) > this.gameAreaWidth / 2 + 100) {
                    this.removeFish(fish);
                }
            }
        }
    }
}

/**
 * 鱼的移动组件
 */
@ccclass('FishMovement')
export class FishMovement extends Component {
    @property
    public speed: number = 50;
    
    @property
    public direction: number = 1; // 1: 向右，-1: 向左
    
    @property
    public gameAreaWidth: number = 600;
    
    @property
    public waveAmplitude: number = 30; // 波浪幅度
    
    @property
    public waveFrequency: number = 2; // 波浪频率
    
    private time: number = 0;
    private startPos: Vec3 = new Vec3();
    
    start() {
        this.startPos = this.node.position.clone();
    }
    
    update(deltaTime: number) {
        this.time += deltaTime;
        
        // 水平移动
        const moveX = this.speed * this.direction * deltaTime;
        
        // 垂直波浪运动
        const moveY = Math.sin(this.time * this.waveFrequency) * this.waveAmplitude * deltaTime;
        
        this.node.translate(new Vec3(moveX, moveY, 0));
    }
}
