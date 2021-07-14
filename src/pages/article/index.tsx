import React, { useEffect, useState, useRef } from 'react';
import style from './style.module.scss';
import Link from 'next/link';
import CONFIG from '../../config';
import { timeFormat, getImageWidthByClientWidth } from '../../utils/help';
// 组件
import Carousel from '../../components/carousel';
import Icon from '../../components/icon';
import Catrgory from './category';

// 接口：props
interface IArticleProps {
    initialData: any;
}
const Article: React.FC<IArticleProps> = ({ initialData }) => {
    // 用于展示的虚拟文章列表
    const [articleLits, setArticleLits] = useState<any[]>([]);
    // 文章分类、页码
    const [category, setCategory] = useState<any>({});
    const [page, setPage] = useState<number>(1);
    // 页面底部被监听的元素
    const intersectionDom = useRef<HTMLDivElement>(null);

    // 虚拟列表加载dataSource
    useEffect(() => {
        // 监听是否滚动到了页面底部
        const Observer = new IntersectionObserver((entries) => {
            // 滑动到了底部
            if (entries[0].intersectionRatio > 0) {
                setPage((prePage) => {
                    if (prePage * 5 < initialData.total) {
                        return prePage + 1;
                    }
                });
            }
        });
        Observer.observe(intersectionDom.current);

        // 取消监听
        return () => {
            Observer.unobserve(intersectionDom.current);
        };
    }, []);

    // 根据文章页码、文章类型去展示文章列表
    useEffect(() => {
        // 确认当前分类下的所有文章
        const dataSource = initialData.data.filter(
            (item: { categoryId: string }) => {
                // 全部分类 or 某种分类
                if (category._id) {
                    return item.categoryId === category._id;
                } else {
                    return true;
                }
            }
        );
        // 每页展示5条文章数据
        if (page * 5 <= dataSource.length) {
            setArticleLits(dataSource.slice(0, page * 5));
        } else {
            setArticleLits(dataSource);
        }
    }, [page, category]);

    return (
        <div className={style['article']}>
            {/* 轮播图 */}
            <Carousel />

            <main className={style['article-wrap']}>
                {/* 文章列表 */}
                <div className={style['article-wrap-left']}>
                    {articleLits.map((item) => (
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
                            setPage(1);
                            setCategory(item);
                        }}
                    />
                </div>
            </main>

            {/* 监听是否已经滑动到底部的元素 */}
            <div ref={intersectionDom} className={style['intersection']}></div>
        </div>
    );
};

export default Article;
