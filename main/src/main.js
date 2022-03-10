import Vue from 'vue'
import App from './App.vue'
import microApps from './micro-apps'

Vue.config.productionTip = false

new Vue({
	render: h => h(App)
}).$mount('#app')

import { registerMicroApps, setDefaultMountApp, start } from 'qiankun'

registerMicroApps(microApps, {
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
})

setDefaultMountApp('/ums/')

start()