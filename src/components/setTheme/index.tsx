import { useEffect, useContext } from "react";
import lodash from "../../utils/lodash";
import context from "../../store/context";
import theme from "./theme";

const SetTheme: () => null = () => {
	const { dispatch } = useContext(context);

	const setTheme: () => void = () => {
		// 初始化主题色
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
		const headDom = document.head || document.getElementsByTagName("head")[0];
		headDom.appendChild(styleDom);

		// loading消失
		setTimeout(() => {
			window.$setLoading(false);
		}, 500);
	};

	useEffect(() => {
		setTheme();
	}, []);

	return null;
};

export default SetTheme;
