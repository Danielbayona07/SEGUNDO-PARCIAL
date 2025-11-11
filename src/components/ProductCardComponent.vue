<template>
  <!-- Este componente cumple el requisito, aunque no se use en el CRUD (que usa tabla) -->
  <div class="card h-100 bg-dark text-light border-secondary">
    <img 
      :src="product.image" 
      class="card-img-top p-3" 
      :alt="product.title" 
      style="height: 200px; object-fit: contain;"
    >
    <div class="card-body d-flex flex-column">
      <h5 class="card-title text-truncate text-primary">{{ product.title }}</h5>
      <p class="card-text flex-grow-1 text-truncate">{{ product.description }}</p>
      <div class="d-flex justify-content-between align-items-center">
        <h4 class="mb-0">${{ product.price }}</h4>
        <a href="#" class="btn btn-sm btn-primary">Detalles</a>
      </div>
    </div>
  </div>
</template>

<script setup>
// Este componente recibe la info del producto vía 'props'
// como lo pide el parcial
defineProps({
  product: {
    type: Object,
    required: true
  }
})
</script>
