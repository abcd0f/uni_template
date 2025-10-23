/** 🌐 请求参数配置类型定义 */
interface RequestOptions<T = any> extends Partial<UniApp.RequestOptions> {
  /** 请求地址（相对路径） */
  url: string;
  /** 请求数据 */
  data?: Record<string, any>;
  /** 请求头 */
  header?: Record<string, string>;
  /** 请求的基础路径 */
  baseURL?: string;
  /** 是否自动弹出错误提示 */
  showErrorToast?: boolean;
}

/** 默认基础地址 */
const DEFAULT_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * 🌍 通用请求封装（支持类型推导、错误提示、统一处理）
 * @example
 * ```ts
 * const user = await request<User>({ url: '/user' })
 * console.log(user.name)
 * ```
 */
export async function request<T = any>(options: RequestOptions<T>): Promise<T> {
  const {
    url,
    method = 'GET',
    data = {},
    baseURL = DEFAULT_BASE_URL,
    header = {},
    showErrorToast = true,
  } = options;

  const token = uni.getStorageSync('token') || '';

  try {
    const res = await uni.request({
      ...options,
      url: baseURL + url,
      method,
      data,
      header: {
        'Content-Type': 'application/json',
        Authorization: token,
        ...header,
      },
    });

    // 注意：这里 res 是 RequestSuccessCallbackResult，不是 [err, res]
    const result = res.data as { code: number; msg?: string; data: T };

    if (result.code === 200) {
      return result.data;
    } else {
      if (showErrorToast) uni.showToast({ title: result.msg || '请求错误', icon: 'none' });
      throw new Error(result.msg || '请求失败');
    }
  } catch (err) {
    if (showErrorToast) uni.showToast({ title: '网络错误', icon: 'none' });
    throw err;
  }
}
