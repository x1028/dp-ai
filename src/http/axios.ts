import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import axios from 'axios'

import { getToken } from '@/uitls'

/** 创建请求实例 */
function createInstance() {
  // 创建一个 axios 实例命名为 instance
  const instance = axios.create()
  // 请求拦截器
  instance.interceptors.request.use(
    // 发送之前
    (config) => config,
    // 发送失败
    (error) => Promise.reject(error),
  )
  // 响应拦截器（可根据具体业务作出相应的调整）
  instance.interceptors.response.use(
    (response) => {
      const apiData = response.data
      const responseType = response.request?.responseType
      if (responseType === 'blob' || responseType === 'arraybuffer') return response

      return Promise.reject(new Error('Error'))
    },
    (error) => {
      return Promise.reject(error)
    },
  )
  return instance
}

function createRequest(instance: AxiosInstance) {
  return <T>(config: AxiosRequestConfig): Promise<T> => {
    const token = getToken()

    const defaultConfig: AxiosRequestConfig = {
      baseURL: import.meta.env.VITE_BASE_URL,

      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
        'Content-Type': 'application/json',
      },

      data: {},
      timeout: 5000,
      withCredentials: false,
    }

    return instance({
      ...defaultConfig,
      ...config,
    })
  }
}

/** 用于请求的实例 */
const instance = createInstance()

/** 用于请求的方法 */
export const request = createRequest(instance)
