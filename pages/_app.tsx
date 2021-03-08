import React, { useEffect, useState, useRef } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import style from "./style.module.scss";
import "../public/css/globals.scss";
import "../public/css/code-highlighter.css";
import "../public/css/braft-editor.css";
import "../public/iconfont/iconfont.css";

import Menu from "../src/components/menu";
import SetRem from "../src/components/setRem";
import SetTheme from "../src/components/setTheme";
import SetStore from "../src/components/setStore";
import Loading from "../src/components/loading";
import Provider from "../src/store/provider";
import Footer from "../src/components/footer";
import BackTop from "../src/components/backTop";
import ThemeSwitcher from "../src/components/themeSwitcher";
import ErrorCapture from "../src/components/errorCapture";

// 接口：props
interface IAppProps {
	Component: any;
	pageProps: any;
}

const App: React.FC<IAppProps> = ({ Component, pageProps }) => {
	// 中间内容区域
	const mainWrapRef = useRef(null);
	// router
	const router = useRouter();
	// 菜单切换
	const [visible, setVisible] = useState(false);
	// 是否展示footer
	const noFooterRouters = ["/", "/resume", "/login"];

	useEffect(() => {
		// 路由监听
		router.events.on("routeChangeStart", () => {
			// 展示loading
			window.$setLoading(true);
		});
		router.events.on("routeChangeComplete", () => {
			// loadin消失
			window.$setLoading(false);
		});
	}, []);

	return (
		<Provider>
			<div className={style["wrap"]}>
				<Head>
					<script src="/blog/js/bubbly-bg.js"></script>
				</Head>

				{/* 导航栏 */}
				<Menu visible={visible} setVisible={setVisible} />

				{/* 设置主题 */}
				<SetTheme />

				{/* 设置全局store */}
				<SetStore />

				{/* 设置页面font-size */}
				<SetRem />

				{/* 页面错误信息监听 */}
				<ErrorCapture />

				{/* Loading */}
				<Loading />

				{/* 页面正文内容 */}
				<main
					id="scroll-content"
					ref={mainWrapRef}
					className={`${style["wrap-main"]} ` + (visible ? style["wrap-main-out"] : style["wrap-main-in"])}
				>
					{/* 主题模式切换 */}
					<ThemeSwitcher />

					{/* 页面组件 */}
					<Component {...pageProps} />

					{/* footer */}
					{noFooterRouters.indexOf(router.pathname) === -1 && <Footer />}
				</main>

				{/* 回到顶部 */}
				<BackTop />
			</div>
		</Provider>
	);
};

export default App;
