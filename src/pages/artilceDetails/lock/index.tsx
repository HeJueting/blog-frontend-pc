import React, { useState } from "react";
import style from "./style.module.scss";
// 组件
import Icon from "../../../components/icon";
import Modal from "../../../components/modal";
import Input from "../../../components/input";
import message from "../../../components/message";

// 接口：props
interface ILockProps {
	articleInfo: any;
	setIsLock: React.Dispatch<React.SetStateAction<boolean>>;
}

const Lock: React.FC<ILockProps> = ({ articleInfo, setIsLock }) => {
	// 弹窗
	const [visible, setVsible] = useState<boolean>(false);
	// 访问密码
	const [password, setPassword] = useState<string>("");

	// 确认密码
	const onOk = () => {
		if (password === articleInfo.password) {
			message.success("密码校验成功！");
			setIsLock(false);
			setVsible(false);
			setPassword("");
			// 设置sessionStorage，只要关闭页面，就不用再次输入密码访问
			sessionStorage.setItem(`article-${articleInfo._id}`, "yes");
		} else {
			message.error("密码校验失败！");
		}
	};

	return (
		<div className={style["lock-box"]}>
			<p></p>
			<p></p>
			<p></p>
			<p></p>
			<p></p>
			<p></p>
			{/* 锁 */}
			<div className={style["lock-wrap"]}>
				<Icon
					type="iconxingzhuang"
					className={style["iconxingzhuang"]}
					onClick={() => {
						setVsible(true);
					}}
				/>
			</div>

			<Modal
				visible={visible}
				setVsible={setVsible}
				title="访问简历"
				width="30vw"
				onCancel={() => {
					setPassword("");
				}}
				onOk={onOk}
			>
				<Input
					className={style["input"]}
					value={password}
					placeholder="请输入访问密码"
					onChange={(e) => setPassword(e.target.value)}
				/>
			</Modal>
		</div>
	);
};

export default Lock;
