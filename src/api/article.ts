import Axios from "../utils/axios";

// 接口：查询文章列表
interface IList {
    page?: number;
    pageSize?: number;
    sort?: string;
    category?: string;
}
// 接口：查询文章详情
interface ISearch {
    id: string;
}
// 接口：浏览量+1、点赞量+1
interface ILookGood {
    _id: string;
}

const articleAxios = {
    // 查询文章列表
    list: (data?: IList) =>
        Axios({
            method: "post",
            url: "/article/frontend/list",
            data,
        }),
    // 查询文章详情
    search: (params: ISearch) =>
        Axios({
            method: "get",
            url: "/article/frontend/search",
            params,
        }),
    // 文章浏览数量+1
    newLook: (params: ILookGood) =>
        Axios({
            method: "get",
            url: "/article/frontend/addLook",
            params,
        }),
    // 文章点赞数量+1
    newGood: (params: ILookGood) =>
        Axios({
            method: "get",
            url: "/article/frontend/addGood",
            params,
        }),
};

export default articleAxios;
