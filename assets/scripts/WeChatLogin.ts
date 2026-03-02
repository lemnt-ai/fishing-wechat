import { _decorator, Component, Node, sys } from 'cc';
const { ccclass, property } = _decorator;

/**
 * 微信登录管理器
 * 处理微信授权登录和用户信息获取
 */
@ccclass('WeChatLogin')
export class WeChatLogin extends Component {
    private isLogged: boolean = false;
    private userInfo: any = null;
    private openId: string = '';
    private sessionKey: string = '';
    
    // 单例
    private static instance: WeChatLogin | null = null;
    public static getInstance(): WeChatLogin | null {
        return WeChatLogin.instance;
    }
    
    onLoad() {
        WeChatLogin.instance = this;
    }
    
    start() {
        // 检查是否在微信环境
        if (!this.isWeChatEnvironment()) {
            console.log('Not in WeChat environment, using mock login');
            this.mockLogin();
            return;
        }
        
        // 自动登录
        this.autoLogin();
    }
    
    /**
     * 检查是否在微信环境
     */
    isWeChatEnvironment(): boolean {
        // @ts-ignore
        return typeof wx !== 'undefined';
    }
    
    /**
     * 模拟登录（用于开发测试）
     */
    mockLogin() {
        this.isLogged = true;
        this.userInfo = {
            nickName: '测试玩家',
            avatarUrl: '',
            gender: 0,
            city: '北京',
            province: '北京',
            country: '中国'
        };
        this.openId = 'mock_openid_' + Date.now();
        console.log('Mock login successful');
    }
    
    /**
     * 自动登录
     */
    async autoLogin() {
        if (!this.isWeChatEnvironment()) {
            return;
        }
        
        try {
            // 微信静默登录
            const loginResult = await this.wxLogin();
            const code = loginResult.code;
            
            // 发送 code 到后端，获取 openid 和 session_key
            // 这里需要配合后端服务器
            const sessionData = await this.getServerSession(code);
            
            if (sessionData) {
                this.openId = sessionData.openid;
                this.sessionKey = sessionData.session_key;
                this.isLogged = true;
                
                // 获取用户信息
                await this.getUserProfile();
                
                console.log('Auto login successful');
            }
        } catch (error) {
            console.error('Auto login failed:', error);
            // 登录失败，需要用户手动授权
        }
    }
    
    /**
     * 微信登录获取 code
     */
    wxLogin(): Promise<any> {
        return new Promise((resolve, reject) => {
            // @ts-ignore
            wx.login({
                success: (res: any) => {
                    if (res.code) {
                        resolve(res);
                    } else {
                        reject(new Error('Login failed: ' + res.errMsg));
                    }
                },
                fail: (err: any) => {
                    reject(err);
                }
            });
        });
    }
    
    /**
     * 获取后端 session
     */
    async getServerSession(code: string): Promise<any> {
        // 这里需要替换成实际的后端服务器地址
        const url = 'https://your-server.com/api/login';
        
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ code })
            });
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Get server session failed:', error);
            return null;
        }
    }
    
    /**
     * 获取用户信息（需要用户授权）
     */
    async getUserProfile() {
        if (!this.isWeChatEnvironment()) {
            return;
        }
        
        try {
            // 微信 2021 年 4 月后需要使用 getUserProfile
            // @ts-ignore
            const userInfoResult = await wx.getUserProfile({
                desc: '用于完善用户资料',
                lang: 'zh_CN'
            });
            
            this.userInfo = userInfoResult.userInfo;
            console.log('User profile obtained:', this.userInfo);
        } catch (error) {
            console.error('Get user profile failed:', error);
            // 用户拒绝授权
        }
    }
    
    /**
     * 手动登录按钮回调
     */
    onLoginButtonClicked() {
        if (this.isLogged) {
            console.log('Already logged in');
            return;
        }
        
        if (!this.isWeChatEnvironment()) {
            this.mockLogin();
            return;
        }
        
        this.getUserProfile();
    }
    
    /**
     * 检查登录状态
     */
    checkLoginStatus(): boolean {
        return this.isLogged;
    }
    
    /**
     * 获取用户信息
     */
    getUserInfo(): any {
        return this.userInfo;
    }
    
    /**
     * 获取 OpenID
     */
    getOpenId(): string {
        return this.openId;
    }
    
    /**
     * 退出登录
     */
    logout() {
        this.isLogged = false;
        this.userInfo = null;
        this.openId = '';
        this.sessionKey = '';
        console.log('Logged out');
    }
    
    onDestroy() {
        WeChatLogin.instance = null;
    }
}
