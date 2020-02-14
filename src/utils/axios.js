import axios from "axios";
import baseUrl from "../config/baseUrl";
import { notification, message } from "antd";
// import { getCookie } from "../utils/session";

const openNotification = message => {
    notification.info({
    message: `出错了`,
    description: message,
    placement: "topLeft"
    });
};

axios.interceptors.response.use(data=> {
    if (data.status && data.status !== 200 && (data.data.code!==0&&data.data.code)) {
        if(data.data.message) {
            message.error(data.data.message);
        }
    //   return Promise.reject();
    }
    return data;
  }, err=> {
    if (err.response.status === 504||err.response.status === 404) {
        openNotification('服务器出错了')
    } 
    else if (err.response.status === 403) {
        openNotification('权限不足,请联系管理员!')
    }
    else {
        openNotification('未知错误!')
    }
    return Promise.reject(err);
  })

function Axios(url, data = null, method = "GET") {
    const data1 = JSON.stringify(data);
    return axios({
        url: `${baseUrl}${url}`,
        data: data1,
        method,
        headers: {
            "Content-Type":"application/json"
        }
    })
}



export default Axios;