<template>
	<img :src="getAssetsFile('404.png')" />
	<p class="error">您的页面好像已经偏离了地球...&gt;_&lt;</p>
	<p><span class="path">{{_this.$route.params.pathMatch[0]}}</span>好像不是银河系的页面哦~</p>
</template>

<script setup>
	import { getCurrentInstance } from 'vue'
	document.title = '404：您访问的页面走丢了哦~'
	const getAssetsFile = (filename) => { return new URL(`../assets/${filename}`, import.meta.url).href }
	const _this = getCurrentInstance().appContext.config.globalProperties // vue3获取当前this

	// 一。router.push的使用： 
	// 1.字符串路径
	// _this.$router.push('/Home')

	// 2.带有路径的对象
	// _this.$router.push({path:'/file2/children2'})

	// 3.命名的路由，并加上参数，让路由建立 url
	// _this.$router.push({name:'file2',params:{username:'children2'}})

	// 4.带查询参数，结果是 /register?plan=private
	// _this.$router.push({ path: '/file2/children2', query: {userid:'123'} })

	// 二。router.replace的使用：
	// _this.$router.replace('/file2/children1')

	// 三。router.go的使用：
	// _this.$router.go(-1) //相当于点击回退一次
</script>

<style scoped>
	.error {
		color: #999;
		font-size: 16px;
		margin-top: 60px;
		text-align: center;
	}

	.path {
		color: darkblue;
		font-size: 24px;
	}
</style>
