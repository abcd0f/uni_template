import { request } from '@/utils/http';

interface User {
  id: number;
  name: string;
}
export const sendApi = (): Promise<User[]> => {
  return request<User[]>({
    url: '/api/send'
  });
};
