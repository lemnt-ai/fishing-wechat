import { _decorator, Component, Node, Label, Button, Prefab, instantiate } from 'cc';
const { ccclass, property } = _decorator;

/**
 * 商店管理器
 * 处理装备购买和升级
 */
@ccclass('ShopManager')
export class ShopManager extends Component {
    @property(Label)
    public playerScoreLabel: Label = null!;
    
    @property(Label)
    public rodLevelLabel: Label = null!;
    
    @property(Label)
    public rodCostLabel: Label = null!;
    
    @property(Label)
    public lineLevelLabel: Label = null!;
    
    @property(Label)
    public lineCostLabel: Label = null!;
    
    @property(Label)
    public baitLevelLabel: Label = null!;
    
    @property(Label)
    public baitCostLabel: Label = null!;
    
    @property(Button)
    public buyRodButton: Button = null!;
    
    @property(Button)
    public buyLineButton: Button = null!;
    
    @property(Button)
    public buyBaitButton: Button = null!;
    
    @property(Button)
    public closeButton: Button = null!;
    
    private maxLevel: number = 10;
    
    start() {
        this.setupButtons();
        this.updateShopUI();
    }
    
    /**
     * 设置按钮事件
     */
    setupButtons() {
        if (this.buyRodButton) {
            this.buyRodButton.node.on(Button.EventType.CLICK, this.buyRod, this);
        }
        if (this.buyLineButton) {
            this.buyLineButton.node.on(Button.EventType.CLICK, this.buyLine, this);
        }
        if (this.buyBaitButton) {
            this.buyBaitButton.node.on(Button.EventType.CLICK, this.buyBait, this);
        }
        if (this.closeButton) {
            this.closeButton.node.on(Button.EventType.CLICK, this.closeShop, this);
        }
    }
    
    /**
     * 更新商店 UI
     */
    updateShopUI() {
        const gameManager = this.getGameManager();
        if (!gameManager) {
            return;
        }
        
        // 更新玩家分数
        if (this.playerScoreLabel) {
            this.playerScoreLabel.string = `当前金币：${gameManager.score}`;
        }
        
        // 更新鱼竿信息
        const rodLevel = gameManager.getEquipmentLevel('rod');
        const rodCost = gameManager.getEquipmentCost('rod');
        if (this.rodLevelLabel) {
            this.rodLevelLabel.string = rodLevel >= this.maxLevel ? 'MAX' : `Lv.${rodLevel}`;
        }
        if (this.rodCostLabel) {
            this.rodCostLabel.string = rodLevel >= this.maxLevel ? '已满级' : `${rodCost}金币`;
        }
        
        // 更新鱼线信息
        const lineLevel = gameManager.getEquipmentLevel('line');
        const lineCost = gameManager.getEquipmentCost('line');
        if (this.lineLevelLabel) {
            this.lineLevelLabel.string = lineLevel >= this.maxLevel ? 'MAX' : `Lv.${lineLevel}`;
        }
        if (this.lineCostLabel) {
            this.lineCostLabel.string = lineLevel >= this.maxLevel ? '已满级' : `${lineCost}金币`;
        }
        
        // 更新鱼饵信息
        const baitLevel = gameManager.getEquipmentLevel('bait');
        const baitCost = gameManager.getEquipmentCost('bait');
        if (this.baitLevelLabel) {
            this.baitLevelLabel.string = baitLevel >= this.maxLevel ? 'MAX' : `Lv.${baitLevel}`;
        }
        if (this.baitCostLabel) {
            this.baitCostLabel.string = baitLevel >= this.maxLevel ? '已满级' : `${baitCost}金币`;
        }
        
        // 更新按钮状态
        this.updateButtonState(this.buyRodButton, rodLevel, rodCost, gameManager.score);
        this.updateButtonState(this.buyLineButton, lineLevel, lineCost, gameManager.score);
        this.updateButtonState(this.buyBaitButton, baitLevel, baitCost, gameManager.score);
    }
    
    /**
     * 更新按钮状态
     */
    updateButtonState(button: Button, level: number, cost: number, score: number) {
        if (!button) {
            return;
        }
        
        const isMaxLevel = level >= this.maxLevel;
        const canAfford = score >= cost;
        
        button.interactable = !isMaxLevel && canAfford;
        
        // 设置按钮颜色
        const color = button.node.getComponent(require('cc').UITransform);
        if (isMaxLevel) {
            // 已满级，灰色
            button.node.setColor(new require('cc').Color(128, 128, 128));
        } else if (canAfford) {
            // 可购买，绿色
            button.node.setColor(new require('cc').Color(100, 200, 100));
        } else {
            // 买不起，红色
            button.node.setColor(new require('cc').Color(200, 100, 100));
        }
    }
    
    /**
     * 购买鱼竿
     */
    buyRod() {
        const gameManager = this.getGameManager();
        if (gameManager) {
            gameManager.buyEquipment('rod');
            this.updateShopUI();
        }
    }
    
    /**
     * 购买鱼线
     */
    buyLine() {
        const gameManager = this.getGameManager();
        if (gameManager) {
            gameManager.buyEquipment('line');
            this.updateShopUI();
        }
    }
    
    /**
     * 购买鱼饵
     */
    buyBait() {
        const gameManager = this.getGameManager();
        if (gameManager) {
            gameManager.buyEquipment('bait');
            this.updateShopUI();
        }
    }
    
    /**
     * 关闭商店
     */
    closeShop() {
        const gameManager = this.getGameManager();
        if (gameManager) {
            gameManager.closeShop();
        }
    }
    
    /**
     * 获取 GameManager 实例
     */
    getGameManager(): any {
        const GameManager = require('./GameManager').GameManager;
        return GameManager.getInstance();
    }
}
