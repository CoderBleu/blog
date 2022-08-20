import request from "../utils/request";

// 数据格式
const headers = {"Content-Type": "application/x-www-form-urlencoded"};

const auth = {
    username: "98k",
    password: "hk123456"
}

export function login(data) {
    return request({
        headers,
        auth,
        url: `/auth/login`,
        method: "post",
        params: data
    });
}

// 退出
export function logout(accessToken) {
    return request({
        url: "/auth/logout",
        method: "get",
        params: {
            accessToken
        }
    });
}

// 刷新令牌获取新的认证信息
export function refreshToken(refreshToken) {
    return request({
        headers,
        auth,
        url: `/auth/user/refreshToken`,
        method: "get",
        params: {
            refreshToken
        }
    });
}
