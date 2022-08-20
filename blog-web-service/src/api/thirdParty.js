import request from "../utils/request";

// 第三方服务
export default {
    // 发送邮件
    sendEmail(email) {
        return request({
            url: `/thirdparty/api/email/sendEmail/${email}`,
            method: "get"
        });
    },

    // 发送手机验证码
    sendPhoneCode(phone) {
        return request({
            url: `/thirdparty/api/msm/getPhoneCode/${phone}`,
            method: "get"
        });
    }
};
