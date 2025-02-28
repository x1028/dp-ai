<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Edit } from '@element-plus/icons-vue'

import CustomTxtArea from '@/components/CustomTxtArea.vue'
import ChatItem from '@/components/ChatItem.vue'
import useDataByParams from '@/hooks/useDataByParams'
import ChatContainer from '@/components/ChatContainer.vue'
import useChatFetch from '@/hooks/useChatFetch'
import { scrollIntoView, uuid } from '@/uitls'
import { stateMap, defaultConfig } from '@/http/streamFetch'
import { useCommonStore } from '@/stores/common'

const SCROLL_TARGET_ELEMENT_ID = 'agent-scroll-target'

const { paramsId, currentAgent, currentChatList, addChatData, addDialogHistory } = useDataByParams()
const { state, fetchChat, cancelFetch } = useChatFetch()
const router = useRouter()
const { setAddChatId } = useCommonStore()

const handleTxtSend = (data: any) => {
  if (typeof paramsId.value === 'string') {
    let val = paramsId.value

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

    if (!paramsId.value) {
      const id = uuid()
      val = id
      router.push(`/chat/${id}`)

      addDialogHistory({
        key: id,
        title: data?.textarea,
        targetUrl: `/chat/${id}`,
      })
      setAddChatId(id)
      return
    }

    if (val === paramsId.value) {
      addChatData(val, {
        content: data?.textarea,
        role: 'user',
        id: uuid(),
      })
      scrollIntoView(SCROLL_TARGET_ELEMENT_ID)
    }

    const fetchCB = (data: any) => {
      addChatData(val as string, {
        content: data?.choices[0]?.delta?.content || '',
        reasonContent: data?.choices[0]?.delta?.reasoning_content || '',
        role: data?.choices[0]?.delta?.role,
        id: data?.id,
      })
      scrollIntoView(SCROLL_TARGET_ELEMENT_ID)
    }

    // fetchChat(config, fetchCB)
  }
}
</script>

<template>
  <ChatContainer>
    <template v-slot:header>
      <div class="title" @click="router.push('/')">
        {{ currentAgent?.title || '新对话' }}
      </div>
      <el-icon>
        <Edit :size="30" />
      </el-icon>
    </template>
    <template v-slot:chatItem>
      <div class="chat-item" style="padding: 10px">
        Hi~我是{{
          currentAgent?.title ||
          '小贝，你身边的智能助手，可以为你答疑解惑、精读文档。让小贝助你轻松工作。'
        }}
      </div>
      <ChatItem
        :currentChatList="currentChatList"
        :stateMap="stateMap"
        :state="state"
        :scroll-id="SCROLL_TARGET_ELEMENT_ID"
      />
    </template>
    <template v-slot:txtArea>
      <CustomTxtArea :showStop="state !== 'done'" @on-send="handleTxtSend" @on-stop="cancelFetch" />
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
