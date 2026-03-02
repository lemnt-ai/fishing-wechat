# 占位资源快速创建指南

## 🎯 问题说明

由于系统缺少 `canvas` 包的系统依赖（cairo、pango 等），无法直接运行 `generate-assets.js` 生成 PNG 图片。

## ✅ 解决方案

我们提供了**三种替代方案**来创建占位资源：

---

## 方案 1：使用 PlaceholderCreator 脚本（推荐 ⭐）

### 步骤

1. **在 Cocos Creator 中打开项目**

2. **创建空节点**
   - 在 Hierarchy 中右键 → Create → Empty
   - 命名为 "PlaceholderCreator"

3. **添加脚本**
   - 将 `assets/scripts/PlaceholderCreator.ts` 拖到节点上
   - 或点击 Add Component → TypeScript → PlaceholderCreator

4. **运行游戏**
   - 点击 Play 按钮
   - 脚本会自动创建所有占位 Sprite

### 效果

脚本会创建以下节点：

#### 🐟 鱼类（6 个）
- fish_common_1（灰色，80x50）
- fish_common_2（蓝色，90x55）
- fish_rare_1（绿色，100x60）
- fish_rare_2（紫色，110x65）
- fish_epic（金色，120x70）
- fish_legendary（红色，140x80）

#### 🎨 UI 元素（4 个）
- hook（灰色圆形，40x40）
- line（灰色细线，4x400）
- button_normal（绿色，300x80）
- button_pressed（深绿色，300x80）

#### 🌊 背景（2 个）
- bg_water（浅蓝色，720x600）
- bg_deep（深蓝色，720x680）

#### ✨ 特效（4 个）
- bubble_1（半透明白色，20x20）
- bubble_2（半透明白色，30x30）
- bubble_3（半透明白色，40x40）
- sparkle（金色，32x32）

**总计：16 个节点**

### 优点
- ✅ 无需外部依赖
- ✅ 一键创建
- ✅ 可直接在场景中查看
- ✅ 方便测试

### 缺点
- ⚠️ 是纯色 Sprite，不是精美图片
- ⚠️ 需要在 Cocos Creator 中运行

---

## 方案 2：使用配置文件手动创建

### 步骤

1. **运行配置生成脚本**（已完成）
   ```bash
   cd tools
   node create-placeholders.js
   ```

2. **查看生成的配置**
   - 位置：`assets/textures/PLACEHOLDER_GUIDE.md`
   - 包含所有资源的详细配置

3. **在 Cocos Creator 中手动创建**
   - 创建 Sprite 节点
   - 根据 JSON 配置设置颜色和大小

### 生成的配置文件

```
assets/textures/
├── fish/
│   ├── fish_common_1.json
│   ├── fish_common_2.json
│   └── ...
├── ui/
│   ├── hook.json
│   └── ...
├── background/
│   └── ...
├── effects/
│   └── ...
└── PLACEHOLDER_GUIDE.md
```

### 优点
- ✅ 完全控制
- ✅ 了解每个资源的细节
- ✅ 适合学习

### 缺点
- ⚠️ 需要手动操作
- ⚠️ 耗时

---

## 方案 3：安装 canvas 依赖后生成 PNG

### 步骤

1. **安装系统依赖**
   ```bash
   # macOS
   brew install pkg-config cairo pango libpng jpeg giflib librsvg
   
   # Ubuntu/Debian
   sudo apt-get install libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
   ```

2. **安装 npm 包**
   ```bash
   cd tools
   npm install
   ```

3. **生成资源**
   ```bash
   npm run generate:assets
   ```

### 优点
- ✅ 生成真正的 PNG 文件
- ✅ 可以在任何地方使用
- ✅ 文件可以分享

### 缺点
- ⚠️ 需要安装系统依赖
- ⚠️ 可能遇到兼容性问题

---

## 🎨 在 Cocos Creator 中使用占位资源

### 创建鱼类预制体

1. **在 Hierarchy 中找到创建的鱼节点**
   - 运行 PlaceholderCreator 后会出现

2. **添加必要组件**
   ```
   - Sprite（已有）
   - Circle Collider（添加）
   - FishData（添加）
   ```

3. **配置 FishData**
   ```typescript
   score: 10  // 根据鱼的类型设置
   speed: 50
   rarity: 1  // 1-6
   ```

4. **保存为预制体**
   - 右键节点 → Create → Prefab
   - 保存到 `assets/prefabs/fish/`

### 创建 UI 预制体

1. **按钮**
   - 使用创建的 button_normal 和 button_pressed
   - 添加 Button 组件
   - 设置 SpriteFrame

2. **鱼钩**
   - 使用创建的 hook 节点
   - 添加到 HookController 管理

### 设置背景

1. **选择 bg_water 或 bg_deep**
2. **设置为 UI 的子节点**
3. **调整位置到最底层**

---

## 📋 快速测试流程

### 5 分钟快速开始

```
1. 打开 Cocos Creator ✓
2. 创建空节点 "PlaceholderCreator" ✓
3. 添加 PlaceholderCreator.ts 脚本 ✓
4. 点击 Play ✓
5. 查看 Hierarchy 中创建的 16 个节点 ✓
6. 选择需要的节点保存为预制体 ✓
7. 开始搭建场景 ✓
```

### 30 分钟完整设置

```
1. 运行 PlaceholderCreator ✓
2. 创建所有鱼类预制体（6 个）✓
3. 创建 UI 预制体（按钮、鱼钩）✓
4. 设置背景 ✓
5. 配置 GameManager ✓
6. 配置 FishManager ✓
7. 运行游戏测试 ✓
```

---

## 🎯 推荐方案

### 用于快速测试
**方案 1：PlaceholderCreator 脚本**
- 最快
- 最简单
- 无需额外工具

### 用于正式开发
**方案 3：生成 PNG + 精美资源替换**
- 先生成占位 PNG
- 测试游戏机制
- 后期替换为精美资源

### 用于学习理解
**方案 2：手动创建**
- 深入了解每个资源
- 完全控制
- 适合新手

---

## 📞 问题排查

### 问题：PlaceholderCreator 没有创建节点
**解决**：
1. 检查 `createOnStart` 是否为 true
2. 检查 Console 是否有错误
3. 手动调用 `createAllPlaceholders()` 方法

### 问题：节点创建了但看不到
**解决**：
1. 检查 Camera 设置
2. 检查节点位置是否在屏幕内
3. 检查 Sprite 的 Color 透明度

### 问题：想要自定义颜色
**解决**：
编辑 `PlaceholderCreator.ts` 中的颜色配置：
```typescript
{ name: 'fish_common_1', color: new Color(160, 160, 160), ... }
```

---

## 🎨 后续优化

### 短期（测试阶段）
- ✅ 使用 PlaceholderCreator 快速创建
- ✅ 测试游戏机制
- ✅ 调整数值平衡

### 中期（开发阶段）
- ⏳ 生成 PNG 资源
- ⏳ 创建精美预制体
- ⏳ 添加粒子特效

### 长期（发布阶段）
- ⏳ 替换为专业美术资源
- ⏳ 优化性能
- ⏳ 添加更多动画

---

## 📚 相关文档

- `PLACEHOLDER_GUIDE.md` - 占位资源配置详情
- `ASSETS_GENERATION.md` - 完整资源生成指南
- `SCENE_SETUP_GUIDE.md` - 场景搭建指南
- `QUICK_START.md` - 快速开始

---

*最后更新：2026-03-02*
