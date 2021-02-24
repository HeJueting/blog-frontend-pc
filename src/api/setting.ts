import Axios from "../utils/axios";

const settingAxios = {
    // 获取设置信息
    search: () =>
        Axios({
            method: "get",
            url: "/setting/frontend/search",
        }),
};

export default settingAxios;
