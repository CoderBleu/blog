import request from "../utils/request";

// 用户信息
export default {
    // 更新用户邮箱
    updateUserEmail(data) {
        return request({
            url: `/system/api/user/updateEmail`,
            method: "post",
            data
        });
    },

    // 更新用户手机号
    updateUserPhone(data) {
        return request({
            url: `/system/api/user/updatePhone`,
            method: "post",
            data
        });
    },

    // 更新用户信息
    updateUser(data) {
        return request({
            url: `/system/api/user/update`,
            method: "post",
            data
        });
    },

    // 用户注册
    addUser(data) {
        return request({
            url: `/system/api/user/save`,
            method: "post",
            data
        });
    },

    // 修改密码
    updatePassword(data) {
        return request({
            url: `/system/api/user/updatePassword`,
            method: "post",
            data
        });
    },

    // 用户反馈意见
    saveOpinion(data) {
        return request({
            url: `/system/api/opinion/save`,
            method: "post",
            data
        });
    }
};
