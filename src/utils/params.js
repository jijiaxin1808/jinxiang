function spliceUrl(url,params) {
    const keys = Object.keys(params);
    const length = keys.length;
    for(let i = 0; i < length; i++) {
        if(i===0) {
            url += `?${keys[i]}=${params[keys[i]]}`;
        }
        else {
            url += `&${keys[i]}=${params[keys[i]]}`;
        }
    }
    return url;
}
export default spliceUrl;