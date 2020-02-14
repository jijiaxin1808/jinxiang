import Axios from "../utils/axios";
import spliceUrl from "../utils/params";

export function loginByPwd(data) {
    const url = "users/loginByPwd";
    return Axios(url, data, "POST");
}
export function getAllbootPages(params) {
    const url = "bootPages/listAll"
    return Axios(spliceUrl(url, params));
}