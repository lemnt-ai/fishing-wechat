import { _decorator, Component, Node, Label, Button, tween, Vec3, Color } from 'cc';
const { ccclass, property } = _decorator;

/**
 * 游戏管理器
 * 管理游戏状态、得分、UI 等
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
    
    private score: number = 0;
    private level: number = 1;
    private gameTime: number = 0;
    private isPlaying: boolean = false;
    private gameDuration: number = 180; // 3 分钟
    
    start() {
        this.initGame();
    }
    
    update(deltaTime: number) {
        if (!this.isPlaying) return;
        
        this.gameTime += deltaTime;
        const remaining = Math.max(0, this.gameDuration - this.gameTime);
        const minutes = Math.floor(remaining / 60);
        const seconds = Math.floor(remaining % 60);
        this.timeLabel.string = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        if (remaining <= 0) {
            this.endGame();
        }
    }
    
    initGame() {
        this.score = 0;
        this.level = 1;
        this.gameTime = 0;
        this.isPlaying = true;
        this.gameOverPanel.active = false;
        this.updateUI();
    }
    
    addScore(points: number) {
        this.score += points;
        
        // 升级逻辑
        const newLevel = Math.floor(this.score / 100) + 1;
        if (newLevel > this.level) {
            this.level = newLevel;
            this.onLevelUp();
        }
        
        this.updateUI();
    }
    
    onLevelUp() {
        console.log(`升级到第 ${this.level} 关`);
        // 可以增加难度、解锁新鱼类等
    }
    
    updateUI() {
        this.scoreLabel.string = `得分：${this.score}`;
        this.levelLabel.string = `关卡：${this.level}`;
    }
    
    endGame() {
        this.isPlaying = false;
        this.gameOverPanel.active = true;
        this.finalScoreLabel.string = `最终得分：${this.score}`;
        
        // 保存最高分到本地
        this.saveHighScore();
    }
    
    saveHighScore() {
        const highScore = parseInt(cc.sys.localStorage.getItem('highScore') || '0');
        if (this.score > highScore) {
            cc.sys.localStorage.setItem('highScore', this.score.toString());
            console.log('新纪录！');
        }
    }
    
    restartGame() {
        this.initGame();
    }
    
    shareGame() {
        if (typeof wx !== 'undefined') {
            wx.shareAppMessage({
                title: `我钓了${this.score}分，来挑战我吧！`,
                imageUrl: 'share.jpg'
            });
        }
    }
}
