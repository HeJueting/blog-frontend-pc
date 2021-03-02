import { useEffect, useContext } from "react";
import context from "../../store/context";
import settingAxios from "../../../src/api/setting";
import userAxios from "../../../src/api/user";
import { updateTheme } from "../../utils/help";

const SetStore: () => null = () => {
    const { dispatch } = useContext(context);

    // 初始化store
    const initStore = async () => {
        // 博客配置项
        const settingRes = await settingAxios.search();
        if (settingRes.code === 0) {
            // 初始化博客配置
            dispatch({
                type: "SET_SETTINGINFO",
                params: {
                    settingInfo: settingRes.data,
                },
            });
            // 初始化主题配置（默认为白天主题）
            updateTheme("light", dispatch);
        }
        // 用户基本信息
        const userRes = await userAxios.info();
        if (userRes.code === 0) {
            dispatch({
                type: "SET_USERINFO",
                params: {
                    userInfo: userRes.data,
                },
            });
        }
    };

    // 初始化博客配置信息
    useEffect(() => {
        initStore();
    }, []);

    return null;
};

export default SetStore;
