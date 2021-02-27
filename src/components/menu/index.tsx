import React, { useContext } from "react";
import style from "./style.module.scss";
import context from "../../store/context";
import Link from "next/link";
import Icon from "../../components/icon";
import { setBubbly, clearBubbly } from "../../utils/help";

// 接口：props
interface IMenuProps {
	visible: boolean;
	setVisible: (v: boolean) => void;
}

const Menu: React.FC<IMenuProps> = ({ visible, setVisible }) => {
	// store
	const { state } = useContext(context);
	const { theme, settingInfo } = state;

	// 路由信息
	const routerInfo = [
		{
			title: "首页",
			icon: "iconhome",
			path: "/",
		},
		{
			title: "文章",
			icon: "iconbook",
			path: "/article",
		},
		{
			title: "相册",
			icon: "iconzhaopian",
			path: "/album",
		},
		{
			title: "生活",
			icon: "iconlifeon",
			path: "/life",
		},
		{
			title: "留言",
			icon: "iconmingshijiyu",
			path: "/comment",
		},
		{
			title: "简历",
			icon: "iconpersonal-info",
			path: "/resume",
		},
	];
	// 展开
	const open = () => {
		// 获取气泡主题配色
		const {
			bubbly_color,
			bubbly_bg_colorStart,
			bubbly_bg_colorStop,
		} = settingInfo.themeConfig[theme];
		// 设置气泡背景
		setBubbly(bubbly_color, bubbly_bg_colorStart, bubbly_bg_colorStop);
		setVisible(true);
	};
	// 关闭
	const close = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			setVisible(false);
			clearBubbly();
		}
	};

	return (
		<nav className={style["wrap-menu"]}>
			{/* 菜单的按钮 */}
			<div className={style["menu-icon"]} onClick={open}>
				<div></div>
				<div></div>
				<div></div>
			</div>

			{/* 路由菜单 */}
			<div
				className={
					`${style["menu-slider"]} ` +
					style[visible ? "menu-slider-in" : "menu-slider-out"]
				}
				onClick={close}
			>
				<div
					className={
						`${style["slider-nav"]} ` +
						style[visible ? "slider-nav-in" : "slider-nav-out"]
					}
				>
					{routerInfo.map((router) => (
						<Link href={router.path} key={router.icon}>
							<a>
								<Icon type={router.icon} className={style["iconfont"]} />
								<span>{router.title}</span>
							</a>
						</Link>
					))}
				</div>
			</div>
		</nav>
	);
};

export default Menu;
