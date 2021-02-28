import React, { useEffect, useState } from "react";
import lodash from "../../utils/lodash";
import style from "./style.module.scss";
import { getUrlQuery } from "../../utils/help";

import Icon from "../../components/icon";
import Modal from "../../components/modal";
import Input from "../../components/input";
import message from "../../components/message";

// 接口：props
interface IResumeProps {
	resumeInfo: any;
}

const Resume: React.FC<IResumeProps> = ({ resumeInfo }) => {
	// 是否锁住简历
	const [isLock, setIsLock] = useState<boolean>(false);
	// 简历信息
	const [html, setHtml] = useState<string>("");
	// 访问简历的弹窗
	const [visible, setVsible] = useState<boolean>(false);
	const [password, setPassword] = useState<string>("");

	// 判断该简历是否可以解锁查看
	const checkIsLock = () => {
		// 默认为上锁状态
		let lockStatus = true;
		// 获取简历信息
		const { isPublic, password, isLogin, _id } = resumeInfo;
		const query: any = getUrlQuery(window.location.href);
		// 公开权限
		if (isPublic === true) {
			lockStatus = false;
		}
		// 密码权限，并且url上携带了正确的password
		else if (isPublic === false && password === query.password) {
			lockStatus = false;
		}
		// 处于登录状态的本人
		else if (isLogin) {
			lockStatus = false;
		}
		// 如果已经登陆过，不用校验
		else if (sessionStorage.getItem(`resume-${_id}`) === "yes") {
			lockStatus = false;
		}
		// 设置上锁状态
		setIsLock(lockStatus);
	};

	useEffect(() => {
		setHtml(resumeInfo.content);
		checkIsLock();
	}, []);

	//确认访问简历
	const onOk = async () => {
		if (password === resumeInfo.password) {
			message.success("密码校验成功！");
			setVsible(false);
			setPassword("");
			setIsLock(false);
			// 设置sessionStorage，只要关闭页面，就不用再次输入密码访问
			sessionStorage.setItem(`resume-${resumeInfo._id}`, "yes");
		} else {
			message.error("密码校验失败！");
		}
	};

	return (
		<div className={style["resume-box"]}>
			{isLock ? (
				<div className={style["no-resume-wrap"]}>
					<header />
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
				</div>
			) : (
				<div
					className={`${style["resume-wrap"]} braft-output-context`}
					dangerouslySetInnerHTML={{ __html: html }}
				></div>
			)}

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

export default Resume;
