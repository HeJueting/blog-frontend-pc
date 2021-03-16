import Head from 'next/head';
import { GetStaticProps } from 'next';
import lodash from '../../src/utils/lodash';
import articleAxios from '../../src/api/article';
import commentAxios from '../../src/api/comment';
import articleCategoryAxios from '../../src/api/articleCategory';
import ArticleDetails from '../../src/pages/artilceDetails';

function App({ initialData }) {
    return (
        <>
            <Head>
                <title>
                    hejueting的博客-
                    {lodash.get(initialData, 'article.title', '文章')}
                </title>
            </Head>
            <ArticleDetails initialData={initialData} />
        </>
    );
}

// 动态渲染
export const getStaticPaths = async function () {
    // 查询文章详情
    const res = await articleAxios.getIds();
    // 收集paths
    const paths = [];
    res.data.forEach((id: string) => {
        paths.push(`/article/${id}`);
    });
    return {
        paths: paths,
        fallback: false,
    };
};

// 数据获取
export const getStaticProps: GetStaticProps = async ({ params, ...data }) => {
    const { articleId } = params;
    // 查询文章详情
    const articleRes = await articleAxios.search({
        _id: articleId as string,
    });

    // 如果能查出来该文章可以直接被访问，继续查询他的评论消息
    let comment = [];
    if (articleRes.data) {
        // 请求文章分类信息，将文章详情中的分类id展示为分类信息
        const categoryRes = await articleCategoryAxios.list();
        const category = categoryRes.data.filter(
            (item: any) => item._id === articleRes.data.categoryId
        );
        articleRes.data.categoryName = lodash.get(category, '[0].name', '');
        // 查询文章评论信息
        const commentRes = await commentAxios.search({
            category: 0,
            categoryId: articleRes.data._id,
        });
        comment = commentRes.data;
    }

    return {
        props: {
            initialData: {
                article: articleRes.data,
                comment: comment,
            },
        },
        revalidate: 1,
    };
};

export default App;
