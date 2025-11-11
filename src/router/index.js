import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import ProductView from '../views/dashboard/ProductView.vue'

const routes = [
  {
    path: '/',
    redirect: '/login' // Redirigir la raíz al login
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
    // Rutas "hijas" que se renderizarán dentro de DashboardView
    children: [
      {
        path: 'productos', // /dashboard/productos
        name: 'productos',
        component: ProductView
      },
      {
        path: 'clientes', // /dashboard/clientes (Opcional)
        name: 'clientes',
        // Componente de clientes (opcional)
        component: () => import('../views/dashboard/ClientesView.vue') 
      }
    ],
    // Redirigir /dashboard a /dashboard/productos por defecto
    redirect: '/dashboard/productos'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// GUARDIA DE NAVEGACIÓN (Seguridad simple)
// Esto protege las rutas del dashboard
router.beforeEach((to, from, next) => {
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = sessionStorage.getItem('user'); // Revisa la sesión simulada

  if (authRequired && !loggedIn) {
    // Si requiere autenticación y no está logueado, redirige a login
    return next('/login');
  }

  next(); // Continuar a la ruta
});

export default router