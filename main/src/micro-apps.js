import store from './store'

const microApps = [
	{
		name: 'ums',
		entry: '//localhost:7101',
		container: '#subapp-viewport',
		activeRule: '/ums/',
	}
]

const apps = microApps.map(item => {
	return {
		...item,
		container: '#subapp-viewport', // 子应用挂载的div
		props: {
			routerBase: item.activeRule, // 下发基础路由
			getGlobalState: store.getGlobalState // 下发getGlobalState方法
		}
	}
})

export default apps