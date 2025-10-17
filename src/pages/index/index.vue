<template>
  <view class="text"></view>
</template>

<script setup lang="ts">
definePage({
  name: 'home',
  layout: 'tabbar',
  style: {
    navigationBarTitleText: '首页',
    navigationStyle: 'custom'
  }
});

import { onLoad } from '@dcloudio/uni-app';

onLoad(() => {
  console.log('home onLoad');
});
</script>

<style lang="scss" scoped></style>
