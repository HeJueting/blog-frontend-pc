import Head from "next/head";
import Login from "../../src/pages/login";

function App({ resumeInfo }) {
    return (
        <>
            <Head>
                <title>hejueting的博客-后台管理系统登录</title>
            </Head>
            <Login />
        </>
    );
}

export default App;
