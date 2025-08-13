import { createSSRApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';

// 路由
import router from './router';
// 持久化插件
import { persistPlugin } from './store/persist';

const pinia = createPinia();
pinia.use(persistPlugin);
export function createApp() {
  const app = createSSRApp(App);

  app.use(router);
  app.use(pinia);
  return {
    app
  };
}
