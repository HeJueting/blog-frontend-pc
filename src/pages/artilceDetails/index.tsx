import React, { useCallback, useEffect, useState } from 'react';
import style from './style.module.scss';
import Prism from 'prismjs';
import localforage from 'localforage';
import lodash from '../../utils/lodash';
import { timeFormat, getUrlQuery } from '../../utils/help';
import articleAxios from '../../api/article';
import articleCategoryAxios from '../../api/articleCategory';
import commentAxios from '../../api/comment';
// 组件
import Carousel from '../../components/carousel';
import Icon from '../../components/icon';
import message from '../../components/message';
import Comment from '../../components/comment';
import Lock from './lock';
// 接口
import { IArticleSearch } from '../../typing/api/article';

// 接口：props
interface IArticleDetailsProps {
    initialData: {
        article: any;
        comment: any[];
    };
}

const ArticleDetails: React.FC<IArticleDetailsProps> = ({ initialData }) => {
    // 该文章是否处于被锁的状态
    const [isLock, setIsLock] = useState<boolean>(true);
    // 文章，评论数据
    const [articleData, setArticleData] = useState<any>({});
    const [commentData, setCommentData] = useState<any[]>([]);
    // 点赞
    const [isGood, setIsGood] = useState<boolean>(false);

    // 重新初始化页面
    const reinitializePage = async (password?: string) => {
        const articleId = window.location.href
            .split('?')[0]
            .split('/')
            .reverse()[0];
        // 查询文章详情
        const condition: IArticleSearch = { _id: articleId };
        password && (condition.password = password);
        const articleRes = await articleAxios.search(condition);
        // 如果能查出来该文章可以直接被访问，继续查询它的评论消息
        if (articleRes.data) {
            // 请求文章分类信息，将文章详情中的分类id展示为分类信息
            const categoryRes = await articleCategoryAxios.list();
            const category = categoryRes.data.filter(
                (item: any) => item._id === articleRes.data.categoryId
            );
            articleRes.data.categoryName = category[0].name;
            // 查询文章评论信息
            const commentRes = await commentAxios.search({
                category: 0,
                categoryId: articleRes.data._id,
            });
            // 初始化文章数据，评论信息
            setArticleData(articleRes.data);
            setCommentData(commentRes.data);
            // 浏览量+1
            articleAxios.newLook({
                _id: articleRes.data._id,
            });
            setIsLock(false);
        }
    };
    // 判断该文章是否可以解锁查看
    const checkIsLock = useCallback(async () => {
        const { article, comment } = initialData;
        // 如果article信息存在，说明可以直接访问该文章
        if (article) {
            // 初始化文章数据，评论信息
            setArticleData(article);
            setCommentData(comment);
            // 浏览量+1
            articleAxios.newLook({
                _id: article._id,
            });
            setIsLock(false);
        } else {
            const query: any = getUrlQuery(window.location.href);
            const token = await localforage.getItem('token');
            // 如果访问时携带password，则重新查询文章详情
            if (query.password) {
                reinitializePage(query.password);
            }
            // 如果是本人登录后查看
            else if (token) {
                reinitializePage();
            }
            // 上锁文章
            else {
                setIsLock(true);
            }
        }
    }, [initialData]);
    // 初始化页面
    useEffect(() => {
        checkIsLock();
    }, [checkIsLock]);

    // 设置文章代码高亮，点赞信息
    useEffect(() => {
        // 设置文章代码高亮，点赞信息
        Prism.highlightAll();
        // 初始化点赞信息
        if (localStorage.getItem(`article-${articleData._id}-good`) === 'yes') {
            setIsGood(true);
        }
    }, [articleData]);

    // 点赞+1
    const clickGood = async () => {
        if (!isGood) {
            const res = await articleAxios.newGood({
                _id: articleData._id,
            });
            if (res.code === 0) {
                message.success('点赞成功，感谢您的认可 ~');
                setIsGood(true);
                localStorage.setItem(`article-${articleData._id}-good`, 'yes');
            }
        } else {
            message.info('您已经点过赞啦，不允许重复点赞 ~');
        }
    };
    // 点击分享
    const clickShare = () => {
        const input = document.createElement('input');
        input.setAttribute('value', window.location.href);
        input.setAttribute('style', 'z-index: -1;');
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        message.success('链接复制成功，快去分享给您的小伙伴吧 ~');
        document.body.removeChild(input);
    };

    return (
        <div className={style['article-details']}>
            {/* 轮播图 */}
            <Carousel />

            {isLock ? (
                <Lock
                    setIsLock={setIsLock}
                    articleInfo={initialData.article}
                    reinitializePage={reinitializePage}
                />
            ) : (
                // 文章内容详情
                <div className={style['article-box']}>
                    <div className={style['article-wrap']}>
                        {/* 标题 */}
                        <h1 className={style['article-title']}>
                            {articleData.title}
                        </h1>

                        {/* 基本信息：时间、分类、标签 */}
                        <div className={style['article-info']}>
                            <div className={style['info-wrap']}>
                                <Icon
                                    type="icontime"
                                    className={style['icon']}
                                />
                                <span>
                                    {timeFormat(articleData.createAt, 0)}
                                </span>
                            </div>
                            <div className={style['info-wrap']}>
                                <Icon
                                    type="iconfan-category"
                                    className={style['icon']}
                                />
                                <span>{articleData.categoryName}</span>
                            </div>
                            <div className={style['info-wrap']}>
                                <Icon
                                    type="iconshengqian"
                                    className={style['icon']}
                                />
                                {lodash.get(articleData.tags, 'length') ? (
                                    articleData.tags.map((tag: string) => (
                                        <span className={style['label']}>
                                            {tag}
                                        </span>
                                    ))
                                ) : (
                                    <span>无</span>
                                )}
                            </div>
                        </div>

                        {/* 文章正文内容 */}
                        <div
                            className={`${style['article-content']} braft-output-context`}
                            dangerouslySetInnerHTML={{
                                __html: articleData.html,
                            }}
                        ></div>

                        {/* 点赞，分享 */}
                        <div className={style['article-operate']}>
                            <Icon
                                onClick={clickGood}
                                type="icondianzan"
                                className={`${style['icon']} ${
                                    isGood && style['icon-active']
                                }`}
                            />
                            <Icon
                                onClick={clickShare}
                                type="iconzhuanfa"
                                className={style['icon']}
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
            )}
        </div>
    );
};

export default ArticleDetails;
