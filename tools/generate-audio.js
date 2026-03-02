#!/usr/bin/env node

/**
 * 生成简单的占位音效文件
 * 
 * 使用方法：
 * 1. 安装依赖：npm install wav
 * 2. 运行脚本：node tools/generate-audio.js
 * 3. 生成的音效会保存到 assets/audio/sfx/ 目录
 * 
 * 注意：这些是简单的程序化音效，正式版本建议使用专业音效
 */

const fs = require('fs');
const path = require('path');

// 输出目录
const AUDIO_DIR = path.join(__dirname, '../assets/audio/sfx');

// 创建目录
function ensureDir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`📁 Created directory: ${dir}`);
    }
}

/**
 * 生成简单的 WAV 文件
 * @param {string} filename - 文件名
 * @param {number} frequency - 频率 (Hz)
 * @param {number} duration - 时长 (秒)
 * @param {string} type - 波形类型：sine, square, sawtooth
 * @param {number} volume - 音量 (0-1)
 */
function generateWav(filename, frequency, duration, type = 'sine', volume = 0.5) {
    const sampleRate = 44100;
    const numSamples = Math.floor(sampleRate * duration);
    const buffer = Buffer.alloc(44 + numSamples * 2); // WAV header + data
    
    // WAV header
    buffer.write('RIFF', 0);
    buffer.writeUInt32LE(36 + numSamples * 2, 4);
    buffer.write('WAVE', 8);
    buffer.write('fmt ', 12);
    buffer.writeUInt32LE(16, 16);
    buffer.writeUInt16LE(1, 20);
    buffer.writeUInt16LE(1, 22);
    buffer.writeUInt32LE(sampleRate, 24);
    buffer.writeUInt32LE(sampleRate * 2, 28);
    buffer.writeUInt16LE(2, 32);
    buffer.writeUInt16LE(16, 34);
    buffer.write('data', 36);
    buffer.writeUInt32LE(numSamples * 2, 40);
    
    // Generate audio data
    let offset = 44;
    for (let i = 0; i < numSamples; i++) {
        const t = i / sampleRate;
        let sample = 0;
        
        switch (type) {
            case 'sine':
                sample = Math.sin(2 * Math.PI * frequency * t);
                break;
            case 'square':
                sample = Math.sin(2 * Math.PI * frequency * t) > 0 ? 1 : -1;
                break;
            case 'sawtooth':
                sample = 2 * (t * frequency - Math.floor(t * frequency + 0.5));
                break;
        }
        
        // Apply envelope (fade in/out)
        const envelope = Math.min(1, t * 10) * Math.min(1, (duration - t) * 10);
        sample *= envelope * volume;
        
        // Convert to 16-bit
        const intSample = Math.max(-32768, Math.min(32767, Math.floor(sample * 32767)));
        buffer.writeInt16LE(intSample, offset);
        offset += 2;
    }
    
    fs.writeFileSync(filename, buffer);
    console.log(`✅ Generated: ${path.basename(filename)} (${frequency}Hz, ${duration}s, ${type})`);
}

/**
 * 生成复合音效（多频率组合）
 */
function generateComplexWav(filename, frequencies, duration, type = 'sine') {
    const sampleRate = 44100;
    const numSamples = Math.floor(sampleRate * duration);
    const buffer = Buffer.alloc(44 + numSamples * 2);
    
    // WAV header
    buffer.write('RIFF', 0);
    buffer.writeUInt32LE(36 + numSamples * 2, 4);
    buffer.write('WAVE', 8);
    buffer.write('fmt ', 12);
    buffer.writeUInt32LE(16, 16);
    buffer.writeUInt16LE(1, 20);
    buffer.writeUInt16LE(1, 22);
    buffer.writeUInt32LE(sampleRate, 24);
    buffer.writeUInt32LE(sampleRate * 2, 28);
    buffer.writeUInt16LE(2, 32);
    buffer.writeUInt16LE(16, 34);
    buffer.write('data', 36);
    buffer.writeUInt32LE(numSamples * 2, 40);
    
    // Generate audio data
    let offset = 44;
    for (let i = 0; i < numSamples; i++) {
        const t = i / sampleRate;
        let sample = 0;
        
        // Sum all frequencies
        frequencies.forEach((freq, index) => {
            const amplitude = 1 / (index + 1); // Decrease amplitude for higher harmonics
            sample += Math.sin(2 * Math.PI * freq * t) * amplitude;
        });
        
        // Normalize
        sample /= frequencies.length;
        
        // Apply envelope
        const envelope = Math.min(1, t * 10) * Math.min(1, (duration - t) * 10);
        sample *= envelope * 0.5;
        
        const intSample = Math.max(-32768, Math.min(32767, Math.floor(sample * 32767)));
        buffer.writeInt16LE(intSample, offset);
        offset += 2;
    }
    
    fs.writeFileSync(filename, buffer);
    console.log(`✅ Generated: ${path.basename(filename)} (${frequencies.join('+')}Hz, ${duration}s)`);
}

// 主函数
function main() {
    console.log('🎵 Starting audio generation...\n');
    
    ensureDir(AUDIO_DIR);
    
    // 生成音效
    console.log('Generating sound effects...\n');
    
    // 1. 下放鱼钩音效 - 快速下降的音调
    generateWav(
        path.join(AUDIO_DIR, 'sfx_cast.wav'),
        600,
        0.5,
        'sine',
        0.6
    );
    
    // 2. 捕获鱼音效 - 欢快的短音
    generateComplexWav(
        path.join(AUDIO_DIR, 'sfx_catch.wav'),
        [523.25, 659.25, 783.99], // C major chord
        0.3,
        'sine'
    );
    
    // 3. 升级音效 - 上升的音阶
    generateWav(
        path.join(AUDIO_DIR, 'sfx_levelup.wav'),
        880,
        1.0,
        'sine',
        0.5
    );
    
    // 4. 游戏结束音效 - 低沉的长音
    generateWav(
        path.join(AUDIO_DIR, 'sfx_gameover.wav'),
        220,
        1.5,
        'sawtooth',
        0.4
    );
    
    // 5. 按钮点击音效 - 短促的咔嗒声
    generateWav(
        path.join(AUDIO_DIR, 'sfx_button.wav'),
        1000,
        0.1,
        'square',
        0.3
    );
    
    console.log('\n✅ All sound effects generated successfully!');
    console.log(`📁 Output directory: ${AUDIO_DIR}`);
    
    console.log('\n📝 Notes:');
    console.log('- These are placeholder sounds generated programmatically');
    console.log('- For production, use professional sound effects from:');
    console.log('  * BFXR (https://www.bfxr.net/)');
    console.log('  * Freesound.org');
    console.log('  * Professional sound libraries');
    
    console.log('\n🎵 To generate background music:');
    console.log('- Use online tools: BFXR, ChipTone');
    console.log('- Or download from: Incompetech, Bensound, YouTube Audio Library');
    console.log('- Save as MP3 format in assets/audio/bgm/');
}

// 运行
main();
