// 查询文章列表
export interface IArticleList {
    page: number;
    pageSize: number;
    state?: number | string;
    sort?: string;
    categoryId?: string;
}

// 查询文章详情
export interface IArticleSearch {
    _id: string;
    password?: string;
}

// 文章访问密码校验
export interface IArticleCheckPassword {
    _id: string;
    password: string;
}

// 文章访问量+1
export interface IArticleNewLook {
    _id: string;
}

// 文章点赞量+1
export interface IArticleNewGood {
    _id: string;
}
