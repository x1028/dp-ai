<script setup lang="ts">
const { showStop } = defineProps(['showStop'])
const emit = defineEmits<{
  (
    e: 'onSend',
    data: {
      modelVal: string
      isUseKnowledge: boolean
      textarea: string
    },
  ): void
  (e: 'onStop'): void
}>()

import { reactive } from 'vue'
import { Picture, Promotion, Upload, VideoPause } from '@element-plus/icons-vue'

const modelOptions = [
  {
    value: 'deepseek-reasoner',
    label: 'DeepSeek-R1',
  },
  {
    value: 'deepseek-chat',
    label: 'DeepSeek-V3',
  },
]
const data = reactive({
  modelVal: 'deepseek-chat',
  textarea: '',
  isUseKnowledge: false,
})

const toggleIsUseKnowledge = () => {
  data.isUseKnowledge = !data.isUseKnowledge
}
const handleSend = () => {
  if (!data.textarea.trim()) return
  emit('onSend', data)
  data.textarea = ''
}

const handleKeydown = (event: KeyboardEvent) => {
  if (showStop) return

  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    handleSend()
  }
}
</script>

<template>
  <div class="text-area">
    <el-input
      v-model="data.textarea"
      resize="none"
      type="textarea"
      :autosize="{ minRows: 3, maxRows: 8 }"
      placeholder="有问题，尽管问，shift+enter换行"
      @keydown="handleKeydown"
    />

    <div class="text-area-footer">
      <div>
        <el-select v-model="data.modelVal" placeholder="请选择模型引擎" style="width: 150px">
          <el-option
            v-for="item in modelOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-button
          plain
          :type="data.isUseKnowledge ? 'primary' : ''"
          @click="toggleIsUseKnowledge"
          style="margin-left: 8px"
          >使用知识库</el-button
        >
      </div>

      <div class="icon-content">
        <el-icon class="footer-icon" :size="18" style="margin-right: 7px">
          <Picture />
        </el-icon>

        <el-icon class="footer-icon" :size="18" style="margin-right: 7px">
          <Upload />
        </el-icon>

        <el-icon
          v-show="!showStop"
          class="footer-icon"
          :size="18"
          :color="data.textarea.trim() ? '#5687ff' : ''"
          @click="handleSend"
        >
          <Promotion />
        </el-icon>

        <el-tooltip effect="light" content="停止生成" placement="top">
          <el-icon v-show="showStop" class="footer-icon" :size="18" @click="emit('onStop')">
            <VideoPause />
          </el-icon>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<style scoped>
.text-area {
  width: 100%;
  min-height: 90px;
  background-color: #f3f4f6;
  padding-bottom: 10px;
  padding-top: 10px;
  border-radius: 4px;
  flex-shrink: 0;

  .text-area-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 10px 0;
  }

  .footer-icon {
    cursor: pointer;
  }
}

:deep(.el-textarea__inner) {
  min-height: 80px !important;
  max-height: 300px;
  box-shadow: none;
  background-color: #f3f4f6;

  &:hover {
    box-shadow: none;
  }

  &:focus {
    box-shadow: none;
  }
}
</style>
