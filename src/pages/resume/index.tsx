import React, { useEffect, useState } from "react";
import lodash from "../../utils/lodash";
import style from "./style.module.scss";
import { getUrlQuery } from "../../utils/help";

import Icon from "../../components/icon";
import Modal from "../../components/modal";
import Input from "../../components/input";
import resumeAxios from "../../api/resume";
import message from "../../components/message";

const Resume: React.FC = () => {
	// 简历信息
	const [html, setHtml] = useState<string>("");
	// 访问简历的弹窗
	const [visible, setVsible] = useState<boolean>(false);
	const [password, setPassword] = useState<string>("");

	// 初始化简历内容
	const initHtml = async () => {
		const query: any = getUrlQuery(window.location.href);
		// 查询简历信息
		const res = await resumeAxios.search({
			password: query.password,
		});
		if (res.code === 0) {
			// 初始化简历内容
			setHtml(lodash.get(res, "data.content", ""));
		}
	};

	useEffect(() => {
		initHtml();
	}, []);

	//确认访问简历
	const onOk = async () => {
		const res = await resumeAxios.check({ password });
		if (res.data) {
			setVsible(false);
			setPassword("");
			setHtml(res.data.content);
			message.success("密码校验成功！");
		} else {
			message.error("密码校验失败！");
		}
	};

	return (
		<div className={style["resume-box"]}>
			{html ? (
				<div
					className={`${style["resume-wrap"]} braft-output-context`}
					dangerouslySetInnerHTML={{ __html: html }}
				></div>
			) : (
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
