import { createRouter, createWebHistory } from 'vue-router'
import UserView from '@/views/UserView.vue'
import InventoryView from '@/views/InventoryView.vue'
import ItemView from '@/views/ItemView.vue'
import OrderView from '@/views/OrderView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'user',
      component: UserView,
    },
    {
      path: '/inventory',
      name: 'inventory',
      component: InventoryView,
    },
    {
      path: '/item',
      name: 'item',
      component: ItemView,
    },
    {
      path: '/order',
      name: 'order',
      component: OrderView,
    },
  ],
})

export default router
