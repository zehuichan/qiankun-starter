import './public-path'
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import routes from './router'
import { store as commonStore } from 'common'
import store from './store'

Vue.config.productionTip = false

let instance = null

function render(props = {}) {
	const { container, routerBase } = props

	const router = new VueRouter({
		base: window.__POWERED_BY_QIANKUN__ ? routerBase : process.env.BASE_URL,
		mode: 'hash',
		routes,
	})

	instance = new Vue({
		router,
		store,
		render: h => h(App),
	}).$mount(container ? container.querySelector('#app') : '#app')
}

if (!window.__POWERED_BY_QIANKUN__) {
	// 独立运行时，也注册一个名为global的store module
	commonStore.globalRegister(store)
	render()
}

export async function bootstrap() {
	console.log('[vue] vue app bootstraped')
}

export async function mount(props) {
	console.log('[vue] props from main framework', props)
	commonStore.globalRegister(store, props)
	render(props)
}

export async function unmount() {
	instance.$destroy()
	instance.$el.innerHTML = ''
	instance = null
}
