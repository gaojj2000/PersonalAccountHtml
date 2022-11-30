<template>
	设置
</template>

<script setup>
	var cookies = document.cookie.split("; ")
	for (var index in cookies) {
		if (cookies[index].startsWith('uname=')) {
			if (cookies[index].replace('uname="', '').replace('"', '')) {
				break
			}
		}
	}
	document.title = '设置'
</script>

<style scoped>
</style>
