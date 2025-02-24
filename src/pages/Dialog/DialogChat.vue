<script setup lang="ts">
import CustomTxtArea from '@/components/CustomTxtArea.vue'
import useDataByParams from '@/hooks/useDataByParams'
import { chat } from '@/http/deepseek'

const { paramsId, currentChat, currentChatList, addChatData } = useDataByParams()

const handleTxtSend = (data: any) => {
  if (typeof paramsId.value === 'string') {
    chat({
      model: 'deepseek-chat',
      messages: [
        {
          role: 'user',
          content: data?.textarea,
        },
      ],
      stream: false,
    }).then((res) => {
      console.log('123', res)
    })
    addChatData(paramsId.value, data?.textarea)
  }
}
</script>

<template>
  <div class="head">
    <div class="title">
      {{ currentChat?.title }}
    </div>
  </div>

  <div class="content">
    <div class="chat-list">
      <div class="chat-item">
        {{ currentChat?.title }}
      </div>

      <div class="chat-item" v-for="(item, index) in currentChatList" :key="index">{{ item }}</div>
    </div>

    <CustomTxtArea @on-send="handleTxtSend" />
  </div>
</template>

<style scoped>
.head {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  color: #393939;
}

.content {
  margin: 0 auto;
  padding: 40px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  width: 70%;

  .chat-list {
    width: 100%;
    height: calc(100vh - 270px);
    overflow-y: auto;

    .chat-item {
      background-color: #eff6ff;
      border-radius: 4px;
      padding: 10px;
      color: #393939;
      margin-bottom: 10px;
    }
  }
}
</style>
