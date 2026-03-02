# 生成程序化美术资源

使用 Cocos Creator 和 Canvas API 生成简单的占位美术资源。

## 🎨 运行步骤

### 方法 1：使用 Cocos Creator 编辑器脚本

1. 在 Cocos Creator 中打开项目
2. 创建编辑器扩展（菜单 → 开发者 → 创建扩展）
3. 将下方代码复制到扩展脚本中
4. 运行扩展生成资源

### 方法 2：使用 Node.js 脚本生成

```bash
# 安装依赖
npm install canvas

# 运行生成脚本
node tools/generate-assets.js
```

### 方法 3：手动创建（推荐用于正式项目）

1. 使用图形软件（Photoshop、Aseprite 等）绘制
2. 或使用免费资源网站：
   - OpenGameArt.org
   - Kenney.nl
   - Itch.io 免费资源区

---

## 📐 资源规格

### 鱼类资源
| 资源名 | 尺寸 | 格式 | 说明 |
|--------|------|------|------|
| fish_common_1.png | 80x50 | PNG | 小鲤鱼（灰色） |
| fish_common_2.png | 90x55 | PNG | 鲫鱼（蓝色） |
| fish_rare_1.png | 100x60 | PNG | 草鱼（绿色） |
| fish_rare_2.png | 110x65 | PNG | 鲤鱼王（紫色） |
| fish_epic.png | 120x70 | PNG | 金龙鱼（金色） |
| fish_legendary.png | 140x80 | PNG | 神秘鱼（彩虹色） |

### UI 资源
| 资源名 | 尺寸 | 格式 | 说明 |
|--------|------|------|------|
| hook.png | 40x40 | PNG | 鱼钩 |
| line.png | 4x400 | PNG | 鱼线 |
| bg_water.png | 720x600 | JPG | 水面背景 |
| bg_deep.png | 720x680 | JPG | 深水背景 |
| button_normal.png | 300x80 | PNG | 按钮正常态 |
| button_pressed.png | 300x80 | PNG | 按钮按下态 |

### 特效资源
| 资源名 | 尺寸 | 格式 | 说明 |
|--------|------|------|------|
| bubble_1.png | 20x20 | PNG | 小气泡 |
| bubble_2.png | 30x30 | PNG | 中气泡 |
| bubble_3.png | 40x40 | PNG | 大气泡 |
| wave.png | 720x100 | PNG | 水波效果 |
| sparkle.png | 32x32 | PNG | 闪光特效 |

---

## 🎨 颜色方案

### 鱼类颜色
```javascript
// 小鲤鱼 - 灰色
fillStyle: '#A0A0A0'

// 鲫鱼 - 蓝色
fillStyle: '#4A90E2'

// 草鱼 - 绿色
fillStyle: '#50C878'

// 鲤鱼王 - 紫色
fillStyle: '#9B59B6'

// 金龙鱼 - 金色渐变
fillStyle: '#FFD700'

// 神秘鱼 - 彩虹色
fillStyle: 彩虹渐变
```

### UI 颜色
```javascript
// 按钮 - 绿色
normal: '#4CAF50'
pressed: '#45A049'

// 按钮 - 蓝色
normal: '#2196F3'
pressed: '#1976D2'

// 面板背景
background: 'rgba(0, 0, 0, 0.7)'
```

---

## 🛠️ 自动生成脚本示例

以下是使用 Canvas 生成鱼类资源的示例代码：

```javascript
const canvas = require('canvas');
const fs = require('fs');
const path = require('path');

// 创建输出目录
const outputDir = path.join(__dirname, '../assets/textures/fish');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// 鱼类配置
const fishTypes = [
    { name: 'fish_common_1', color: '#A0A0A0', width: 80, height: 50 },
    { name: 'fish_common_2', color: '#4A90E2', width: 90, height: 55 },
    { name: 'fish_rare_1', color: '#50C878', width: 100, height: 60 },
    { name: 'fish_rare_2', color: '#9B59B6', width: 110, height: 65 },
    { name: 'fish_epic', color: '#FFD700', width: 120, height: 70 },
    { name: 'fish_legendary', color: 'rainbow', width: 140, height: 80 }
];

// 生成鱼类图片
fishTypes.forEach(fish => {
    const { createCanvas } = canvas;
    const c = createCanvas(fish.width, fish.height);
    const ctx = c.getContext('2d');
    
    // 绘制鱼身体（椭圆形）
    ctx.beginPath();
    ctx.ellipse(fish.width/2, fish.height/2, fish.width/2, fish.height/2, 0, 0, Math.PI * 2);
    
    if (fish.color === 'rainbow') {
        // 彩虹渐变
        const gradient = ctx.createLinearGradient(0, 0, fish.width, 0);
        gradient.addColorStop(0, '#FF0000');
        gradient.addColorStop(0.2, '#FF7F00');
        gradient.addColorStop(0.4, '#FFFF00');
        gradient.addColorStop(0.6, '#00FF00');
        gradient.addColorStop(0.8, '#0000FF');
        gradient.addColorStop(1, '#8B00FF');
        ctx.fillStyle = gradient;
    } else {
        ctx.fillStyle = fish.color;
    }
    
    ctx.fill();
    
    // 绘制鱼眼睛
    ctx.beginPath();
    ctx.arc(fish.width * 0.75, fish.height * 0.35, fish.height * 0.15, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(fish.width * 0.78, fish.height * 0.35, fish.height * 0.08, 0, Math.PI * 2);
    ctx.fillStyle = 'black';
    ctx.fill();
    
    // 绘制鱼尾巴
    ctx.beginPath();
    ctx.moveTo(fish.width * 0.1, fish.height * 0.5);
    ctx.lineTo(0, 0);
    ctx.lineTo(0, fish.height);
    ctx.closePath();
    ctx.fillStyle = fish.color === 'rainbow' ? '#FF0000' : fish.color;
    ctx.fill();
    
    // 保存文件
    const buffer = c.toBuffer('image/png');
    fs.writeFileSync(path.join(outputDir, `${fish.name}.png`), buffer);
    console.log(`Generated: ${fish.name}.png`);
});

console.log('All fish assets generated!');
```

---

## 🎵 音效资源

### 音效清单
| 音效名 | 时长 | 格式 | 说明 |
|--------|------|------|------|
| bgm_main.mp3 | 2:00 | MP3 | 背景音乐（轻松愉快） |
| sfx_cast.mp3 | 0:5s | WAV | 下放鱼钩 |
| sfx_catch.mp3 | 0:3s | WAV | 捕获鱼 |
| sfx_levelup.mp3 | 1:0s | WAV | 升级/成就 |
| sfx_gameover.mp3 | 1:5s | WAV | 游戏结束 |
| sfx_button.mp3 | 0:2s | WAV | 按钮点击 |

### 音效生成工具
使用在线工具生成简单音效：
- **BFXR** (https://www.bfxr.net/) - 8 位游戏音效生成器
- **ChipTone** - 复古游戏音效
- **Freesound.org** - 免费音效库

### 背景音乐来源
- **Incompetech** (https://incompetech.com/) - 免费背景音乐
- **Bensound** (https://www.bensound.com/) - 免费音乐（需署名）
- **YouTube Audio Library** - 免费音乐库

---

## 📦 资源包结构

```
assets/
├── textures/
│   ├── fish/
│   │   ├── fish_common_1.png
│   │   ├── fish_common_2.png
│   │   ├── fish_rare_1.png
│   │   ├── fish_rare_2.png
│   │   ├── fish_epic.png
│   │   └── fish_legendary.png
│   ├── ui/
│   │   ├── hook.png
│   │   ├── button_normal.png
│   │   └── button_pressed.png
│   ├── background/
│   │   ├── bg_water.jpg
│   │   └── bg_deep.jpg
│   └── effects/
│       ├── bubble_1.png
│       ├── bubble_2.png
│       └── sparkle.png
└── audio/
    ├── bgm/
    │   └── bgm_main.mp3
    └── sfx/
        ├── sfx_cast.wav
        ├── sfx_catch.wav
        ├── sfx_levelup.wav
        ├── sfx_gameover.wav
        └── sfx_button.wav
```

---

## ⚡ 快速占位方案

如果只是想快速测试，可以使用 Cocos Creator 的内置图形：

1. **使用 Sprite 的纯色填充**
   - 创建 Sprite
   - 不设置 SpriteFrame
   - 直接设置 Color 属性

2. **使用 Graphics 组件绘制**
   - 添加 Graphics 组件
   - 使用代码绘制简单图形

3. **使用粒子系统**
   - 气泡效果可以用粒子系统生成
   - 无需图片资源

---

## 🎨 推荐美术风格

### 像素风格（推荐）
- 优点：制作简单，文件小，适合小游戏
- 工具：Aseprite, Piskel
- 尺寸：32x32, 64x64

### 扁平风格
- 优点：现代简洁，易于制作
- 工具：Illustrator, Figma
- 特点：纯色块，无渐变

### 卡通风格
- 优点：可爱亲和，适合休闲游戏
- 工具：Photoshop, Procreate
- 特点：圆润造型，鲜艳色彩

---

*最后更新：2026-03-02*
