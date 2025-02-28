import deepseek from './apis/deepseek'

import axiosInstance from './axios'
import fetchClient from './streamFetch'
import { getToken } from '@/uitls'

const apiList = {
  ...deepseek,
}

export function init() {
  const token = getToken()
  fetchClient.init({
    apiList,
    fetchConfig: {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    },
  })

  axiosInstance.init(
    {
      apiList,
    },
    (config: any) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }

      return config
    },
  )
}
