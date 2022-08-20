import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import {login} from "../api/auth";
import {PcCookie, Key} from "../utils/cookie";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        phone: null,
        searchFlag: false,
        loginFlag: false,
        registerFlag: false,
        forgetFlag: false,
        emailFlag: false,
        drawer: false,
        loginUrl: "",
        userId: null,
        avatar: null,
        nickname: null,
        intro: null,
        webSite: null,
        loginType: null,
        email: null,
        token: null,
        dialogFormVisible: false,
        articleLikeSet: [],
        commentLikeSet: [],
        blogInfo: {
            webSite: {
                authorAvatar: null,
                authorInfo: null,
                touristAvatar: null,
                loginTypeList: "",
                bulletin: null,
                aboutMe: null,
                logo: null,
                github: null,
                gitee: null,
                qqNumber: null,
                recordNum: null,
                author: null,
                aliPay: null,
                weixinPay: null,
                keyword: null,
                name: null,
                summary: null,
                webUrl: null,
                showList: ""
            },
            count: {
                articleCount: null,
                categoryCount: null,
                tagCount: null,
                viewsCount: null
            },
            pageList: [
                {
                    pageCover: null,
                    pageLabel: null
                }
            ],
            userInfo: PcCookie.get(Key.userInfoKey)
                ? JSON.stringify(PcCookie.get(Key.userInfoKey))
                : null, // 用户信息对象
            accessToken: PcCookie.get(Key.accessTokenKey), // 访问令牌字符串
            refreshToken: PcCookie.get(Key.refreshTokenKey), // 刷新令牌字符串
            thumhup: 0
        }
    },
    mutations: {
        // 赋值用户状态
        SET_USER_STATE(state, data) {
            // 解构对象属性
            const {userInfo, access_token, refresh_token} = data;
            // 状态赋值
            state.userInfo = JSON.stringify(userInfo);
            state.accessToken = access_token;
            state.refreshToken = refresh_token;
            // state.loginFlag = false;
            // 将数据保存到cookie
            PcCookie.set(Key.userInfoKey, JSON.stringify(userInfo));
            PcCookie.set(Key.accessTokenKey, access_token);
            PcCookie.set(Key.refreshTokenKey, refresh_token);
        },

        // 重置用户状态
        RESET_USER_STATE(state) {
            state.userInfo = null;
            state.accessToken = null;
            state.refreshToken = null;
            // 移除cookie中的值
            PcCookie.remove(Key.userInfoKey);
            PcCookie.remove(Key.accessTokenKey);
            PcCookie.remove(Key.refreshTokenKey);
        },

        login(state, user) {
            state.userId = user.id;
            state.avatar = user.avatar;
            state.nickname = user.nickname;
            state.intro = user.intro;
            state.webSite = user.webSite;
            state.articleLikeSet = user.articleLikeSet ? user.articleLikeSet : [];
            state.commentLikeSet = user.commentLikeSet ? user.commentLikeSet : [];
            state.email = user.email;
            state.token = user.token;
            state.loginType = user.loginType;
        },
        logout(state) {
            state.userId = null;
            state.avatar = null;
            state.nickname = null;
            state.intro = null;
            state.token = null;
            state.webSite = null;
            state.articleLikeSet = [];
            state.commentLikeSet = [];
            state.email = null;
            state.loginType = null;
            state.phone = null;
            state.userName = null;
        },
        saveLoginUrl(state, url) {
            state.loginUrl = url;
        },
        saveEmail(state, email) {
            state.email = email;
        },
        saveThumhup(state, thumhup) {
            state.thumhup = thumhup;
        },
        savePhone(state, phone) {
            state.phone = phone;
        },
        updateUserInfo(state, user) {
            state.nickname = user.nickname;
            state.intro = user.intro;
            state.webSite = user.webSite;
        },
        savePageInfo(state, pageList) {
            state.pageList = pageList;
        },
        updateAvatar(state, avatar) {
            state.avatar = avatar;
        },
        checkBlogInfo(state, blogInfo) {
            state.blogInfo = blogInfo;
        },
        closeModel(state) {
            state.registerFlag = false;
            state.loginFlag = false;
            state.searchFlag = false;
            state.emailFlag = false;
        },
        articleLike(state, articleId) {
            const articleLikeSet = state.articleLikeSet;
            if (articleLikeSet.indexOf(articleId) !== -1) {
                articleLikeSet.splice(articleLikeSet.indexOf(articleId), 1);
            } else {
                articleLikeSet.push(articleId);
            }
        },
        commentLike(state, commentId) {
            const commentLikeSet = state.commentLikeSet;
            if (commentLikeSet.indexOf(commentId) !== -1) {
                commentLikeSet.splice(commentLikeSet.indexOf(commentId), 1);
            } else {
                commentLikeSet.push(commentId);
            }
        },
        setDialogFormVisible(state) {
            state.dialogFormVisible = !state.dialogFormVisible;
        }
    },
    actions: {
        UserLogin({commit}, userData) {
            const {username, password} = userData;
            return new Promise((resolve, reject) => {
                login({username: username.trim(), password: password})
                    .then(response => {
                        const {code, data} = response;
                        if (code === 200) {
                            // 状态赋值
                            commit("SET_USER_STATE", data);
                        }
                        resolve(response);
                    })
                    .catch(err => {
                        // 重置状态
                        commit("RESET_USER_STATE");
                        reject(err);
                    });
            });
        }
    },
    modules: {},
    plugins: [
        createPersistedState({
            storage: window.sessionStorage
        })
    ]
});
