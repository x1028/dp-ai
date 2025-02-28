import fetchClient, { type State } from '@/http/streamFetch'
import { ref } from 'vue'

export default function useChatFetch() {
  const state = ref<State>('done')

  const fetchData = (config: any, cb?: (resData: any) => void) => {
    state.value = 'thinking'
    fetchClient.request('chat', config, ({ state: resState, data }) => {
      if (state.value === 'done') return

      state.value = resState

      if (!data) return

      if (data?.choices[0]?.finish_reason === 'stop') {
        state.value = 'done'
      }

      // console.log(
      //   data?.choices[0]?.delta?.content,
      //   's2',
      //   data?.choices[0]?.delta?.reasoning_content,
      // )

      cb?.(data)
    })
  }

  const cancelFetch = () => {
    state.value = 'done'
    fetchClient.cancel()
  }

  return {
    state,
    fetchChat: fetchData,
    cancelFetch,
  }
}
