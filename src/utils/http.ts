/** 请求参数配置 */
interface RequestOptions<T = any> {
  /** 请求地址 */
  url: string;
  /** 请求方法 */
  method?: UniApp.RequestOptions['method'];
  /** 请求数据 */
  data?: Record<string, any>;
  /** 请求头 */
  header?: Record<string, string>;
  /** 请求的baseURL */
  baseURL?: string;
}

uni.addInterceptor({
  returnValue(res) {
    if (!(!!res && (typeof res === 'object' || typeof res === 'function') && typeof res.then === 'function')) {
      return res;
    }
    return new Promise((resolve, reject) => {
      res.then((res: [unknown, unknown]) => (res[0] ? reject(res[0]) : resolve(res[1])));
    });
  }
});

/** 默认baseURL */
const DEFAULT_BASE_URL = import.meta.env.VITE_API_BASE_URL; // 根据实际情况修改

/**
 * 发起网络请求的通用函数
 * @param {RequestOptions<T>} options 请求配置参数
 * @returns {Promise<T>} 返回一个 Promise，resolve 时为响应数据
 *
 * @example
 * ```ts
 * interface UserInfo { name: string; age: number }
 * const data = await request<UserInfo>({ url: '/user/info' })
 * console.log(data.name)
 * ```
 */
export const request = <T = any>(options: RequestOptions<T>): Promise<T> => {
  return new Promise((resolve, reject) => {
    uni.request({
      url: (options.baseURL || DEFAULT_BASE_URL) + options.url,
      method: options.method || 'GET',
      data: options.data ?? {},
      header: {
        'Content-Type': 'application/json',
        Authorization: uni.getStorageSync('token') || '',
        ...options.header
      },
      success: res => {
        const data = res.data as { code: number; msg?: string; data: T };
        if (data.code === 200) {
          resolve(data.data);
        } else {
          uni.showToast({ title: data.msg || '请求错误', icon: 'none' });
          reject(data);
        }
      },
      fail: err => {
        uni.showToast({ title: '网络错误', icon: 'none' });
        reject(err);
      }
    });
  });
};
