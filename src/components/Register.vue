<template>
	<form action="http://127.0.0.1:8000/register/" method="post" @submit.prevent="register">
		<div class="agile-field-txt">
			<input type="text" name="username" placeholder="用户名" required="" />
		</div>
		<div class="agile-field-txt">
			<input :type="pwd == '隐' ? 'text' : 'password'" name="password" placeholder="密码" required="" />
			<a @click="pwd = pwd == '隐' ? '显' : '隐'">{{pwd}}</a>
		</div>
		<div class="agile-field-txt">
			<input type="email" name="email" placeholder="邮箱" required="" v-model="email" />
		</div>
		<div class="yzm-field-txt">
			<input type="text" name="yzm" placeholder="邮箱验证码" required="" />
			<input type="button" id="verification" value="邮箱验证码" @click="send_email" />
		</div>
		<div class="bot">
			<input type="submit" value="REGISTER">
		</div>
		<div class="agile-field-txt">
			<router-link to="/Home/Login?next=/Backstage">已有账户？点击登录</router-link>
		</div>
	</form>
</template>

<script setup>
	import { ref, getCurrentInstance } from 'vue'
	document.title = '个人记账分析系统'
	const _this = getCurrentInstance().appContext.config.globalProperties // vue3获取当前this
	const pwd = ref('显')
	const email = ref('')
	const timer = ref(null)
	const get_server_time = () => {
		var time = new Date().getTime() / 1000
		fetch('http://127.0.0.1:8000/api/server_timestamp', {
			method: "GET",
			credentials: "include",
			headers: {
				// 注意这里不要设置 Content-Type 请求头，否则会导致错误
			},
			Origin: window.location.protocol + "//" + window.location.host,
		}).then(res => {time = parseFloat(res)})
		return time
	}
	const calc_time = () => {
		var verification = document.getElementById('verification')
		var cookies = document.cookie.split("; ")
		for (var index in cookies) {
			if (cookies[index].startsWith('last=')) {
				var last = parseFloat(cookies[index].replace('last=', ''))
				var now = get_server_time()
				if (last + 59 > now) {
					verification.value = `重新发送(${parseInt(last + 59 - now)})`
					timer.value = setTimeout(calc_time, 800)
				} else {
					verification.value = '邮箱验证码'
					verification.disabled = false
					clearTimeout(timer.value)
				}
				return
			}
		}
	}
	const send_email = () => {
		var yzm = document.getElementById('verification')
		if (!email.value) {
			alert('请输入邮箱！')
			return
		}
		fetch('http://127.0.0.1:8000/email/', {
			method: "POST",
			credentials: "include",
			headers: {
				// 注意这里不要设置 Content-Type 请求头，否则会导致错误
			},
			Origin: window.location.protocol + "//" + window.location.host,
			// fetch 的 body 发送 data
			body: JSON.stringify({
				email: email.value
			})
		}).then(res => res.json()).then(json => {
			alert(json.msg)
			if (json.code >= 0) {
				verification.disabled = true
				timer.value = setTimeout(calc_time, 800)
			}
		})
	}
	const register = (event) => {
		if (!/^\w{6,18}$/.test(event.target.username.value)) {
			alert('用户名应该是长度为 6-18 的数字、大小写字母、下划线的组合！')
			return
		}
		if (!/^\w{6,18}$/.test(event.target.password.value)) {
			alert('密码应该是长度为 6-18 的数字、大小写字母、下划线的组合！')
			return
		}
		fetch('http://127.0.0.1:8000/register/', {
			method: "POST",
			credentials: "include",
			headers: {
				// 注意这里不要设置 Content-Type 请求头，否则会导致错误
			},
			Origin: window.location.protocol + "//" + window.location.host,
			// fetch 的 body 发送 data
			body: JSON.stringify({
				username: event.target.username.value,
				password: event.target.password.value,
				email: email.value,
				yzm: event.target.yzm.value
			})
		}).then(res => res.json()).then(json => {
			console.log(json.msg)
			if (!json.code) {
				_this.$router.push({ path: _this.$route.query.next || '/Home/Login'})
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
	input[type="email"],
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

	input[type=button] {
		color: yellow;
		width: 160px;
		height: 46px;
		padding: 0.4em 0;
		font-size: 1em;
		font-weight: 400;
		letter-spacing: 2px;
		cursor: pointer;
		border: 1px black solid;
		outline: none;
		background: rgba(0, 0, 0, 0);
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
		position: relative;
	}

	.yzm-field-txt input[type=text] {
		float: left;
		width: calc(100% - 160px);
	}
</style>
