/** 🔢 HTTP 状态码配置 */

/** 状态码处理配置类型 */
export interface HttpCodeConfig {
  /** 状态码 */
  code: number;
  /** 提示消息 */
  message: string;
  /** 是否显示提示 */
  showToast?: boolean;
  /** 是否需要跳转登录 */
  needReLogin?: boolean;
  /** 跳转延迟（毫秒） */
  redirectDelay?: number;
}

/** HTTP 状态码映射表 */
export const HTTP_CODE_MAP: Record<number, HttpCodeConfig> = {
  200: {
    code: 200,
    message: '请求成功',
    showToast: false
  },
  401: {
    code: 401,
    message: '登录已过期，请重新登录',
    showToast: true,
    needReLogin: true,
    redirectDelay: 800
  },
  403: {
    code: 403,
    message: '无权限访问',
    showToast: true
  },
  404: {
    code: 404,
    message: '请求资源不存在',
    showToast: true
  },
  500: {
    code: 500,
    message: '服务器错误',
    showToast: true
  },
  502: {
    code: 502,
    message: '网关错误',
    showToast: true
  },
  503: {
    code: 503,
    message: '服务暂时不可用',
    showToast: true
  }
};

/**
 * 🔍 获取状态码配置
 * @param code 状态码
 * @param defaultMessage 默认消息（当状态码未配置时使用）
 */
export function getHttpCodeConfig(code: number, defaultMessage?: string): HttpCodeConfig {
  return (
    HTTP_CODE_MAP[code] || {
      code,
      message: defaultMessage || '请求失败',
      showToast: true
    }
  );
}

/**
 * 🔄 处理登录过期逻辑
 */
export function handleReLogin(delay: number = 200) {
  uni.removeStorageSync('token');
  setTimeout(() => {
    uni.reLaunch({ url: '/pages/login/index' });
  }, delay);
}
