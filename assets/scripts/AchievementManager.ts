import { _decorator, Component, Node, sys, Label } from 'cc';
const { ccclass, property } = _decorator;

/**
 * 成就数据
 */
export interface Achievement {
    id: string;
    name: string;
    description: string;
    condition: string;
    target: number;
    reward: number;
    unlocked: boolean;
    progress: number;
}

/**
 * 成就管理器
 * 管理成就解锁和奖励
 */
@ccclass('AchievementManager')
export class AchievementManager extends Component {
    @property(Label)
    public achievementLabel: Label = null!;
    
    // 成就列表
    private achievements: Achievement[] = [
        {
            id: 'first_catch',
            name: '初次钓鱼',
            description: '捕获第一条鱼',
            condition: 'catch_count',
            target: 1,
            reward: 50,
            unlocked: false,
            progress: 0
        },
        {
            id: 'catch_10',
            name: '钓鱼新手',
            description: '累计捕获 10 条鱼',
            condition: 'catch_count',
            target: 10,
            reward: 100,
            unlocked: false,
            progress: 0
        },
        {
            id: 'catch_50',
            name: '钓鱼达人',
            description: '累计捕获 50 条鱼',
            condition: 'catch_count',
            target: 50,
            reward: 300,
            unlocked: false,
            progress: 0
        },
        {
            id: 'catch_100',
            name: '钓鱼大师',
            description: '累计捕获 100 条鱼',
            condition: 'catch_count',
            target: 100,
            reward: 500,
            unlocked: false,
            progress: 0
        },
        {
            id: 'score_500',
            name: '小有所成',
            description: '单局获得 500 分',
            condition: 'single_score',
            target: 500,
            reward: 200,
            unlocked: false,
            progress: 0
        },
        {
            id: 'score_1000',
            name: '高分高手',
            description: '单局获得 1000 分',
            condition: 'single_score',
            target: 1000,
            reward: 400,
            unlocked: false,
            progress: 0
        },
        {
            id: 'rare_fish',
            name: '稀有收获',
            description: '捕获稀有鱼类（金龙鱼或神秘鱼）',
            condition: 'rare_catch',
            target: 1,
            reward: 300,
            unlocked: false,
            progress: 0
        },
        {
            id: 'max_level',
            name: '装备大师',
            description: '将任意装备升级到满级',
            condition: 'equipment_max',
            target: 10,
            reward: 1000,
            unlocked: false,
            progress: 0
        },
        {
            id: 'combo_5',
            name: '连击新手',
            description: '达成 5 连击',
            condition: 'combo',
            target: 5,
            reward: 150,
            unlocked: false,
            progress: 0
        },
        {
            id: 'combo_10',
            name: '连击高手',
            description: '达成 10 连击',
            condition: 'combo',
            target: 10,
            reward: 300,
            unlocked: false,
            progress: 0
        }
    ];
    
    // 统计数据
    private stats: any = {
        totalCatchCount: 0,
        totalScore: 0,
        maxSingleScore: 0,
        rareFishCount: 0,
        maxCombo: 0
    };
    
    // 单例
    private static instance: AchievementManager | null = null;
    public static getInstance(): AchievementManager | null {
        return AchievementManager.instance;
    }
    
    onLoad() {
        AchievementManager.instance = this;
        this.loadAchievements();
        this.loadStats();
    }
    
    start() {
        this.checkAchievements();
    }
    
    /**
     * 更新统计数据
     */
    updateStats(catchCount: number = 0, score: number = 0, isRare: boolean = false, combo: number = 0) {
        if (catchCount > 0) {
            this.stats.totalCatchCount += catchCount;
        }
        if (score > 0) {
            this.stats.totalScore += score;
            if (score > this.stats.maxSingleScore) {
                this.stats.maxSingleScore = score;
            }
        }
        if (isRare) {
            this.stats.rareFishCount++;
        }
        if (combo > 0) {
            if (combo > this.stats.maxCombo) {
                this.stats.maxCombo = combo;
            }
        }
        
        this.saveStats();
        this.checkAchievements();
    }
    
    /**
     * 检查成就
     */
    checkAchievements() {
        let changed = false;
        
        for (const achievement of this.achievements) {
            if (achievement.unlocked) {
                continue;
            }
            
            let progress = 0;
            
            switch (achievement.condition) {
                case 'catch_count':
                    progress = this.stats.totalCatchCount;
                    break;
                case 'single_score':
                    progress = this.stats.maxSingleScore;
                    break;
                case 'rare_catch':
                    progress = this.stats.rareFishCount;
                    break;
                case 'equipment_max':
                    progress = this.getMaxEquipmentLevel();
                    break;
                case 'combo':
                    progress = this.stats.maxCombo;
                    break;
            }
            
            achievement.progress = progress;
            
            if (progress >= achievement.target) {
                achievement.unlocked = true;
                this.unlockAchievement(achievement);
                changed = true;
            }
        }
        
        if (changed) {
            this.saveAchievements();
            this.updateUI();
        }
    }
    
    /**
     * 解锁成就
     */
    unlockAchievement(achievement: Achievement) {
        console.log(`🏆 成就解锁：${achievement.name}`);
        console.log(`   描述：${achievement.description}`);
        console.log(`   奖励：${achievement.reward} 金币`);
        
        // 给予奖励
        const GameManager = require('./GameManager').GameManager;
        const gameManager = GameManager.getInstance();
        if (gameManager) {
            gameManager.score += achievement.reward;
        }
        
        // 播放成就解锁音效
        const AudioManager = require('./AudioManager').AudioManager;
        const audioManager = AudioManager.getInstance();
        if (audioManager) {
            audioManager.playLevelUpSound();
        }
    }
    
    /**
     * 获取最高装备等级
     */
    getMaxEquipmentLevel(): number {
        const GameManager = require('./GameManager').GameManager;
        const gameManager = GameManager.getInstance();
        if (!gameManager) {
            return 0;
        }
        
        const rodLevel = gameManager.getEquipmentLevel('rod');
        const lineLevel = gameManager.getEquipmentLevel('line');
        const baitLevel = gameManager.getEquipmentLevel('bait');
        
        return Math.max(rodLevel, lineLevel, baitLevel);
    }
    
    /**
     * 保存成就数据
     */
    saveAchievements() {
        sys.localStorage.setItem('fishing_achievements', JSON.stringify(this.achievements));
    }
    
    /**
     * 加载成就数据
     */
    loadAchievements() {
        const dataStr = sys.localStorage.getItem('fishing_achievements');
        if (dataStr) {
            try {
                const data = JSON.parse(dataStr);
                // 合并保存的数据
                for (let i = 0; i < Math.min(data.length, this.achievements.length); i++) {
                    this.achievements[i].unlocked = data[i].unlocked || false;
                    this.achievements[i].progress = data[i].progress || 0;
                }
            } catch (e) {
                console.error('Failed to load achievements:', e);
            }
        }
    }
    
    /**
     * 保存统计数据
     */
    saveStats() {
        sys.localStorage.setItem('fishing_stats', JSON.stringify(this.stats));
    }
    
    /**
     * 加载统计数据
     */
    loadStats() {
        const dataStr = sys.localStorage.getItem('fishing_stats');
        if (dataStr) {
            try {
                const data = JSON.parse(dataStr);
                this.stats = { ...this.stats, ...data };
            } catch (e) {
                console.error('Failed to load stats:', e);
            }
        }
    }
    
    /**
     * 更新 UI 显示
     */
    updateUI() {
        if (this.achievementLabel) {
            const unlockedCount = this.achievements.filter(a => a.unlocked).length;
            const totalCount = this.achievements.length;
            this.achievementLabel.string = `成就：${unlockedCount}/${totalCount}`;
        }
    }
    
    /**
     * 获取成就列表
     */
    getAchievements(): Achievement[] {
        return this.achievements;
    }
    
    /**
     * 获取解锁的成就数量
     */
    getUnlockedCount(): number {
        return this.achievements.filter(a => a.unlocked).length;
    }
    
    onDestroy() {
        AchievementManager.instance = null;
    }
}
