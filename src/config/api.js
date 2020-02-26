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
    const url = "topSearchs/listBySchoolId"
    return Axios(spliceUrl(url, params));
}
export function deletetopSearch(params) {
    const url = "topSearchs/delete"
    return Axios(spliceUrl(url, params), {}, "DELETE");
}
export function updatetopSearch(data) {
    const url = "topSearchs/updateShowed"
    return Axios(url, data, "PUT");
}
export function createopenPage(data) {
    const url = "bootPages/create";
    return Axios(url, data, "POST");
}
export function deleteopenPage(params) {
    const url = "bootPages/delete"
    return Axios(spliceUrl(url, params), {}, "DELETE");
}
export function searchUsers(params) {
    const url = "users/listByLike";
    return Axios(spliceUrl(url, params));
}
export function getGooodstopSearch() {
    const url = "goods/getTopSearch"
    return Axios(url);
}

export function deleteGoodsTopSearch(data) {
    const url = "goods/addTopSearchFilter";
    return Axios(url, data, "POST");
}

export function getBlockedList(params) {
    const url = "users/listBlocked";
    return Axios(spliceUrl(url, params));
}
export function blockUser(data) {
    const url = "admins/blockAccount";
    return Axios(url, data, "PUT"); 
}
export function questionBySchool(params) {
    const url = "questionBanks/listBySchoolId";
    return Axios(spliceUrl(url, params));
}
export function createQuestion(data) {
    const url = "questionBanks/create";
    return Axios(url, data, "POST");
}

export function getAllActivity(params) {
    const url = "activities/listBySchoolId";
    return Axios(spliceUrl(url, params));
}
export function deleteActive(params) {
    const url = "activities/delete";
    return Axios(spliceUrl(url, params),{},"DELETE");
}
export function createActive(data) {
    const url = "activities/create";
    return Axios(url, data, "POST");
}
export function removeBlock(data) {
    const url = "admins/removeBlock";
    return Axios(url, data, "PUT");
}
export function deleteQuestion(params) {
    const url = "questionBanks/delete";
    return Axios(spliceUrl(url, params), {}, "DELETE")
}
export function getAllLabelCategories() {
    const url = "labelCategories/listAll";
    return Axios(url);
}
export function getALlCategories() {
    const url = "categories/listAll";
    return Axios(url);
}
export function getAllmainCategories() {
    const url = "mainCategories/listAll";
    return Axios(url);
}
export function getCategoriesFirst() {
    const url = "categories/listFirst";
    return Axios(url);
};
export function createCategories(data) {
    const url = "categories/create";
    return Axios(url, data, "POST")
}
export function getShowedTopSearch(params) {
    const url = "topSearchs/listByShowed";
    return Axios(spliceUrl(url,params))
}
export function updateCategories(data) {
    const url = "categories/update";
    return Axios(url, data, "PUT");
}
export function createLabelCategories(data) {
    const url = "labelCategories/create";
    return Axios(url, data, "POST");
}
export function deleteLabelCategories(params) {
    const url = "labelCategories/delete";
    return Axios(spliceUrl(url, params), {}, "DELETE");
}