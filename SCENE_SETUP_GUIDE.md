# 场景搭建指南

## 🎮 创建主场景

### 1. 创建场景文件
1. 在 Cocos Creator 中，右键 `assets` → `Create` → `Scene`
2. 命名为 `MainScene`
3. 双击打开场景

### 2. 设置画布
1. 在层级管理器中，右键 → `Create` → `2D` → `Canvas`
2. 设置 Canvas 属性：
   - Design Resolution: 720 x 1280 (竖屏)
   - Fit Width: ✓
   - Fit Height: ✓

### 3. 创建背景
1. 右键 Canvas → `Create` → `2D` → `Sprite`
2. 命名为 `Background`
3. 设置位置：(0, 0, 0)
4. 设置大小：720 x 1280
5. 稍后添加背景图片（水面、水底）

### 4. 创建游戏管理器节点
1. 右键 Canvas → `Create` → `Empty`
2. 命名为 `GameManager`
3. 添加组件：
   - `GameManager` 脚本
   - `HookController` 脚本
   - `FishManager` 脚本
   - `AudioManager` 脚本
   - `WeChatLogin` 脚本
   - `WeChatShare` 脚本
   - `Leaderboard` 脚本
   - `AchievementManager` 脚本

### 5. 创建 UI 层
1. 右键 Canvas → `Create` → `2D` → `Sprite` → `Sprite Frame`
2. 命名为 `UI_Root`
3. 添加 `Widget` 组件，设置为全屏

---

## 🎨 创建 UI 界面

### 主菜单界面 (MainMenu)

#### 结构
```
UI_Root
└── MainMenu
    ├── Title (Label) - "欢乐钓鱼"
    ├── StartButton (Button) - "开始钓鱼"
    ├── ShopButton (Button) - "商店"
    ├── LeaderboardButton (Button) - "排行榜"
    └── AchievementLabel (Label) - "成就：0/8"
```

#### 设置步骤
1. 创建空节点 `MainMenu`，添加 Widget 组件
2. 创建 Title Label：
   - 字体大小：80
   - 颜色：白色
   - 位置：(0, 400, 0)
3. 创建三个按钮（StartButton, ShopButton, LeaderboardButton）：
   - 大小：300 x 80
   - 间距：120
   - 位置：从 (0, 100, 0) 开始向下排列
4. 创建 AchievementLabel：
   - 字体大小：32
   - 位置：(0, -500, 0)

#### 按钮事件绑定
- StartButton → GameManager.startGame()
- ShopButton → GameManager.showShop()
- LeaderboardButton → Leaderboard.showLeaderboard()

---

### 游戏界面 (GameUI)

#### 结构
```
UI_Root
└── GameUI
    ├── ScoreLabel (Label) - "得分：0"
    ├── LevelLabel (Label) - "关卡：1"
    ├── TimeLabel (Label) - "时间：60s"
    └── ShopButton (Button) - "商店"
```

#### 设置步骤
1. 创建空节点 `GameUI`，添加 Widget 组件
2. 创建三个 Label（顶部横向排列）：
   - ScoreLabel：位置 (-300, 580, 0)
   - LevelLabel：位置 (0, 580, 0)
   - TimeLabel：位置 (300, 580, 0)
   - 字体大小：40
3. 创建 ShopButton：
   - 大小：200 x 60
   - 位置：(300, -580, 0)
   - 事件：GameManager.showShop()

---

### 游戏结束界面 (GameOverPanel)

#### 结构
```
UI_Root
└── GameOverPanel
    ├── Panel (Sprite) - 半透明背景
    ├── Title (Label) - "游戏结束"
    ├── FinalScoreLabel (Label) - "最终得分：0"
    ├── RestartButton (Button) - "再来一次"
    └── HomeButton (Button) - "返回主页"
```

#### 设置步骤
1. 创建空节点 `GameOverPanel`，添加 Widget 组件（全屏）
2. 创建 Panel Sprite：
   - 大小：600 x 800
   - 颜色：黑色，透明度 200
3. 创建 Title Label：
   - 字体大小：60
   - 位置：(0, 200, 0)
4. 创建 FinalScoreLabel：
   - 字体大小：48
   - 位置：(0, 100, 0)
5. 创建两个按钮（RestartButton, HomeButton）：
   - 大小：300 x 80
   - 间距：100
   - 位置：从 (0, -100, 0) 开始向下排列

---

### 商店界面 (ShopPanel)

#### 结构
```
UI_Root
└── ShopPanel
    ├── Panel (Sprite) - 半透明背景
    ├── Title (Label) - "商店"
    ├── PlayerScoreLabel (Label) - "当前金币：0"
    ├── RodItem
    │   ├── Icon (Sprite)
    │   ├── LevelLabel (Label) - "Lv.1"
    │   ├── CostLabel (Label) - "50 金币"
    │   └── BuyButton (Button) - "购买"
    ├── LineItem (同上)
    ├── BaitItem (同上)
    └── CloseButton (Button) - "关闭"
```

#### 设置步骤
1. 创建空节点 `ShopPanel`，添加 Widget 组件（全屏）
2. 创建 Panel Sprite：
   - 大小：650 x 900
   - 颜色：黑色，透明度 200
3. 创建 Title Label：
   - 字体大小：50
   - 位置：(0, 380, 0)
4. 创建 PlayerScoreLabel：
   - 字体大小：36
   - 位置：(0, 300, 0)
5. 创建三个装备物品（RodItem, LineItem, BaitItem）：
   - 每个物品高度：150
   - 从 (0, 150, 0) 开始向下排列，间距 160
6. 每个物品内部结构：
   - Icon：左侧，大小 100 x 100
   - LevelLabel：中间上方
   - CostLabel：中间下方
   - BuyButton：右侧，大小 200 x 60
7. 创建 CloseButton：
   - 大小：200 x 60
   - 位置：(0, -380, 0)

#### 绑定 ShopManager 组件
1. 在 ShopPanel 节点添加 `ShopManager` 脚本
2. 拖拽对应的 Label 和 Button 到脚本属性

---

### 排行榜界面 (LeaderboardPanel)

#### 结构
```
UI_Root
└── LeaderboardPanel
    ├── Panel (Sprite) - 半透明背景
    ├── Title (Label) - "排行榜"
    ├── FriendRankLabel (Label) - "好友排名"
    ├── WorldRankLabel (Label) - "世界排名"
    └── CloseButton (Button) - "关闭"
```

#### 设置步骤
1. 创建空节点 `LeaderboardPanel`，添加 Widget 组件（全屏）
2. 创建 Panel Sprite：
   - 大小：650 x 900
   - 颜色：黑色，透明度 200
3. 创建 Title Label：
   - 字体大小：50
   - 位置：(0, 380, 0)
4. 创建两个 Label：
   - FriendRankLabel：位置 (-250, 100, 0)，字体大小 28
   - WorldRankLabel：位置 (250, 100, 0)，字体大小 28
5. 创建 CloseButton：
   - 大小：200 x 60
   - 位置：(0, -380, 0)

#### 绑定 Leaderboard 组件
1. 在 LeaderboardPanel 节点添加 `Leaderboard` 脚本
2. 拖拽对应的 Label 到脚本属性

---

## 🎣 创建鱼钩节点

### 结构
```
GameManager
└── Hook
    ├── HookSprite (Sprite) - 鱼钩图片
    └── LineSprite (Sprite) - 鱼线图片
```

### 设置步骤
1. 在 GameManager 下创建空节点 `Hook`
2. 创建 HookSprite：
   - 位置：(0, 0, 0)
   - 大小：40 x 40
3. 创建 LineSprite（可选，用于显示鱼线）：
   - 位置：(0, 200, 0)
   - 大小：4 x 400
4. 添加 Collider 组件到 HookSprite：
   - Type: Circle
   - Radius: 20

---

## 🐟 创建鱼类预制体

### 步骤
1. 右键 `assets` → `Create` → `Prefab`
2. 创建 6 个预制体，分别命名为：
   - Fish_Common_1 (小鲤鱼)
   - Fish_Common_2 (鲫鱼)
   - Fish_Rare_1 (草鱼)
   - Fish_Rare_2 (鲤鱼王)
   - Fish_Epic (金龙鱼)
   - Fish_Legendary (神秘鱼)

### 每个预制体结构
```
Fish_XXX
├── FishSprite (Sprite) - 鱼图片
└── Collider (Circle Collider) - 碰撞体
```

### 设置步骤
1. 创建空节点作为根节点
2. 添加 FishSprite：
   - 大小：80 x 50（根据鱼的种类调整）
3. 添加 Circle Collider：
   - Radius: 40
4. 添加 `FishData` 组件（自动从 FishManager 脚本中识别）
5. 保存为预制体

### 预制体配置
| 预制体 | 颜色（临时） | 大小 | 基础速度 |
|--------|-------------|------|---------|
| Fish_Common_1 | 灰色 | 60x40 | 50 |
| Fish_Common_2 | 蓝色 | 70x45 | 60 |
| Fish_Rare_1 | 绿色 | 80x50 | 70 |
| Fish_Rare_2 | 紫色 | 90x55 | 80 |
| Fish_Epic | 金色 | 100x60 | 100 |
| Fish_Legendary | 彩虹色 | 120x70 | 120 |

---

## 🔗 绑定引用

### GameManager 节点绑定
1. 选择 `GameManager` 节点
2. 在 Inspector 中绑定以下属性：

#### GameManager 组件
- Score Label → UI_Root/GameUI/ScoreLabel
- Level Label → UI_Root/GameUI/LevelLabel
- Time Label → UI_Root/GameUI/TimeLabel
- Game Over Panel → UI_Root/GameOverPanel
- Final Score Label → UI_Root/GameOverPanel/FinalScoreLabel
- Restart Button → UI_Root/GameOverPanel/RestartButton
- Home Button → UI_Root/GameOverPanel/HomeButton
- Main Menu → UI_Root/MainMenu
- Game UI → UI_Root/GameUI
- Shop Panel → UI_Root/ShopPanel

#### FishManager 组件
- Fish Prefabs → 拖入 6 个鱼类预制体

#### HookController 组件
- 无需额外绑定（已配置默认值）

---

## ✅ 检查清单

- [ ] Canvas 创建并设置正确分辨率
- [ ] 背景节点创建
- [ ] GameManager 节点创建并添加所有脚本
- [ ] 主菜单 UI 创建并绑定事件
- [ ] 游戏界面 UI 创建
- [ ] 游戏结束界面创建并绑定事件
- [ ] 商店界面创建并绑定 ShopManager
- [ ] 排行榜界面创建并绑定 Leaderboard
- [ ] 鱼钩节点创建并添加碰撞体
- [ ] 6 种鱼类预制体创建
- [ ] FishManager 绑定鱼类预制体
- [ ] 所有 UI Label 绑定到 GameManager
- [ ] 所有按钮事件绑定正确

---

## 🎯 下一步

1. **添加美术资源**：替换临时色块为正式图片
2. **添加音效资源**：导入背景音乐和音效文件
3. **测试游戏**：在 Cocos Creator 中运行测试
4. **微信适配**：按照 wechat-integration.md 配置微信小游戏
5. **构建发布**：构建微信小游戏包并上传

---

*最后更新：2026-03-02*
