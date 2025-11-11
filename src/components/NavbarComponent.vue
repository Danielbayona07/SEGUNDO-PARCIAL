<template>
  <nav class="navbar navbar-expand-lg py-3 px-4 bg-dark">
    <!-- El nombre del negocio está en el Sidebar, aquí ponemos un título de vista (o se puede repetir) -->
    <h4 class="mb-0 text-light">Panel de Administración</h4>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item">
          <a class="nav-link text-warning" href="#" @click.prevent="handleLogout">Cerrar Sesión</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const handleLogout = () => {
  sessionStorage.removeItem('user'); // Limpiar la sesión simulada
  router.push('/login');
};
</script>