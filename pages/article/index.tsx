import Head from 'next/head';
import { GetStaticProps } from 'next';
import Article from '../../src/pages/article';
import articleAxios from '../../src/api/article';

function App({ initialData }) {
    return (
        <>
            <Head>
                <title>hejueting的博客-文章</title>
                <meta
                    name="description"
                    content="欢迎来到 hejueting 的个人博客"
                />
            </Head>
            <Article initialData={initialData} />
        </>
    );
}

// 数据获取
export const getStaticProps: GetStaticProps = async () => {
    // 查询文章
    const articlesRes = await articleAxios.list({
        page: 1,
        pageSize: 10000,
    });
    return {
        props: {
            initialData: articlesRes,
        },
        revalidate: 1,
    };
};

export default App;
