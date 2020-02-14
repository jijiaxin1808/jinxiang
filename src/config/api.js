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
export function topSearchCreate(data) {
    const url = "topSearchs/create";
    return Axios(url, data, "POST");
}
export function getAlltopSearch(params) {
    const url = "topSearchs/listAll"
    return Axios(spliceUrl(url, params));
}
export function deletetopSearch(params) {
    const url = "topSearchs/delete"
    return Axios(spliceUrl(url, params), {}, "DELETE");
}
