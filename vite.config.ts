import { fileURLToPath, URL } from 'node:url';

import uni from '@dcloudio/vite-plugin-uni';
import UniLayouts from '@uni-helper/vite-plugin-uni-layouts';
import UniPages from '@uni-helper/vite-plugin-uni-pages';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  plugins: [
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
  ]
});
