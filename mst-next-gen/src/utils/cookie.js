function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}


function hasUserLogin(){
    let flag = false;
    try{
        let user = JSON.parse(localStorage.getItem("user")||"{}")
        flag = Boolean(Object.values(user).length&&getCookie('app'))

        }catch{
    
    }
    return flag
}
export {
    getCookie,
    hasUserLogin
}