<template>
	数据展示
	<p><span class="path">{{_this.$route.params.username}}</span>好像不是银河系的页面哦~</p>
</template>

<script setup>
	import { getCurrentInstance } from 'vue'
	document.title = '数据展示'
	const _this = getCurrentInstance().appContext.config.globalProperties // vue3获取当前this
	// fetch('http://127.0.0.1:22909/test_get_history?url=' + encodeURIComponent(url.value)).then(res => {
	// 	return res.json()
	// }).then(res => {
	// 	if (res.retcode) {
	// 		remind.value = res.message
	// 	} else {
	// 		remind.value = '可以正常访问！该抽卡地址的uid是：' + (res.data.list?. [0]?.uid ?? '【长期不抽卡无法获取uid值！】')
	// 		if (func) {
	// 			func()
	// 		}
	// 	}
	// })
</script>

<style scoped>
</style>
