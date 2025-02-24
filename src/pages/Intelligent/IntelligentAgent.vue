<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Edit } from '@element-plus/icons-vue'

import CustomTxtArea from '@/components/CustomTxtArea.vue'
import { uuid } from '@/uitls'
import useDataByParams from '@/hooks/useDataByParams'

const { paramsId, currentAgent, currentChatList, addChatData, addDialogHistory } = useDataByParams()
const router = useRouter()

const handleTxtSend = (data: any) => {
  if (typeof paramsId.value === 'string') {
    if (!paramsId.value) {
      const id = uuid()
      router.push(`/chat/${id}`)

      addDialogHistory({
        key: id,
        title: data?.textarea,
        targetUrl: `/chat/${id}`,
      })

      return
    }
    addChatData(paramsId.value, data?.textarea)
  }
}
</script>

<template>
  <div class="head">
    <div class="title" @click="router.push('/')">
      {{ currentAgent?.title || '新对话' }}
    </div>
    <el-icon>
      <Edit :size="30" />
    </el-icon>
  </div>

  <div class="content">
    <div class="chat-list">
      <div class="chat-item">
        Hi~我是{{
          currentAgent?.title ||
          '小贝，你身边的智能助手，可以为你答疑解惑、精读文档。让小贝助你轻松工作。'
        }}
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
