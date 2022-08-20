import request from "../utils/request";

// 角色信息
export default {
    // 获取最新文章
    newArticle(id) {
        return request({
            url: `/article/api/article/newArticle/${id}`,
            method: "get"
        });
    },

    // 获取归档信息
    getArchives(data) {
        return request({
            url: `/article/api/article/getArchives`,
            method: "post",
            data
        });
    },

    // 发布评论
    saveComment(data) {
        return request({
            url: `/article/api/comment/addComment`,
            method: "post",
            data
        });
    },

    // 获取文章的评论信息
    articleComment(id) {
        return request({
            url: `/article/api/comment/getByArticleId/${id}`,
            method: "get"
        });
    },

    // 获取所有的分类信息
    getAllCategory() {
        return request({
            url: `/article/api/category/list`,
            method: "get"
        });
    },

    // 点赞
    thumhup(count, articleId) {
        return request({
            url: `/article/api/article/thumhup/${count}/${articleId}`,
            method: "get"
        });
    },

    // 查询博客详情
    getById(id) {
        return request({
            url: `/article/api/article/getById/${id}`,
            method: "get"
        });
    },

    // 获取所有的标签信息
    getAllLabel() {
        return request({
            url: `/article/api/label/list`,
            method: "get"
        });
    },

    // 根据分类信息的id查询标签信息
    getLabelByCategoryId(id) {
        return request({
            url: `/article/label/getLabelByCategoryId/${id}`,
            method: "get"
        });
    },

    // 根据文章id获取作者信息
    getAuthorByArticleId(id) {
        return request({
            url: `/article/api/article/getAuthorByArticleId/${id}`,
            method: "get"
        });
    },

    // 根据文章id查询该文章的所有标签
    getLabelByArticleId(id) {
        return request({
            url: `/article/api/label/getLabelsByArticleId/${id}`,
            method: "get"
        });
    },

    // 统计每个分类下文章数
    categoryCount() {
        return request({
            url: `/article/api/category/getCategoryCount`,
            method: "get"
        });
    },

    // 发布文章
    addArticle(data) {
        return request({
            url: `/article/article/save`,
            method: "post",
            data
        });
    },

    // 条件分页查询文章列表
    queryArticleList(data) {
        return request({
            url: `/article/api/article/clientList`,
            method: "post",
            data
        });
    },

    // 获取文章总数、分类总数、标签总数
    getBase() {
        return request({
            url: `/article/api/article/getBase`,
            method: "get"
        });
    },

    // 获取所有的标签 且该标签有对应的文章信息
    getLabel() {
        return request({
            url: `/article/api/label/getLabel`,
            method: "get"
        });
    },

    // 根据分类id查询该分类下文章列表
    getArticlesById(data) {
        return request({
            url: `/article/api/category/getByCategoryId`,
            method: "post",
            data
        });
    },

    // 根据标签id查询该标签所有的文章信息
    getArticlesByLabelId(data) {
        return request({
            url: `/article/api/label/getArticlesById`,
            method: "post",
            data
        });
    },


    // 获取全部文章
    getAll() {
        return request({
            url: `/article/api/article/getAll`,
            method: "get"
        });
    },

    // 根据文章id查询该文章的所有标签
    getAllMessage() {
        return request({
            url: `/article/api/message/getAll`,
            method: "get"
        });
    },

    // 保存留言信息
    saveMessage(data) {
        return request({
            url: `/article/api/message/save`,
            method: "post",
            data
        });
    }
};
