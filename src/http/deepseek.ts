import { request } from './axios'
export function chat(data: { model: string; messages: any[]; stream: boolean }) {
  return request({
    url: '/chat/completions',
    method: 'post',
    baseURL: 'dps',
    data,
  })
}
