#!/usr/bin/env node

/**
 * 为 Cocos Creator 生成 .meta 文件
 * 
 * 使用方法：
 * node tools/generate-meta-files.js
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// 生成 UUID
function generateUUID() {
    return crypto.randomUUID().replace(/-/g, '');
}

// 生成图片资源的 meta 文件
function generateImageMeta(filePath) {
    const uuid = generateUUID();
    const textureUuid = generateUUID();
    
    return JSON.stringify({
        "ver": "1.0.22",
        "importer": "image",
        "imported": true,
        "uuid": uuid,
        "files": [".json", ".png"],
        "subMetas": {
            "6c02a": {
                "importer": "texture",
                "uuid": textureUuid,
                "files": [".json"],
                "subMetas": {},
                "userData": {
                    "globsToTrim": null,
                    "imageType": 0,
                    "fixAlphaTransparencyArtifacts": true,
                    "hasAlpha": true,
                    "quality": "100%",
                    "wrapModeS": "clamp-to-edge",
                    "wrapModeT": "clamp-to-edge",
                    "minfilter": "linear",
                    "magfilter": "linear",
                    "mipfilter": "none",
                    "mipfilterMode": "auto",
                    "anisotropy": 0,
                    "isUuid": true,
                    "imageUuidOrDatabaseUrl": `db://${filePath.replace('assets/', '')}`,
                    "visible": false
                },
                "displayName": path.basename(filePath, '.png'),
                "id": "6c02a",
                "name": "texture"
            }
        },
        "userData": {
            "type": "texture",
            "redirect": "6c02a@6c02a",
            "hasAlpha": true,
            "isUuid": true,
            "imageUuidOrDatabaseUrl": `db://${filePath.replace('assets/', '')}`,
            "visible": true
        }
    }, null, 2);
}

// 生成音频资源的 meta 文件
function generateAudioMeta(filePath) {
    const uuid = generateUUID();
    
    return JSON.stringify({
        "ver": "1.0.0",
        "importer": "audio-clip",
        "imported": true,
        "uuid": uuid,
        "files": [".json", path.extname(filePath).substring(1)],
        "subMetas": {},
        "userData": {
            "isSubclip": false
        }
    }, null, 2);
}

// 递归查找所有资源文件
function findAssets(dir, extensions) {
    let results = [];
    const list = fs.readdirSync(dir);
    
    list.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
            results = results.concat(findAssets(filePath, extensions));
        } else if (extensions.includes(path.extname(file).toLowerCase())) {
            results.push(filePath);
        }
    });
    
    return results;
}

// 主函数
function main() {
    const assetsDir = path.join(__dirname, '../assets');
    
    console.log('🔍 扫描资源文件...');
    
    // 查找所有 PNG 文件
    const pngFiles = findAssets(assetsDir, ['.png']);
    console.log(`📸 找到 ${pngFiles.length} 个 PNG 文件`);
    
    // 查找所有 WAV 文件
    const wavFiles = findAssets(assetsDir, ['.wav']);
    console.log(`🎵 找到 ${wavFiles.length} 个 WAV 文件`);
    
    let createdCount = 0;
    
    // 为 PNG 文件生成 meta
    pngFiles.forEach(file => {
        const metaFile = file + '.meta';
        const relativePath = path.relative(assetsDir, file);
        
        if (!fs.existsSync(metaFile)) {
            const metaContent = generateImageMeta(relativePath);
            fs.writeFileSync(metaFile, metaContent);
            console.log(`✅ 创建：${relativePath}.meta`);
            createdCount++;
        }
    });
    
    // 为 WAV 文件生成 meta
    wavFiles.forEach(file => {
        const metaFile = file + '.meta';
        const relativePath = path.relative(assetsDir, file);
        
        if (!fs.existsSync(metaFile)) {
            const metaContent = generateAudioMeta(relativePath);
            fs.writeFileSync(metaFile, metaContent);
            console.log(`✅ 创建：${relativePath}.meta`);
            createdCount++;
        }
    });
    
    console.log(`\n🎉 完成！创建了 ${createdCount} 个 .meta 文件`);
    console.log('💡 现在可以在 Cocos Creator 中刷新资源了');
}

// 运行
main();
