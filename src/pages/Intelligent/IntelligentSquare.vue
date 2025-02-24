<script setup lang="ts">
import { Edit, Search, Plus } from '@element-plus/icons-vue'
import { ref } from 'vue'

import Square from '@/assets/square.png'

const tabList = [
  {
    key: 'used',
    label: '用过',
    dataSource: [
      {
        key: '1',
        title: '合规助手',
        desc: '合规助手',
      },
      {
        key: '2',
        title: '电气工程师',
        desc: '电气工程师',
      },
      {
        key: '3',
        title: '技术标准查询',
        desc: '技术标准查询',
      },
    ],
  },
  {
    key: 'recommend',
    label: '官方推荐',
    dataSource: [
      {
        key: '1',
        title: '合规助手',
        desc: '合规助手',
      },
      {
        key: '2',
        title: '电气工程师',
        desc: '电气工程师',
      },
      {
        key: '3',
        title: '技术标准查询',
        desc: '技术标准查询',
      },
      {
        key: '4',
        title: '电气工程师',
        desc: '电气工程师',
      },
      {
        key: '5',
        title: '技术标准查询',
        desc: '技术标准查询',
      },
    ],
  },
  {
    key: 'utils',
    label: '工具提效',
    dataSource: [
      {
        key: '1',
        title: 'PPT助手',
        desc: '助你一键生成PPT',
      },
      {
        key: '2',
        title: '词云图生成器',
        desc: '可以根据用户指令生成对应的词云图篇',
      },
      {
        key: '3',
        title: 'AI绘画提示词生成器',
        desc: '能够根据简单的画面描述生成AI绘画提示词',
      },
      {
        key: '4',
        title: '合规助手',
        desc: '合规助手',
      },
      {
        key: '5',
        title: '电气工程师',
        desc: '电气工程师',
      },
      {
        key: '6',
        title: '技术标准查询',
        desc: '技术标准查询',
      },
    ],
  },
  {
    key: 'learn',
    label: '学习宝库',
    dataSource: [
      {
        key: '1',
        title: '合规助手',
        desc: '合规助手',
      },
      {
        key: '2',
        title: '电气工程师',
        desc: '电气工程师',
      },
      {
        key: '3',
        title: '技术标准查询',
        desc: '技术标准查询',
      },
      {
        key: '4',
        title: '合规助手',
        desc: '合规助手',
      },
      {
        key: '5',
        title: '电气工程师',
        desc: '电气工程师',
      },
      {
        key: '6',
        title: '技术标准查询',
        desc: '技术标准查询',
      },
    ],
  },
]

const keywords = ref('')
const containerRef = ref<HTMLElement | null>(null)

const handleClick = (e: MouseEvent) => {
  e.preventDefault()
}
</script>

<template>
  <div class="square-container">
    <el-icon class="extra">
      <Edit :size="30" />
    </el-icon>
    <div class="square-main">
      <el-affix>
        <div class="square-head">
          <div>
            <span style="font-weight: bold">智能体</span>
            广场
          </div>

          <div>
            <el-input
              size="small"
              v-model="keywords"
              style="width: 120px"
              placeholder="请输入关键词"
              :prefix-icon="Search"
            />
            <el-button plain style="margin-left: 8px" size="small" :icon="Plus"
              >创建智能体</el-button
            >
          </div>
        </div>

        <el-anchor
          direction="horizontal"
          :offset="130"
          :container="containerRef"
          @click="handleClick"
          style="margin-bottom: 3px"
        >
          <el-anchor-link
            v-for="tab in tabList"
            :key="tab.key"
            :href="`#${tab.key}`"
            :title="tab.label"
          />
        </el-anchor>
      </el-affix>

      <div class="square-main-list" ref="containerRef">
        <div class="square-content" v-for="tab in tabList" :key="tab.key">
          <div :id="tab.key" class="square-content-title">{{ tab.label }}</div>

          <div class="square-content-list">
            <div class="square-content-item" v-for="item in tab.dataSource" :key="item.key">
              <el-image class="item-image" :src="Square" />
              <div class="square-content-item-txt">
                <div class="square-content-item-title">{{ item.title }}</div>
                <div class="square-content-item-desc">{{ item.desc }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.square-container {
  position: relative;

  .extra {
    position: absolute;
    top: 5px;
    right: 0;
  }

  .square-main {
    width: 70%;
    margin: 0 auto;
  }

  .square-head {
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    padding-bottom: 30px;
    background-color: #fff;
  }

  .square-main-list {
    height: calc(100vh - 130px);
    overflow-y: auto;
    padding: 0 15px;

    &::-webkit-scrollbar {
      width: 0;
      /* height: 6px; */
      /* display: none; */
    }

    /* &::-webkit-scrollbar-thumb {
      background: #ededed;
      border-radius: 3px;
      box-shadow: inset 0 0 5px rgba(236, 236, 236, 10%);
    }
    &::-webkit-scrollbar-track {
      background: transparent;
    } */
  }

  .square-content {
    margin-bottom: 40px;
    .square-content-title {
      margin-bottom: 20px;
    }

    .square-content-list {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
    }

    .square-content-item {
      display: flex;
      align-items: center;
      padding: 0 20px;
      background: #f3f4f6;
      box-shadow: 5px 5px 7px 0px rgba(94, 106, 131, 0.16);
      border-radius: 6px;
      min-height: 100px;
      cursor: pointer;

      &:hover {
        transform: scale(1.05);
        transition: all 0.5s;
      }

      .item-image {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }

      .square-content-item-txt {
        margin-left: 20px;

        .square-content-item-title {
          color: #393939;
          font-size: 14px;
        }

        .square-content-item-desc {
          margin-top: 8px;
          font-size: 12px;
          color: #9c9c9c;
          line-height: 1.5;
        }
      }
    }
  }
}

:deep(.el-anchor__link) {
  color: #393939;
}
:deep(.is-active) {
  font-weight: bold;
}

:deep(.el-anchor__marker) {
  background-color: #5687ff;
}
</style>
