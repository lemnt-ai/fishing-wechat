import { _decorator, Component, Node, Vec3, math, Collider, ICollisionEvent } from 'cc';
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
    
    private isCasting: boolean = false;
    private isRetracting: boolean = false;
    private caughtFish: Node | null = null;
    private startPos: Vec3 = new Vec3();
    
    start() {
        this.startPos.set(this.node.position);
    }
    
    update(deltaTime: number) {
        if (this.isCasting) {
            this.castHook(deltaTime);
        } else if (this.isRetracting) {
            this.retractHook(deltaTime);
        }
    }
    
    // 下放鱼钩
    public castHook() {
        if (this.isCasting || this.isRetracting) return;
        
        this.isCasting = true;
        const collider = this.node.getComponent(Collider);
        if (collider) {
            collider.enabled = true;
        }
    }
    
    // 回收鱼钩
    public retractHook() {
        this.isCasting = false;
        this.isRetracting = true;
    }
    
    private castHook(deltaTime: number) {
        const newPos = this.node.position.clone();
        newPos.y -= this.hookSpeed * deltaTime;
        
        if (newPos.y <= this.startPos.y - this.maxDepth) {
            this.retractHook();
        } else {
            this.node.setPosition(newPos);
        }
    }
    
    private retractHook(deltaTime: number) {
        const targetY = this.startPos.y;
        const currentY = this.node.position.y;
        
        if (currentY >= targetY) {
            this.isRetracting = false;
            this.node.setPosition(this.startPos);
            
            if (this.caughtFish) {
                this.onFishCaught(this.caughtFish);
                this.caughtFish = null;
            }
            return;
        }
        
        const newPos = this.node.position.clone();
        newPos.y += this.hookSpeed * deltaTime;
        this.node.setPosition(newPos);
        
        if (this.caughtFish) {
            this.caughtFish.setPosition(this.node.position);
        }
    }
    
    // 碰撞处理
    public onCollisionEnter(event: ICollisionEvent) {
        if (!this.isCasting || this.caughtFish) return;
        
        const other = event.otherCollider.node;
        if (other.name.includes('Fish')) {
            this.caughtFish = other;
            this.retractHook();
        }
    }
    
    private onFishCaught(fish: Node) {
        console.log('捕获到鱼:', fish.name);
        // 触发得分、播放特效等
    }
}
