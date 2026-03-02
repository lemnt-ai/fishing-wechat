import { _decorator, Component, Node, Prefab, instantiate, Vec3, math, Label, UITransform } from 'cc';
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
 * 鱼类管理器
 * 管理鱼的生成、移动和消失
 */
@ccclass('FishManager')
export class FishManager extends Component {
    @property
    public fishPrefabs: Node[] = []; // 鱼类预制体数组
    
    @property
    public spawnInterval: number = 3; // 生成间隔（秒）
    
    @property
    public maxFishCount: number = 10; // 最大鱼数量
    
    private spawnTimer: number = 0;
    private fishTypes: FishType[] = [
        { name: '小鲤鱼', score: 10, speed: 50, rarity: 1, minDepth: 100, maxDepth: 300 },
        { name: '鲫鱼', score: 20, speed: 60, rarity: 2, minDepth: 200, maxDepth: 400 },
        { name: '草鱼', score: 30, speed: 70, rarity: 2, minDepth: 300, maxDepth: 500 },
        { name: '鲤鱼王', score: 50, speed: 80, rarity: 3, minDepth: 400, maxDepth: 600 },
        { name: '金龙鱼', score: 100, speed: 100, rarity: 4, minDepth: 500, maxDepth: 700 },
        { name: '神秘鱼', score: 200, speed: 120, rarity: 5, minDepth: 600, maxDepth: 800 },
    ];
    
    private currentFish: Node[] = [];
    
    update(deltaTime: number) {
        this.spawnTimer += deltaTime;
        
        if (this.spawnTimer >= this.spawnInterval && this.currentFish.length < this.maxFishCount) {
            this.spawnFish();
            this.spawnTimer = 0;
        }
        
        this.updateFish(deltaTime);
    }
    
    private spawnFish() {
        const fishType = this.selectFishType();
        const prefab = this.getFishPrefab(fishType.name);
        
        if (!prefab) {
            console.warn('未找到鱼类预制体:', fishType.name);
            return;
        }
        
        const fish = instantiate(prefab);
        this.node.addChild(fish);
        
        // 设置初始位置（屏幕外右侧）
        const screenWidth = this.node.getComponent(UITransform)?.contentSize.width || 640;
        const randomDepth = math.randomRange(fishType.minDepth, fishType.maxDepth);
        fish.setPosition(new Vec3(screenWidth + 50, -randomDepth, 0));
        
        // 设置鱼类数据
        fish.userData = {
            type: fishType,
            direction: -1, // -1 向左，1 向右
        };
        
        this.currentFish.push(fish);
    }
    
    private selectFishType(): FishType {
        const rand = math.random();
        let cumulative = 0;
        
        // 根据稀有度权重选择
        const weights = [0.4, 0.25, 0.15, 0.1, 0.07, 0.03];
        
        for (let i = 0; i < this.fishTypes.length; i++) {
            cumulative += weights[i];
            if (rand <= cumulative) {
                return this.fishTypes[i];
            }
        }
        
        return this.fishTypes[0];
    }
    
    private getFishPrefab(name: string): Node | null {
        return this.fishPrefabs.find(p => p.name === name) || null;
    }
    
    private updateFish(deltaTime: number) {
        for (let i = this.currentFish.length - 1; i >= 0; i--) {
            const fish = this.currentFish[i];
            const data = fish.userData;
            
            if (!data || !data.type) {
                this.removeFish(i);
                continue;
            }
            
            // 移动鱼
            const pos = fish.position.clone();
            pos.x += data.type.speed * data.direction * deltaTime;
            
            // 超出屏幕则移除
            if (pos.x < -100) {
                this.removeFish(i);
                continue;
            }
            
            fish.setPosition(pos);
        }
    }
    
    private removeFish(index: number) {
        const fish = this.currentFish[index];
        fish.destroy();
        this.currentFish.splice(index, 1);
    }
    
    public onFishCaught(fish: Node) {
        const data = fish.userData;
        if (data && data.type) {
            console.log(`捕获 ${data.type.name}, 得分: ${data.type.score}`);
            // 触发得分事件
        }
        this.removeFish(this.currentFish.indexOf(fish));
    }
}
