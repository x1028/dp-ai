import { createRouter, createWebHashHistory } from 'vue-router'
import IntelligentAgent from '@/pages/Intelligent/IntelligentAgent.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'intelligent',
      component: IntelligentAgent,
    },
    {
      path: '/:id',
      name: 'intelligentWithId',
      component: IntelligentAgent,
    },
    {
      path: '/square',
      name: 'square',
      component: () => import('../pages/Intelligent/IntelligentSquare.vue'),
    },
    {
      path: '/chat/:id',
      name: 'dialogChat',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../pages/Dialog/DialogChat.vue'),
    },
  ],
})

export default router
