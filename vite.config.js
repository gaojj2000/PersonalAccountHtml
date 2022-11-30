import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const { resolve } = require('path')

// https://vitejs.dev/config/
export default defineConfig({
	// 起个别名，在引用资源时，可以用‘@/资源路径’直接访问
	resolve: {
		alias: {
			"@": resolve(__dirname, "src"),
		},
	},
	plugins: [vue()],
	// 配置前端服务地址和端口
	server: {
		host: '0.0.0.0',
		port: 3000,
		// 是否开启 https
		https: false,
	},
	// 设置反向代理，跨域
	proxy: {
		'/api': {
			// 后台地址
			target: 'http://127.0.0.1:8000',
			changeOrigin: true,
			rewrite: path => path.replace(/^\/api/, '')
		},
	}
})
