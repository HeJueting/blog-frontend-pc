import Axios from "../utils/axios";
import { ICommentCreate, ICommentSearch } from "../typing/api/comment";

const commentAxios = {
	// 创建评论
	create: (data: ICommentCreate) =>
		Axios({
			method: "post",
			url: "/comment/frontend/create",
			data,
		}),
	// 查询评论
	search: (params: ICommentSearch) =>
		Axios({
			method: "get",
			url: "/comment/frontend/search",
			params,
		}),
};

export default commentAxios;
