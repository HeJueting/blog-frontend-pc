import React, { useEffect, useReducer } from "react";
import reducer from "./reducer";
import context from "./context";

// 接口：props
interface IProviderProps {
    children: React.ReactNode;
}

const Provider: React.FC<IProviderProps> = ({ children }) => {
    // 初始化state
    const initialState = {
        loading: true,
        theme: {
            color_1: "#000000",
            color_2: "#2a1215",
            color_3: "#431418",
            color_4: "#58181c",
            color_5: "#791a1f",
            color_6: "#a61d24",
            color_7: "#d32029",
            color_8: "#e84749",
            color_9: "#f37370",
            color_10: "#f89f9a",
            color_11: "#fac8c3",
            color_12: "#ffffff",
        },
        settingInfo: {},
        userInfo: {},
    };

    // 使用reducer搭配context实现状态全局管理
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        // 全局设置loading
        window.$setLoading = (visible: boolean) => {
            dispatch({
                type: "SET_LOADING",
                params: {
                    loading: visible,
                },
            });
        };
    }, []);

    return (
        <context.Provider value={{ state, dispatch }}>
            {children}
        </context.Provider>
    );
};

export default Provider;
