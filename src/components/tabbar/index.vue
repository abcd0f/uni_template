<template>
  <wd-tabbar v-model="tabbar" fixed bordered safeAreaInsetBottom placeholder @change="handleChange">
    <wd-tabbar-item v-for="(item, index) in items" :key="index" :icon="item.icon" :title="item.title" />
  </wd-tabbar>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const props = withDefaults(defineProps<{ value?: number }>(), {
  value: 1
});

const tabbar = computed(() => props.value);

const items = [
  { title: '首页', icon: 'home' },
  { title: '打开', icon: 'cart' },
  { title: '进度', icon: 'user' },
  { title: '我的', icon: 'user' }
];

const handleChange = ({ value }: { value: '0' | '1' | '2' | '3' }) => {
  const MAP: Record<'0' | '1' | '2' | '3', string> = {
    0: '/pages/index/index',
    1: '/pages/clock/index',
    2: '/pages/progress/index',
    3: '/pages/my/index'
  };

  uni.switchTab({
    url: MAP[value]
  });
};
</script>

<style scoped></style>
