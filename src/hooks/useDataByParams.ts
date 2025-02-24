import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useCommonStore } from '@/stores/common'

export default function useDataByParams() {
  const { intelligentAgents, chatData, dialogHistoryList, addChatData, addDialogHistory } =
    useCommonStore()

  const route = useRoute()
  const paramsId = ref(route.params?.id || '')

  const currentAgent = computed(() => {
    return intelligentAgents.find((item) => item.key === paramsId.value)
  })

  const currentChatList = computed(() => {
    if (!paramsId.value || typeof paramsId.value !== 'string') return []
    return chatData?.[paramsId.value] || []
  })
  const currentChat = computed(() => {
    return dialogHistoryList.find((item) => item.key === paramsId.value)
  })
  watch(
    () => route.params,
    (newValue) => {
      paramsId.value = newValue?.id
    },
  )

  return {
    paramsId,
    currentAgent,
    currentChatList,
    currentChat,
    addChatData,
    addDialogHistory,
  }
}
