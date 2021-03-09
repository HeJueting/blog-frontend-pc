const server_url = "http://127.0.0.1:7070";

const devConfig = {
    // 服务端请求地址
    REQUEST_BASE_URL: server_url,
    // 图片请求地址
    IMAGE_REQUEST_PATH: `${server_url}/minio/frontend/access/image`,
    // 网站发布时间
    PUBLISH_TIME: 1609430400000,
    // 博客管理端地址
    BLOG_ADMIN_URL: "http://localhost/blog/admin",
};

export default devConfig;
