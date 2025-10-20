<script lang="ts" setup>
import { useRoute, useRouter } from 'uni-mini-router';
import { nextTick, onMounted } from 'vue';
import { useTheme } from '@/hooks/useTheme';
import { useTabbar, type TabbarItem } from '@/hooks/useTabbar';

const { themeVars, theme } = useTheme();

const router = useRouter();

const route = useRoute();

const tabbarList: TabbarItem[] = [
  { name: 'home', value: null, active: true, title: '首页', icon: 'home' },
  { name: 'my', value: null, active: false, title: '我的', icon: 'user' }
];

const { activeTabbar, getTabbarItemValue, setTabbarItemActive } = useTabbar(tabbarList);

const handleTabbarChange = ({ value }: { value: string }) => {
  setTabbarItemActive(value);
  router.pushTab({ name: value });
};

onMounted(() => {
  // #ifdef APP-PLUS
  uni.hideTabBar();
  // #endif
  nextTick(() => {
    if (route.name && route.name !== activeTabbar.value.name) {
      setTabbarItemActive(route.name);
    }
  });
});
</script>

<script lang="ts">
export default {
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
};
</script>

<template>
  <wd-config-provider :theme-vars="themeVars" :custom-class="`page-wraper ${theme}`" :theme="theme">
    <slot />
    <wd-tabbar
      :model-value="activeTabbar.name"
      bordered
      safe-area-inset-bottom
      placeholder
      fixed
      @change="handleTabbarChange"
    >
      <wd-tabbar-item
        v-for="(item, index) in tabbarList"
        :key="index"
        :name="item.name"
        :value="getTabbarItemValue(item.name)"
        :title="item.title"
        :icon="item.icon"
      />
    </wd-tabbar>
    <wd-notify />
    <wd-message-box />
    <wd-toast />
  </wd-config-provider>
</template>

<style lang="scss">
.page-wraper {
  min-height: calc(100vh - var(--window-top));
  box-sizing: border-box;
  background: #f9f9f9;
}

.wot-theme-dark.page-wraper {
  background: #222;
}
</style>
