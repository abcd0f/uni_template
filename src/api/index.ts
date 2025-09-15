import { request } from '@/utils/http';

/** 用户 */
interface User {
  /** id */
  id: number;
  /** 姓名 */
  name: string;
}
export const sendApi = (): Promise<User[]> => {
  return request<User[]>({
    url: '/api/send'
  });
};
