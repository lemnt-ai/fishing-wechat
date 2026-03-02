import { _decorator, Component, Node, Sprite, SpriteFrame, Texture2D, Color, Graphics, Vec3, UITransform, director, game, ImageAsset, TextureBase, assetManager } from 'cc';
const { ccclass, property } = _decorator;

/**
 * 运行时创建占位资源
 * 在场景中添加此节点，自动创建所有占位 Sprite
 */
@ccclass('PlaceholderCreator')
export class PlaceholderCreator extends Component {
    @property
    public createOnStart: boolean = true;
    
    @property(Node)
    public parentContainer: Node = null!;
    
    // 存储创建的节点
    private createdNodes: Map<string, Node> = new Map();
    
    start() {
        if (this.createOnStart) {
            console.log('🎨 Creating placeholder resources...');
            this.createAllPlaceholders();
        }
    }
    
    /**
     * 创建所有占位资源
     */
    createAllPlaceholders() {
        if (!this.parentContainer) {
            this.parentContainer = this.node;
        }
        
        console.log('\n🐟 Creating fish...');
        this.createFish();
        
        console.log('\n🎨 Creating UI elements...');
        this.createUI();
        
        console.log('\n🌊 Creating backgrounds...');
        this.createBackgrounds();
        
        console.log('\n✨ Creating effects...');
        this.createEffects();
        
        console.log('\n✅ All placeholders created!');
        console.log(`📊 Total nodes created: ${this.createdNodes.size}`);
    }
    
    /**
     * 创建鱼类
     */
    createFish() {
        const fishTypes = [
            { name: 'fish_common_1', color: new Color(160, 160, 160), width: 80, height: 50 },
            { name: 'fish_common_2', color: new Color(74, 144, 226), width: 90, height: 55 },
            { name: 'fish_rare_1', color: new Color(80, 200, 120), width: 100, height: 60 },
            { name: 'fish_rare_2', color: new Color(155, 89, 182), width: 110, height: 65 },
            { name: 'fish_epic', color: new Color(255, 215, 0), width: 120, height: 70 },
            { name: 'fish_legendary', color: new Color(255, 0, 0), width: 140, height: 80 }
        ];
        
        fishTypes.forEach((fish, index) => {
            const node = this.createSprite(fish.name, fish.color, fish.width, fish.height);
            node.setPosition((index % 3) * 200, -index * 100, 0);
            this.createdNodes.set(fish.name, node);
        });
    }
    
    /**
     * 创建 UI 元素
     */
    createUI() {
        // 鱼钩
        const hook = this.createSprite('hook', new Color(128, 128, 128), 40, 40);
        hook.setPosition(0, 0, 0);
        this.createdNodes.set('hook', hook);
        
        // 鱼线
        const line = this.createSprite('line', new Color(192, 192, 192), 4, 400);
        line.setPosition(0, -200, 0);
        this.createdNodes.set('line', line);
        
        // 按钮
        const btnNormal = this.createSprite('button_normal', new Color(76, 175, 80), 300, 80);
        btnNormal.setPosition(-150, -300, 0);
        this.createdNodes.set('button_normal', btnNormal);
        
        const btnPressed = this.createSprite('button_pressed', new Color(69, 160, 73), 300, 80);
        btnPressed.setPosition(150, -300, 0);
        this.createdNodes.set('button_pressed', btnPressed);
    }
    
    /**
     * 创建背景
     */
    createBackgrounds() {
        // 水面背景
        const bgWater = this.createSprite('bg_water', new Color(135, 206, 235), 720, 600);
        bgWater.setPosition(360, -300, 0);
        this.createdNodes.set('bg_water', bgWater);
        
        // 深水背景
        const bgDeep = this.createSprite('bg_deep', new Color(30, 144, 255), 720, 680);
        bgDeep.setPosition(360, -340, 0);
        this.createdNodes.set('bg_deep', bgDeep);
    }
    
    /**
     * 创建特效
     */
    createEffects() {
        // 气泡
        const bubbles = [
            { name: 'bubble_1', size: 20, alpha: 153 },
            { name: 'bubble_2', size: 30, alpha: 128 },
            { name: 'bubble_3', size: 40, alpha: 102 }
        ];
        
        bubbles.forEach((bubble, index) => {
            const color = new Color(255, 255, 255, bubble.alpha);
            const node = this.createSprite(bubble.name, color, bubble.size, bubble.size);
            node.setPosition(index * 100, -400, 0);
            this.createdNodes.set(bubble.name, node);
        });
        
        // 闪光
        const sparkle = this.createSprite('sparkle', new Color(255, 215, 0), 32, 32);
        sparkle.setPosition(300, -400, 0);
        this.createdNodes.set('sparkle', sparkle);
    }
    
    /**
     * 创建 Sprite 节点
     */
    createSprite(name: string, color: Color, width: number, height: number): Node {
        // 创建节点
        const node = new Node(name);
        node.parent = this.parentContainer;
        
        // 添加 UITransform
        const uiTransform = node.addComponent(UITransform);
        uiTransform.setContentSize(width, height);
        
        // 添加 Sprite
        const sprite = node.addComponent(Sprite);
        sprite.color = color;
        
        // 设置节点位置
        node.setPosition(0, 0, 0);
        
        console.log(`  ✅ Created ${name}: ${width}x${height}, Color(${color.r}, ${color.g}, ${color.b})`);
        
        return node;
    }
    
    /**
     * 获取创建的节点
     */
    getCreatedNode(name: string): Node | undefined {
        return this.createdNodes.get(name);
    }
    
    /**
     * 获取所有创建的节点
     */
    getAllCreatedNodes(): Map<string, Node> {
        return this.createdNodes;
    }
    
    /**
     * 清理所有创建的节点
     */
    cleanup() {
        this.createdNodes.forEach((node) => {
            node.destroy();
        });
        this.createdNodes.clear();
        console.log('🧹 Cleaned up all placeholder nodes');
    }
}
