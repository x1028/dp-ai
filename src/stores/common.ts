import { ref, shallowRef, reactive } from 'vue'
import { defineStore } from 'pinia'
import { ArrowRight, ChatLineSquare, Operation } from '@element-plus/icons-vue'

import Avatar from '@/assets/avatar.png'

const defaultIntelligentAgents = [
  {
    key: '1',
    title: '合规助手',
    icon: ChatLineSquare,
    targetUrl: '/1',
  },
  {
    key: '2',
    title: '电气工程师',
    icon: ChatLineSquare,
    targetUrl: '/2',
  },
  {
    key: '3',
    title: '技术标准查询',
    icon: ChatLineSquare,
    targetUrl: '/3',
  },
  {
    key: '4',
    title: '全部智能体',
    icon: Operation,
    extra: ArrowRight,
    targetUrl: '/square',
  },
]

const defaultDialogHistoryList = [
  {
    key: '11',
    title: '国家推广新能源私家车是否会导致燃油车急剧减少',
    targetUrl: `/chat/11`,
  },
  {
    key: '12',
    title: 'Xinference框架安装完成后如何使用',
    targetUrl: '/chat/12',
  },
  {
    key: '13',
    title: '本地执行web代码回避CORS错误',
    targetUrl: '/chat/13',
  },
  {
    key: '14',
    title: '单词Strawberry中有几个字母r',
    targetUrl: '/chat/14',
  },
  {
    key: '15',
    title: '10027是否为质数',
    targetUrl: '/chat/15',
  },
  {
    key: '16',
    title: 'C++冒泡排序算法示例',
    targetUrl: '/chat/16',
  },
]

export const useCommonStore = defineStore('counter', () => {
  const intelligentAgents = shallowRef(defaultIntelligentAgents)
  const dialogHistoryList = shallowRef(defaultDialogHistoryList)
  const userInfo = ref({
    avatar: Avatar,
    name: '张宇',
    role: '产品经理',
  })

  const addChatId = ref('')

  const chatData = reactive<Record<string, any[]>>({})

  const addIntelligentAgent = (agent: any) => {
    intelligentAgents.value.push(agent)
  }

  const addDialogHistory = (dialog: any) => {
    dialogHistoryList.value.unshift(dialog)
  }

  const removeDialogHistory = (key: string) => {
    dialogHistoryList.value = dialogHistoryList.value.filter((dialog) => dialog.key !== key)
  }

  const removeIntelligentAgent = (key: string) => {
    intelligentAgents.value = intelligentAgents.value.filter((agent) => agent.key !== key)
  }

  const addChatData = (
    key: string,
    data: { id: string; role: string; content: string; reasonContent?: string },
  ) => {
    const chatKeyData = chatData[key]
    if (chatKeyData) {
      let isExist = false
      chatKeyData.forEach((item) => {
        if (item.id === data.id) {
          if (data?.content) {
            item.content += data.content
          }
          if (data?.reasonContent) {
            item.reasonContent += data.reasonContent
          }
          isExist = true
          return
        }
      })
      if (!isExist) {
        chatData[key].push(data)
      }
    } else {
      chatData[key] = [data]
    }
  }

  const setAddChatId = (id: string) => {
    addChatId.value = id
  }
  return {
    userInfo,
    intelligentAgents,
    dialogHistoryList,
    chatData,
    addChatId,
    addDialogHistory,
    addIntelligentAgent,
    removeDialogHistory,
    removeIntelligentAgent,
    addChatData,
    setAddChatId,
  }
})
