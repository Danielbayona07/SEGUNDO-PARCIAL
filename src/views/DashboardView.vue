<template>
  <div class="dashboard-layout">
    <!-- El SidebarComponent es fijo -->
    <SidebarComponent />

    <div class="main-content">
      <!-- El NavbarComponent es fijo -->
      <NavbarComponent />

      <!-- Área principal para vistas hijas -->
      <div class="content-wrapper p-4">
        <!-- Aquí se cargan las vistas hijas: ProductView, ClientesView, etc. -->
        <router-view />
      </div>

      <!-- El FooterComponent es fijo -->
      <FooterComponent />
    </div>
  </div>
</template>

<script setup>
// Este componente actúa como un 'layout'
// Importa los componentes reutilizables que lo rodean
import NavbarComponent from '@/components/NavbarComponent.vue';
import SidebarComponent from '@/components/SidebarComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
</script>
