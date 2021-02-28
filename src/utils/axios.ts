import axios from "axios";
import CONFIG from "../config";
import message from "../components/message";
import lodash from "../utils/lodash";
import localForage from "localforage";

// 创建axios实例
const Axios = axios.create({
	baseURL: CONFIG.REQUEST_BASE_URL,
	timeout: 5000,
});

// request拦截器
Axios.interceptors.request.use(
	async (config) => {
		// 深复制config
		const newConfig = lodash.cloneDeep(config);
		try {
			// 展示loading
			window.$setLoading(true);
			// 携带Authorization认证
			const token = await localForage.getItem("token");
			newConfig.headers.Authorization = `Bearer ${token}`;
		} catch (e) {}
		// 返回夹带auth认证的config
		return newConfig;
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
