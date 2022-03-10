# qiankun-starter

## 基座主应用

```sh
npm install -S qiankun
```

```js
// main.js
// 主应用基于vue技术栈
import Vue from 'vue'
import App from './App.vue'

// Step1 初始化应用（可选）
Vue.config.productionTip = false

new Vue({
	render: h => h(App),
}).$mount('#mainapp')

import { registerMicroApps, runAfterFirstMounted, setDefaultMountApp, start } from 'qiankun'

// Step2 注册子应用
registerMicroApps(
	// apps
	[
		{
			name: 'vue',
			entry: '//localhost:7101',
			container: '#subapp-viewport',
			activeRule: '/vue/',
		},
	],
	// lifeCycles
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

```

## 子应用

```js
if (window.__POWERED_BY_QIANKUN__) {
	// eslint-disable-next-line no-undef
	__webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__
}
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

import routes from './router'

Vue.config.productionTip = false

let router = null
let instance = null

function render(props = {}) {
	const { container } = props

	router = new VueRouter({
		base: window.__POWERED_BY_QIANKUN__ ? '/vue/' : '/',
		routes,
	})

	instance = new Vue({
		router,
		render: h => h(App),
	}).$mount(container ? container.querySelector('#app') : '#app')
}

if (!window.__POWERED_BY_QIANKUN__) {
	render()
}

export async function bootstrap() {
	console.log('[vue] vue app bootstraped')
}

export async function mount(props) {
	console.log('[vue] props from main framework', props)
	render(props)
}

export async function unmount() {
	instance.$destroy()
	instance.$el.innerHTML = ''
	instance = null
	router = null
}

```

