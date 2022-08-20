import axios from "axios";
import {PcCookie, Key} from './cookie';

const request = axios.create({
    baseURL: "/dev-api", // url = base url + request url
    timeout: 5000, // 请求超时 5秒
    headers: {
        "Content-Type": "application/json;charset=uft-8"
    },
    withCredentials: true // 允许跨域
});

// 请求拦截器
request.interceptors.request.use(
    config => {
        const accessToken = PcCookie.get(Key.accessTokenKey);
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    error => {
        // eslint-disable-next-line no-console
        console.log(error);
        return Promise.reject(error);
    }
);

// 响应拦截器
request.interceptors.response.use(
    response => {
        return response.data;

        /*if(res.code === 200) {
          return response.data;
        } else if(res.code === 408) {
          Element.Message.error('该用户未注册')
        } else {
          Element.Message.error(!res.msg ? '系统异常' : res.msg)
          return Promise.reject(response.data.msg);
        }*/
    }, error => {
        // eslint-disable-next-line no-console
        console.log("出现异常" + error)
        if (error.response.status === 401) {
            PcCookie.remove(Key.userInfoKey);
            PcCookie.remove(Key.accessTokenKey);
            PcCookie.remove(Key.refreshTokenKey);
            // window.location.href = `http://localhost:9999`;
            // return Promise.reject(error)
            /*alert("身份过期，请重新登录")
              return Promise.reject(error)*/
        }
        // 401 发送刷新令牌获取新令牌
        // sendRefreshRequest(store);
        /*return Promise.reject('令牌过期，重新登录')*/
    }
);

// request interceptor
// service.interceptors.request.use(
//     config => {
//         // do something before request is sent
//         let token = store.state.token
//         if (token) {
//             // let each request carry token
//             // ['X-Token'] is a custom headers key
//             // please modify it according to the actual situation
//           config.headers.Authorization = token
//         }
//         return config
//     },
//     error => {
//         // do something with request error
//         console.log(error) // for debug
//         return Promise.reject(error)
//     }
// )

// response interceptor
// service.interceptors.response.use(
//     /**
//      * If you want to get http information such as headers or status
//      * Please return  response => response
//      */
//
//     /**
//      * Determine the request status by custom code
//      * Here is just an example
//      * You can also judge the status by HTTP Status Code
//      */
//     response => {
//         const res = response.data
//         // store.commit('SET_LOADING',false);
//         // if the custom code is not 20000, it is judged as an error.
//         if (res.code !== 200) {
//             return Promise.reject(new Error(res.message || 'Error'))
//         } else {
//             return res
//         }
//     },
//     error => {
//         console.log('err' + error) // for debug
//         return Promise.reject(error)
//     }
// )

export default request
