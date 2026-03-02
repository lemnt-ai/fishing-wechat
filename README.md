# 钓鱼微信小游戏 - Cocos Creator 开发

[![Status](https://img.shields.io/badge/status-core%20complete-brightgreen)]()
[![Cocos](https://img.shields.io/badge/Cocos%20Creator-3.8+-blue)]()
[![Platform](https://img.shields.io/badge/platform-WeChat%20Game-lightgrey)]()

## 🎮 项目概述

一款休闲钓鱼微信小游戏，使用 Cocos Creator 3.x 开发。

**核心特色**：
- 🎣 简单易上手的钓鱼玩法
- 🐟 6 种不同稀有度的鱼类
- 🏪 装备升级系统
- 🏆 成就和排行榜
- 📱 微信社交分享
- 💾 本地数据保存

**开发状态**：核心功能已完成，待添加美术资源

---

## ✨ 游戏特性

### 核心玩法
- 点击屏幕下放鱼钩
- 自动碰撞检测和捕获
- 60 秒限时挑战
- 分数和关卡系统

### 鱼类系统
| 鱼类 | 分值 | 稀有度 | 特点 |
|------|------|--------|------|
| 小鲤鱼 | 10 | ⭐ | 最常见 |
| 鲫鱼 | 20 | ⭐⭐ | 较常见 |
| 草鱼 | 30 | ⭐⭐ | 中等 |
| 鲤鱼王 | 50 | ⭐⭐⭐ | 较稀有 |
| 金龙鱼 | 100 | ⭐⭐⭐⭐ | 稀有 |
| 神秘鱼 | 200 | ⭐⭐⭐⭐⭐ | 最稀有 |

### 装备系统
- **鱼竿**：提升鱼钩速度
- **鱼线**：增加最大深度
- **鱼饵**：提高稀有鱼概率 + 得分加成

### 成就系统
8 个成就等待解锁：
- 🏆 初次钓鱼
- 🏆 钓鱼新手（10 条）
- 🏆 钓鱼达人（50 条）
- 🏆 钓鱼大师（100 条）
- 🏆 小有所成（500 分）
- 🏆 高分高手（1000 分）
- 🏆 稀有收获
- 🏆 装备大师

### 微信功能
- ✅ 微信登录
- ✅ 好友分享
- ✅ 朋友圈分享
- ✅ 微信排行榜
- ✅ 分享奖励

---

## 📁 项目结构

```
fishing-wechat/
├── README.md                    # 项目说明（本文件）
├── QUICK_START.md               # 快速开始指南
├── DEVELOPMENT_PLAN.md          # 开发计划
├── SCENE_SETUP_GUIDE.md         # 场景搭建指南
├── dev-checklist.md             # 开发清单
├── wechat-integration.md        # 微信集成指南
├── assets/
│   ├── scripts/
│   │   ├── HookController.ts    # 鱼钩控制（触摸、碰撞）
│   │   ├── FishManager.ts       # 鱼类管理（生成、AI）
│   │   ├── GameManager.ts       # 游戏管理（状态、UI）
│   │   ├── WeChatLogin.ts       # 微信登录
│   │   ├── WeChatShare.ts       # 微信分享
│   │   ├── Leaderboard.ts       # 排行榜
│   │   ├── AudioManager.ts      # 音效管理
│   │   ├── ShopManager.ts       # 商店系统
│   │   └── AchievementManager.ts # 成就系统
│   ├── textures/                # 图片资源（待添加）
│   ├── audio/                   # 音效资源（待添加）
│   └── prefabs/                 # 预制体（待创建）
└── settings/                    # 项目配置
```

---

## 🚀 快速开始

### 1. 环境要求
- Cocos Creator 3.8+
- 微信开发者工具（发布用）

### 2. 运行步骤
```bash
# 1. 在 Cocos Creator 中打开项目
# 2. 按照 SCENE_SETUP_GUIDE.md 搭建场景
# 3. 点击运行按钮
# 4. 开始游戏！
```

详细步骤请查看 [QUICK_START.md](QUICK_START.md)

---

## 🎯 开发进度

### ✅ 已完成（核心功能 100%）
- [x] 鱼钩控制系统（触摸、下放、回收、碰撞）
- [x] 鱼类管理系统（生成、波浪 AI、稀有度）
- [x] 游戏管理系统（状态、计分、关卡、时间）
- [x] 微信登录集成
- [x] 微信分享功能
- [x] 微信排行榜
- [x] 音效管理系统
- [x] 商店系统（装备购买升级）
- [x] 成就系统（8 个成就）
- [x] 本地数据存储

### ⏳ 待完成
- [ ] 美术资源替换（鱼类、背景、UI）
- [ ] 音效资源导入
- [ ] 场景搭建（参考场景搭建指南）
- [ ] 特效添加（水波、气泡）
- [ ] 性能优化
- [ ] 真机测试
- [ ] 微信审核提交

---

## 🛠️ 技术栈

- **游戏引擎**：Cocos Creator 3.8+
- **编程语言**：TypeScript
- **目标平台**：微信小游戏
- **版本控制**：Git

---

## 📚 文档索引

| 文档 | 说明 |
|------|------|
| [QUICK_START.md](QUICK_START.md) | 5 分钟快速上手指南 |
| [SCENE_SETUP_GUIDE.md](SCENE_SETUP_GUIDE.md) | 场景搭建详细步骤 |
| [DEVELOPMENT_PLAN.md](DEVELOPMENT_PLAN.md) | 开发计划和进度 |
| [dev-checklist.md](dev-checklist.md) | 开发任务清单 |
| [wechat-integration.md](wechat-integration.md) | 微信小游戏配置 |

---

## 💡 游戏技巧

### 钓鱼策略
1. **初期**：快速捕获普通鱼积累分数
2. **中期**：升级鱼饵提高稀有鱼概率
3. **后期**：升级鱼竿和鱼线挑战深海鱼

### 高分技巧
- 优先升级鱼饵（得分加成）
- 耐心等待稀有鱼
- 掌握鱼钩下放时机
- 连击奖励（连续捕获）

---

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

## 📄 许可证

MIT License

---

## 📞 联系方式

- 问题反馈：提交 Issue
- 合作交流：微信搜索"欢乐钓鱼"

---

**最后更新**：2026-03-02  
**开发状态**：核心功能完成 🎉配微信登录和用户信息
3. 集成微信分享功能
4. 注意包体大小限制（主包≤4MB）

## 开发步骤
1. 创建 Cocos Creator 项目
2. 实现核心钓鱼机制
3. 添加鱼类和分值系统
4. 制作 UI 界面
5. 集成微信 SDK
6. 测试和发布

## 技术栈
- Cocos Creator 3.8+
- TypeScript
- 微信小游戏 SDK
