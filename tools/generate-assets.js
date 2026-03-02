#!/usr/bin/env node

/**
 * 生成钓鱼小游戏的美术资源
 * 
 * 使用方法：
 * 1. 安装依赖：npm install canvas
 * 2. 运行脚本：node tools/generate-assets.js
 * 3. 生成的资源会自动保存到 assets/textures/ 目录
 */

const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

// 输出目录配置
const OUTPUT_BASE = path.join(__dirname, '../assets/textures');
const FISH_DIR = path.join(OUTPUT_BASE, 'fish');
const UI_DIR = path.join(OUTPUT_BASE, 'ui');
const BG_DIR = path.join(OUTPUT_BASE, 'background');
const EFFECTS_DIR = path.join(OUTPUT_BASE, 'effects');

// 创建目录
function ensureDir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`📁 Created directory: ${dir}`);
    }
}

// 保存 PNG 图片
function savePNG(canvas, filename) {
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(filename, buffer);
    console.log(`✅ Generated: ${path.basename(filename)}`);
}

// 生成鱼类资源
function generateFish() {
    console.log('\n🐟 Generating fish assets...');
    
    const fishTypes = [
        { name: 'fish_common_1', color: '#A0A0A0', width: 80, height: 50, label: '小鲤鱼' },
        { name: 'fish_common_2', color: '#4A90E2', width: 90, height: 55, label: '鲫鱼' },
        { name: 'fish_rare_1', color: '#50C878', width: 100, height: 60, label: '草鱼' },
        { name: 'fish_rare_2', color: '#9B59B6', width: 110, height: 65, label: '鲤鱼王' },
        { name: 'fish_epic', color: '#FFD700', width: 120, height: 70, label: '金龙鱼' },
        { name: 'fish_legendary', color: 'rainbow', width: 140, height: 80, label: '神秘鱼' }
    ];
    
    fishTypes.forEach(fish => {
        const canvas = createCanvas(fish.width, fish.height);
        const ctx = canvas.getContext('2d');
        
        // 绘制鱼身体（流线型）
        ctx.beginPath();
        ctx.ellipse(fish.width/2, fish.height/2, fish.width/2 * 0.9, fish.height/2, 0, 0, Math.PI * 2);
        
        if (fish.color === 'rainbow') {
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
        
        // 绘制鱼鳍
        ctx.beginPath();
        ctx.moveTo(fish.width * 0.5, fish.height * 0.2);
        ctx.lineTo(fish.width * 0.6, fish.height * 0.05);
        ctx.lineTo(fish.width * 0.7, fish.height * 0.2);
        ctx.closePath();
        ctx.fillStyle = fish.color === 'rainbow' ? '#FFD700' : fish.color;
        ctx.fill();
        
        // 绘制鱼尾巴
        ctx.beginPath();
        ctx.moveTo(fish.width * 0.15, fish.height * 0.5);
        ctx.lineTo(0, fish.height * 0.2);
        ctx.lineTo(0, fish.height * 0.8);
        ctx.closePath();
        ctx.fillStyle = fish.color === 'rainbow' ? '#FF6B6B' : fish.color;
        ctx.fill();
        
        // 绘制鱼眼睛
        const eyeX = fish.width * 0.75;
        const eyeY = fish.height * 0.4;
        const eyeRadius = fish.height * 0.15;
        
        // 眼白
        ctx.beginPath();
        ctx.arc(eyeX, eyeY, eyeRadius, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // 眼珠
        ctx.beginPath();
        ctx.arc(eyeX + eyeRadius * 0.3, eyeY, eyeRadius * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = 'black';
        ctx.fill();
        
        // 高光
        ctx.beginPath();
        ctx.arc(eyeX + eyeRadius * 0.5, eyeY - eyeRadius * 0.3, eyeRadius * 0.2, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
        
        savePNG(canvas, path.join(FISH_DIR, `${fish.name}.png`));
    });
}

// 生成 UI 资源
function generateUI() {
    console.log('\n🎨 Generating UI assets...');
    
    // 鱼钩
    const hookCanvas = createCanvas(40, 40);
    const hookCtx = hookCanvas.getContext('2d');
    hookCtx.fillStyle = '#808080';
    hookCtx.beginPath();
    hookCtx.arc(20, 20, 8, 0, Math.PI * 2);
    hookCtx.fill();
    hookCtx.strokeStyle = '#606060';
    hookCtx.lineWidth = 3;
    hookCtx.beginPath();
    hookCtx.moveTo(20, 28);
    hookCtx.quadraticCurveTo(20, 38, 28, 38);
    hookCtx.stroke();
    savePNG(hookCanvas, path.join(UI_DIR, 'hook.png'));
    
    // 按钮（正常态）
    const btnNormalCanvas = createCanvas(300, 80);
    const btnNormalCtx = btnNormalCanvas.getContext('2d');
    // 背景
    btnNormalCtx.fillStyle = '#4CAF50';
    btnNormalCtx.fillRect(0, 0, 300, 80);
    // 边框
    btnNormalCtx.strokeStyle = '#388E3C';
    btnNormalCtx.lineWidth = 3;
    btnNormalCtx.strokeRect(1.5, 1.5, 297, 77);
    // 高光
    btnNormalCtx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    btnNormalCtx.fillRect(0, 0, 300, 40);
    savePNG(btnNormalCanvas, path.join(UI_DIR, 'button_normal.png'));
    
    // 按钮（按下态）
    const btnPressedCanvas = createCanvas(300, 80);
    const btnPressedCtx = btnPressedCanvas.getContext('2d');
    btnPressedCtx.fillStyle = '#45A049';
    btnPressedCtx.fillRect(0, 0, 300, 80);
    btnPressedCtx.strokeStyle = '#2E7D32';
    btnPressedCtx.lineWidth = 3;
    btnPressedCtx.strokeRect(1.5, 1.5, 297, 77);
    savePNG(btnPressedCanvas, path.join(UI_DIR, 'button_pressed.png'));
    
    // 鱼线
    const lineCanvas = createCanvas(4, 400);
    const lineCtx = lineCanvas.getContext('2d');
    lineCtx.fillStyle = '#C0C0C0';
    lineCtx.fillRect(1, 0, 2, 400);
    savePNG(lineCanvas, path.join(UI_DIR, 'line.png'));
}

// 生成背景资源
function generateBackgrounds() {
    console.log('\n🌊 Generating background assets...');
    
    // 水面背景
    const waterCanvas = createCanvas(720, 600);
    const waterCtx = waterCanvas.getContext('2d');
    
    // 渐变蓝色
    const gradient = waterCtx.createLinearGradient(0, 0, 0, 600);
    gradient.addColorStop(0, '#87CEEB');
    gradient.addColorStop(1, '#1E90FF');
    waterCtx.fillStyle = gradient;
    waterCtx.fillRect(0, 0, 720, 600);
    
    // 水波效果
    waterCtx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    waterCtx.lineWidth = 2;
    for (let y = 50; y < 600; y += 50) {
        waterCtx.beginPath();
        for (let x = 0; x < 720; x += 10) {
            const waveY = y + Math.sin(x * 0.05) * 5;
            if (x === 0) {
                waterCtx.moveTo(x, waveY);
            } else {
                waterCtx.lineTo(x, waveY);
            }
        }
        waterCtx.stroke();
    }
    
    savePNG(waterCanvas, path.join(BG_DIR, 'bg_water.png'));
    
    // 深水背景
    const deepCanvas = createCanvas(720, 680);
    const deepCtx = deepCanvas.getContext('2d');
    
    const deepGradient = deepCtx.createLinearGradient(0, 0, 0, 680);
    deepGradient.addColorStop(0, '#1E90FF');
    deepGradient.addColorStop(1, '#00008B');
    deepCtx.fillStyle = deepGradient;
    deepCtx.fillRect(0, 0, 720, 680);
    
    // 添加一些气泡
    deepCtx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    for (let i = 0; i < 50; i++) {
        const x = Math.random() * 720;
        const y = Math.random() * 680;
        const r = Math.random() * 5 + 2;
        deepCtx.beginPath();
        deepCtx.arc(x, y, r, 0, Math.PI * 2);
        deepCtx.fill();
    }
    
    savePNG(deepCanvas, path.join(BG_DIR, 'bg_deep.png'));
}

// 生成特效资源
function generateEffects() {
    console.log('\n✨ Generating effects assets...');
    
    // 气泡 1（小）
    const bubble1Canvas = createCanvas(20, 20);
    const bubble1Ctx = bubble1Canvas.getContext('2d');
    bubble1Ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    bubble1Ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
    bubble1Ctx.lineWidth = 1;
    bubble1Ctx.beginPath();
    bubble1Ctx.arc(10, 10, 8, 0, Math.PI * 2);
    bubble1Ctx.fill();
    bubble1Ctx.stroke();
    // 高光
    bubble1Ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    bubble1Ctx.beginPath();
    bubble1Ctx.arc(7, 7, 3, 0, Math.PI * 2);
    bubble1Ctx.fill();
    savePNG(bubble1Canvas, path.join(EFFECTS_DIR, 'bubble_1.png'));
    
    // 气泡 2（中）
    const bubble2Canvas = createCanvas(30, 30);
    const bubble2Ctx = bubble2Canvas.getContext('2d');
    bubble2Ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    bubble2Ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
    bubble2Ctx.lineWidth = 1.5;
    bubble2Ctx.beginPath();
    bubble2Ctx.arc(15, 15, 12, 0, Math.PI * 2);
    bubble2Ctx.fill();
    bubble2Ctx.stroke();
    bubble2Ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    bubble2Ctx.beginPath();
    bubble2Ctx.arc(11, 11, 4, 0, Math.PI * 2);
    bubble2Ctx.fill();
    savePNG(bubble2Canvas, path.join(EFFECTS_DIR, 'bubble_2.png'));
    
    // 气泡 3（大）
    const bubble3Canvas = createCanvas(40, 40);
    const bubble3Ctx = bubble3Canvas.getContext('2d');
    bubble3Ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    bubble3Ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
    bubble3Ctx.lineWidth = 2;
    bubble3Ctx.beginPath();
    bubble3Ctx.arc(20, 20, 16, 0, Math.PI * 2);
    bubble3Ctx.fill();
    bubble3Ctx.stroke();
    bubble3Ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    bubble3Ctx.beginPath();
    bubble3Ctx.arc(15, 15, 5, 0, Math.PI * 2);
    bubble3Ctx.fill();
    savePNG(bubble3Canvas, path.join(EFFECTS_DIR, 'bubble_3.png'));
    
    // 闪光特效
    const sparkleCanvas = createCanvas(32, 32);
    const sparkleCtx = sparkleCanvas.getContext('2d');
    sparkleCtx.fillStyle = '#FFD700';
    // 绘制四角星
    sparkleCtx.beginPath();
    sparkleCtx.moveTo(16, 0);
    sparkleCtx.lineTo(20, 12);
    sparkleCtx.lineTo(32, 16);
    sparkleCtx.lineTo(20, 20);
    sparkleCtx.lineTo(16, 32);
    sparkleCtx.lineTo(12, 20);
    sparkleCtx.lineTo(0, 16);
    sparkleCtx.lineTo(20, 12);
    sparkleCtx.closePath();
    sparkleCtx.fill();
    savePNG(sparkleCanvas, path.join(EFFECTS_DIR, 'sparkle.png'));
}

// 主函数
function main() {
    console.log('🎨 Starting asset generation...\n');
    
    // 创建目录
    ensureDir(OUTPUT_BASE);
    ensureDir(FISH_DIR);
    ensureDir(UI_DIR);
    ensureDir(BG_DIR);
    ensureDir(EFFECTS_DIR);
    
    // 生成各类资源
    generateFish();
    generateUI();
    generateBackgrounds();
    generateEffects();
    
    console.log('\n✅ All assets generated successfully!');
    console.log(`📁 Output directory: ${OUTPUT_BASE}`);
    console.log('\n📝 Next steps:');
    console.log('1. Import these assets into Cocos Creator');
    console.log('2. Assign them to the corresponding prefabs and scenes');
    console.log('3. Adjust colors and sizes as needed');
}

// 运行
main();
