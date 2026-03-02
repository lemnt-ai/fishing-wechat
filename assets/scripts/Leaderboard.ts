import { _decorator, Component, Node, Label, sys } from 'cc';
const { ccclass, property } = _decorator;

/**
 * 微信排行榜管理器
 * 处理好友排行榜和世界排行榜
 */
@ccclass('Leaderboard')
export class Leaderboard extends Component {
    @property(Label)
    public friendRankLabel: Label = null!;
    
    @property(Label)
    public worldRankLabel: Label = null!;
    
    @property(Node)
    public leaderboardPanel: Node = null!;
    
    private friendRanks: any[] = [];
    private worldRanks: any[] = [];
    private userRank: number = 0;
    private userScore: number = 0;
    
    // 单例
    private static instance: Leaderboard | null = null;
    public static getInstance(): Leaderboard | null {
        return Leaderboard.instance;
    }
    
    onLoad() {
        Leaderboard.instance = this;
    }
    
    start() {
        if (this.leaderboardPanel) {
            this.leaderboardPanel.active = false;
        }
    }
    
    /**
     * 检查是否在微信环境
     */
    isWeChatEnvironment(): boolean {
        // @ts-ignore
        return typeof wx !== 'undefined';
    }
    
    /**
     * 显示排行榜
     */
    showLeaderboard() {
        if (!this.isWeChatEnvironment()) {
            console.log('Not in WeChat environment, showing mock leaderboard');
            this.showMockLeaderboard();
            return;
        }
        
        // 打开微信开放数据域
        this.openDataContext();
    }
    
    /**
     * 打开开放数据域（需要配合微信开放数据域使用）
     */
    openDataContext() {
        if (!this.isWeChatEnvironment()) {
            return;
        }
        
        // @ts-ignore
        const openDataContext = wx.getOpenDataContext();
        
        // 发送消息给开放数据域
        openDataContext.postMessage({
            type: 'getLeaderboard'
        });
        
        // 监听开放数据域的消息
        // @ts-ignore
        wx.onMessage((data: any) => {
            if (data.type === 'leaderboardData') {
                this.updateLeaderboardDisplay(data.data);
            }
        });
    }
    
    /**
     * 更新排行榜显示
     */
    updateLeaderboardDisplay(data: any) {
        this.friendRanks = data.friendRanks || [];
        this.worldRanks = data.worldRanks || [];
        this.userRank = data.userRank || 0;
        this.userScore = data.userScore || 0;
        
        this.renderLeaderboard();
    }
    
    /**
     * 渲染排行榜
     */
    renderLeaderboard() {
        if (this.friendRankLabel) {
            const friendText = this.formatRankList(this.friendRanks);
            this.friendRankLabel.string = friendText;
        }
        
        if (this.worldRankLabel) {
            const worldText = this.formatRankList(this.worldRanks);
            this.worldRankLabel.string = worldText;
        }
    }
    
    /**
     * 格式化排行榜列表
     */
    formatRankList(ranks: any[]): string {
        if (ranks.length === 0) {
            return '暂无数据';
        }
        
        let text = '';
        const maxDisplay = Math.min(10, ranks.length);
        
        for (let i = 0; i < maxDisplay; i++) {
            const rank = ranks[i];
            text += `${i + 1}. ${rank.nickName || '玩家'}: ${rank.score}分\n`;
        }
        
        return text;
    }
    
    /**
     * 提交分数
     */
    submitScore(score: number) {
        if (!this.isWeChatEnvironment()) {
            console.log('Mock submit score:', score);
            this.userScore = score;
            return;
        }
        
        // @ts-ignore
        wx.setUserCloudStorage({
            KVDataList: [
                {
                    key: 'score',
                    value: score.toString()
                }
            ],
            success: () => {
                console.log('Score submitted successfully');
                this.userScore = score;
                this.refreshLeaderboard();
            },
            fail: (err: any) => {
                console.error('Submit score failed:', err);
            }
        });
    }
    
    /**
     * 刷新排行榜
     */
    refreshLeaderboard() {
        if (!this.isWeChatEnvironment()) {
            this.showMockLeaderboard();
            return;
        }
        
        this.openDataContext();
    }
    
    /**
     * 关闭排行榜
     */
    closeLeaderboard() {
        if (this.leaderboardPanel) {
            this.leaderboardPanel.active = false;
        }
        
        if (!this.isWeChatEnvironment()) {
            return;
        }
        
        // @ts-ignore
        wx.hideShareMenu();
    }
    
    /**
     * 模拟排行榜（开发测试用）
     */
    showMockLeaderboard() {
        // 生成模拟数据
        const mockNames = ['小明', '小红', '小刚', '小美', '小强', '小丽', '小伟', '小芳', '小军', '小敏'];
        
        this.friendRanks = mockNames.map((name, index) => ({
            nickName: name,
            score: 500 - index * 30
        }));
        
        this.worldRanks = [...this.friendRanks].sort((a, b) => b.score - a.score);
        
        this.userScore = this.userScore || 350;
        this.userRank = 6;
        
        this.renderLeaderboard();
        
        if (this.leaderboardPanel) {
            this.leaderboardPanel.active = true;
        }
        
        console.log('Mock leaderboard displayed');
    }
    
    /**
     * 获取用户排名
     */
    getUserRank(): number {
        return this.userRank;
    }
    
    /**
     * 获取用户分数
     */
    getUserScore(): number {
        return this.userScore;
    }
    
    onDestroy() {
        Leaderboard.instance = null;
    }
}
