<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ZoomIn, Film, Bottom, Top, Setting } from '@element-plus/icons-vue'

import { useCommonStore } from '@/stores/common'

import SystemImg from '@/assets/system.png'

const FOLD_COUNT = 5

const route = useRoute()

const router = useRouter()

const isCollapsed = ref(false)

const isHistoryExpand = ref(true)

const fullPath = ref(route.fullPath || '')

const { userInfo, intelligentAgents, dialogHistoryList } = useCommonStore()

watch(
  () => route.fullPath,
  (newValue) => {
    fullPath.value = newValue
  },
)

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value
}

const toggleHistoryExpand = () => {
  isHistoryExpand.value = !isHistoryExpand.value
}

const navigate = (path: string) => {
  if (!path) return

  router.push(path)
}
</script>

<template>
  <div v-show="!isCollapsed" class="side-menu-expand">
    <div class="head">
      <el-tooltip class="box-item" effect="light" content="收起导航" placement="right">
        <Film class="custom-icon" @click="toggleCollapse" />
      </el-tooltip>
      <div class="head-right" @click="navigate('/')">
        <ZoomIn style="width: 16px; height: 16px; margin-right: 5px" />
        <span>新建对话</span>
      </div>
    </div>

    <div class="title">
      <el-image class="sys-img" :src="SystemImg" />
      <span>小贝</span>
    </div>
    <el-divider style="margin: 10px 0 15px" />

    <div class="intelligent">
      <div class="intelligent-title">智能体</div>
      <div class="intelligent-list">
        <div :class="fullPath === item.targetUrl ? 'intelligent-item active' : 'intelligent-item'" :key="item.key"
          v-for="item in intelligentAgents" @click="navigate(item.targetUrl)">
          <div>
            <component :is="item.icon" style="width: 16px; height: 16px; vertical-align: middle; margin-right: 12px" />
            <span> {{ item.title }}</span>
          </div>
          <component v-if="item.extra" :is="item.extra" style="width: 16px; height: 14px" />
        </div>
      </div>
    </div>

    <el-divider style="margin: 10px 0 15px" />

    <div class="dialog-history">
      <div class="dialog-history-title">对话历史</div>
      <div class="dialog-item-container">
        <div :class="fullPath === item.targetUrl ? 'dialog-history-item active' : 'dialog-history-item'
          " v-for="item in isHistoryExpand
            ? dialogHistoryList.slice(0, FOLD_COUNT)
            : dialogHistoryList" :key="item.key" @click="navigate(item.targetUrl)">
          {{ item.title }}
        </div>
      </div>

      <div class="dialog-expand" @click="toggleHistoryExpand" v-if="dialogHistoryList.length >= FOLD_COUNT">
        <div v-show="isHistoryExpand">
          展开
          <el-icon style="vertical-align: middle">
            <Bottom />
          </el-icon>
        </div>

        <div v-show="!isHistoryExpand">
          折叠
          <el-icon style="vertical-align: middle">
            <Top />
          </el-icon>
        </div>
      </div>
    </div>

    <div class="user-info">
      <div class="user-info-main">
        <el-image class="avatar" :src="userInfo.avatar" />
        <div class="user-txt">
          <div>{{ userInfo.name }}</div>
          <div style="margin-top: 5px">{{ userInfo.role }}</div>
        </div>
      </div>

      <div>
        <el-tooltip class="box-item" effect="light" content="设置" placement="right">
          <el-icon style="vertical-align: middle; color: #666666">
            <Setting class="custom-icon" />
          </el-icon>
        </el-tooltip>
      </div>
    </div>
  </div>

  <div v-show="isCollapsed" class="side-menu-collapse">
    <el-image class="sys-img" :src="SystemImg" />
    <el-tooltip class="box-item" effect="light" content="展开导航" placement="right">
      <Film class="custom-icon" @click="toggleCollapse" />
    </el-tooltip>
    <el-tooltip class="box-item" effect="light" content="新建对话" placement="right">
      <ZoomIn class="custom-icon" style="width: 20px; height: 20px; margin: 10px 0" @click="navigate('/')" />
    </el-tooltip>

    <el-tooltip class="box-item" effect="light" content="设置" placement="right">
      <Setting class="custom-icon setting-cion" />
    </el-tooltip>
  </div>
</template>

<style scoped>

.custom-icon {
  cursor: pointer;
  width: 20px;
  height: 20px;
  color: #666;

  &:hover {
    color: #5687ff;
  }
}

.side-menu-expand {
  position: relative;
  width: 260px;
  height: 100%;
  background-color: #f9fbff;
  padding: 25px 12px;
  animation: expandWidth 0.1s ease;

  .head {
    display: flex;
    justify-content: space-between;
    color: #666;
    margin-bottom: 30px;

    .head-right {
      display: flex;
      align-items: center;
      font-size: 14px;
      cursor: pointer;

      &:hover {
        color: #5687ff;
      }
    }
  }

  .title {
    display: flex;
    align-items: center;
    color: #5687ff;
    font-size: 14px;
    font-weight: bold;

    .sys-img {
      width: 43px;
      height: 43px;
      margin-left: -10px;
    }
  }

  .intelligent-title,
  .dialog-history-title {
    font-size: 12px;
    color: #9c9c9c;
    margin-left: 10px;
    margin-bottom: 5px;
  }

  .intelligent {
    .intelligent-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
      cursor: pointer;
      color: #393939;
      font-size: 14px;
      border-radius: 4px;

      &:hover {
        background-color: #dde4f1;
      }
    }
  }

  .dialog-history {
    position: relative;

    .dialog-item-container {
      max-height: calc(100vh - 450px);
      overflow-y: auto;
    }

    .dialog-history-item {
      color: #393939;
      padding: 10px;
      cursor: pointer;
      font-size: 14px;
      border-radius: 4px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;

      &:hover {
        background-color: #dde4f1;
      }
    }

    .dialog-expand {
      text-align: right;
      color: #9c9c9c;
      font-size: 12px;
      cursor: pointer;
      margin-top: 10px;
    }
  }

  .active {
    background-color: #fff;
  }

  .user-info {
    position: absolute;
    width: 100%;
    bottom: 25px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 32px;

    .user-info-main {
      display: flex;
      align-items: center;

      .avatar {
        width: 30px;
        height: 30px;
      }

      .user-txt {
        margin-left: 12px;
        font-size: 14px;

        :nth-child(2) {
          color: #9c9c9c;
          font-size: 12px;
        }
      }
    }
  }
}

.side-menu-collapse {
  width: 45px;
  height: 100%;
  background-color: #f9fbff;
  padding: 25px 12px;
  color: #666;
  position: relative;
  animation: collapseWidth 0.1s ease;

  .sys-img {
    width: 40px;
    height: 40px;
    margin-left: -10px;
    margin-bottom: 10px;
  }

  .setting-cion {
    position: absolute;
    bottom: 25px;
    left: 12px;
  }
}

@keyframes expandWidth {
  from {
    width:  45px;
  }
  to {
    width:  260px;
  }
}
@keyframes collapseWidth {
  from {
    width:  260px;
  }
  to {
    width:  45px;
  }
}
</style>
