import { Interface } from "readline";
import Axios from "../utils/axios";

// 接口：创建评论
interface ICreate {
    category: number;
    categoryId?: string;
    name: string;
    email: string;
    html: string;
    quote?: string;
}
// 接口：查询评论
interface ISearch {
    category?: number;
    categoryId?: string;
}

const commentAxios = {
    // 创建评论
    create: (data: ICreate) =>
        Axios({
            method: "post",
            url: "/comment/frontend/create",
            data,
        }),
    // 查询评论
    search: (params: ISearch) =>
        Axios({
            method: "get",
            url: "/comment/frontend/search",
            params,
        }),
};

export default commentAxios;
