const routes = [
	{
		path: '/login',
		component: () => import('@/views/login'),
	},
	{ path: '*', redirect: '/404' }
]

export default routes