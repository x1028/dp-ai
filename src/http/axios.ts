import type { AxiosInstance } from 'axios'
import axios from 'axios'
import { ElMessage } from 'element-plus'

const defaultConfig = {
  timeout: 60000,
  baseURL: '/apis/',
  maxContentLength: 20000,
  validateStatus: () => true,
  maxBodyLength: Infinity,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
}

class CustomAxiosInstance {
  instance: AxiosInstance
  apiList: Record<string, any>

  constructor() {
    this.instance = axios.create(defaultConfig)
    this.apiList = Object.create(null)
  }

  init(config: Record<string, any>, request: any = null, response: any = null) {
    const { apiList = {} } = config

    this.apiList = { ...this.apiList, ...apiList }

    this.instance.interceptors.request.use(function (config) {
      return request && typeof request === 'function' ? request(config) : config
    })

    this.instance.interceptors.response.use(
      async (response) => {
        const apiData = response.data
        const responseType = response.request?.responseType
        console.log('response', response)

        if (responseType === 'blob' || responseType === 'arraybuffer') return apiData

        if (response.status !== 200) {
          // ElMessage.error(response?.statusText || '请求异常')
          return Promise.reject(new Error('请求异常'))
        } else {
          return response.data
        }
      },
      (error) => {
        console.log('error', error)

        const status = error?.status
        const message = error?.message
        switch (status) {
          case 400:
            error.message = '请求错误'
            break
          case 401:
            error.message = message || '未授权'
            break
          case 403:
            error.message = message || '拒绝访问'
            break
          case 404:
            error.message = '请求地址出错'
            break
          case 408:
            error.message = '请求超时'
            break
          case 500:
            error.message = '服务器内部错误'
            break
          case 501:
            error.message = '服务未实现'
            break
          case 502:
            error.message = '网关错误'
            break
          case 503:
            error.message = '服务不可用'
            break
          case 504:
            error.message = '网关超时'
            break
          case 505:
            error.message = 'HTTP 版本不受支持'
            break
        }
        ElMessage.error({
          message: error.message,
          plain: true,
        })
        return Promise.reject(error)
      },
    )

    return this.instance
  }

  request(
    name: string,
    data: Record<string, any> = Object.create(null),
    options: Record<string, any> = Object.create(null),
  ) {
    return new Promise((resolve, reject) => {
      const api = this.apiList[name]
      if (!api) {
        reject(new Error(`API ${name} not found`))
      }
      const config = {
        ...api,
        data,
        ...options,
      }

      this.instance
        .request(config)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}

const axiosInstance = new CustomAxiosInstance()

export default axiosInstance
