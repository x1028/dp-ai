<script setup lang="ts">
import { RouterView } from 'vue-router'

import SideMenu from './components/SideMenu.vue'

import '@/styles/index.css'
</script>

<template>
  <div class="container">
    <header>
      <SideMenu />
      <!-- <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div> -->
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

  header {
  }

  main {
    flex: 1;
    padding: 25px 20px;
  }
}
</style>
