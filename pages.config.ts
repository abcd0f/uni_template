/**
 * @see https://uni-helper.js.org/vite-plugin-uni-pages
 */
import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages';

import path from 'node:path';
import process from 'node:process';
import { loadEnv } from 'vite';


// 手动解析命令行参数获取 mode
function getMode() {
  const args = process.argv.slice(2);
  const modeFlagIndex = args.findIndex(arg => arg === '--mode');
  return modeFlagIndex !== -1 ? args[modeFlagIndex + 1] : args[0] === 'build' ? 'production' : 'development'; // 默认 development
}
// 获取环境变量的范例
const env = loadEnv(getMode(), path.resolve(process.cwd()));

const { VITE_TITLE_TEXT } = env;


export default defineUniPages({
  easycom: {
    autoscan: true,
    custom: {
      '^wd-(.*)': 'wot-design-uni/components/wd-$1/wd-$1.vue'
    }
  },
  pages: [],
  globalStyle: {
    // 导航栏配置
    navigationBarBackgroundColor: '@navBgColor',
    navigationBarTextStyle: '@navTxtStyle',
    navigationBarTitleText: VITE_TITLE_TEXT,

    // 页面背景配置
    backgroundColor: '@bgColor',
    backgroundTextStyle: '@bgTxtStyle',
    backgroundColorTop: '@bgColorTop',
    backgroundColorBottom: '@bgColorBottom',

    // 下拉刷新配置
    enablePullDownRefresh: false,
    onReachBottomDistance: 50,

    // 动画配置
    animationType: 'pop-in',
    animationDuration: 300,
    "app-plus": {
      bounce: "none"
    }
  },
  tabBar: {
    custom: true,
    // #ifdef MP-ALIPAY
    customize: true,
    // 暂时不生效。4.71.2025061206-alpha已修复：https://uniapp.dcloud.net.cn/release-note-alpha.html#_4-71-2025061206-alpha，我们等正式版发布后更新。
    overlay: true,
    // #endif
    height: '0',
    color: '@tabColor',
    selectedColor: '@tabSelectedColor',
    backgroundColor: '@tabBgColor',
    borderStyle: '@tabBorderStyle',
    list: [
      {
        pagePath: 'pages/index/index'
      },
      {
        pagePath: 'pages/my/index'
      }
    ]
  }
});
