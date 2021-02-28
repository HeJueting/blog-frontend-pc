// 查询文章列表
export interface IArticleList {
	page: number;
	pageSize: number;
	state?: number | string;
	sort?: string;
	categoryId?: string;
}
