import Vue from 'vue'
import App from './App.vue'
import { registerMicroApps, setDefaultMountApp, start } from 'qiankun'
import microApps from './micro-apps'

Vue.config.productionTip = false

const instance = new Vue({
	render: h => h(App)
}).$mount('#app')

// 定义loader方法，loading改变时，将变量赋值给App.vue的data中的isLoading
function loader(loading) {
	if (instance && instance.$children) {
		// instance.$children[0] 是App.vue，此时直接改动App.vue的isLoading
		instance.$children[0].isLoading = loading
	}
}

// 给子应用配置加上loader方法
const apps = microApps.map(item => {
	return {
		...item,
		loader
	}
})

registerMicroApps(
	[...apps],
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

setDefaultMountApp('/vue/')

start()