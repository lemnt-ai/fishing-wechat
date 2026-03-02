# 微信小游戏适配指南

## 1. 项目配置

### 构建设置
1. 打开 Cocos Creator
2. 菜单 → 项目 → 构建发布
3. 选择平台：**WeChat Game**
4. 配置以下参数：
   - **包名**：com.yourcompany.fishing
   - **游戏名称**：欢乐钓鱼
   - **AppID**：（从微信公众平台获取）
   - **构建目录**：build/wechat

### 重要配置项
```json
{
  "orientation": "portrait",
  "deviceOrientation": "portrait",
  "resolutionPolicy": 4,
  "exactFit": true,
  "startSceneAssetBundle": false,
  "md5Cache": true,
  "embedWebDebugger": false,
  "debugBuild": false,
  "previewBuild": false,
  "useBuiltinAssets": false
}
```

## 2. 微信 SDK 集成

### 2.1 下载微信小游戏 SDK
- 访问：https://developers.weixin.qq.com/minigame/dev/guide/
- 下载最新版本的微信小游戏开发工具

### 2.2 配置 game.json
```json
{
  "deviceOrientation": "portrait",
  "showStatusBar": false,
  "networkTimeout": {
    "request": 5000,
    "connectSocket": 5000,
    "uploadFile": 5000,
    "downloadFile": 5000
  }
}
```

### 2.3 配置 project.config.json
```json
{
  "description": "欢乐钓鱼小游戏",
  "packOptions": {
    "ignore": []
  },
  "setting": {
    "urlCheck": true,
    "es6": true,
    "enhance": true,
    "postcss": true,
    "preloadBackgroundData": false,
    "minified": true,
    "newFeature": true,
    "coverView": true,
    "nodeModules": false,
    "autoAudits": false,
    "showShadowRootInWxmlPanel": true,
    "scopeDataCheck": false,
    "uglifyFileName": false,
    "checkInvalidKey": true,
    "checkSiteMap": true,
    "uploadWithSourceMap": true,
    "compileHotReLoad": false,
    "babelSetting": {
      "ignore": [],
      "disablePlugins": [],
      "outputPath": ""
    }
  },
  "appid": "你的 AppID",
  "projectname": "fishing-game",
  "libVersion": "2.19.4",
  "simulatorType": "wechat",
  "simulatorPluginLibVersion": {},
  "condition": {}
}
```

## 3. 微信功能集成

### 3.1 微信登录
```typescript
// assets/scripts/WeChatLogin.ts
import { _decorator, Component } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('WeChatLogin')
export class WeChatLogin extends Component {
    private userInfo: any = null;
    
    start() {
        this.login();
    }
    
    login() {
        if (typeof wx !== 'undefined') {
            wx.login({
                success: (res) => {
                    console.log('微信登录成功:', res.code);
                    // 将 code 发送到服务器换取 openid
                },
                fail: (err) => {
                    console.error('微信登录失败:', err);
                }
            });
            
            wx.getUserProfile({
                desc: '用于完善用户资料',
                success: (res) => {
                    this.userInfo = res.userInfo;
                    console.log('用户信息:', this.userInfo);
                }
            });
        }
    }
    
    getUserInfo() {
        return this.userInfo;
    }
}
```

### 3.2 分享功能
```typescript
// assets/scripts/WeChatShare.ts
import { _decorator, Component } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('WeChatShare')
export class WeChatShare extends Component {
    start() {
        if (typeof wx !== 'undefined') {
            wx.showShareMenu({
                withShareTicket: true,
                menus: ['shareAppMessage', 'shareTimeline']
            });
            
            wx.onShareAppMessage(() => {
                return {
                    title: '来和我一起钓鱼吧！',
                    imageUrl: 'share.jpg',
                    path: '/index.html'
                };
            });
            
            wx.onShareTimeline(() => {
                return {
                    title: '欢乐钓鱼 - 看谁钓的鱼最多！',
                    query: 'from=fishing',
                    imageUrl: 'share.jpg'
                };
            });
        }
    }
    
    shareToFriend() {
        if (typeof wx !== 'undefined') {
            wx.shareAppMessage({
                title: '来和我一起钓鱼吧！',
                imageUrl: 'share.jpg'
            });
        }
    }
}
```

### 3.3 排行榜
```typescript
// assets/scripts/Leaderboard.ts
import { _decorator, Component, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Leaderboard')
export class Leaderboard extends Component {
    @property(Label)
    public scoreLabel: Label = null!;
    
    private userScore: number = 0;
    
    updateScore(score: number) {
        this.userScore = score;
        this.scoreLabel.string = `得分：${score}`;
        
        // 提交到微信排行榜
        if (typeof wx !== 'undefined') {
            const openDataContext = wx.getOpenDataContext();
            openDataContext.postMessage({
                type: 'updateScore',
                score: score
            });
        }
    }
    
    openLeaderboard() {
        if (typeof wx !== 'undefined') {
            wx.openDataContext().postMessage({
                type: 'openLeaderboard'
            });
        }
    }
}
```

## 4. 性能优化

### 4.1 包体优化
- 主包限制：≤ 4MB
- 使用分包加载
- 压缩图片和音频资源
- 使用纹理图集

### 4.2 内存优化
```typescript
// 及时释放不用的资源
unloadUnusedAssets() {
    resources.releaseUnusedAssets();
}

// 对象池复用
import { NodePool } from 'cc';
private fishPool = new NodePool();
```

### 4.3 渲染优化
- 减少 DrawCall
- 使用合图
- 避免透明叠加
- 合理使用粒子系统

## 5. 发布流程

### 5.1 本地测试
1. 构建微信小游戏项目
2. 用微信开发者工具打开构建目录
3. 在真机上测试

### 5.2 提交审核
1. 登录微信公众平台
2. 上传代码
3. 填写版本信息
4. 提交审核

### 5.3 发布上线
- 审核通过后发布
- 配置服务器域名
- 设置游戏信息

## 6. 常见问题

### Q: 包体过大怎么办？
A: 使用分包加载，将资源分散到多个分包中

### Q: 如何调试？
A: 使用微信开发者工具的调试功能，配合 Cocos Creator 的浏览器调试

### Q: 真机性能差？
A: 降低画质、减少同屏物体数量、优化资源

## 7. 参考资源

- Cocos Creator 官方文档：https://docs.cocos.com/creator/3.8/
- 微信小游戏文档：https://developers.weixin.qq.com/minigame/dev/guide/
- Cocos 微信小游戏教程：https://forum.cocos.org/
