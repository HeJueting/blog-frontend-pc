import React, { useEffect, useState } from 'react';
import style from './style.module.scss';
import Link from 'next/link';
import CONFIG from '../../config';
import lodash from '../../utils/lodash';
import { timeFormat, getImageWidthByClientWidth } from '../../utils/help';
import articleAxios from '../../api/article';
// 组件
import Carousel from '../../components/carousel';
import Icon from '../../components/icon';
import Catrgory from './category';
// 接口
import { IArticleList } from '../../typing/api/article';

// 接口：props
interface IArticleProps {
    initialData: any;
}
const Article: React.FC<IArticleProps> = ({ initialData }) => {
    const [isFirstRender, setIsFirstRender] = useState<boolean>(true);
    const [articles, setArticles] = useState<any[]>([]);
    const [category, setCategory] = useState<any>({});

    // 初始化文章数据
    useEffect(() => {
        setIsFirstRender(false);
        setArticles(initialData.data);
    }, [initialData]);

    // 查询文章信息
    const initArticles = async () => {
        // 首次加载页面不需要渲染
        if (!isFirstRender) {
            const condition: IArticleList = {
                page: 1,
                pageSize: 10000,
            };
            if (lodash.get(category, '_id')) {
                condition.categoryId = category._id;
            }
            // 查询文章
            const res = await articleAxios.list(condition);
            setArticles(res.data);
        }
    };
    // 文章类型改变
    useEffect(() => {
        initArticles();
    }, [category]);

    return (
        <div className={style['article']}>
            {/* 轮播图 */}
            <Carousel />

            <main className={style['article-wrap']}>
                {/* 文章列表 */}
                <div className={style['article-wrap-left']}>
                    {articles.map((item) => (
                        <div className={style['article-item']} key={item._id}>
                            {/* 文章图片 */}
                            <Link
                                href={`/article/${item._id}`}
                                key={item.title}
                            >
                                <div className={style['image-wrap']}>
                                    {item.bacImg ? (
                                        <div
                                            className={style['bac-image']}
                                            style={{
                                                backgroundImage: `url(${
                                                    CONFIG.IMAGE_REQUEST_PATH
                                                }/article/${
                                                    item.bacImg
                                                }?width=${getImageWidthByClientWidth(
                                                    440
                                                )})`,
                                            }}
                                        ></div>
                                    ) : (
                                        <div className={style['bac-image']}>
                                            <p>{item.title}</p>
                                        </div>
                                    )}

                                    {item.purview === 1 && (
                                        <div className={style['lock']}>
                                            <Icon
                                                type="iconxingzhuang"
                                                className={
                                                    style['iconxingzhuang']
                                                }
                                            />
                                        </div>
                                    )}
                                </div>
                            </Link>

                            {/* 文章右侧信息 */}
                            <div className={style['article-info']}>
                                <h3>{item.title}</h3>
                                <div
                                    className={style['conetxt']}
                                >{`${item.abstract.slice(0, 110)}......`}</div>
                                <div className={style['time']}>
                                    {timeFormat(item.createAt, 0)}
                                </div>
                                <div className={style['about']}>
                                    <p>
                                        <Icon
                                            type="iconchakanyanjingshishifenxi2"
                                            className={style['icon']}
                                        />
                                        <span>{item.look}</span>
                                    </p>
                                    <p>
                                        <Icon
                                            type="icontubiaozhizuo-"
                                            className={style['icon']}
                                        />
                                        <span>{item.comments}</span>
                                    </p>
                                    <p>
                                        <Icon
                                            type="icondianzan"
                                            className={style['icon']}
                                        />
                                        <span>{item.good}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 右侧面板 */}
                <div className={style['article-wrap-right']}>
                    {/* 文章分类 */}
                    <Catrgory
                        changeCategory={(item: any) => {
                            setCategory(item);
                        }}
                    />
                </div>
            </main>
        </div>
    );
};

export default Article;
