import Head from "next/head";
import { GetStaticProps } from "next";
import resumeAxios from "../../src/api/resume";
import Resume from "../../src/pages/resume";

function App({ resumeInfo }) {
    return (
        <>
            <Head>
                <title>hejueting的博客-简历</title>
            </Head>
            <Resume resumeInfo={resumeInfo} />
        </>
    );
}

// 数据获取
export const getStaticProps: GetStaticProps = async () => {
    // 查询简历信息
    const res = await resumeAxios.search();
    return {
        props: {
            resumeInfo: res.data,
        },
        revalidate: 1,
    };
};

export default App;
