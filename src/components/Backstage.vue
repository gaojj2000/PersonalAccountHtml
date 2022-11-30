<template>
	后台
	<ul>
		<li>
			<router-link to="/Backstage/Settings">Settings</router-link>
		</li>
		<li>
			<router-link to="/Backstage/DataEntry">DataEntry</router-link>
		</li>
		<li>
			<router-link to="/Backstage/DataShow">DataShow</router-link>
		</li>
		<li>
			<router-link to="/Backstage/InStationMail">InStationMail</router-link>
		</li>
	</ul>
	<a @click="logout">登出</a>
	<router-view></router-view>
</template>

<script setup>
	document.title = '个人记账分析系统后台'
	import {
		getCurrentInstance
	} from 'vue'
	const getAssetsFile = (filename) => {
		return new URL(`../assets/${filename}`,
			import.meta.url).href
	}
	const _this = getCurrentInstance().appContext.config.globalProperties // vue3获取当前this
	const logout = () => {
		fetch('http://127.0.0.1:8000/logout/', {
			method: "GET",
			credentials: "include",
			headers: {
				// 注意这里不要设置 Content-Type 请求头，否则会导致错误
			},
			Origin: window.location.protocol + "//" + window.location.host,
		}).then(res => res.json()).then(json => {
			alert(json.msg)
			if (_this.$route.query.next) {
				_this.$router.push({
					path: '/Home/Login',
					query: _this.$route.query
				})
			} else {
				_this.$router.push({
					path: '/Home/Login',
					query: {
						next: '/Backstage'
					}
				})
			}
		})
	}
	const info = () => {
		fetch('http://127.0.0.1:8000/info/', {
			method: "GET",
			credentials: "include",
			headers: {
				// 注意这里不要设置 Content-Type 请求头，否则会导致错误
			},
			Origin: window.location.protocol + "//" + window.location.host,
		}).then(res => res.json()).then(json => {
			console.log(json)
		})
	}
	const check_online = () => {
		fetch('http://127.0.0.1:8000/check_online/', {
			method: "GET",
			credentials: "include",
			headers: {
				// 注意这里不要设置 Content-Type 请求头，否则会导致错误
			},
			Origin: window.location.protocol + "//" + window.location.host,
		}).then(res => res.json()).then(json => {
			console.log(json.msg)
			if (!json.code) {
				setTimeout(check_online, 60 * 1000)
			} else {
				if (_this.$route.query.next) {
					_this.$router.push({
						path: '/Home/Login',
						query: _this.$route.query
					})
				} else {
					_this.$router.push({
						path: '/Home/Login',
						query: {
							next: '/Backstage'
						}
					})
				}
			}
		})
	}
	setTimeout(check_online, 60 * 1000)
</script>

<style scoped>
</style>
