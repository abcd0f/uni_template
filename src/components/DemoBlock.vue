<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps({
  // 标题
  title: {
    type: String,
    default: ''
  },
  // 自定义类名
  customClass: {
    type: String,
    default: ''
  },
  // 垂直间距
  ver: {
    type: [Number, String],
    default: 10
  },
  // 水平间距
  hor: {
    type: [Number, String],
    default: 15
  },
  // 是否透明
  transparent: {
    type: Boolean,
    default: false
  }
});

const style = computed(() => {
  return `margin: 0 ${props.hor}px;padding:${props.ver}px 0;`;
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
  <view class="container" :class="[transparent ? '' : 'container-bg', customClass]">
    <view class="title">
      {{ title }}
    </view>
    <view :style="transparent ? '' : style">
      <slot />
    </view>
  </view>
</template>

<style lang="scss" scoped>
.container {
  margin-bottom: 0.75rem;
  box-sizing: border-box;
  width: 100%;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  color: #6b7280;

  &:last-child {
    margin-bottom: 0;
  }

  &.dark {
    color: #d1d5db;
  }
}

.container-bg {
  background-color: #fff;

  &.dark {
    background-color: var(--wot-dark-background2);
  }
}

.title {
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  font-size: 26rpx;
}
</style>
