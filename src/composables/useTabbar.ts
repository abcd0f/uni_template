import { computed, ref } from 'vue';

export interface TabbarItem {
  name: string;
  value: number | null;
  active: boolean;
  title: string;
  icon: string;
}

const tabbarItems = ref<TabbarItem[]>([
  { name: 'home', value: null, active: true, title: '首页', icon: 'home' },
  { name: 'my', value: null, active: false, title: '我的', icon: 'user' }
]);

/**
 * 导出一个名为 useTabbar 的函数组件，用于管理底部导航栏的状态和行为
 * 该函数提供了一系列操作导航栏的方法和计算属性
 */
export function useTabbar() {
  /**
   * 计算属性，返回整个导航栏列表
   * 通过 computed 包装 tabbarItems 的响应式数据
   */
  const tabbarList = computed(() => tabbarItems.value);

  /**
   * 计算属性，获取当前激活的导航栏项
   * 遍历导航栏列表，找到 active 为 true 的项
   * 如果没有激活项，则默认返回列表中的第一项
   */
  const activeTabbar = computed(() => {
    const item = tabbarItems.value.find(item => item.active);
    return item || tabbarItems.value[0];
  });

  /**
   * 根据名称获取导航栏项的值
   * @param name - 要查找的导航栏项的名称
   * @returns 如果找到对应项且该项有值，则返回该值，否则返回 null
   */
  const getTabbarItemValue = (name: string) => {
    const item = tabbarItems.value.find(item => item.name === name);
    return item && item.value ? item.value : null;
  };

  /**
   * 设置指定导航栏项的值
   * @param name - 要设置的导航栏项的名称
   * @param value - 要设置的值
   */
  const setTabbarItem = (name: string, value: number) => {
    const tabbarItem = tabbarItems.value.find(item => item.name === name);
    if (tabbarItem) {
      tabbarItem.value = value;
    }
  };

  /**
   * 设置底部导航栏激活项
   * @param name - 要激活的导航项名称
   */
  const setTabbarItemActive = (name: string) => {
    tabbarItems.value.forEach(item => {
      if (item.name === name) {
        item.active = true;
      } else {
        item.active = false;
      }
    });
  };

  return {
    tabbarList,
    activeTabbar,
    getTabbarItemValue,
    setTabbarItem,
    setTabbarItemActive
  };
}
