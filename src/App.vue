<template>
  <div id="app" class="d-flex flex-column min-vh-100">
    <NavbarComponent v-if="!isLoginPage" />
    <div class="d-flex flex-grow-1">
      <SidebarComponent v-if="!isLoginPage" />
      <main class="flex-grow-1 p-4 bg-light">
        <router-view />
      </main>
    </div>
    <FooterComponent v-if="!isLoginPage" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import NavbarComponent from './components/NavbarComponent.vue'
import SidebarComponent from './components/SidebarComponent.vue'
import FooterComponent from './components/FooterComponent.vue'

const route = useRoute()
const isLoginPage = computed(() => route.name === 'login')
</script>

<style>
#app {
  font-family: 'Inter', sans-serif;
  background-color: #f8f9fa;
}
</style>
