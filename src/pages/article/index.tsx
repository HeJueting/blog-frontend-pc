import React, { useEffect, useState } from "react";
import style from "./style.module.scss";
import Link from "next/link";
import CONFIG from "../../config";
import lodash from "../../utils/lodash";
import { timeFormat } from "../../utils/help";
import articleAxios from "../../api/article";
// 组件
import Carousel from "../../components/carousel";
import Icon from "../../components/icon";
import Catrgory from "./category";
import Pagination from "./pagination";
// 接口
import { IArticleList } from "../../typing/api/article";

// 接口：props
interface IArticleProps {
    initialData: any;
}
const Article: React.FC<IArticleProps> = ({ initialData }) => {
    const [articles, setArticles] = useState<any[]>([]);
    const [category, setCategory] = useState<any>({});
    const [page, setPage] = useState<number>(1);
    const [total, setTotal] = useState<number>(1);

    // 初始化文章数据
    useEffect(() => {
        setArticles(initialData.data);
        setTotal(initialData.total);
    }, [initialData]);

    // 文章类型改变
    useEffect(() => {
        if (page !== 1) {
            setPage(1);
        } else {
            searchArticles().then((res) => {
                setArticles(res.data);
            });
        }
    }, [category]);

    // 页码数量
    useEffect(() => {
        searchArticles().then((res) => {
            setArticles(res.data);
        });
    }, [page]);

    // 查询文章信息
    const searchArticles = async () => {
        const condition: IArticleList = {
            page,
            pageSize: 6,
        };
        if (lodash.get(category, "_id")) {
            condition.categoryId = category._id;
        }
        // 查询文章
        const res = await articleAxios.list(condition);
        return res;
    };

    return (
        <div className={style["article"]}>
            {/* 轮播图 */}
            <Carousel />

            <main className={style["article-wrap"]}>
                {/* 文章列表 */}
                <div className={style["article-wrap-left"]}>
                    {articles.map((item) => (
                        <div className={style["article-item"]} key={item._id}>
                            {/* 文章图片 */}
                            <Link href={`/article/${item._id}`} key={item.title}>
                                <div
                                    className={style["image-wrap"]}
                                    style={{
                                        backgroundImage:
                                            item.bacImg &&
                                            `url(${CONFIG.IMAGE_REQUEST_PATH}/article/${item.bacImg}?width=200)`,
                                    }}
                                >
                                    {item.purview === 1 && (
                                        <div className={style["lock"]}>
                                            <Icon type="iconxingzhuang" className={style["iconxingzhuang"]} />
                                        </div>
                                    )}
                                </div>
                            </Link>

                            {/* 文章右侧信息 */}
                            <div className={style["article-info"]}>
                                <h3>{item.title}</h3>
                                <div className={style["conetxt"]}>{`${item.abstract.slice(1, 110)}......`}</div>
                                <div className={style["time"]}>{timeFormat(item.createAt, 0)}</div>
                                <div className={style["about"]}>
                                    <p>
                                        <Icon type="iconchakanyanjingshishifenxi2" className={style["icon"]} />
                                        <span>{item.look}</span>
                                    </p>
                                    <p>
                                        <Icon type="icontubiaozhizuo-" className={style["icon"]} />
                                        <span>{item.comments}</span>
                                    </p>
                                    <p>
                                        <Icon type="icondianzan" className={style["icon"]} />
                                        <span>{item.good}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 右侧面板 */}
                <div className={style["article-wrap-right"]}>
                    {/* 文章分类 */}
                    <Catrgory
                        changeCategory={(item: any) => {
                            setPage(1);
                            setCategory(item);
                        }}
                    />
                </div>
            </main>

            {/* 查看更多文章 */}
            <Pagination page={page} pageSize={6} setPage={setPage} total={total} />
        </div>
    );
};

export default Article;
