<template>
  <view>
    <demo-block title="基础设置" transparent>
      <wd-cell-group border round>
        <!-- 暗黑模式切换 -->
        <wd-cell title="暗黑模式">
          <wd-switch v-model="isDark" size="18px" @change="toggleTheme()" />
        </wd-cell>
        <wd-cell title="选择主题色" is-link @click="openThemeColorPicker">
          <view class="flex">
            <view class="theme-color" :style="{ backgroundColor: currentThemeColor.primary }" />
            <text>{{ currentThemeColor.name }}</text>
          </view>
        </wd-cell>
      </wd-cell-group>
    </demo-block>

    <!-- 主题色选择 ActionSheet -->
    <wd-action-sheet
      v-model="showThemeColorSheet"
      title="选择主题色"
      :close-on-click-action="true"
      @cancel="closeThemeColorPicker"
    >
      <view class="theme-color-list">
        <view
          v-for="option in themeColorOptions"
          :key="option.value"
          class="theme-color-item"
          @click="handleThemeColorSelect(option)"
        >
          <view class="theme-color-info">
            <view class="color-circle" :style="{ backgroundColor: option.primary }"></view>
            <text class="color-name">{{ option.name }}</text>
          </view>
          <wd-icon v-if="currentThemeColor.value === option.value" name="check" :color="option.primary" size="20px" />
        </view>
      </view>
      <wd-gap :height="50" />
    </wd-action-sheet>
  </view>
</template>

<script setup lang="ts">
import { useTheme } from '@/utils/useTheme';
import DemoBlock from '@/components/DemoBlock.vue';

const {
  isDark,
  currentThemeColor,
  showThemeColorSheet,
  themeColorOptions,
  toggleTheme,
  openThemeColorPicker,
  closeThemeColorPicker,
  selectThemeColor
} = useTheme();

// 处理主题色选择
const handleThemeColorSelect = (option: any) => {
  selectThemeColor(option);
};
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;
}
.theme-color {
  width: 16px;
  height: 16px;
  border-radius: 50%;
}

.theme-color-list {
  padding: 0 1rem 1rem;

  .theme-color-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 0;
    border-bottom: 1px solid var(--wot-dark-color2);
    cursor: pointer;

    &:last-child {
      border-bottom: 0;
    }

    .theme-color-info {
      display: flex;
      align-items: center;
      gap: 0.75rem; // gap-3

      .color-circle {
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 50%;
      }
    }
  }
}
</style>

<route lang="json">
{
  "name": "my",
  "layout": "tabbar",
  "style": {
    "navigationBarTitleText": "我的",
    "navigationStyle": "custom"
  }
}
</route>
