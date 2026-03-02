#!/usr/bin/env node

/**
 * 生成简单的占位资源清单文件
 * 不依赖 canvas，直接创建配置文件供 Cocos Creator 使用
 * 
 * 使用方法：
 * node tools/create-placeholders.js
 */

const fs = require('fs');
const path = require('path');

// 输出目录
const OUTPUT_BASE = path.join(__dirname, '../assets/textures');
const FISH_DIR = path.join(OUTPUT_BASE, 'fish');
const UI_DIR = path.join(OUTPUT_BASE, 'ui');
const BG_DIR = path.join(OUTPUT_BASE, 'background');
const EFFECTS_DIR = path.join(OUTPUT_BASE, 'effects');

// 创建目录
function ensureDir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`📁 Created: ${dir}`);
    }
}

// 创建占位说明文件
function createPlaceholderInfo(dir, filename, info) {
    const filepath = path.join(dir, filename);
    fs.writeFileSync(filepath, JSON.stringify(info, null, 2));
    console.log(`📝 Created: ${filename}`);
}

// 主函数
function main() {
    console.log('🎨 Creating placeholder resource configuration...\n');
    
    // 创建目录
    ensureDir(OUTPUT_BASE);
    ensureDir(FISH_DIR);
    ensureDir(UI_DIR);
    ensureDir(BG_DIR);
    ensureDir(EFFECTS_DIR);
    
    // 鱼类配置
    console.log('🐟 Creating fish configurations...');
    const fishTypes = [
        { name: 'fish_common_1', color: [160, 160, 160], width: 80, height: 50, label: '小鲤鱼' },
        { name: 'fish_common_2', color: [74, 144, 226], width: 90, height: 55, label: '鲫鱼' },
        { name: 'fish_rare_1', color: [80, 200, 120], width: 100, height: 60, label: '草鱼' },
        { name: 'fish_rare_2', color: [155, 89, 182], width: 110, height: 65, label: '鲤鱼王' },
        { name: 'fish_epic', color: [255, 215, 0], width: 120, height: 70, label: '金龙鱼' },
        { name: 'fish_legendary', color: [255, 0, 0], width: 140, height: 80, label: '神秘鱼（彩虹）' }
    ];
    
    fishTypes.forEach(fish => {
        createPlaceholderInfo(FISH_DIR, `${fish.name}.json`, {
            type: 'fish',
            name: fish.name,
            label: fish.label,
            color: { r: fish.color[0], g: fish.color[1], b: fish.color[2] },
            size: { width: fish.width, height: fish.height },
            instruction: `在 Cocos Creator 中创建 Sprite，设置 Color 为 RGB(${fish.color.join(', ')})，大小为 ${fish.width}x${fish.height}`
        });
    });
    
    // UI 配置
    console.log('\n🎨 Creating UI configurations...');
    createPlaceholderInfo(UI_DIR, 'hook.json', {
        type: 'ui',
        name: 'hook',
        color: { r: 128, g: 128, b: 128 },
        size: { width: 40, height: 40 },
        instruction: '创建圆形 Sprite，添加钩子形状'
    });
    
    createPlaceholderInfo(UI_DIR, 'line.json', {
        type: 'ui',
        name: 'line',
        color: { r: 192, g: 192, b: 192 },
        size: { width: 4, height: 400 },
        instruction: '创建细长矩形 Sprite'
    });
    
    createPlaceholderInfo(UI_DIR, 'button_normal.json', {
        type: 'ui',
        name: 'button_normal',
        color: { r: 76, g: 175, b: 80 },
        size: { width: 300, height: 80 },
        instruction: '创建绿色按钮 Sprite'
    });
    
    createPlaceholderInfo(UI_DIR, 'button_pressed.json', {
        type: 'ui',
        name: 'button_pressed',
        color: { r: 69, g: 160, b: 73 },
        size: { width: 300, height: 80 },
        instruction: '创建深绿色按钮 Sprite'
    });
    
    // 背景配置
    console.log('\n🌊 Creating background configurations...');
    createPlaceholderInfo(BG_DIR, 'bg_water.json', {
        type: 'background',
        name: 'bg_water',
        gradient: [
            { r: 135, g: 206, b: 235 }, // 浅蓝
            { r: 30, g: 144, b: 255 }   // 深蓝
        ],
        size: { width: 720, height: 600 },
        instruction: '创建渐变背景，从浅蓝到深蓝'
    });
    
    createPlaceholderInfo(BG_DIR, 'bg_deep.json', {
        type: 'background',
        name: 'bg_deep',
        gradient: [
            { r: 30, g: 144, b: 255 },
            { r: 0, g: 0, b: 139 }
        ],
        size: { width: 720, height: 680 },
        instruction: '创建深蓝渐变背景'
    });
    
    // 特效配置
    console.log('\n✨ Creating effects configurations...');
    createPlaceholderInfo(EFFECTS_DIR, 'bubble_1.json', {
        type: 'effect',
        name: 'bubble_1',
        color: { r: 255, g: 255, b: 255, a: 153 },
        size: { width: 20, height: 20 },
        instruction: '创建半透明白色圆形'
    });
    
    createPlaceholderInfo(EFFECTS_DIR, 'bubble_2.json', {
        type: 'effect',
        name: 'bubble_2',
        color: { r: 255, g: 255, b: 255, a: 128 },
        size: { width: 30, height: 30 },
        instruction: '创建半透明白色圆形'
    });
    
    createPlaceholderInfo(EFFECTS_DIR, 'bubble_3.json', {
        type: 'effect',
        name: 'bubble_3',
        color: { r: 255, g: 255, b: 255, a: 102 },
        size: { width: 40, height: 40 },
        instruction: '创建半透明白色圆形'
    });
    
    createPlaceholderInfo(EFFECTS_DIR, 'sparkle.json', {
        type: 'effect',
        name: 'sparkle',
        color: { r: 255, g: 215, b: 0 },
        size: { width: 32, height: 32 },
        instruction: '创建金色四角星形状'
    });
    
    // 创建使用说明
    console.log('\n📝 Creating usage guide...');
    const guidePath = path.join(OUTPUT_BASE, 'PLACEHOLDER_GUIDE.md');
    const guide = `# 占位资源使用指南

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

*生成时间：${new Date().toISOString()}*
`;
    
    fs.writeFileSync(guidePath, guide);
    console.log(`📖 Created: PLACEHOLDER_GUIDE.md`);
    
    console.log('\n✅ Placeholder configurations created successfully!');
    console.log(`📁 Output directory: ${OUTPUT_BASE}`);
    console.log('\n📝 Next steps:');
    console.log('1. Read assets/textures/PLACEHOLDER_GUIDE.md for instructions');
    console.log('2. Create sprites in Cocos Creator manually, or');
    console.log('3. Use online placeholder generators, or');
    console.log('4. Install canvas dependencies and run generate-assets.js');
}

// 运行
main();
