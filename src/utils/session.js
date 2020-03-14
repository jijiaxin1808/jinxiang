// const LOGIN_COOKIE_NAME = "localId";

export default function isAuthenticated () {
    if(localStorage.getItem("token")) {
        return true;
    }
    else {
        return false;
    }
}

// export function authenticateSuccess (token) {
// 	setCookie(LOGIN_COOKIE_NAME, token);
// }

// export function logout () {
// 	_setCookie(LOGIN_COOKIE_NAME, "", 0);
// }
// export function getCookie () {
// 	return localStorage.getItem("token");
// }

// function _getCookie () {
// 	if(localStorage.getItem("item")){
// 	 return true;
// 	}else{
// 	 return false;
// 	}
// }

export function setCookie (token) {
	localStorage.setItem("token",token);
}
export function getLevelA() {
    return localStorage.getItem("level")
}