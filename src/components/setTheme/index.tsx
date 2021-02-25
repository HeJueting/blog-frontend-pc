import { useEffect, useContext } from "react";
import lodash from "../../utils/lodash";
import context from "../../store/context";
import darkTheme from "./dark-theme";
import lightTheme from "./light-theme";

const themeTypes = {
    light: lightTheme,
    dark: darkTheme,
};

const SetTheme: () => null = () => {
    const { state } = useContext(context);
    const { theme } = state;

    const setTheme: () => void = () => {
        // 创建style标签，全局设置color主题色
        let styleDom = document.getElementById("styleTheme");
        if (!styleDom) {
            styleDom = document.createElement("style");
            styleDom.setAttribute("type", "text/css");
        }
        // 设置CSS变量
        let styleStr = "";
        lodash.forOwn(themeTypes[theme], (value: string, key: string) => {
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
    }, [theme]);

    return null;
};

export default SetTheme;
