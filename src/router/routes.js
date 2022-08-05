
const routes = [
  {
    path: '/',
    component: () => import('src/layouts/Layout.vue'),
    children: [
      { path: '', component: () => import('src/pages/pageTodo.vue'),meta: { requiresAuth: true } },
      {path:'/login',component:()=> import('src/pages/pageLogin.vue')}
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
