import { defineStore } from 'pinia';
import type { ConfigProviderThemeVars } from 'wot-design-uni';
/**
 * 主题色选项接口
 */
export interface ThemeColorOption {
  name: string;
  value: string;
  primary: string;
}

/**
 * 主题类型
 */
export type ThemeMode = 'light' | 'dark';

/**
 * 主题状态接口
 */
export interface ThemeState {
  theme: ThemeMode;
  followSystem: boolean;
  hasUserSet: boolean;
  currentThemeColor: ThemeColorOption;
  themeVars: ConfigProviderThemeVars;
}

/**
 * 系统主题状态接口（简化版）
 */
export interface SystemThemeState {
  theme: ThemeMode;
  themeVars: ConfigProviderThemeVars;
}

/**
 * 预定义的主题色选项
 */
export const themeColorOptions: ThemeColorOption[] = [
  { name: '默认蓝', value: 'blue', primary: '#4D7FFF' },
  { name: '活力橙', value: 'orange', primary: '#FF7D00' },
  { name: '薄荷绿', value: 'green', primary: '#07C160' },
  { name: '樱花粉', value: 'pink', primary: '#FF69B4' },
  { name: '紫罗兰', value: 'purple', primary: '#8A2BE2' },
  { name: '朱砂红', value: 'red', primary: '#FF4757' }
];

export const useThemeStore = defineStore('theme', {
  state: (): ThemeState => ({
    theme: 'light',
    followSystem: true, // 是否跟随系统主题
    hasUserSet: false, // 用户是否手动设置过主题
    currentThemeColor: themeColorOptions[0],
    themeVars: {
      darkBackground: '#0f0f0f',
      darkBackground2: '#1a1a1a',
      darkBackground3: '#242424',
      darkBackground4: '#2f2f2f',
      darkBackground5: '#3d3d3d',
      darkBackground6: '#4a4a4a',
      darkBackground7: '#606060',
      darkColor: '#ffffff',
      darkColor2: '#e0e0e0',
      darkColor3: '#a0a0a0',
      colorTheme: themeColorOptions[0].primary
    }
  }),

  getters: {
    isDark: state => state.theme === 'dark'
  },

  actions: {
    /**
     * 手动切换主题
     * @param mode 指定主题模式，不传则自动切换
     */
    toggleTheme(mode?: ThemeMode) {
      this.theme = mode || (this.theme === 'light' ? 'dark' : 'light');
      this.hasUserSet = true; // 标记用户已手动设置
      this.followSystem = false; // 不再跟随系统
      this.setNavigationBarColor();
    },

    /**
     * 设置是否跟随系统主题
     * @param follow 是否跟随系统
     */
    setFollowSystem(follow: boolean) {
      this.followSystem = follow;
      if (follow) {
        this.hasUserSet = false;
        this.initTheme(); // 重新获取系统主题
      }
    },

    /**
     * 设置导航栏颜色
     */
    setNavigationBarColor() {
      uni.setNavigationBarColor({
        frontColor: this.theme === 'light' ? '#000000' : '#ffffff',
        backgroundColor: this.theme === 'light' ? '#ffffff' : '#000000'
      });
    },

    /**
     * 设置主题色
     * @param color 主题色选项
     */
    setCurrentThemeColor(color: ThemeColorOption) {
      this.currentThemeColor = color;
      this.themeVars.colorTheme = color.primary;
    },

    /**
     * 获取系统主题
     * @returns 系统主题模式
     */
    getSystemTheme(): ThemeMode {
      // #ifdef MP-WEIXIN
      // 微信小程序使用 getAppBaseInfo
      const appBaseInfo = uni.getAppBaseInfo();
      if (appBaseInfo && appBaseInfo.theme) {
        return appBaseInfo.theme as ThemeMode;
      }
      // #endif

      // #ifndef MP-WEIXIN
      // 其他平台使用 getSystemInfoSync
      const systemInfo = uni.getSystemInfoSync();
      if (systemInfo && systemInfo.theme) {
        return systemInfo.theme as ThemeMode;
      }
      // #endif

      return 'light'; // 默认返回 light
    },

    /**
     * 设置主题（仅内部使用）
     * @param theme 主题模式
     */
    setTheme(theme: ThemeMode) {
      this.theme = theme;
    },

    /**
     * 初始化主题
     */
    initTheme() {
      // 如果用户已手动设置且不跟随系统，保持当前主题
      if (this.hasUserSet && !this.followSystem) {
        console.log('使用用户设置的主题:', this.theme);
        this.setNavigationBarColor();
        return;
      }

      // 获取系统主题
      const systemTheme = this.getSystemTheme();

      // 如果是首次启动或跟随系统，使用系统主题
      if (!this.hasUserSet || this.followSystem) {
        this.theme = systemTheme;
        if (!this.hasUserSet) {
          this.followSystem = true;
          console.log('首次启动，使用系统主题:', this.theme);
        } else {
          console.log('跟随系统主题:', this.theme);
        }
      }

      this.setNavigationBarColor();
    },

    /**
     * 初始化系统主题
     */
    initSystemTheme() {
      const systemTheme = this.getSystemTheme();
      this.theme = systemTheme;
      console.log('初始化系统主题:', this.theme);
    }
  }
});
