import path from 'node:path';
import process from 'node:process';

import { defineManifestConfig } from '@uni-helper/vite-plugin-uni-manifest';
import { loadEnv } from 'vite';

// 手动解析命令行参数获取 mode
function getMode() {
  const args = process.argv.slice(2);
  const modeFlagIndex = args.findIndex(arg => arg === '--mode');
  return modeFlagIndex !== -1 ? args[modeFlagIndex + 1] : args[0] === 'build' ? 'production' : 'development'; // 默认 development
}
// 获取环境变量的范例
const env = loadEnv(getMode(), path.resolve(process.cwd()));

const { VITE_APP_TITLE, VITE_UNI_APPID, VITE_WX_APPID, VITE_PUBLIC_PATH } = env;

export default defineManifestConfig({
  name: VITE_APP_TITLE,
  appid: VITE_UNI_APPID,
  description: '',
  versionName: '1.0.0',
  versionCode: '100',
  transformPx: false,
  uniStatistics: {
    enable: false
  },
  'app-plus': {
    darkmode: true,
    themeLocation: 'theme.json',
    usingComponents: true,
    nvueStyleCompiler: 'uni-app',
    compilerVersion: 3,
    splashscreen: {
      alwaysShowBeforeRender: true,
      waiting: true,
      autoclose: true,
      delay: 0
    },
    modules: {},
    distribute: {
      android: {
        permissions: [
          '<uses-permission android:name="android.permission.CHANGE_NETWORK_STATE"/>',
          '<uses-permission android:name="android.permission.MOUNT_UNMOUNT_FILESYSTEMS"/>',
          '<uses-permission android:name="android.permission.VIBRATE"/>',
          '<uses-permission android:name="android.permission.READ_LOGS"/>',
          '<uses-permission android:name="android.permission.ACCESS_WIFI_STATE"/>',
          '<uses-feature android:name="android.hardware.camera.autofocus"/>',
          '<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>',
          '<uses-permission android:name="android.permission.CAMERA"/>',
          '<uses-permission android:name="android.permission.GET_ACCOUNTS"/>',
          '<uses-permission android:name="android.permission.READ_PHONE_STATE"/>',
          '<uses-permission android:name="android.permission.CHANGE_WIFI_STATE"/>',
          '<uses-permission android:name="android.permission.WAKE_LOCK"/>',
          '<uses-permission android:name="android.permission.FLASHLIGHT"/>',
          '<uses-feature android:name="android.hardware.camera"/>',
          '<uses-permission android:name="android.permission.WRITE_SETTINGS"/>'
        ],
        abiFilters: ['armeabi-v7a', 'arm64-v8a', 'x86'],
        minSdkVersion: 21
      },

      ios: {},

      sdkConfigs: {}
    }
  },

  quickapp: {},

  'mp-weixin': {
    appid: VITE_WX_APPID,
    setting: {
      urlCheck: false,
      es6: true, // es6转es5
      postcss: true, // 上传代码时样式自动补全
      minified: true // 上传代码时自动压缩
    },
    usingComponents: true,
    darkmode: true,
    themeLocation: 'theme.json'
  },
  'mp-alipay': {
    usingComponents: true
  },
  'mp-baidu': {
    usingComponents: true
  },
  'mp-toutiao': {
    usingComponents: true
  },
  h5: {
    darkmode: true,
    themeLocation: 'theme.json',
    router: {
      base: VITE_PUBLIC_PATH
    },
    // 启动摇树优化
    optimization: {
      treeShaking: {
        enable: true
      }
    }
  },
  vueVersion: '3'
});
