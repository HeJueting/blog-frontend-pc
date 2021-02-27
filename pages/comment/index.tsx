import React from "react";
import Head from "next/head";

const App: React.FC = () => {
	return (
		<>
			<Head>
				<title>hejueting的博客-留言</title>
			</Head>
			<div
				style={{
					minHeight: "calc(100vh - 14vw)",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					background: "var(--bg_color)",
				}}
			>
				<h5>留 言 页 面， 正 在 开 发 中 . . . . . .</h5>
			</div>
		</>
	);
};

export default App;
