import { useEffect, useContext } from "react";
import lodash from "../../utils/lodash";
import context from "../../store/context";

const SetTheme: () => null = () => {
    // 获取主题配色
    const theme = {
        color_0: "#000",
        color_1: "#2a1215",
        color_2: "#431418",
        color_3: "#58181c",
        color_4: "#791a1f",
        color_5: "#a61d24",
        color_6: "#d32029",
        color_7: "#e84749",
        color_8: "#f37370",
        color_9: "#f89f9a",
        color_10: "#fac8c3",
        color_11: "#fff",
    };
    const { dispatch } = useContext(context);

    const setTheme: () => void = () => {
        dispatch({
            type: "SET_THEME",
            params: { theme },
        });

        // 创建style标签，全局设置color主题色
        let styleDom = document.getElementById("styleTheme");
        if (!styleDom) {
            styleDom = document.createElement("style");
            styleDom.setAttribute("type", "text/css");
        }
        // 设置CSS变量
        let styleStr = "";
        lodash.forOwn(theme, (value: string, key: string) => {
            styleStr += `--${key}:${value};`;
        });
        styleDom.innerHTML = `body{${styleStr}}`;
        // 插入html中
        const headDom =
            document.head || document.getElementsByTagName("head")[0];
        headDom.appendChild(styleDom);

        // loading消失
        setTimeout(() => {
            window.$setLoading(false);
        }, 500);
    };

    useEffect(() => {
        setTheme();
        // 初始化背景
        window.bubbly({
            radiusFunc: () => 4 + Math.random() * 25,
            colorStart: theme.color_4,
            colorStop: theme.color_4,
        });
    }, []);

    return null;
};

export default SetTheme;
