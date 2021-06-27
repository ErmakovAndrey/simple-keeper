
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/history',
    component: () => import('layouts/HistoryLayout.vue'),
    children: [
      { path: '', component: () => import('pages/History.vue') }
    ]
  },
  {
    path: '/history/:date',
    component: () => import('layouts/HistoryLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/HistoryReport.vue') }
    ]
  },
  {
    path: '/about',
    component: () => import('layouts/LayoutWithHeader.vue'),
    children: [
      { path: '', component: () => import('pages/About.vue') }
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
