import Axios from "../utils/axios";

const resumeAxios = {
	// 查询简历信息
	search: () =>
		Axios({
			method: "get",
			url: "/resume/frontend/search",
		}),
};

export default resumeAxios;
