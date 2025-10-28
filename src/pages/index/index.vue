<template>
  <demo-block title="基础设置" transparent>
    <wd-cell-group border round>
      <wd-cell title="跳转空白页" is-link @click="handlePage('/pages/empty/index')"></wd-cell>
    </wd-cell-group>
  </demo-block>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import DemoBlock from '@/components/DemoBlock.vue';
import { useRouter } from 'uni-mini-router';

definePage({
  name: 'home',
  layout: 'tabbar',
  style: {
    navigationBarTitleText: '首页',
    navigationStyle: 'custom'
  }
});

const router = useRouter();

const handlePage = (path: string) => {
  router.push(path);
};

onLoad(() => {
  console.log('home onLoad');
});
</script>

<style lang="scss" scoped></style>
