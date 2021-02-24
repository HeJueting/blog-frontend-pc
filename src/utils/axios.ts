import axios from "axios";
import CONFIG from "../config";
import message from "../components/message";

// 创建axios实例
const Axios = axios.create({
	baseURL: CONFIG.REQUEST_BASE_URL,
	timeout: 5000,
});

// request拦截器
Axios.interceptors.request.use(
	async (config) => {
		try {
			// 展示loading
			window.$setLoading(true);
		} catch (e) {}
		return config;
	},
	(error) => {
		// 全局报错提示
		message.error(String(error));
		return Promise.reject(error);
	}
);

// response拦截器
Axios.interceptors.response.use(
	(response) => {
		try {
			// 消失loading
			window.$setLoading(false);
		} catch (e) {}
		// 响应结果
		const res = response.data;
		if (res.code !== 0) {
			// 全局报错提示
			message.error(res.msg);
		}
		return res;
	},
	(error) => {
		try {
			// 消失loading
			window.$setLoading(false);
			// 全局报错提示
			message.error(String(error));
		} catch (e) {}
		return Promise.reject(error);
	}
);

export default Axios;
