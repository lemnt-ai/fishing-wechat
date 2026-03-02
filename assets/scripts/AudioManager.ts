import { _decorator, Component, Node, AudioClip, AudioSource, sys } from 'cc';
const { ccclass, property } = _decorator;

/**
 * 音效管理器
 * 管理背景音乐和游戏音效
 */
@ccclass('AudioManager')
export class AudioManager extends Component {
    @property(AudioClip)
    public bgm: AudioClip = null!; // 背景音乐
    
    @property(AudioClip)
    public castSound: AudioClip = null!; // 下放鱼钩音效
    
    @property(AudioClip)
    public catchSound: AudioClip = null!; // 捕获鱼音效
    
    @property(AudioClip)
    public levelUpSound: AudioClip = null!; // 升级音效
    
    @property(AudioClip)
    public gameOverSound: AudioClip = null!; // 游戏结束音效
    
    @property(AudioClip)
    public buttonClickSound: AudioClip = null!; // 按钮点击音效
    
    @property
    public bgmVolume: number = 0.5; // 背景音乐音量
    
    @property
    public sfxVolume: number = 0.8; // 音效音量
    
    private bgmSource: AudioSource | null = null;
    private sfxSource: AudioSource | null = null;
    private isBgmPlaying: boolean = false;
    
    // 单例
    private static instance: AudioManager | null = null;
    public static getInstance(): AudioManager | null {
        return AudioManager.instance;
    }
    
    onLoad() {
        AudioManager.instance = this;
        
        // 创建音频源
        this.bgmSource = this.node.addComponent(AudioSource);
        this.sfxSource = this.node.addComponent(AudioSource);
        
        // 加载音量设置
        this.loadVolumeSettings();
    }
    
    start() {
        // 开始播放背景音乐
        this.playBGM();
    }
    
    /**
     * 播放背景音乐
     */
    playBGM() {
        if (!this.bgm) {
            return;
        }
        
        if (this.bgmSource) {
            this.bgmSource.clip = this.bgm;
            this.bgmSource.volume = this.bgmVolume;
            this.bgmSource.loop = true;
            this.bgmSource.play();
            this.isBgmPlaying = true;
        }
    }
    
    /**
     * 停止背景音乐
     */
    stopBGM() {
        if (this.bgmSource && this.isBgmPlaying) {
            this.bgmSource.stop();
            this.isBgmPlaying = false;
        }
    }
    
    /**
     * 暂停背景音乐
     */
    pauseBGM() {
        if (this.bgmSource && this.isBgmPlaying) {
            this.bgmSource.pause();
        }
    }
    
    /**
     * 恢复背景音乐
     */
    resumeBGM() {
        if (this.bgmSource && this.isBgmPlaying) {
            this.bgmSource.play();
        }
    }
    
    /**
     * 播放音效
     */
    playSFX(sound: AudioClip) {
        if (!sound || !this.sfxSource) {
            return;
        }
        
        // 创建临时音频源播放音效
        const tempSource = this.node.addComponent(AudioSource);
        tempSource.clip = sound;
        tempSource.volume = this.sfxVolume;
        tempSource.play();
        
        // 播放完成后移除组件
        setTimeout(() => {
            if (tempSource && tempSource.isValid) {
                tempSource.destroy();
            }
        }, sound.duration * 1000);
    }
    
    /**
     * 播放下放鱼钩音效
     */
    playCastSound() {
        this.playSFX(this.castSound);
    }
    
    /**
     * 播放捕获鱼音效
     */
    playCatchSound() {
        this.playSFX(this.catchSound);
    }
    
    /**
     * 播放升级音效
     */
    playLevelUpSound() {
        this.playSFX(this.levelUpSound);
    }
    
    /**
     * 播放游戏结束音效
     */
    playGameOverSound() {
        this.playSFX(this.gameOverSound);
    }
    
    /**
     * 播放按钮点击音效
     */
    playButtonClickSound() {
        this.playSFX(this.buttonClickSound);
    }
    
    /**
     * 设置背景音乐音量
     */
    setBGMVolume(volume: number) {
        this.bgmVolume = Math.max(0, Math.min(1, volume));
        if (this.bgmSource) {
            this.bgmSource.volume = this.bgmVolume;
        }
        this.saveVolumeSettings();
    }
    
    /**
     * 设置音效音量
     */
    setSFXVolume(volume: number) {
        this.sfxVolume = Math.max(0, Math.min(1, volume));
        this.saveVolumeSettings();
    }
    
    /**
     * 静音切换
     */
    toggleMute() {
        if (this.bgmSource) {
            const isMuted = this.bgmSource.mute;
            this.bgmSource.mute = !isMuted;
            this.sfxSource.mute = !isMuted;
        }
    }
    
    /**
     * 保存音量设置
     */
    saveVolumeSettings() {
        const data = {
            bgmVolume: this.bgmVolume,
            sfxVolume: this.sfxVolume
        };
        sys.localStorage.setItem('fishing_audio_settings', JSON.stringify(data));
    }
    
    /**
     * 加载音量设置
     */
    loadVolumeSettings() {
        const dataStr = sys.localStorage.getItem('fishing_audio_settings');
        if (dataStr) {
            try {
                const data = JSON.parse(dataStr);
                this.bgmVolume = data.bgmVolume || 0.5;
                this.sfxVolume = data.sfxVolume || 0.8;
            } catch (e) {
                console.error('Failed to load audio settings:', e);
            }
        }
    }
    
    onDestroy() {
        AudioManager.instance = null;
        this.stopBGM();
    }
}
