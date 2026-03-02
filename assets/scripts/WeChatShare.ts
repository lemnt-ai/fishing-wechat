import { _decorator, Component, Node, sys } from 'cc';
const { ccclass, property } = _decorator;

/**
 * 微信分享管理器
 * 处理好友分享和朋友圈分享
 */
@ccclass('WeChatShare')
export class WeChatShare extends Component {
    @property
    public shareTitle: string = '欢乐钓鱼 - 来挑战我的最高分！';
    
    @property
    public shareDesc: string = '我在欢乐钓鱼中钓到了 {score} 分，快来挑战我吧！';
    
    @property
    public shareImageUrl: string = '';
    
    @property
    public sharePagePath: string = '/pages/index/index';
    
    private score: number = 0;
    
    // 单例
    private static instance: WeChatShare | null = null;
    public static getInstance(): WeChatShare | null {
        return WeChatShare.instance;
    }
    
    onLoad() {
        WeChatShare.instance = this;
    }
    
    start() {
        // 初始化分享配置
        this.initShare();
    }
    
    /**
     * 检查是否在微信环境
     */
    isWeChatEnvironment(): boolean {
        // @ts-ignore
        return typeof wx !== 'undefined';
    }
    
    /**
     * 初始化分享配置
     */
    initShare() {
        if (!this.isWeChatEnvironment()) {
            console.log('Not in WeChat environment, share disabled');
            return;
        }
        
        // @ts-ignore
        wx.showShareMenu({
            withShareTicket: true,
            showShareItems: ['wechatFriends', 'wechatMoment']
        });
        
        // 监听分享按钮点击
        // @ts-ignore
        wx.onShareAppMessage(() => {
            return this.getShareContent();
        });
    }
    
    /**
     * 设置分享分数
     */
    setShareScore(score: number) {
        this.score = score;
    }
    
    /**
     * 获取分享内容
     */
    getShareContent(): any {
        const desc = this.shareDesc.replace('{score}', this.score.toString());
        
        return {
            title: this.shareTitle,
            desc: desc,
            path: this.sharePagePath + '?score=' + this.score,
            imageUrl: this.shareImageUrl
        };
    }
    
    /**
     * 分享给好友
     */
    shareToFriend() {
        if (!this.isWeChatEnvironment()) {
            console.log('Share to friend: Not in WeChat environment');
            this.showMockShare('好友');
            return;
        }
        
        // @ts-ignore
        wx.showShareMenu({
            withShareTicket: true,
            showShareItems: ['wechatFriends']
        });
        
        console.log('Share menu opened for friends');
    }
    
    /**
     * 分享到朋友圈
     */
    shareToMoment() {
        if (!this.isWeChatEnvironment()) {
            console.log('Share to moment: Not in WeChat environment');
            this.showMockShare('朋友圈');
            return;
        }
        
        // @ts-ignore
        wx.showShareMenu({
            withShareTicket: true,
            showShareItems: ['wechatMoment']
        });
        
        // @ts-ignore
        wx.shareToWeChat({
            title: this.shareTitle,
            desc: this.shareDesc.replace('{score}', this.score.toString()),
            path: this.sharePagePath + '?score=' + this.score,
            imageUrl: this.shareImageUrl,
            success: () => {
                console.log('Share to moment successful');
                this.onShareSuccess();
            },
            fail: (err: any) => {
                console.error('Share to moment failed:', err);
            }
        });
    }
    
    /**
     * 分享成功回调
     */
    onShareSuccess() {
        // 给予分享奖励
        this.giveShareReward();
    }
    
    /**
     * 给予分享奖励
     */
    giveShareReward() {
        // 这里可以调用 GameManager 给予奖励
        console.log('Share reward: +10 金币');
        
        // 示例：增加金币
        const GameManager = require('./GameManager').GameManager;
        const gameManager = GameManager.getInstance();
        if (gameManager) {
            // 这里需要根据实际游戏设计来给予奖励
            console.log('Reward given');
        }
    }
    
    /**
     * 模拟分享（开发测试用）
     */
    showMockShare(target: string) {
        console.log(`[Mock Share] Shared to ${target}: ${this.shareTitle}`);
        console.log(`[Mock Share] Score: ${this.score}`);
        
        // 模拟分享成功
        setTimeout(() => {
            this.onShareSuccess();
        }, 1000);
    }
    
    /**
     * 检查是否通过分享进入
     */
    checkShareEntry(): any {
        if (!this.isWeChatEnvironment()) {
            return null;
        }
        
        // @ts-ignore
        const query = wx.getLaunchOptionsSync().query;
        if (query && query.score) {
            return {
                fromShare: true,
                score: parseInt(query.score)
            };
        }
        
        return null;
    }
    
    onDestroy() {
        WeChatShare.instance = null;
    }
}
