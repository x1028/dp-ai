<script setup lang="ts">
import { MdPreview } from 'md-editor-v3'
import { ArrowUp, ArrowDown } from '@element-plus/icons-vue'
import { ref } from 'vue'
const { currentChatList, stateMap, state, scrollId } = defineProps([
  'currentChatList',
  'stateMap',
  'state',
  'scrollId',
])

const showReason = ref(true)

const setShowReason = () => {
  showReason.value = !showReason.value
}
</script>

<template>
  <div class="chat-item" v-for="(item, index) in currentChatList" :key="index">
    <div v-if="item.reasonContent" class="reason-control">
      <el-icon class="arrow" v-if="item.reasonContent" @click="setShowReason">
        <ArrowUp v-show="showReason" />
        <ArrowDown v-show="!showReason" />
      </el-icon>
    </div>
    <MdPreview
      v-show="showReason"
      v-if="item.reasonContent"
      class="chat-item-reason"
      :style="`background-color: transparent;margin-bottom: ${item.content ? 0 : 10}px;`"
      :model-value="item.reasonContent"
    />
    <MdPreview style="background-color: transparent" :model-value="item.content" />
  </div>
  <el-button v-show="state !== 'done'" link type="primary" loading>{{ stateMap[state] }}</el-button>
  <div :id="scrollId"></div>
</template>

<style scoped>
.chat-item {
  background-color: #eff6ff;
  border-radius: 4px;
  padding: 0 10px;
  color: #393939;
  margin-bottom: 10px;
  line-height: 1.4;

  .reason-control {
    padding-top: 10px;
    text-align: right;

    .arrow {
      &:hover {
        cursor: pointer;
      }
    }
  }

  .chat-item-reason {
    padding-left: 10px;
    border-left: 2px solid #d9d9d9;
  }
}

:deep(.chat-item-reason .md-editor-preview) {
  font-size: 12px;
  color: #8b8b8b;
}
</style>
