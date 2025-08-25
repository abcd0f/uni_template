import { fileURLToPath, URL } from 'node:url';
import process from 'node:process';

import UniManifest from '@uni-helper/vite-plugin-uni-manifest';
import uni from '@dcloudio/vite-plugin-uni';
import UniLayouts from '@uni-helper/vite-plugin-uni-layouts';
import UniPages from '@uni-helper/vite-plugin-uni-pages';
import { defineConfig, loadEnv, type ConfigEnv, type UserConfigExport } from 'vite';

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  // mode: 区分生产环境还是开发环境
  console.log('command, mode -> ', command, mode);

  const env = loadEnv(mode, process.cwd());

  const { VITE_APP_PORT, VITE_PUBLIC_PATH } = env;

  console.log('env -> ', env);

  return defineConfig({
    base: VITE_PUBLIC_PATH,
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    plugins: [
      UniManifest(),
      UniPages({
        mergePages: true,
        dts: 'types/uni-pages.d.ts',
        subPackages: ['src/subPages'],
        /**
         * 排除的页面，相对于 dir 和 subPackages
         * @default []
         */
        exclude: ['**/components/**/*.*']
      }),
      UniLayouts(),
      uni()
    ],
    server: {
      host: '0.0.0.0',
      hmr: true,
      port: Number(VITE_APP_PORT)
    }
  });
};
