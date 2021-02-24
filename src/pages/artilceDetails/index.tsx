import React, { useEffect, useState } from "react";
import style from "./style.module.scss";
import { timeFormat } from "../../utils/help";
import lodash from "../../utils/lodash";
import Prism from "prismjs";
import articleAxios from "../../api/article";

import Carousel from "../../components/carousel";
import Icon from "../../components/icon";
import message from "../../components/message";
import Comment from "../../components/comment";

// 接口：props
interface IArticleDetailsProps {
	initialData: {
		article: any;
		comment: any[];
	};
}

const ArticleDetails: React.FC<IArticleDetailsProps> = ({ initialData }) => {
	// 文章，评论数据
	const [articleData, setArticleData] = useState<any>({});
	const [commentData, setCommentData] = useState<any[]>([]);
	// 点赞
	const [isGood, setIsGood] = useState<boolean>(false);

	// 初始化页面
	useEffect(() => {
		// 初始化文章数据，评论信息
		setArticleData(initialData.article);
		setCommentData(initialData.comment);
		// 浏览量+1
		articleAxios.newLook({
			_id: initialData.article._id,
		});
	}, []);

	// 初始化点赞信息
	const initIsGood = () => {
		if (localStorage.getItem(`article-${articleData._id}-good`) === "yes") {
			setIsGood(true);
		}
	};
	// 设置文章代码高亮，点赞信息
	useEffect(() => {
		Prism.highlightAll();
		initIsGood();
	}, [articleData]);

	// 点赞+1
	const clickGood = async () => {
		if (!isGood) {
			const res = await articleAxios.newGood({
				_id: articleData._id,
			});
			if (res.code === 0) {
				message.success("点赞成功，感谢您的认可 ~");
				setIsGood(true);
				localStorage.setItem(`article-${articleData._id}-good`, "yes");
			}
		} else {
			message.info("您已经点过赞啦，不允许重复点赞 ~");
		}
	};

	// 点击分享
	const clickShare = () => {
		const input = document.createElement("input");
		input.setAttribute("value", window.location.href);
		input.setAttribute("style", "z-index: -1;");
		document.body.appendChild(input);
		input.select();
		document.execCommand("copy");
		message.success("链接复制成功，快去分享给您的小伙伴吧 ~");
		document.body.removeChild(input);
	};

	return (
		<div className={style["article-details"]}>
			{/* 轮播图 */}
			<Carousel />

			{/* 文章内容详情 */}
			<div className={style["article-box"]}>
				<div className={style["article-wrap"]}>
					{/* 标题 */}
					<h1 className={style["article-title"]}>{articleData.title}</h1>

					{/* 基本信息：时间、分类、标签 */}
					<div className={style["article-info"]}>
						<div className={style["info-wrap"]}>
							<Icon type="icontime" className={style["icon"]} />
							<span>{timeFormat(articleData.createAt, 0)}</span>
						</div>
						<div className={style["info-wrap"]}>
							<Icon type="iconfan-category" className={style["icon"]} />
							<span>{articleData.categoryName}</span>
						</div>
						<div className={style["info-wrap"]}>
							<Icon type="iconshengqian" className={style["icon"]} />
							{lodash.get(articleData.tags, "length") ? (
								articleData.tags.map((tag: string) => (
									<span className={style["label"]}>{tag}</span>
								))
							) : (
								<span>无</span>
							)}
						</div>
					</div>

					{/* 文章正文内容 */}
					<div
						className={`${style["article-content"]} braft-output-context`}
						dangerouslySetInnerHTML={{ __html: articleData.html }}
					></div>

					{/* 点赞，分享 */}
					<div className={style["article-operate"]}>
						<Icon
							onClick={clickGood}
							type="icondianzan"
							className={`${style["icon"]} ${isGood && style["icon-active"]}`}
						/>
						<Icon
							onClick={clickShare}
							type="iconzhuanfa"
							className={style["icon"]}
						/>
					</div>

					{/* 评论 */}
					<Comment
						dataSource={commentData}
						setDataSource={setCommentData}
						category={0}
						categoryId={articleData._id}
					/>
				</div>
			</div>
		</div>
	);
};

export default ArticleDetails;
