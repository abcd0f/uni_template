import { ref, computed, onBeforeMount, onUnmounted } from 'vue';
import { onShow } from '@dcloudio/uni-app';
import type { ThemeColorOption, ThemeMode } from '@/store/theme';
import { themeColorOptions } from '@/store/theme';
import { useThemeStore } from '@/store/theme';

export function useTheme() {
  const store = useThemeStore();
  const showThemeColorSheet = ref(false);

  /**
   * 切换暗黑模式
   * @param mode 指定主题模式，不传则自动切换
   */
  function toggleTheme(mode?: ThemeMode) {
    store.toggleTheme(mode);
  }

  /**
   * 打开主题色选择器
   */
  function openThemeColorPicker() {
    showThemeColorSheet.value = true;
  }

  /**
   * 关闭主题色选择器
   */
  function closeThemeColorPicker() {
    showThemeColorSheet.value = false;
  }

  /**
   * 选择主题色
   * @param option 主题色选项
   */
  function selectThemeColor(option: ThemeColorOption) {
    store.setCurrentThemeColor(option);
    closeThemeColorPicker();
  }

  /**
   * 初始化主题
   */
  function initTheme() {
    store.initTheme();
  }

  // 组件挂载前初始化主题
  onBeforeMount(() => {
    initTheme();

    // 监听系统主题变化
    if (typeof uni !== 'undefined' && uni.onThemeChange) {
      uni.onThemeChange(res => {
        if (store.followSystem) {
          toggleTheme(res.theme as ThemeMode);
        }
      });
    }
  });

  // 页面显示时更新导航栏颜色，确保每次切换页面时导航栏颜色都是正确的
  onShow(() => {
    store.setNavigationBarColor();
  });

  // 组件卸载时清理监听
  onUnmounted(() => {
    if (typeof uni !== 'undefined' && uni.offThemeChange) {
      uni.offThemeChange(res => {
        if (store.followSystem) {
          toggleTheme(res.theme as ThemeMode);
        }
      });
    }
  });

  return {
    // 状态
    theme: computed(() => store.theme),
    isDark: computed(() => store.isDark),
    followSystem: computed(() => store.followSystem),
    hasUserSet: computed(() => store.hasUserSet),
    currentThemeColor: computed(() => store.currentThemeColor),
    themeVars: computed(() => store.themeVars),
    showThemeColorSheet,

    // 常量
    themeColorOptions,

    // 方法
    initTheme,
    toggleTheme,
    setFollowSystem: store.setFollowSystem,
    openThemeColorPicker,
    closeThemeColorPicker,
    selectThemeColor
  };
}

// 导出类型和常量供外部使用
export type { ThemeColorOption, ThemeMode };
export { themeColorOptions };
