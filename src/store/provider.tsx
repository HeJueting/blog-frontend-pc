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
        theme: {},
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
