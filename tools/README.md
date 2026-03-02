# 生成美术资源和音效

## 🚀 快速生成（推荐）

### 步骤 1：安装依赖

```bash
cd tools
npm install
```

### 步骤 2：生成美术资源

```bash
npm run generate:assets
```

生成的文件：
- `assets/textures/fish/` - 6 种鱼类图片
- `assets/textures/ui/` - UI 元素（按钮、鱼钩、鱼线）
- `assets/textures/background/` - 背景图片
- `assets/textures/effects/` - 特效图片（气泡、闪光）

### 步骤 3：生成音效

```bash
npm run generate:audio
```

生成的文件：
- `assets/audio/sfx/` - 游戏音效（5 个）

### 或者一次性生成所有资源

```bash
npm run generate:all
```

---

## 📁 生成的资源结构

```
assets/
├── textures/
│   ├── fish/
│   │   ├── fish_common_1.png (80x50, 灰色)
│   │   ├── fish_common_2.png (90x55, 蓝色)
│   │   ├── fish_rare_1.png (100x60, 绿色)
│   │   ├── fish_rare_2.png (110x65, 紫色)
│   │   ├── fish_epic.png (120x70, 金色)
│   │   └── fish_legendary.png (140x80, 彩虹色)
│   ├── ui/
│   │   ├── hook.png (40x40, 鱼钩)
│   │   ├── line.png (4x400, 鱼线)
│   │   ├── button_normal.png (300x80, 绿色按钮)
│   │   └── button_pressed.png (300x80, 深绿色按钮)
│   ├── background/
│   │   ├── bg_water.png (720x600, 浅蓝水面)
│   │   └── bg_deep.png (720x680, 深蓝深水)
│   └── effects/
│       ├── bubble_1.png (20x20, 小气泡)
│       ├── bubble_2.png (30x30, 中气泡)
│       ├── bubble_3.png (40x40, 大气泡)
│       └── sparkle.png (32x32, 闪光)
└── audio/
    ├── sfx/
    │   ├── sfx_cast.wav (0.5s, 下放鱼钩)
    │   ├── sfx_catch.wav (0.3s, 捕获鱼)
    │   ├── sfx_levelup.wav (1.0s, 升级)
    │   ├── sfx_gameover.wav (1.5s, 游戏结束)
    │   └── sfx_button.wav (0.1s, 按钮点击)
    └── bgm/
        └── (需要手动添加背景音乐)
```

---

## 🎨 资源说明

### 鱼类资源
- **程序化生成**：使用 Canvas API 绘制
- **特点**：
  - 流线型身体
  - 鱼鳍和尾巴
  - 眼睛带高光
  - 神秘鱼使用彩虹渐变色

### UI 资源
- **按钮**：带边框和高光的立体效果
- **鱼钩**：简单的圆形 + 钩子形状
- **鱼线**：细长的灰色线条

### 背景资源
- **水面**：蓝色渐变 + 白色水波纹
- **深水**：深蓝渐变 + 随机气泡

### 特效资源
- **气泡**：半透明圆形 + 白色高光
- **闪光**：四角星形状，金色

### 音效资源
- **程序化生成**：使用正弦波、方波、锯齿波
- **特点**：
  - `sfx_cast`：600Hz 正弦波，0.5 秒
  - `sfx_catch`：C 大调和弦（523+659+784Hz），0.3 秒
  - `sfx_levelup`：880Hz 正弦波，1.0 秒
  - `sfx_gameover`：220Hz 锯齿波，1.5 秒
  - `sfx_button`：1000Hz 方波，0.1 秒

---

## 🛠️ 在 Cocos Creator 中使用

### 步骤 1：导入资源
1. 打开 Cocos Creator
2. 资源会自动刷新（或手动点击刷新）
3. 在资源管理器中查看生成的文件

### 步骤 2：创建预制体

#### 鱼类预制体
1. 将 `fish_*.png` 拖入场景
2. 添加 `Sprite` 组件
3. 添加 `Circle Collider` 组件
4. 添加 `FishData` 组件
5. 保存为预制体（右键 → Create → Prefab）

#### UI 预制体
1. 创建 Button 节点
2. 将 `button_*.png` 设置为 SpriteFrame
3. 调整大小和位置

### 步骤 3：绑定到脚本

#### GameManager
```typescript
// 在 Inspector 中绑定
- Score Label → UI 中的得分 Label
- Level Label → UI 中的关卡 Label
- Time Label → UI 中的时间 Label
- Game Over Panel → 游戏结束面板节点
- ...
```

#### FishManager
```typescript
// 在 Fish Prefabs 数组中拖入 6 个鱼类预制体
fishPrefabs: [
  Fish_Common_1,
  Fish_Common_2,
  Fish_Rare_1,
  Fish_Rare_2,
  Fish_Epic,
  Fish_Legendary
]
```

#### AudioManager
```typescript
// 绑定音效文件
- bgm → 背景音乐 MP3（需手动添加）
- castSound → sfx_cast.wav
- catchSound → sfx_catch.wav
- levelUpSound → sfx_levelup.wav
- gameOverSound → sfx_gameover.wav
- buttonClickSound → sfx_button.wav
```

---

## 🎵 添加背景音乐

背景音乐需要手动添加：

### 推荐来源
1. **Incompetech** (https://incompetech.com/)
   - 免费背景音乐
   - 需署名作者

2. **Bensound** (https://www.bensound.com/)
   - 免费音乐（部分需付费）
   - 需署名

3. **YouTube Audio Library**
   - 完全免费
   - 无需署名

4. **OpenGameArt** (https://opengameart.org/)
   - 游戏专用音乐
   - 各种许可证

### 推荐曲目风格
- 轻松愉快
- 休闲放松
- 时长：1-2 分钟循环
- 格式：MP3, 128kbps 或更高

### 保存位置
```
assets/audio/bgm/bgm_main.mp3
```

---

## 🎨 自定义资源

### 修改颜色

编辑 `tools/generate-assets.js`：

```javascript
const fishTypes = [
    { 
        name: 'fish_common_1', 
        color: '#A0A0A0', // 修改这里
        width: 80, 
        height: 50 
    },
    // ...
];
```

### 修改尺寸

```javascript
{ 
    name: 'fish_epic', 
    color: '#FFD700',
    width: 120,  // 修改宽度
    height: 70   // 修改高度
}
```

### 修改音效

编辑 `tools/generate-audio.js`：

```javascript
// 修改频率、时长、波形
generateWav(
    path.join(AUDIO_DIR, 'sfx_cast.wav'),
    600,      // 频率 (Hz)
    0.5,      // 时长 (秒)
    'sine',   // 波形：sine, square, sawtooth
    0.6       // 音量 (0-1)
);
```

---

## 🔄 重新生成

如果修改了生成脚本：

```bash
# 删除旧资源（可选）
rm -rf assets/textures/*
rm -rf assets/audio/sfx/*

# 重新生成
npm run generate:all
```

---

## ⚠️ 注意事项

1. **Canvas 依赖**
   - 需要安装 `canvas` 包
   - 可能需要系统依赖：`libcairo2-dev`, `libpango1.0-dev` 等
   - 如果安装失败，参考：https://github.com/Automattic/node-canvas

2. **资源格式**
   - 图片：PNG（支持透明）
   - 音效：WAV（Cocos Creator 兼容）
   - 音乐：MP3（需手动添加）

3. **性能优化**
   - 正式版本建议使用纹理打包工具
   - 音效可以转换为 AAC 格式减小体积
   - 图片可以使用 TinyPNG 等工具压缩

4. **版权**
   - 生成的资源可以自由使用
   - 背景音乐注意遵守许可证

---

## 🎯 下一步

1. ✅ 运行生成脚本
2. ✅ 在 Cocos Creator 中导入资源
3. ✅ 创建预制体
4. ✅ 绑定到场景和脚本
5. ✅ 测试游戏
6. ⏳ 替换为正式美术资源（可选）

---

## 📞 问题排查

### 问题：`npm install` 失败
**解决**：
```bash
# 清理缓存
npm cache clean --force

# 使用淘宝镜像
npm config set registry https://registry.npmmirror.com

# 重新安装
npm install
```

### 问题：生成的图片是黑色
**解决**：检查 Canvas 版本，升级到最新

### 问题：Cocos Creator 中看不到资源
**解决**：
1. 点击 Cocos Creator 资源面板的刷新按钮
2. 重启 Cocos Creator
3. 检查文件路径是否正确

---

*最后更新：2026-03-02*
