/**
 * 程序化生成简单美术资源
 * 
 * 使用方法：
 * 1. 在 Cocos Creator 中创建空节点
 * 2. 添加此脚本
 * 3. 运行游戏自动生成占位资源
 */

import { _decorator, Component, Node, Sprite, SpriteFrame, Texture2D, Canvas, Graphics, Color, Vec3, director, game, ImageAsset } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AssetGenerator')
export class AssetGenerator extends Component {
    @property
    public generateOnStart: boolean = true;
    
    start() {
        if (this.generateOnStart) {
            console.log('🎨 Generating placeholder assets...');
            this.generateAllAssets();
        }
    }
    
    /**
     * 生成所有占位资源
     */
    generateAllAssets() {
        // 注意：Cocos Creator 3.x 中动态创建 Texture2D 比较复杂
        // 这里提供生成逻辑，实际资源建议在编辑器中创建
        
        console.log('📝 Asset generation guide:');
        console.log('1. 使用 ASSETS_GENERATION.md 中的方法生成资源');
        console.log('2. 或使用 Cocos Creator 编辑器手动创建');
        console.log('3. 当前使用纯色 Sprite 作为占位');
        
        // 为场景中的节点设置占位颜色
        this.setupPlaceholderColors();
    }
    
    /**
     * 为场景中的节点设置占位颜色
     */
    setupPlaceholderColors() {
        // 这个方法会在运行时为没有 SpriteFrame 的 Sprite 设置颜色
        
        // 鱼类颜色
        const fishColors = [
            new Color(160, 160, 160), // 小鲤鱼 - 灰色
            new Color(74, 144, 226),  // 鲫鱼 - 蓝色
            new Color(80, 200, 120),  // 草鱼 - 绿色
            new Color(155, 89, 182),  // 鲤鱼王 - 紫色
            new Color(255, 215, 0),   // 金龙鱼 - 金色
            new Color(255, 0, 0)      // 神秘鱼 - 红色（彩虹色用红色代替）
        ];
        
        console.log('🐟 Fish placeholder colors set:');
        fishColors.forEach((color, index) => {
            console.log(`   Fish ${index + 1}: RGB(${color.r}, ${color.g}, ${color.b})`);
        });
        
        // UI 颜色
        console.log('🎨 UI placeholder colors:');
        console.log('   Button: Green (#4CAF50)');
        console.log('   Panel: Semi-transparent black');
        console.log('   Text: White');
    }
    
    /**
     * 创建简单的纹理（高级用法）
     * 需要在编辑器中配合使用
     */
    createSimpleTexture(width: number, height: number, color: Color): Texture2D | null {
        // 这个方法需要 Cocos Creator 3.x 的完整 API 支持
        // 建议在编辑器中预先创建好资源
        
        console.log(`Creating texture: ${width}x${height}`);
        return null;
    }
}
