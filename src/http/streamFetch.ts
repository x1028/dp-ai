import { fetchEventSource } from '@microsoft/fetch-event-source'
import { ElMessage } from 'element-plus'

export type State = 'thinking' | 'done' | 'generating'

export const stateMap = {
  thinking: '思考中',
  done: '完成',
  generating: '生成中',
}

export const defaultConfig = {
  stream: true,
  include_usage: false,
  frequency_penalty: 0,
  max_tokens: 2048,
  presence_penalty: 0,
  response_format: {
    type: 'text',
  },
  stop: null,
  stream_options: null,
  temperature: 1,
  top_p: 1,
  tools: null,
  tool_choice: 'none',
  logprobs: false,
  top_logprobs: null,
}

const MAX_RETRY_COUNT = 3

const controller = new AbortController()

class FetchClient {
  apiList: Record<string, any>
  fetchConfig: RequestInit
  constructor() {
    this.apiList = Object.create(null)
    this.fetchConfig = Object.create(null)
  }

  init(config: Record<string, any>) {
    const { apiList = {}, fetchConfig = {} } = config
    this.apiList = { ...this.apiList, ...apiList }
    this.fetchConfig = {
      ...this.fetchConfig,
      ...fetchConfig,
    }
  }

  request(
    name: string,
    data: Record<string, any> = Object.create(null),
    onMessage: (data: { state: State; data: any }) => void,
    options: Record<string, any> = Object.create(null),
  ) {
    let retryCount = 0
    onMessage?.({
      state: 'thinking',
      data: null,
    })

    const api = this.apiList[name]
    if (!api) {
      new Error(`API ${name} not found`)
      return
    }
    const config = {
      ...this.fetchConfig,
      ...api,
      body: JSON.stringify(data),
      ...options,
    }

    fetchEventSource(`${api?.baseURL || ''}${api.url}`, {
      ...config,
      signal: controller.signal,

      onopen: async (response) => {
        if (response.ok && response.status === 200) {
          return
        } else if (response.status >= 400 && response.status < 500) {
          throw new Error('FatalError')
        } else {
          throw new Error('RetriableError')
        }
      },
      onmessage: (event) => {
        console.log('event', event)
        if (!event.data) {
          throw new Error(`RetriableError`)
        }

        if (event.data === '[DONE]') {
          onMessage?.({
            state: 'done',
            data: null,
          })
          return
        }
        onMessage?.({
          state: 'generating',
          data: JSON.parse(event.data),
        })
      },
      onerror: (e) => {
        /** 继续重试 */
        if (e?.message === 'RetriableError' && retryCount < MAX_RETRY_COUNT) {
          retryCount++
          ElMessage.warning({
            message: `重试第${retryCount}次`,
            plain: true,
          })
          return
        }

        ElMessage.error({
          message: '重试请求失败',
          plain: true,
        })

        onMessage?.({
          state: 'done',
          data: null,
        })

        throw new Error(e)
      },
    })
  }

  cancel() {
    controller.abort()
  }
}

const fetchClient = new FetchClient()
export default fetchClient
