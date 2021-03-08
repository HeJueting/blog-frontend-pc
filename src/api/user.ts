import Axios from "../utils/axios";
import { IUserLogin } from "../typing/api/user";

const userAxios = {
    // 登录
    login: (data: IUserLogin) =>
        Axios({
            method: "post",
            url: "/user/frontend/login",
            data,
        }),
    // 发送验证码
    sendVerifyCode: () =>
        Axios({
            method: "get",
            url: "/user/frontend/sendVerifyCode",
        }),
    // 获取用户信息
    info: () =>
        Axios({
            method: "get",
            url: "/user/frontend/info",
        }),
};

export default userAxios;
