const API_URL = 'https://fakestoreapi.com/products';

export default {
  
  /**
   * Obtiene productos y filtra solo por categorías de ROPA
   */
  async getProducts() {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Error al cargar productos');
      
      const allProducts = await response.json();
      
      // Filtrar solo productos de ropa
      return allProducts.filter(product => 
        product.category === "men's clothing" || 
        product.category === "women's clothing"
      );
    } catch (error) {
      console.error(error);
      return []; // Devolver array vacío en caso de error
    }
  },

  /**
   * Agrega un nuevo producto (simulado)
   */
  async addProduct(productData) {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(productData),
        headers: { 'Content-Type': 'application/json' }
      });
      if (!response.ok) throw new Error('Error al agregar producto');
      // La API devuelve el producto agregado con un ID
      return await response.json(); 
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  /**
   * Actualiza un producto (simulado)
   */
  async updateProduct(id, productData) {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(productData),
        headers: { 'Content-Type': 'application/json' }
      });
      if (!response.ok) throw new Error('Error al actualizar producto');
      // La API devuelve el producto actualizado
      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  /**
   * Elimina un producto (simulado)
   */
  async deleteProduct(id) {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Error al eliminar producto');
      // La API devuelve el producto eliminado
      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  }
};