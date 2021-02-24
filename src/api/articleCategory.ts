import Axios from "../utils/axios";

const articleCategoryAxios = {
	// 查询文章分类信息
	list: () =>
		Axios({
			method: "get",
			url: "/articleCategory/frontend/list",
		}),
};

export default articleCategoryAxios;
