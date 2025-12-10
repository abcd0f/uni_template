import { getHttpCodeConfig, handleReLogin } from './httpCodes';

/** 🌐 请求参数配置类型定义 */
interface RequestOptions extends Partial<UniApp.RequestOptions> {
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
  /** 是否直接返回整个 result */
  returnFullResult?: boolean;
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
export async function request<T = any>(options: RequestOptions): Promise<T> {
  const {
    url,
    method = 'GET',
    data = {},
    baseURL = DEFAULT_BASE_URL,
    header = {},
    showErrorToast = true,
    returnFullResult = false
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
        ...header
      }
    });

    // 注意：这里 res 是 RequestSuccessCallbackResult，不是 [err, res]
    const result = res.data as any;

    const { code, msg, ...rest } = result;

    /** -------------------- 📌 状态码通用处理区 -------------------- */
    // 请求成功

    if (returnFullResult) {
      // ⚡ 直接返回整个 result
      return result;
    }

    if (code === 200) {
      // 如果有 data 字段就返回 data，否则返回剩余字段
      if ('data' in result && result.data !== null && result.data !== undefined) {
        return result.data;
      }
      return rest;
    }

    // 获取状态码配置
    const codeConfig = getHttpCodeConfig(code, result.msg);

    // 显示错误提示
    if (codeConfig.showToast && showErrorToast) {
      uni.showToast({ title: codeConfig.message, icon: 'none' });
    }

    // 处理登录过期
    if (codeConfig.needReLogin) {
      handleReLogin(codeConfig.redirectDelay);
    }

    const error = new Error(codeConfig.message);
    Object.assign(error, { code, handled: true });
    return Promise.reject(error);
  } catch (err: any) {
    if (err?.handled) {
      throw err;
    }

    // 未处理的网络错误才显示"网络错误"提示
    if (showErrorToast) {
      uni.showToast({ title: '网络错误', icon: 'none' });
    }
    throw err;
  }
}
