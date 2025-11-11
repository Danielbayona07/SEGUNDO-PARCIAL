<template>
  <div class="product-view">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2>Gestión de Productos</h2>
      <button class="btn btn-primary" @click="openCreateModal">
        <i class="bi bi-plus-circle"></i> Agregar Producto
      </button>
    </div>

    <!-- Mensaje de Carga -->
    <div v-if="isLoading" class="text-center p-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Cargando...</span>
      </div>
      <p class="mt-2">Cargando productos...</p>
    </div>

    <!-- Tabla de Productos (Requerida) -->
    <div v-else class="table-responsive">
      <table class="table table-hover align-middle">
        <thead>
          <tr>
            <th>ID</th>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td>{{ product.id }}</td>
            <td>
              <img :src="product.image" :alt="product.title" style="width: 50px; height: 50px; object-fit: contain;">
            </td>
            <td style="max-width: 300px;" class="text-truncate">{{ product.title }}</td>
            <td>${{ product.price }}</td>
            <td>{{ product.category }}</td>
            <td>
              <button class="btn btn-sm btn-warning me-2" @click="openEditModal(product)">
                Editar
              </button>
              <button class="btn btn-sm btn-danger" @click="handleDelete(product.id)">
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal de Creación/Edición -->
    <div class="modal fade" id="productModal" tabindex="-1" aria-labelledby="productModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="productModalLabel">
              {{ isEditing ? 'Editar Producto' : 'Agregar Producto' }}
            </h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="handleSave">
              <div class="mb-3">
                <label for="title" class="form-label">Nombre</label>
                <input type="text" class="form-control" id="title" v-model="selectedProduct.title" required>
              </div>
              <div class="mb-3">
                <label for="price" class="form-label">Precio</label>
                <input type="number" step="0.01" class="form-control" id="price" v-model="selectedProduct.price" required>
              </div>
              <div class="mb-3">
                <label for="description" class="form-label">Descripción</label>
                <textarea class="form-control" id="description" rows="3" v-model="selectedProduct.description"></textarea>
              </div>
              <div class="mb-3">
                <label for="category" class="form-label">Categoría</label>
                <select class="form-select" id="category" v-model="selectedProduct.category">
                  <option value="men's clothing">Men's Clothing</option>
                  <option value="women's clothing">Women's Clothing</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="image" class="form-label">URL de Imagen</label>
                <input type="text" class="form-control" id="image" v-model="selectedProduct.image">
              </div>
              
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button type="submit" class="btn btn-primary">
                  {{ isEditing ? 'Actualizar' : 'Guardar' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import apiService from '@/services/apiService';
import { Modal } from 'bootstrap'; // Importar JS de Modal

const products = ref([]);
const isLoading = ref(true);
const isEditing = ref(false);
const selectedProduct = ref({});
let productModal = null; // Para guardar la instancia del Modal

// -- Cargar Datos --
onMounted(async () => {
  // Inicializar el modal de Bootstrap
  productModal = new Modal(document.getElementById('productModal'));
  
  // Cargar productos
  isLoading.value = true;
  products.value = await apiService.getProducts();
  isLoading.value = false;
});

// -- Lógica CRUD --

// Abrir Modal para CREAR
const openCreateModal = () => {
  isEditing.value = false;
  selectedProduct.value = {
    title: '',
    price: 0,
    description: '',
    category: "men's clothing",
    image: 'https://placehold.co/600x400'
  };
  productModal.show();
};

// Abrir Modal para EDITAR
const openEditModal = (product) => {
  isEditing.value = true;
  // Clonar el producto para evitar reactividad no deseada
  selectedProduct.value = { ...product }; 
  productModal.show();
};

// Guardar (Crear o Actualizar)
const handleSave = async () => {
  if (isEditing.value) {
    // --- Actualizar ---
    const updatedProduct = await apiService.updateProduct(
      selectedProduct.value.id, 
      selectedProduct.value
    );
    if (updatedProduct) {
      // Actualizar la lista local
      const index = products.value.findIndex(p => p.id === updatedProduct.id);
      if (index !== -1) {
        products.value[index] = updatedProduct;
      }
    }
  } else {
    // --- Crear ---
    const newProduct = await apiService.addProduct(selectedProduct.value);
    if (newProduct) {
      // Agregar a la lista local (simulado, la API devuelve ID 21)
      products.value.push({ ...newProduct, id: products.value.length + 1 });
    }
  }
  productModal.hide(); // Ocultar el modal
};

// Eliminar
const handleDelete = async (id) => {
  if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
    const deletedProduct = await apiService.deleteProduct(id);
    if (deletedProduct) {
      // Eliminar de la lista local
      products.value = products.value.filter(p => p.id !== id);
    }
  }
};
</script>
