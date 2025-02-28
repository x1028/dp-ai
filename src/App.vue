<script setup lang="ts">
import { RouterView } from 'vue-router'

import SideMenu from './components/SideMenu.vue'
</script>

<template>
  <div class="container">
    <header>
      <SideMenu />
    </header>

    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  height: 100vh;

  main {
    flex: 1;
    padding: 25px 20px;
  }
}
</style>
