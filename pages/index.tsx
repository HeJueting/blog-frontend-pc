import Head from "next/head";
import { GetStaticProps } from "next";
import Home from "../src/pages/home";
import articleAxios from "../src/api/article";

function App({ hotArticles }) {
    return (
        <>
            <Head>
                <title>hejueting的博客-主页</title>
            </Head>
            <Home hotArticles={hotArticles} />
        </>
    );
}

// 数据获取
export const getStaticProps: GetStaticProps = async () => {
    // 查询热门导读的文章
    const hotArticlesRes = await articleAxios.list({
        pageSize: 6,
        sort: "look",
    });
    return {
        props: {
            hotArticles: hotArticlesRes.data,
        },
        revalidate: 1,
    };
};

export default App;
