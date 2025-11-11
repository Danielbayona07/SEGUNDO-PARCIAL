<template>
  <div class="sidebar d-flex flex-column p-3">
    <!-- Marca/Logo -->
    <div class="text-center mb-4">
      <h2 class="sidebar-brand mb-0">𝑺𝑻𝑹𝑬𝑬𝑻 𝑻𝑯𝑼𝑮</h2>
    </div>

    <!-- Navegación -->
    <ul class="nav nav-pills flex-column mb-auto">
      <li class="nav-item">
        <!-- 
          Usamos router-link para la navegación. 
          Vue Router agregará la clase 'router-link-active' 
          que estilizamos en main.css 
        -->
        <router-link to="/dashboard/productos" class="nav-link">
          Productos
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/dashboard/clientes" class="nav-link disabled" tabindex="-1" aria-disabled="true">
          Clientes (Opcional)
        </router-link>
      </li>
      <!-- Agrega más enlaces aquí si es necesario -->
    </ul>

    <div class="mt-auto text-center text-secondary small">
      <p class="mb-0">Usuario: {{ userEmail }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const userEmail = ref('usuario@demo.com');

onMounted(() => {
  // Obtener el usuario de la sesión simulada
  const user = JSON.parse(sessionStorage.getItem('user'));
  if (user && user.user) {
    userEmail.value = user.user;
  }
});
</script>