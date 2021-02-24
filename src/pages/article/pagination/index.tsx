import React from "react";
import style from "./style.module.scss";
import Button from "../../../components/button";

// 接口：props
interface IPageProps {
	page: number;
	pageSize?: number;
	total: number;
	setPage: (page: number) => void;
}

const Pagination: React.FC<IPageProps> = ({
	page = 1,
	total = 1,
	pageSize = 10,
	setPage,
}) => {
	// 点击上一页
	const clickPre = () => {
		if (page !== 1) {
			setPage(page - 1);
		}
	};
	// 点击下一页
	const clickNext = () => {
		if (page < Math.ceil(total / pageSize)) {
			setPage(page + 1);
		}
	};

	return (
		<div className={style["page"]}>
			<Button onClick={clickPre} className={page === 1 && style["disabled"]}>
				上一页
			</Button>
			<span className={style["number"]}>{page}</span>
			<Button
				onClick={clickNext}
				className={page === Math.ceil(total / pageSize) && style["disabled"]}
			>
				下一页
			</Button>
			<span className={style["total"]}>
				共 {Math.ceil(total / pageSize)} 页
			</span>
		</div>
	);
};

export default Pagination;
