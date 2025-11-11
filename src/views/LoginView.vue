<template>
  <div class="login-view">
    <div class="login-card p-4 p-md-5 col-11 col-md-6 col-lg-4">
      <h1 class="text-center mb-4">𝑺𝑻𝑹𝑬𝑬𝑻 𝑻𝑯𝑼𝑮</h1>
      <h3 class="text-center text-light mb-4">Admin Login</h3>

      <!-- Formulario de Login -->
      <form @submit.prevent="handleLogin">
        <div class="mb-3">
          <label for="username" class="form-label">Usuario</label>
          <input 
            type="text" 
            class="form-control" 
            id="username" 
            v-model="username"
            required
          >
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Contraseña</label>
          <input 
            type="password" 
            class="form-control" 
            id="password" 
            v-model="password"
            required
          >
        </div>

        <!-- Mensaje de Error (Requerido) -->
        <div 
          v-if="errorMsg" 
          class="alert alert-danger" 
          role="alert"
        >
          {{ errorMsg }}
        </div>

        <div classs="d-grid">
          <button type="submit" class="btn btn-primary w-100 py-2">
            Entrar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const errorMsg = ref(null); // Para el mensaje de validación
const router = useRouter(); // Para redirigir

const handleLogin = async () => {
  try {
    // 1. Cargar el archivo JSON local
    const response = await fetch('/usuarios.json');
    if (!response.ok) throw new Error('No se pudo cargar el archivo de usuarios.');
    
    const users = await response.json();

    // 2. Buscar al usuario
    const foundUser = users.find(
      user => user.user === username.value && user.pass === password.value
    );

    if (foundUser) {
      // 3. Éxito: Guardar sesión (simulada) y redirigir
      errorMsg.value = null;
      sessionStorage.setItem('user', JSON.stringify(foundUser)); // Simular sesión
      router.push('/dashboard/productos'); // Redirigir al dashboard
    } else {
      // 4. Error: Mostrar alerta
      errorMsg.value = 'Credenciales incorrectas. Intenta de nuevo.';
    }

  } catch (err) {
    console.error(err);
    errorMsg.value = 'Error en el sistema. Contacta al administrador.';
  }
};
</script>