// 创建评论
export interface ICommentCreate {
	category: number;
	categoryId?: string;
	name: string;
	email: string;
	html: string;
	quote?: string;
}

// 查询评论
export interface ICommentSearch {
	category?: number;
	categoryId?: string;
}
