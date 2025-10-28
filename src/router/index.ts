/// <reference types="@uni-helper/vite-plugin-uni-pages/client" />

import { createRouter } from 'uni-mini-router';
import { pages, subPackages } from 'virtual:uni-pages';

function generateRoutes() {
  const routes = pages.map(page => {
    const newPath = `/${page.path}`;
    return { ...page, path: newPath };
  });
  if (subPackages && subPackages.length > 0) {
    subPackages.forEach(subPackage => {
      const subRoutes = subPackage.pages.map((page: any) => {
        const newPath = `/${subPackage.root}/${page.path}`;
        return { ...page, path: newPath };
      });
      routes.push(...subRoutes);
    });
  }

  return routes;
}

const router = createRouter({
  routes: generateRoutes()
});
router.beforeEach((to, from, next) => {
  console.log('🚀 beforeEach 守卫触发:', { to, from });

  // 演示：基本的导航日志记录
  if (to.path && from.path) {
    console.log(`📍 导航: ${from.path} → ${to.path}`);
  }

  // 演示：对受保护页面的简单拦截
  if (to.name === 'demo-protected') {
    console.log('🛡️ 检测到访问受保护页面');

    return new Promise<void>((resolve, reject) => {
      console.log(`🔒 检查用户权限...`);
      console.log(resolve, reject);
    });
  }

  // 继续导航
  next();
});

router.afterEach((to, from) => {
  console.log('🎯 afterEach 钩子触发:', { to, from });

  // 演示：简单的页面切换记录
  if (to.path) {
    console.log(`📄 页面切换完成: ${to.path}`);
  }

  // 演示：针对 afterEach 演示页面的简单提示
  if (to.name === 'demo-aftereach') {
  }
});

export default router;
