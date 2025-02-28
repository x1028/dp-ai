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
        src: 'https://lingjing-online.cdn.bcebos.com/v1/lingjing-online/agent_logo/2025-02-05/eeabc03b-6c0d-47ee-a09e-0061cffc708b.JPEG',
      },
      {
        key: '2',
        title: '电气工程师',
        desc: '电气工程师',
        src: 'https://lingjing-online.cdn.bcebos.com/v1/lingjing-online/agent_logo/2024-12-30/01325363-06a5-487a-97da-2e123d98945d.png',
      },
      {
        key: '3',
        title: '技术标准查询',
        desc: '技术标准查询',
        src: 'https://lingjing-online.cdn.bcebos.com/v1/lingjing-online/agent_logo/2024-08-26/e4833cde-157a-4d16-ba1b-61fcaede6575.JPEG',
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
        src: 'https://lingjing-online.cdn.bcebos.com/v1/lingjing-online/agent_logo/2025-02-05/eeabc03b-6c0d-47ee-a09e-0061cffc708b.JPEG',
      },
      {
        key: '2',
        title: '电气工程师',
        desc: '电气工程师',
        src: 'https://lingjing-online.cdn.bcebos.com/v1/lingjing-online/agent_logo/2024-12-30/01325363-06a5-487a-97da-2e123d98945d.png',
      },
      {
        key: '3',
        title: '技术标准查询',
        desc: '技术标准查询',
        src: 'https://lingjing-online.cdn.bcebos.com/v1/lingjing-online/agent_logo/2024-08-26/e4833cde-157a-4d16-ba1b-61fcaede6575.JPEG',
      },
      {
        key: '4',
        title: '网络兼职助手',
        desc: '网络兼职助手',
        src: 'https://lingjing-online.cdn.bcebos.com/v1/lingjing-online/agent_logo/2024-03-15/e6b8d316-5945-45ee-9a7f-bf154a6130c8.JPEG',
      },
      {
        key: '5',
        title: '信息技术工作',
        desc: '信息技术工作',
        src: 'https://lingjing-online.cdn.bcebos.com/v1/lingjing-online/agent_logo/2024-12-25/8d97a24d-6af7-4a80-824f-30612ff36a77.JPEG',
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
        src: 'https://lingjing-online.cdn.bcebos.com/v1/lingjing-online/agent_logo/2024-03-15/4f4dfe7a-30e5-4cf7-8f18-cf886dcf81d6.JPEG',
      },
      {
        key: '2',
        title: '词云图生成器',
        desc: '可以根据用户指令生成对应的词云图篇',
        src: 'https://lingjing-online.cdn.bcebos.com/v1/lingjing-online/agent_logo/2024-06-27/a426c2bf-e7ae-4c81-85b5-6b94ea012f66.png',
      },
      {
        key: '3',
        title: 'AI绘画提示词生成器',
        desc: '能够根据简单的画面描述生成AI绘画提示词',
        src: 'https://lingjing-online.cdn.bcebos.com/v1/lingjing-online/plugin_logo/2024-01-03/df6c1f21-aed9-4ebc-a9ee-9c105cc2a4ec.png?x-bce-process=image/resize,m_fill,w_512,h_512',
      },
      {
        key: '4',
        title: 'AI助教',
        desc: 'AI助教',
        src: 'https://scenter.cdn.bcebos.com/agent/1710336780025082541image.jpg',
      },
      {
        key: '5',
        title: '快捷操作管家',
        desc: '快捷操作管家',
        src: 'https://lingjing-online.cdn.bcebos.com/v1/lingjing-online/agent_logo/2024-12-02/1bf2bee0-cfe6-42cb-bffa-562fd9199ec6.JPEG',
      },
      {
        key: '6',
        title: 'word助手',
        desc: 'word助手',
        src: 'https://lingjing-online.cdn.bcebos.com/v1/lingjing-online/agent_logo/2024-07-09/d10d46c4-8a4c-4afa-836c-32ad5c81c296.JPEG',
      },
    ],
  },
  {
    key: 'learn',
    label: '学习宝库',
    dataSource: [
      {
        key: '1',
        title: '诗词达人',
        desc: '诗词达人',
        src: 'https://lingjing-online.cdn.bcebos.com/v1/lingjing-online/agent_logo/2024-11-20/958e1b94-5dd9-496a-929d-25a27355ef05.png',
      },
      {
        key: '2',
        title: '计算公式助手',
        desc: '计算公式助手',
        src: 'https://lingjing-online.cdn.bcebos.com/v1/lingjing-online/agent_logo/2024-07-17/82170aae-d17f-468e-975f-62369cbd4ad3.JPEG',
      },
      {
        key: '3',
        title: 'deepseek攻略助手',
        desc: 'deepseek攻略助手',
        src: 'https://lingjing-online.cdn.bcebos.com/v1/lingjing-online/agent_logo/2025-02-05/d62eab88-0d31-46d0-b480-a2651d1fa321.png',
      },
      {
        key: '4',
        title: '英语单词大百科',
        desc: '英语单词大百科',
        src: 'https://mapp-pkg-bj.cdn.bcebos.com/mapp-pkg-bj/searchbox/mappconsole/image/20241023/39624711-0711-4e2c-9d21-c4bb4d370245appLogo.png',
      },
      {
        key: '5',
        title: '数学解题器',
        desc: '数学解题器',
        src: 'https://lingjing-online.cdn.bcebos.com/v1/lingjing-online/agent_logo/2024-04-22/26690ebb-f4f9-4636-a8d9-f99020e6f4da.JPEG',
      },
      {
        key: '6',
        title: '生僻字大全',
        desc: '生僻字大全',
        src: 'https://now.bdstatic.com/stash/v1/6f672d5/lingjing-fe/07ccbd4/agent-logo/logo-1.png',
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
              <el-image class="item-image" :src="item?.src || Square" />
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
