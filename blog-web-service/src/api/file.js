import request from "../utils/request";

// 文件相关
export default {
    // 上传头像
    uploadImage(data = {}) {
        return request({
            url: `/thirdparty/api/file/uploadAvatar`,
            method: "post",
            data
        });
    }
};
