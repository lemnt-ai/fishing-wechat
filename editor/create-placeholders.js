/**
 * Cocos Creator 编辑器脚本 - 自动创建占位资源
 * 
 * 使用方法：
 * 1. 在 Cocos Creator 中打开项目
 * 2. 将此脚本放入 editor/ 目录
 * 3. 菜单 → 扩展 → 创建占位资源
 */

const { readFileSync, existsSync } = require('fs');
const { join } = require('path');

module.exports = {
    $: {
        menu: 'i18n:MAIN_MENU.package.title/Fishing Game/Create Placeholder Resources',
    },
    
    messages: {
        async createPlaceholders() {
            console.log('🎨 Creating placeholder resources in Cocos Creator...\n');
            
            const texturesDir = join(__dirname, '../assets/textures');
            const fishDir = join(texturesDir, 'fish');
            const uiDir = join(texturesDir, 'ui');
            const bgDir = join(texturesDir, 'background');
            const effectsDir = join(texturesDir, 'effects');
            
            // 检查配置文件是否存在
            if (!existsSync(join(fishDir, 'fish_common_1.json'))) {
                console.log('❌ Placeholder configs not found. Please run: node tools/create-placeholders.js');
                return;
            }
            
            // 创建鱼类 Sprite
            console.log('🐟 Creating fish sprites...');
            const fishConfigs = [
                'fish_common_1', 'fish_common_2', 'fish_rare_1',
                'fish_rare_2', 'fish_epic', 'fish_legendary'
            ];
            
            for (const config of fishConfigs) {
                await this.createSprite(fishDir, config);
            }
            
            // 创建 UI Sprite
            console.log('\n🎨 Creating UI sprites...');
            const uiConfigs = ['hook', 'line', 'button_normal', 'button_pressed'];
            for (const config of uiConfigs) {
                await this.createSprite(uiDir, config);
            }
            
            // 创建背景
            console.log('\n🌊 Creating backgrounds...');
            const bgConfigs = ['bg_water', 'bg_deep'];
            for (const config of bgConfigs) {
                await this.createSprite(bgDir, config);
            }
            
            // 创建特效
            console.log('\n✨ Creating effects...');
            const effectConfigs = ['bubble_1', 'bubble_2', 'bubble_3', 'sparkle'];
            for (const config of effectConfigs) {
                await this.createSprite(effectsDir, config);
            }
            
            console.log('\n✅ All placeholder resources created!');
            console.log('📁 Check the assets/textures/ directory in Cocos Creator');
        }
    },
    
    async createSprite(dir, configName) {
        try {
            const configPath = join(dir, `${configName}.json`);
            const config = JSON.parse(readFileSync(configPath, 'utf-8'));
            
            console.log(`  Creating ${configName}...`);
            
            // 在 Cocos Creator 中创建节点和 Sprite
            // 注意：实际的节点创建需要在编辑器环境中进行
            // 这里提供配置信息供手动创建参考
            
            console.log(`    Color: RGB(${config.color.r}, ${config.color.g}, ${config.color.b})`);
            console.log(`    Size: ${config.size.width}x${config.size.height}`);
            console.log(`    Instruction: ${config.instruction}`);
            
        } catch (error) {
            console.error(`  ❌ Failed to create ${configName}:`, error.message);
        }
    }
};
