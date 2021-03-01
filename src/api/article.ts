import Axios from "../utils/axios";
// 接口
import {
    IArticleList,
    IArticleSearch,
    IArticleNewLook,
    IArticleNewGood,
    IArticleCheckPassword,
} from "../typing/api/article";

const articleAxios = {
    // 查询文章列表
    list: (data: IArticleList) =>
        Axios({
            method: "post",
            url: "/article/frontend/list",
            data,
        }),
    // 查询文章详情
    search: (params: IArticleSearch) =>
        Axios({
            method: "get",
            url: "/article/frontend/search",
            params,
        }),
    // 文章访问密码校验
    checkPassword: (params: IArticleCheckPassword) =>
        Axios({
            method: "get",
            url: "/article/frontend/checkPassword",
            params,
        }),
    // 文章浏览数量+1
    newLook: (params: IArticleNewLook) =>
        Axios({
            method: "get",
            url: "/article/frontend/addLook",
            params,
        }),
    // 文章点赞数量+1
    newGood: (params: IArticleNewGood) =>
        Axios({
            method: "get",
            url: "/article/frontend/addGood",
            params,
        }),
};

export default articleAxios;
