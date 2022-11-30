<template>
	<!-- <ul>
		<li>
			<router-link to="/Home/Login">Login</router-link>
		</li>
		<li>
			<router-link to="/Home/Register">Register</router-link>
		</li>
	</ul> -->
	<div class="main">
		<h1>个人记账分析系统</h1>
		<div class="login box">
			<router-view></router-view>
		</div>
		<div class="copywrite">
			<p>Copyright &copy; 2023</p>
		</div>
	</div>
</template>

<script setup>
	import { getCurrentInstance } from 'vue'
	document.title = '个人记账分析系统'
	const _this = getCurrentInstance().appContext.config.globalProperties // vue3获取当前this
	if (_this.$route.query.next) {
		_this.$router.push({ path: '/Home/Login', query: _this.$route.query})
	} else {
		_this.$router.push({ path: '/Home/Login', query: { next: '/Backstage' }})
	}
</script>

<style scoped>
	.main {
		font-family: 'Catamaran', sans-serif;
		font-size: 100%;
		background: linear-gradient(to left top, #051937, #004d7a, #008793, #00bf72, #a8eb12);
		background-size: cover;
		-webkit-background-size: cover;
		-moz-background-size: cover;
		-o-background-size: cover;
		-ms-background-size: cover;
		min-height: 100vh;
		text-align: center;
	}

	.login {
		display: -webkit-flex;
		display: -webkit-box;
		display: -moz-flex;
		display: -moz-box;
		display: -ms-flexbox;
		display: flex;
		justify-content: center;
		align-items: center;
		-webkit-box-pack: center;
		-moz-box-pack: center;
		-ms-flex-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
	}

	h1 {
		font-size: 2.8em;
		font-weight: 300;
		text-transform: capitalize;
		color: #fff;
		text-shadow: 1px 1px 1px #000;
		letter-spacing: 2px;
		margin: 1.2em 1vw;
		margin-top: 0px;
		padding-top: 2.4em;
		text-align: center;
		font-family: 'Catamaran', sans-serif;
	}

	.copywrite {
		margin: 4em 0 2em;
	}

	.copywrite p {
		color: #fff;
		font-size: 14.5px;
		letter-spacing: 1.5px;
		line-height: 1.8;
		margin: 0 3vw;
	}

	.copywrite p a {
		color: #fff;
		transition: 0.5s all ease;
		-webkit-transition: 0.5s all ease;
		-moz-transition: 0.5s all ease;
		-o-transition: 0.5s all ease;
		-ms-transition: 0.5s all ease;
	}

	.copywrite p a:hover {
		color: #fff;
		text-decoration: underline;
	}

	@media(max-width:1024px) {
		h1 {
			font-size: 4.5vw;
		}
	}

	@media(max-width:800px) {
		h1 {
			font-size: 5vw;
		}
	}

	@media(max-width:480px) {
		h1 {
			font-size: 2.3em;
		}
	}

	@media(max-width:568px) {
		.login {
			flex-direction: column;
		}
	}

	@media(max-width:440px) {
		h1 {
			font-size: 2.1em;
		}
	}

	@media(max-width:320px) {
		h1 {
			font-size: 1.8em;
		}
	}
</style>
