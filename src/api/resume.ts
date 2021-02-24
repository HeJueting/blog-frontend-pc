import Axios from "../utils/axios";

// 查询简历信息
interface ISearch {
    password?: string;
}
// 校验简历访问密码
interface ICheck {
    password: string;
}

const resumeAxios = {
    // 查询简历信息
    search: (params?: ISearch) =>
        Axios({
            method: "get",
            url: "/resume/frontend/search",
            params,
        }),
    // 校验简历访问密码
    check: (data: ICheck) =>
        Axios({
            method: "post",
            url: "/resume/frontend/check",
            data,
        }),
};

export default resumeAxios;
