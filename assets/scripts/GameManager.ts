import { _decorator, Component, Node, Label, Button, tween, Vec3, Color, director, sys, EventTouch, Input, input } from 'cc';
const { ccclass, property } = _decorator;

/**
 * 游戏管理器
 * 管理游戏状态、得分、关卡、时间、UI 等
 */
@ccclass('GameManager')
export class GameManager extends Component {
    @property(Label)
    public scoreLabel: Label = null!;
    
    @property(Label)
    public levelLabel: Label = null!;
    
    @property(Label)
    public timeLabel: Label = null!;
    
    @property(Node)
    public gameOverPanel: Node = null!;
    
    @property(Label)
    public finalScoreLabel: Label = null!;
    
    @property(Button)
    public restartButton: Button = null!;
    
    @property(Button)
    public homeButton: Button = null!;
    
    @property(Node)
    public mainMenu: Node = null!;
    
    @property(Node)
    public gameUI: Node = null!;
    
    @property(Node)
    public shopPanel: Node = null!;
    
    // 游戏数据
    private score: number = 0;
    private level: number = 1;
    private gameTime: number = 0;
    private maxTime: number = 60; // 游戏时间（秒）
    private isPlaying: boolean = false;
    private isPaused: boolean = false;
    
    // 装备等级
    private rodLevel: number = 1; // 鱼竿等级
    private lineLevel: number = 1; // 鱼线等级
    private baitLevel: number = 1; // 鱼饵等级
    
    // 最高分
    private highScore: number = 0;
    
    // 单例
    private static instance: GameManager | null = null;
    public static getInstance(): GameManager | null {
        return GameManager.instance;
    }
    
    onLoad() {
        GameManager.instance = this;
        this.loadGameData();
    }
    
    start() {
        this.initUI();
        this.showMainMenu();
    }
    
    /**
     * 初始化 UI
     */
    initUI() {
        // 隐藏游戏结束面板
        if (this.gameOverPanel) {
            this.gameOverPanel.active = false;
        }
        
        // 隐藏商店面板
        if (this.shopPanel) {
            this.shopPanel.active = false;
        }
        
        // 设置重新开始按钮
        if (this.restartButton) {
            this.restartButton.node.on(Button.EventType.CLICK, this.restartGame, this);
        }
        
        // 设置返回主页按钮
        if (this.homeButton) {
            this.homeButton.node.on(Button.EventType.CLICK, this.showMainMenu, this);
        }
    }
    
    /**
     * 显示主菜单
     */
    showMainMenu() {
        this.isPlaying = false;
        if (this.mainMenu) {
            this.mainMenu.active = true;
        }
        if (this.gameUI) {
            this.gameUI.active = false;
        }
        if (this.gameOverPanel) {
            this.gameOverPanel.active = false;
        }
    }
    
    /**
     * 开始游戏
     */
    startGame() {
        this.score = 0;
        this.gameTime = 0;
        this.isPlaying = true;
        this.isPaused = false;
        
        // 更新 UI
        this.updateUI();
        
        // 显示游戏 UI
        if (this.mainMenu) {
            this.mainMenu.active = false;
        }
        if (this.gameUI) {
            this.gameUI.active = true;
        }
        if (this.gameOverPanel) {
            this.gameOverPanel.active = false;
        }
        
        // 通知鱼钩控制器开始
        const hookController = this.node.getComponentInChildren(require('./HookController').HookController);
        if (hookController) {
            hookController.setOnFishCaught(this.onFishCaught.bind(this));
            hookController.setOnHookReturn(this.onHookReturn.bind(this));
        }
    }
    
    /**
     * 捕获鱼回调
     */
    onFishCaught(fishNode: Node, score: number) {
        // 根据鱼饵等级增加得分加成
        const bonus = 1 + (this.baitLevel - 1) * 0.1;
        const finalScore = Math.floor(score * bonus);
        
        this.score += finalScore;
        this.updateUI();
        
        // 检查是否升级
        this.checkLevelUp();
    }
    
    /**
     * 鱼钩返回回调
     */
    onHookReturn() {
        // 清除捕获的鱼（由鱼钩控制器处理）
        const hookController = this.node.getComponentInChildren(require('./HookController').HookController);
        if (hookController) {
            hookController.clearCaughtFish();
        }
    }
    
    /**
     * 检查升级
     */
    checkLevelUp() {
        const newLevel = Math.floor(this.score / 100) + 1;
        if (newLevel > this.level) {
            this.level = newLevel;
            // 可以添加升级特效或提示
            console.log(`Level Up! Now level ${this.level}`);
        }
    }
    
    /**
     * 更新 UI
     */
    updateUI() {
        if (this.scoreLabel) {
            this.scoreLabel.string = `得分：${this.score}`;
        }
        if (this.levelLabel) {
            this.levelLabel.string = `关卡：${this.level}`;
        }
        if (this.timeLabel) {
            const remaining = Math.max(0, this.maxTime - Math.floor(this.gameTime));
            this.timeLabel.string = `时间：${remaining}s`;
        }
    }
    
    /**
     * 显示商店
     */
    showShop() {
        if (this.shopPanel) {
            this.shopPanel.active = true;
        }
    }
    
    /**
     * 关闭商店
     */
    closeShop() {
        if (this.shopPanel) {
            this.shopPanel.active = false;
        }
    }
    
    /**
     * 购买装备
     */
    buyEquipment(type: string) {
        const cost = this.getEquipmentCost(type);
        
        if (this.score >= cost) {
            this.score -= cost;
            
            switch (type) {
                case 'rod':
                    this.rodLevel++;
                    break;
                case 'line':
                    this.lineLevel++;
                    break;
                case 'bait':
                    this.baitLevel++;
                    break;
            }
            
            this.updateUI();
            this.saveGameData();
            console.log(`Purchased ${type}, level now: ${this.getEquipmentLevel(type)}`);
        } else {
            console.log('Not enough score!');
        }
    }
    
    /**
     * 获取装备等级
     */
    getEquipmentLevel(type: string): number {
        switch (type) {
            case 'rod':
                return this.rodLevel;
            case 'line':
                return this.lineLevel;
            case 'bait':
                return this.baitLevel;
            default:
                return 1;
        }
    }
    
    /**
     * 获取装备价格
     */
    getEquipmentCost(type: string): number {
        const level = this.getEquipmentLevel(type);
        return 50 * level; // 简单定价策略
    }
    
    /**
     * 游戏结束
     */
    gameOver() {
        this.isPlaying = false;
        
        // 更新最高分
        if (this.score > this.highScore) {
            this.highScore = this.score;
            this.saveGameData();
        }
        
        // 显示游戏结束面板
        if (this.gameOverPanel) {
            this.gameOverPanel.active = true;
        }
        if (this.finalScoreLabel) {
            this.finalScoreLabel.string = `最终得分：${this.score}`;
        }
    }
    
    /**
     * 重新开始游戏
     */
    restartGame() {
        this.startGame();
    }
    
    /**
     * 返回主菜单
     */
    goToHome() {
        this.showMainMenu();
    }
    
    /**
     * 保存游戏数据
     */
    saveGameData() {
        const data = {
            highScore: this.highScore,
            rodLevel: this.rodLevel,
            lineLevel: this.lineLevel,
            baitLevel: this.baitLevel
        };
        sys.localStorage.setItem('fishing_game_data', JSON.stringify(data));
    }
    
    /**
     * 加载游戏数据
     */
    loadGameData() {
        const dataStr = sys.localStorage.getItem('fishing_game_data');
        if (dataStr) {
            try {
                const data = JSON.parse(dataStr);
                this.highScore = data.highScore || 0;
                this.rodLevel = data.rodLevel || 1;
                this.lineLevel = data.lineLevel || 1;
                this.baitLevel = data.baitLevel || 1;
            } catch (e) {
                console.error('Failed to load game data:', e);
            }
        }
    }
    
    update(deltaTime: number) {
        if (this.isPlaying && !this.isPaused) {
            this.gameTime += deltaTime;
            this.updateUI();
            
            // 检查时间是否结束
            if (this.gameTime >= this.maxTime) {
                this.gameOver();
            }
        }
    }
    
    onDestroy() {
        GameManager.instance = null;
    }
}
