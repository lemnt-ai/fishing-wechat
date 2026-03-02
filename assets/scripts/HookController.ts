import { _decorator, Component, Node, Vec3, math, Collider, ICollisionEvent, Input, input, EventTouch, Touch, game } from 'cc';
const { ccclass, property } = _decorator;

/**
 * 鱼钩控制器
 * 处理鱼钩的下放、回收和碰撞检测
 */
@ccclass('HookController')
export class HookController extends Component {
    @property
    public hookSpeed: number = 200; // 鱼钩速度
    
    @property
    public maxDepth: number = 800; // 最大深度
    
    @property
    public retractSpeed: number = 300; // 回收速度
    
    private isCasting: boolean = false;
    private isRetracting: boolean = false;
    private caughtFish: Node | null = null;
    private startPos: Vec3 = new Vec3();
    private currentDepth: number = 0;
    
    // 信号量
    private onFishCaught: ((fish: Node, score: number) => void) | null = null;
    private onHookReturn: (() => void) | null = null;
    
    start() {
        this.startPos = this.node.position.clone();
        this.setupInput();
    }
    
    /**
     * 设置输入控制
     */
    setupInput() {
        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
    }
    
    /**
     * 触摸开始 - 下放鱼钩
     */
    onTouchStart(event: EventTouch) {
        if (this.isCasting || this.isRetracting) {
            return;
        }
        this.castHook();
    }
    
    /**
     * 下放鱼钩
     */
    castHook() {
        this.isCasting = true;
        this.currentDepth = 0;
    }
    
    /**
     * 回收鱼钩
     */
    retractHook() {
        this.isCasting = false;
        this.isRetracting = true;
        
        // 如果有捕获的鱼，一起回收
        if (this.caughtFish) {
            this.caughtFish.setParent(this.node.parent);
        }
    }
    
    /**
     * 设置鱼钩捕获回调
     */
    setOnFishCaught(callback: (fish: Node, score: number) => void) {
        this.onFishCaught = callback;
    }
    
    /**
     * 设置鱼钩返回回调
     */
    setOnHookReturn(callback: () => void) {
        this.onHookReturn = callback;
    }
    
    /**
     * 碰撞检测
     */
    onCollisionEnter(event: ICollisionEvent) {
        if (!this.isCasting || this.caughtFish) {
            return;
        }
        
        const other = event.otherCollider;
        const fishNode = other.node;
        
        // 检查是否是鱼
        const fishData = fishNode.getComponent('FishData');
        if (fishData) {
            this.catchFish(fishNode, fishData);
        }
    }
    
    /**
     * 捕获鱼
     */
    catchFish(fishNode: Node, fishData: any) {
        this.caughtFish = fishNode;
        this.retractHook();
        
        // 触发捕获回调
        if (this.onFishCaught) {
            this.onFishCaught(fishNode, fishData.score);
        }
        
        // 禁用鱼的碰撞和移动
        const collider = fishNode.getComponent(Collider);
        if (collider) {
            collider.enabled = false;
        }
    }
    
    /**
     * 清除捕获的鱼
     */
    clearCaughtFish() {
        if (this.caughtFish) {
            this.caughtFish.destroy();
            this.caughtFish = null;
        }
    }
    
    update(deltaTime: number) {
        if (this.isCasting) {
            // 下放鱼钩
            this.node.translate(new Vec3(0, -this.hookSpeed * deltaTime, 0));
            this.currentDepth = this.startPos.y - this.node.position.y;
            
            // 检查是否到达最大深度
            if (this.currentDepth >= this.maxDepth) {
                this.retractHook();
            }
        } else if (this.isRetracting) {
            // 回收鱼钩
            this.node.translate(new Vec3(0, this.retractSpeed * deltaTime, 0));
            
            // 如果有捕获的鱼，跟随鱼钩移动
            if (this.caughtFish) {
                this.caughtFish.setPosition(this.node.position);
            }
            
            // 检查是否回到起点
            if (this.node.position.y >= this.startPos.y) {
                this.node.setPosition(this.startPos);
                this.isRetracting = false;
                
                // 触发返回回调
                if (this.onHookReturn) {
                    this.onHookReturn();
                }
            }
        }
    }
    
    onDestroy() {
        input.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
    }
}
