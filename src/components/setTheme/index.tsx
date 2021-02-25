import { useEffect, useContext } from "react";
import lodash from "../../utils/lodash";
import context from "../../store/context";

const SetTheme: () => null = () => {
	const { state, dispatch } = useContext(context);
	const { settingInfo } = state;

	const setTheme: () => void = () => {
		const { themeConfig } = settingInfo;
		// 如果配置存在
		if (themeConfig) {
			// 创建style标签，全局设置color主题色
			let styleDom = document.getElementById("styleTheme");
			if (!styleDom) {
				styleDom = document.createElement("style");
				styleDom.setAttribute("type", "text/css");
				styleDom.setAttribute("id", "styleTheme");
			}
			// 设置CSS变量
			let styleStr = "";
			// 遍历所有主题
			lodash.forOwn(themeConfig, (config: string, name: string) => {
				let themeStr = "";
				lodash.forOwn(config, (value: string, key: string) => {
					themeStr += `--${key}:${value};`;
				});
				styleStr += `.theme-${name}{${themeStr}}`;
			});
			styleDom.innerHTML = styleStr;
			// 插入html中
			const headDom = document.head || document.getElementsByTagName("head")[0];
			headDom.appendChild(styleDom);

			// loading消失
			setTimeout(() => {
				window.$setLoading(false);
			}, 500);
		}
	};

	useEffect(() => {
		setTheme();
	}, [settingInfo]);

	return null;
};

export default SetTheme;
