import React, { useEffect, useState } from "react";
import style from "./style.module.scss";
import Icon from "../icon";

// 接口：props
interface IBackTopProps {
	scrollDom: React.ReactNode;
}

const BackTop: React.FC<IBackTopProps> = ({ scrollDom }) => {
	const [show, setShow] = useState(false);

	// 监听滚轮滚动
	useEffect(() => {
		const litsen = () => {
			if (scrollDom["current"].scrollTop > 100) {
				setShow(true);
			} else {
				setShow(false);
			}
		};
		scrollDom["current"].addEventListener("scroll", litsen);
		return () => {
			scrollDom["current"].removeEventListener("scroll", litsen);
		};
	});

	const backTop = () => {
		scrollDom["current"].scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	return (
		<div
			style={{
				visibility: show ? "visible" : "hidden",
				opacity: show ? 1 : 0,
				transition: show
					? "visibility 0s linear 0s, opacity 0.3s linear 0s"
					: "visibility 0s linear 0.25s, opacity 0.3s linear 0s",
			}}
			className={style["back-top"]}
			onClick={backTop}
		>
			<Icon type="icon12" className={style["icon"]} />
		</div>
	);
};

export default BackTop;
