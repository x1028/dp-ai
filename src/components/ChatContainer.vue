<script setup lang="ts"></script>

<template>
  <div class="head">
    <slot name="header"> </slot>
  </div>

  <div class="content">
    <div class="chat-list">
      <slot name="chatItem"> </slot>
    </div>

    <slot name="txtArea"></slot>
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
  padding: 40px 0 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  width: 70%;

  .chat-list {
    width: 100%;
    overflow-y: auto;
    padding-bottom: 20px;
  }
}
</style>
