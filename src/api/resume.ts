import Axios from "../utils/axios";
import { IResumeSearch, IResumeCheckPassword } from "../typing/api/resume";

const resumeAxios = {
    // 查询简历信息
    search: (params?: IResumeSearch) =>
        Axios({
            method: "get",
            url: "/resume/frontend/search",
            params,
        }),
    // 校验简历密码
    checkPassword: (params: IResumeCheckPassword) =>
        Axios({
            method: "get",
            url: "/resume/frontend/checkPassword",
            params,
        }),
};

export default resumeAxios;
