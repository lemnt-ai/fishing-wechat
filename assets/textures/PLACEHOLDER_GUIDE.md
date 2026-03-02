# 占位资源使用指南

## 🎯 目的

这些 JSON 文件是占位资源配置，用于在无法使用 canvas 包时快速创建测试资源。

## 📋 使用方法

### 方法 1：手动在 Cocos Creator 中创建

1. 打开 Cocos Creator
2. 在 Hierarchy 中创建空节点
3. 添加 Sprite 组件
4. 根据 JSON 文件中的配置设置：
   - Color（颜色）
   - Size（大小）
   - Type（Simple Sliced 或 Filled）

### 方法 2：使用 Cocos Creator 脚本批量创建

创建一个编辑器脚本，读取这些 JSON 文件并自动创建 Sprite。

### 方法 3：使用在线工具生成

1. 访问 https://placeholder.com/ 或类似网站
2. 输入尺寸和颜色
3. 下载 PNG 文件
4. 放入对应目录

## 🐟 鱼类资源配置

| 文件 | 颜色 (RGB) | 大小 | 说明 |
|------|-----------|------|------|
| fish_common_1.json | 160, 160, 160 | 80x50 | 小鲤鱼（灰色） |
| fish_common_2.json | 74, 144, 226 | 90x55 | 鲫鱼（蓝色） |
| fish_rare_1.json | 80, 200, 120 | 100x60 | 草鱼（绿色） |
| fish_rare_2.json | 155, 89, 182 | 110x65 | 鲤鱼王（紫色） |
| fish_epic.json | 255, 215, 0 | 120x70 | 金龙鱼（金色） |
| fish_legendary.json | 255, 0, 0 | 140x80 | 神秘鱼（红色占位） |

## 🎨 UI 资源配置

| 文件 | 颜色 (RGB) | 大小 | 说明 |
|------|-----------|------|------|
| hook.json | 128, 128, 128 | 40x40 | 鱼钩（灰色圆形） |
| line.json | 192, 192, 192 | 4x400 | 鱼线（细线） |
| button_normal.json | 76, 175, 80 | 300x80 | 按钮（绿色） |
| button_pressed.json | 69, 160, 73 | 300x80 | 按钮按下（深绿） |

## 🌊 背景资源配置

| 文件 | 渐变 | 大小 | 说明 |
|------|------|------|------|
| bg_water.json | 浅蓝→深蓝 | 720x600 | 水面背景 |
| bg_deep.json | 深蓝→藏蓝 | 720x680 | 深水背景 |

## ✨ 特效资源配置

| 文件 | 颜色 (RGBA) | 大小 | 说明 |
|------|------------|------|------|
| bubble_1.json | 255,255,255,153 | 20x20 | 小气泡 |
| bubble_2.json | 255,255,255,128 | 30x30 | 中气泡 |
| bubble_3.json | 255,255,255,102 | 40x40 | 大气泡 |
| sparkle.json | 255,215,0 | 32x32 | 金色闪光 |

## 🛠️ 快速创建示例

### 在 Cocos Creator 中创建鱼

1. 右键 Hierarchy → Create → 2D → Sprite
2. 命名为 "Fish_Common_1"
3. 在 Inspector 中：
   - SpriteFrame: 留空（或使用默认）
   - Color: RGB(160, 160, 160)
   - Width: 80
   - Height: 50

### 创建按钮

1. 右键 Hierarchy → Create → UI → Button
2. 在 Inspector 中：
   - Width: 300
   - Height: 80
   - Normal Color: RGB(76, 175, 80)
   - Pressed Color: RGB(69, 160, 73)

## 📝 注意事项

- 这些是占位配置，用于快速测试
- 正式版本建议使用精美的美术资源
- 可以使用 Photoshop、Aseprite 等工具绘制
- 或使用免费资源网站：OpenGameArt、Kenney、Itch.io

---

*生成时间：2026-03-02T03:27:38.274Z*
