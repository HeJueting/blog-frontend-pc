import Head from "next/head";
import { GetStaticProps } from "next";
import articleAxios from "../../src/api/article";
import commentAxios from "../../src/api/comment";
import articleCategoryAxios from "../../src/api/articleCategory";
import ArticleDetails from "../../src/pages/artilceDetails";

function App({ initialData }) {
    return (
        <>
            <Head>
                <title>hejueting的博客-{initialData.article.title}</title>
            </Head>
            <ArticleDetails initialData={initialData} />
        </>
    );
}

// 动态渲染
export const getStaticPaths = async function () {
    // 查询文章详情
    const res = await articleAxios.list({
        pageSize: 1000,
    });
    // 收集paths
    const paths = [];
    res.data.forEach((item: any) => {
        paths.push(`/article/${item._id}`);
    });
    return {
        paths: paths,
        fallback: false,
    };
};

// 数据获取
export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { articleId } = params;
    // 查询文章详情
    const articleRes = await articleAxios.search({
        id: articleId as string,
    });
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
    return {
        props: {
            initialData: {
                article: articleRes.data,
                comment: commentRes.data,
            },
        },
        revalidate: 1,
    };
};

export default App;
