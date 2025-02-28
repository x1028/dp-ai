<script setup lang="ts">
import { watch } from 'vue'

import CustomTxtArea from '@/components/CustomTxtArea.vue'
import ChatItem from '@/components/ChatItem.vue'
import ChatContainer from '@/components/ChatContainer.vue'
import useDataByParams from '@/hooks/useDataByParams'
import useChatFetch from '@/hooks/useChatFetch'
import { stateMap, defaultConfig } from '@/http/streamFetch'
import { uuid, scrollIntoView } from '@/uitls'
import { useCommonStore } from '@/stores/common'

const SCROLL_TARGET_ELEMENT_ID = 'scroll-target'

const { paramsId, currentChat, currentChatList, addChatData } = useDataByParams()
const { state, fetchChat, cancelFetch } = useChatFetch()
const { addChatId } = useCommonStore()

const handleTxtSend = async (data: any) => {
  if (typeof paramsId.value === 'string') {
    const config = {
      model: data?.modelVal || 'deepseek-chat',

      messages: [
        {
          role: 'user',
          content: data?.textarea,
        },
      ],
      ...defaultConfig,
    }

    addChatData(paramsId.value, {
      content: data?.textarea,
      role: 'user',
      id: uuid(),
    })

    scrollIntoView(SCROLL_TARGET_ELEMENT_ID)

    fetchChat(config, fetchCB)
  }
}

const fetchCB = (data: any) => {
  addChatData(paramsId.value as string, {
    content: data?.choices[0]?.delta?.content || '',
    reasonContent: data?.choices[0]?.delta?.reasoning_content || '',
    role: data?.choices[0]?.delta?.role,
    id: data?.id,
  })
  scrollIntoView(SCROLL_TARGET_ELEMENT_ID)
}

watch(
  () => paramsId.value,
  () => {
    if (paramsId.value === addChatId) {
      fetchChat(
        {
          model: 'deepseek-chat',
          messages: [
            {
              role: 'user',
              content: currentChat.value?.title,
            },
          ],
          ...defaultConfig,
        },
        fetchCB,
      )
    }
  },
  {
    immediate: true,
  },
)
</script>

<template>
  <ChatContainer>
    <template v-slot:header>
      <div class="title">
        {{ currentChat?.title }}
      </div>
    </template>
    <template v-slot:chatItem>
      <div class="chat-item" style="padding: 10px">
        {{ currentChat?.title }}
      </div>

      <ChatItem
        :currentChatList="currentChatList"
        :stateMap="stateMap"
        :state="state"
        :scroll-id="SCROLL_TARGET_ELEMENT_ID"
      >
      </ChatItem>
    </template>
    <template v-slot:txtArea>
      <CustomTxtArea :showStop="state !== 'done'" @on-stop="cancelFetch" @on-send="handleTxtSend">
      </CustomTxtArea>
    </template>
  </ChatContainer>
</template>

<style scoped>
.chat-item {
  position: relative;
  background-color: #eff6ff;
  border-radius: 4px;
  padding: 0 10px;
  color: #393939;
  margin-bottom: 10px;
  line-height: 1.4;
}
</style>
