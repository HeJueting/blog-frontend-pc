import Axios from "../utils/axios";

const userAxios = {
    // 获取用户信息
    info: () =>
        Axios({
            method: "get",
            url: "/user/frontend/info",
        }),
};

export default userAxios;
