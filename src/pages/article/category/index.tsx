import React, { useEffect, useState } from "react";
import articleStyle from "../style.module.scss";
import style from "./style.module.scss";
import lodash from "../../../utils/lodash";
import articleCategoryAxios from "../../../api/articleCategory";
import Icon from "../../../components/icon";

// 接口：props
interface ICreateProps {
	changeCategory: (s: any) => void;
}

const Category: React.FC<ICreateProps> = ({ changeCategory }) => {
	// 分类数据
	const [treeData, setTreeData] = useState<any[]>([]);
	// 当前展示分类
	const [category, setCategory] = useState<string>("all");

	// 初始化文章分类
	const initCategoryInfo = async () => {
		// 查询文章分类信息
		const res = await articleCategoryAxios.list();
		let categoryData = lodash.cloneDeep(res.data);
		if (categoryData.length) {
			// 全部分类的数量
			let allNum = 0;
			// 给所有的分类添加一个expand的属性
			categoryData.forEach((item: any) => {
				allNum += item.articles;
				item.expand = false;
			});
			// 找到最大的level值
			let maxLevel = categoryData.sort((a: any, b: any) => b.level - a.level)[0]
				.level;
			// 递归赋值（先将3层分类复制children给2层分类，再删除所有3层分类，以此类推）
			while (maxLevel > 0) {
				// 找出该level层所有数据
				const levelData = categoryData.filter(
					(item: any) => item.level === maxLevel
				);
				// 在categoryData上删除这个level所有数据
				categoryData = categoryData.filter(
					(item: any) => item.level !== maxLevel
				);
				// 该level层所有数据以children形式push进入treeData中
				levelData.forEach((child: any) => {
					const index = lodash.findIndex(
						categoryData,
						(tree: any) => tree._id === child.parentId
					);
					if (index !== -1) {
						if (!categoryData[index].children) {
							categoryData[index].children = [];
						}
						categoryData[index].children.push(lodash.cloneDeep(child));
					}
				});
				maxLevel -= 1;
			}
			// 插入全部分类
			categoryData.unshift({
				name: "全部",
				articles: allNum,
				_id: "all",
			});
			// 设置分类
			setTreeData(categoryData);
		}
	};
	useEffect(() => {
		initCategoryInfo();
	}, []);

	// 点击分类
	const onClick = (item: any) => {
		// 展开、关闭分类
		if (item.children) {
			item.expand = !item.expand;
			setTreeData(lodash.cloneDeep(treeData));
		}
		// 显示分类文章
		else {
			setCategory(item._id);
			changeCategory(item._id === "all" ? {} : lodash.cloneDeep(item));
		}
	};

	// 渲染category
	const renderCategory = (data: any[]) => {
		return data.map((item: any) => (
			<div className={style["parent"]} key={item._id}>
				<p
					className={`${style["item"]} ${!item.children && style["title"]} ${
						category === item._id && style["active-title"]
					}`}
					onClick={() => {
						onClick(item);
					}}
				>
					<span>{item.name}</span>
					{item.children ? (
						<Icon
							type="iconup2"
							className={style["expand-icon"]}
							style={{
								transform: item.expand ? "rotate(180deg)" : "rotate(0deg)",
							}}
						/>
					) : (
						<span>({item.articles})</span>
					)}
				</p>
				{item.children && (
					<div
						style={{
							paddingLeft: `${item.level + 1.2}vw`,
							maxHeight: item.expand ? "20vw" : "0",
							opacity: item.expand ? 1 : 0,
							transition: "all 0.2s ease-in-out 0s",
						}}
					>
						{renderCategory(item.children)}
					</div>
				)}
			</div>
		));
	};

	return (
		<div className={`${articleStyle["module"]} ${style["category"]}`}>
			<h4>文章分类</h4>
			{renderCategory(treeData)}
		</div>
	);
};

export default Category;
