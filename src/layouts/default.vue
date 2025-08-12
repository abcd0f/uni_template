<script lang="ts" setup></script>

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
  <wd-config-provider>
    <!-- <wd-config-provider :theme-vars="themeVars" :theme="theme" :custom-class="`page-wraper ${theme}`"> -->
    <slot />
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
