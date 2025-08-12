import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import UniPages from '@uni-helper/vite-plugin-uni-pages';
import UniLayouts from '@uni-helper/vite-plugin-uni-layouts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    UniPages({
      dts: 'src/uni-pages.d.ts',
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
