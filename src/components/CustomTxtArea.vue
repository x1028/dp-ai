<script setup lang="ts">
const emit = defineEmits<{
  (
    e: 'onSend',
    data: {
      modelVal: string
      isUseKnowledge: boolean
      textarea: string
    },
  ): void
}>()

import { reactive } from 'vue'
import { Picture, Promotion, Upload } from '@element-plus/icons-vue'

const modelOptions = [
  {
    value: 'DeepSeek-R1',
    label: 'DeepSeek-R1',
  },
]
const data = reactive({
  modelVal: 'DeepSeek-R1',
  textarea: '',
  isUseKnowledge: false,
})

const toggleIsUseKnowledge = () => {
  data.isUseKnowledge = !data.isUseKnowledge
}
const handleSend = () => {
  if (!data.textarea) return
  emit('onSend', data)
  data.textarea = ''
}

const handleKeydown = (event: KeyboardEvent) => {
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
      autosize
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

      <div>
        <el-icon class="footer-icon" :size="18" style="margin-right: 7px">
          <Picture />
        </el-icon>
        <el-icon class="footer-icon" :size="18" style="margin-right: 7px">
          <Upload />
        </el-icon>
        <el-icon
          class="footer-icon"
          :size="18"
          :color="data.textarea ? '#5687ff' : ''"
          @click="handleSend"
        >
          <Promotion />
        </el-icon>
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
