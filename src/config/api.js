import Axios from "../utils/axios";

function loginByPwd(data) {
    const url = "users/loginByPwd";
    return Axios(url, data, "POST");
}





export { loginByPwd }