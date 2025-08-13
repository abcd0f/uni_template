import type { PiniaPluginContext } from 'pinia';
import { CommonUtil } from 'wot-design-uni';

/**
 * Pinia持久化插件函数
 * @param {PiniaPluginContext} context Pinia插件上下文，包含store实例
 * @param {string[]} excludedIds 需要排除持久化的store ID数组
 */
function persist({ store }: PiniaPluginContext, excludedIds: string[]) {
  // 检查当前store的id是否在排除列表中
  const isExcluded = excludedIds.includes(store.$id);

  // 如果当前store的id在排除列表中，则不进行持久化
  if (isExcluded) {
    return;
  }

  // 暂存State - 使用深拷贝获取当前store的状态
  let persistState = CommonUtil.deepClone(store.$state);
  // 从缓存中读取 - 尝试从本地存储中获取之前保存的状态
  const storageState = uni.getStorageSync(store.$id);
  if (storageState) {
    persistState = storageState;
  }
  // 将最终状态设置回store
  store.$state = persistState;
  // 订阅store的变化 - 当store状态变化时自动保存到本地存储
  store.$subscribe(() => {
    // 在存储变化的时候将store缓存 - 使用深拷贝保存最新状态
    uni.setStorageSync(store.$id, CommonUtil.deepClone(store.$state));
  });
}

/**
 * 持久化插件函数
 * 用于为Pinia状态管理添加持久化功能
 * @param context - Pinia插件上下文对象，包含store等信息
 */
export function persistPlugin(context: PiniaPluginContext) {
  // 调用persist函数，并传入排除列表
  // 这里排除'temp'属性，使其不被持久化存储
  persist(context, ['temp']);
}
