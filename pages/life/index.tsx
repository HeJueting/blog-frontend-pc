import React from "react";
import Head from "next/head";

const App: React.FC = () => {
    return (
        <>
            <Head>
                <title>hejueting的博客-生活</title>
            </Head>
            <div
                style={{
                    minHeight: "calc(100vh - 14vw)",
                    background: "#fff",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <h5 style={{ color: "#000" }}>
                    生 活 页 面， 正 在 开 发 中 . . . . . .
                </h5>
            </div>
        </>
    );
};

export default App;
