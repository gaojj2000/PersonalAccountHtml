<script setup>
	// This starter template is using Vue 3 <script setup> SFCs
	// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
	// 使用python脚本处理
// 	const string = 'ab1sad3'
// 	const code = `
// import re
// print(re.findall(r'\\d+', '${string}'))
// 	`
// 	run_python(code, function(x) {
// 		console.log(x)
// 	})
</script>

<template>
	<!-- <ul>
		<li>
			<router-link to="/Home">Home</router-link>
		</li>
		<li>
			<router-link to="/Backstage">Backstage</router-link>
		</li>
		<li>
			<router-link to="/NotFound">NotFound</router-link>
		</li>
	</ul> -->
	<router-view></router-view>
</template>

<style scoped>
</style>
