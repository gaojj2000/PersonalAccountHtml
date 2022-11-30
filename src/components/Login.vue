<template>
	<form action="http://127.0.0.1:8000/login/" method="post" @submit.prevent="login">
		<div class="agile-field-txt">
			<input type="text" name="username" placeholder="用户名/邮箱" required="" />
		</div>
		<div class="agile-field-txt">
			<input :type="pwd == '隐' ? 'text' : 'password'" name="password" placeholder="密码" required="" />
			<a @click="pwd = pwd == '隐' ? '显' : '隐'">{{pwd}}</a>
		</div>
		<div class="yzm-field-txt">
			<input type="text" id="yzm" name="yzm" placeholder="验证码" required="" />
			<img :src="yzm_url" @click="yzm_url = 'http://127.0.0.1:8000/yzm/?time=' + new Date().getTime()"/>
		</div>
		<div class="bot">
			<input type="submit" value="LOGIN" @click="check_yzm">
		</div>
		<div class="agile-field-txt">
			<router-link to="/Home/Register?next=/Home/Login">还没有账户？点击注册</router-link>
		</div>
	</form>
</template>

<script setup>
	import { ref, getCurrentInstance } from 'vue'
	document.title = '个人记账分析系统'
	const pwd = ref('显')
	const yzm_url = ref('http://127.0.0.1:8000/yzm/')
	const _this = getCurrentInstance().appContext.config.globalProperties // vue3获取当前this
	const check_yzm = (event) => {
		const yzm = document.getElementById('yzm')
		var cookies = document.cookie.split("; ")
		for (var index in cookies) {
			if (cookies[index].startsWith('yzm=')) {
				if (btoa(yzm.value) == cookies[index].replace('yzm="', '').replace('"', '')) {
					return
				}
			}
		}
		yzm.value = ''
		yzm_url.value = 'http://127.0.0.1:8000/yzm/?time=' + new Date().getTime()
	}
	const login = (event) => {
		fetch('http://127.0.0.1:8000/login/', {
			method: "POST",
			credentials: "include",
			headers: {
				// 注意这里不要设置 Content-Type 请求头，否则会导致错误
			},
			Origin: window.location.protocol + "//" + window.location.host,
			// fetch 的 body 发送 data
			body: JSON.stringify({
				username: event.target.username.value,
				password: event.target.password.value
			})
		}).then(res => res.json()).then(json => {
			console.log(json.msg)
			if (!json.code) {
				_this.$router.push({ path: _this.$route.query.next || '/Backstage'})
			} else {
				alert(json.msg)
			}
		})
	}
</script>

<style scoped>
	a {
		top: 12px;
		z-index: 1;
		right: 10px;
		color: yellow;
		cursor: pointer;
		position: absolute;
		text-decoration: none;
	}

	.bot {
		margin-top: 1em;
		width: 100%;
	}

	form {
		max-width: 500px;
		margin: 0 5vw;
		padding: 3.5vw;
		border-width: 5px 0;
		box-sizing: border-box;
		display: flex;
		display: -webkit-flex;
		flex-wrap: wrap;
		background: rgba(252, 254, 255, 0.11);
	}

	.agile-field-txt {
		position: relative;
		flex-basis: 100%;
		-webkit-flex-basis: 100%;
		margin-bottom: 1.5em;
	}

	input[type="text"],
	input[type="password"] {
		width: 100%;
		color: #fff;
		outline: none;
		background: rgba(0, 0, 0, 0.32);
		font-size: 17px;
		letter-spacing: 0.5px;
		padding: 12px;
		box-sizing: border-box;
		border: none;
		-webkit-appearance: none;
		font-family: 'Catamaran', sans-serif;
	}

	::-moz-placeholder {
		/* Undefined */
		color: #eee;
	}

	::-webkit-input-placeholder {
		/* Firefox */
		color: #eee;
	}

	:-ms-input-placeholder {
		/* Chrome */
		color: #eee;
	}

	input[type=submit] {
		color: #ffffff;
		font-weight: 100;
		width: 100%;
		padding: 0.4em 0;
		font-size: 1em;
		font-weight: 400;
		letter-spacing: 2px;
		cursor: pointer;
		border: none;
		outline: none;
		background: #000;
		font-family: 'Catamaran', sans-serif;
		transition: 0.5s all ease;
		-webkit-transition: 0.5s all ease;
		-moz-transition: 0.5s all ease;
		-o-transition: 0.5s all ease;
		-ms-transition: 0.5s all ease;
	}

	input[type=submit]:hover {
		color: #fff;
		box-shadow: 0 20px 5px -10px rgba(0, 0, 0, 0.4);
		transform: translateY(5px);
	}
	
	.yzm-field-txt {
		float: left;
		width: 100%;
		height: 60px;
		position: relative;
	}
	
	.yzm-field-txt img {
		float: left;
	}
	
	.yzm-field-txt input {
		float: left;
		margin: 7px 0;
		width: calc(100% - 160px);
	}
</style>
