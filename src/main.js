import Vue from 'vue'
import App from './App.vue'

/**
 * Step1 初始化应用（可选）
 */
Vue.config.productionTip = false

new Vue({
	render: h => h(App),
}).$mount('#mainapp')

import { registerMicroApps, runAfterFirstMounted, setDefaultMountApp, start } from 'qiankun'

/**
 * Step2 注册子应用
 */
registerMicroApps(
	[
		{
			name: 'vue',
			entry: '//localhost:7101',
			container: '#subapp-viewport',
			activeRule: '/vue/',
		},
	],
	{
		beforeLoad: [
			app => {
				console.log('[LifeCycle] before load %c%s', 'color: green;', app.name)
			},
		],
		beforeMount: [
			app => {
				console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name)
			},
		],
		afterUnmount: [
			app => {
				console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name)
			},
		],
	},
)

/**
 * Step3 设置默认进入的子应用
 */
setDefaultMountApp('/vue/')

/**
 * Step4 启动应用
 */
start()

runAfterFirstMounted(() => {
	console.log('[MainApp] first app mounted')
})