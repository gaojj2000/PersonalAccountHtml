import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import C from './export_components.js'

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			name: '跳转至首页',
			redirect: '/Home',
		},
		{
			path: '/Home',
			name: '首页',
			component: C.Home,
			children: [
				{
					path: 'Login',
					name: '登录',
					component: C.Login
				},
				{
					path: 'Register',
					name: '注册',
					component: C.Register
				}
			]
		},
		{
			path: '/Backstage',
			name: '后台',
			component: C.Backstage,
			children: [
				{
					path: 'Settings',
					name: '设置',
					component: C.Settings
				},
				{
					path: 'DataEntry',
					name: '数据录入',
					component: C.DataEntry
				},
				{
					path: 'DataShow',
					name: '数据展示',
					component: C.DataShow,
					children: [
						{
							path: ':username',
							name: '用户展示',
							component: C.DataShow
						}
					]
				},
				{
					path: 'InStationMail',
					name: '站内邮件',
					component: C.InStationMail
				}
			]
		},
		{
			path: '/:pathMatch(.*)*',
			name: '404',
			// redirect: '/404',
			component: C.NotFound
		},
		// {
		// 	path: '/404',
		// 	name: '404',
		// 	component: NotFound
		// }
	]
})

createApp(App).use(router).mount('#app')
