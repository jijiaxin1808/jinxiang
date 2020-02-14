import Axios from "../utils/axios";

export function loginByPwd(data) {
    const url = "users/loginByPwd";
    return Axios(url, data, "POST");
}