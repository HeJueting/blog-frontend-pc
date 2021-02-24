import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Icon from "../icon";
import style from "./style.module.scss";

// 接口：props
interface IMessageProps {
	type: string;
	msg: string;
}
// Message组件
const Message: React.FC<IMessageProps> = ({ msg, type }) => {
	const [visible, setVisible] = useState(true);
	const typeMap = {
		success: "iconsuccess",
		error: "iconfail",
		info: "icontishi",
	};

	useEffect(() => {
		// 消息提示消失、卸载消息提示的timer
		let timerClose = null;
		let timerDestroy = null;
		timerClose = setTimeout(() => {
			setVisible(false);
			timerDestroy = setTimeout(() => {
				// 直接卸载该组件
				let content = document.getElementById("msg-content");
				ReactDOM.unmountComponentAtNode(content);
			}, 500);
		}, 4000);
		return () => {
			clearTimeout(timerClose);
			clearTimeout(timerDestroy);
		};
	}, []);

	return (
		<div className={`${style["message"]} ${!visible && style["moveOut"]}`}>
			<Icon
				type={typeMap[type]}
				className={`${style["iconfont"]} ${style[typeMap[type]]}`}
			/>
			<span>{msg}</span>
		</div>
	);
};

// 接口：initMessage
interface IInitMessage {
	(type: string, msg: string): void;
}
// 初始化Message组件
const initMessage: IInitMessage = (type, msg) => {
	try {
		// 创建消息提示的wrap
		let msgWrap = document.getElementById("msg-wrap");
		if (!msgWrap) {
			msgWrap = document.createElement("div");
			msgWrap.className = "msg-wrap";
			msgWrap.id = "msg-wrap";
			document.body.appendChild(msgWrap);
		}

		// 初始化消息内容
		let msgContent = document.getElementById("msg-content");
		if (!msgContent) {
			msgContent = document.createElement("div");
			msgContent.className = "msg-content";
			msgContent.id = "msg-content";
			msgWrap.appendChild(msgContent);
		}

		// 如果连续两次提示信息,优先销毁该组件
		ReactDOM.unmountComponentAtNode(msgContent);

		ReactDOM.render(<Message type={type} msg={msg} />, msgContent);
	} catch (e) {}
};

const message = {
	success: (msg: string) => {
		initMessage("success", msg);
	},
	info: (msg: string) => {
		initMessage("info", msg);
	},
	error: (msg: string) => {
		initMessage("error", msg);
	},
};

export default message;
