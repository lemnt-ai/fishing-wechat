import { _decorator, Component, Node, Label, sys, AudioClip } from 'cc';
const { ccclass, property } = _decorator;

/**
 * 每日任务数据
 */
export interface DailyTask {
    id: string;
    name: string;
    description: string;
    condition: string;
    target: number;
    reward: number;
    completed: boolean;
    progress: number;
    claimed: boolean;
}

/**
 * 每日任务管理器
 * 管理每日任务和奖励领取
 */
@ccclass('DailyTaskManager')
export class DailyTaskManager extends Component {
    @property(Label)
    public taskLabel: Label = null!;
    
    // 每日任务池
    private taskPool: any[] = [
        { id: 'catch_5', name: '新手钓鱼', description: '捕获 5 条鱼', condition: 'catch_count', target: 5, reward: 100 },
        { id: 'catch_15', name: '钓鱼爱好者', description: '捕获 15 条鱼', condition: 'catch_count', target: 15, reward: 200 },
        { id: 'score_300', name: '高分挑战', description: '单局获得 300 分', condition: 'single_score', target: 300, reward: 150 },
        { id: 'score_600', name: '钓鱼高手', description: '单局获得 600 分', condition: 'single_score', target: 600, reward: 300 },
        { id: 'rare_1', name: '稀有收获', description: '捕获 1 条稀有鱼', condition: 'rare_catch', target: 1, reward: 250 },
        { id: 'rare_3', name: '宝藏猎人', description: '捕获 3 条稀有鱼', condition: 'rare_catch', target: 3, reward: 500 },
        { id: 'combo_5', name: '连击高手', description: '达成 5 连击', condition: 'combo', target: 5, reward: 200 },
        { id: 'combo_10', name: '连击大师', description: '达成 10 连击', condition: 'combo', target: 10, reward: 400 },
        { id: 'perfect', name: '完美一局', description: '时间结束前捕获 20 条鱼', condition: 'perfect_game', target: 20, reward: 600 },
        { id: 'upgrade_1', name: '装备升级', description: '升级任意装备 1 次', condition: 'upgrade', target: 1, reward: 150 }
    ];
    
    // 当前每日任务（每天 3 个）
    private dailyTasks: DailyTask[] = [];
    
    // 上次刷新日期
    private lastRefreshDate: string = '';
    
    // 单例
    private static instance: DailyTaskManager | null = null;
    public static getInstance(): DailyTaskManager | null {
        return DailyTaskManager.instance;
    }
    
    onLoad() {
        DailyTaskManager.instance = this;
        this.loadTasks();
        this.checkDateRefresh();
    }
    
    start() {
        this.updateUI();
    }
    
    /**
     * 检查是否需要刷新任务（新的一天）
     */
    checkDateRefresh() {
        const today = new Date().toDateString();
        
        if (this.lastRefreshDate !== today) {
            console.log('New day! Refreshing daily tasks...');
            this.refreshDailyTasks();
            this.lastRefreshDate = today;
            this.saveTasks();
        }
    }
    
    /**
     * 刷新每日任务
     */
    refreshDailyTasks() {
        // 随机选择 3 个任务
        const shuffled = [...this.taskPool].sort(() => Math.random() - 0.5);
        const selected = shuffled.slice(0, 3);
        
        this.dailyTasks = selected.map(task => ({
            ...task,
            completed: false,
            progress: 0,
            claimed: false
        }));
        
        console.log('Daily tasks refreshed:', this.dailyTasks.map(t => t.name));
    }
    
    /**
     * 更新任务进度
     */
    updateTaskProgress(condition: string, value: number) {
        let changed = false;
        
        for (const task of this.dailyTasks) {
            if (task.completed || task.claimed) {
                continue;
            }
            
            if (task.condition === condition) {
                task.progress = Math.min(task.progress + value, task.target);
                
                if (task.progress >= task.target) {
                    task.completed = true;
                    console.log(`📋 任务完成：${task.name}`);
                }
                
                changed = true;
            }
        }
        
        if (changed) {
            this.saveTasks();
            this.updateUI();
        }
    }
    
    /**
     * 领取任务奖励
     */
    claimReward(taskIndex: number) {
        if (taskIndex < 0 || taskIndex >= this.dailyTasks.length) {
            return;
        }
        
        const task = this.dailyTasks[taskIndex];
        
        if (!task.completed || task.claimed) {
            console.log('Cannot claim reward');
            return;
        }
        
        // 给予奖励
        task.claimed = true;
        
        const GameManager = require('./GameManager').GameManager;
        const gameManager = GameManager.getInstance();
        if (gameManager) {
            gameManager.score += task.reward;
        }
        
        console.log(`🎁 领取任务奖励：${task.name} +${task.reward}金币`);
        
        this.saveTasks();
        this.updateUI();
    }
    
    /**
     * 获取所有任务状态
     */
    getTasks(): DailyTask[] {
        return this.dailyTasks;
    }
    
    /**
     * 获取已完成但未领取的任务数
     */
    getClaimableCount(): number {
        return this.dailyTasks.filter(t => t.completed && !t.claimed).length;
    }
    
    /**
     * 更新 UI 显示
     */
    updateUI() {
        if (this.taskLabel) {
            const completed = this.dailyTasks.filter(t => t.completed).length;
            const claimed = this.dailyTasks.filter(t => t.claimed).length;
            this.taskLabel.string = `今日任务：${completed}/3 (已领：${claimed})`;
        }
    }
    
    /**
     * 保存任务数据
     */
    saveTasks() {
        const data = {
            lastRefreshDate: this.lastRefreshDate,
            tasks: this.dailyTasks
        };
        sys.localStorage.setItem('fishing_daily_tasks', JSON.stringify(data));
    }
    
    /**
     * 加载任务数据
     */
    loadTasks() {
        const dataStr = sys.localStorage.getItem('fishing_daily_tasks');
        if (dataStr) {
            try {
                const data = JSON.parse(dataStr);
                this.lastRefreshDate = data.lastRefreshDate || '';
                this.dailyTasks = data.tasks || [];
                
                // 验证任务数量
                if (this.dailyTasks.length !== 3) {
                    this.refreshDailyTasks();
                }
            } catch (e) {
                console.error('Failed to load daily tasks:', e);
                this.refreshDailyTasks();
            }
        } else {
            this.refreshDailyTasks();
        }
    }
    
    onDestroy() {
        DailyTaskManager.instance = null;
    }
}
