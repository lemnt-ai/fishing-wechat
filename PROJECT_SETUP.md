# Cocos Creator 项目设置指南

## 📁 当前项目状态

**项目名称**: 钓鱼微信小游戏 (fishing-wechat)  
**Cocos Creator 版本**: 3.8.0  
**项目类型**: 新建项目（需要导入到 Cocos Creator）

---

## 🚀 如何导入项目

### 方法 1：使用 Cocos Creator Dashboard（推荐）

1. **打开 Cocos Creator Dashboard**
   ```bash
   # macOS
   open /Applications/Cocos\ Creator.app
   
   # Windows
   # 双击 Cocos Creator 快捷方式
   ```

2. **添加项目**
   - 点击 **"添加项目"** 或 **"+"** 按钮
   - 选择项目目录：`/Users/wangxx/nanobot/workspace/games/fishing-wechat`
   - 点击 **"打开"**

3. **等待项目初始化**
   - Cocos Creator 会自动检测 `project.json`
   - 下载必要的依赖包
   - 编译 TypeScript 脚本
   - 导入所有资源

4. **打开场景**
   - 在资源管理器中双击 `assets/scenes/game.scene`
   - 开始编辑场景

---

### 方法 2：直接从 Cocos Creator 打开

1. **启动 Cocos Creator**
2. **文件 → 打开项目**
3. **选择目录**: `/Users/wangxx/nanobot/workspace/games/fishing-wechat`
4. **点击"打开"**

---

## 📂 项目结构

```
fishing-wechat/
├── assets/                    # 资源目录
│   ├── audio/
│   │   └── sfx/              # 音效文件
│   ├── scenes/               # 场景文件 ⭐
│   │   └── game.scene        # 主游戏场景
│   ├── scripts/              # TypeScript 脚本
│   │   ├── GameManager.ts
│   │   ├── FishManager.ts
│   │   ├── HookController.ts
│   │   └── ... (其他脚本)
│   └── textures/             # 纹理资源
│       ├── background/
│       ├── effects/
│       ├── fish/
│       └── ui/
├── editor/                    # 编辑器扩展
├── settings/                  # 项目设置
│   └── v2/
│       └── packages/
│           └── project.json  # 编辑器配置
├── tools/                     # 开发工具
│   ├── generate-assets.js    # 资源生成脚本
│   ├── generate-meta-files.js # 元数据生成脚本
│   └── ...
├── project.json              # 项目配置文件 ⭐
├── tsconfig.json             # TypeScript 配置
└── README.md                 # 项目说明
```

---

## ⚠️ 解决"导入包含无效文件"错误

### 原因
Cocos Creator 在导入项目时会检查所有文件。某些文件（如 `.DS_Store`、临时文件）会被标记为无效。

### 解决方案

#### 1. 清理无效文件
```bash
cd /Users/wangxx/nanobot/workspace/games/fishing-wechat

# 删除 macOS 系统文件
find . -name ".DS_Store" -type f -delete

# 删除其他临时文件
find . -name "Thumbs.db" -type f -delete
find . -name "*.tmp" -type f -delete
```

#### 2. 刷新项目
- 在 Cocos Creator 中右键点击 `assets` 文件夹
- 选择 **"刷新"** 或按 `F5`

#### 3. 重新导入
如果问题仍然存在：
1. 关闭 Cocos Creator
2. 删除 `library/` 和 `temp/` 目录（如果存在）
3. 重新打开项目

---

## 🔧 项目配置说明

### project.json
```json
{
  "engine": "cocos-creator-js",
  "version": "3.8.0",
  "name": "fishing-wechat",
  "displayName": "钓鱼微信小游戏",
  "startScene": "assets/scenes/game.scene"
}
```

**关键字段**:
- `version`: Cocos Creator 版本（必须匹配）
- `startScene`: 启动场景路径
- `name`: 项目标识符

### tsconfig.json
TypeScript 编译配置，Cocos Creator 会自动生成完整配置。

### settings/v2/packages/project.json
编辑器设置，包括：
- 设计分辨率（750x1334，适配手机屏幕）
- TypeScript 编译选项
- 调试模式设置

---

## 🎯 首次打开项目后的步骤

### 1. 等待资源导入完成
- 查看底部状态栏的进度条
- 确保所有资源显示正常（无红色警告）

### 2. 检查资源
在资源管理器中确认：
- ✅ `assets/textures/fish/` - 6 种鱼类
- ✅ `assets/textures/ui/` - UI 元素
- ✅ `assets/audio/sfx/` - 5 个音效
- ✅ `assets/scripts/` - 所有脚本

### 3. 打开场景
双击 `assets/scenes/game.scene`

### 4. 创建游戏对象
按照 `SCENE_SETUP_GUIDE.md` 搭建场景：
1. 创建 Canvas
2. 添加背景
3. 创建鱼钩系统
4. 添加 UI 界面
5. 绑定脚本

### 5. 运行测试
点击编辑器顶部的 **▶️ 播放** 按钮

---

## 🐛 常见问题

### Q1: 提示"找不到项目配置文件"
**A**: 确保 `project.json` 在项目根目录

### Q2: TypeScript 脚本报错
**A**: 
1. 等待 TypeScript 编译完成
2. 检查 `tsconfig.json` 配置
3. 重启 Cocos Creator

### Q3: 资源显示为灰色
**A**: 
1. 等待资源导入完成
2. 右键点击资源 → 刷新
3. 检查 `.meta` 文件是否存在

### Q4: 场景打开后是空的
**A**: 
1. 确保 `game.scene` 文件存在
2. 检查场景文件是否有 `.meta`
3. 重新创建场景（见 SCENE_SETUP_GUIDE.md）

### Q5: 预览时黑屏
**A**: 
1. 检查 Canvas 组件
2. 确认相机存在并正确配置
3. 检查脚本是否有错误

---

## 📝 下一步

1. **打开 Cocos Creator**
2. **导入项目**（选择本目录）
3. **等待初始化完成**
4. **打开场景** `assets/scenes/game.scene`
5. **按照 SCENE_SETUP_GUIDE.md 搭建场景**
6. **运行游戏测试**！

---

## 📚 相关文档

- `README.md` - 项目概述
- `QUICK_START.md` - 快速开始
- `SCENE_SETUP_GUIDE.md` - 场景搭建指南
- `DEVELOPMENT_PLAN.md` - 开发计划
- `GAME_MECHANICS.md` - 游戏机制
- `ASSETS_IMPORT_GUIDE.md` - 资源导入指南
- `dev-checklist.md` - 开发检查清单

---

**提示**: 如果是第一次使用 Cocos Creator，建议先阅读官方文档熟悉界面和基本操作。

**项目已准备好，可以导入了！** 🎣✨
