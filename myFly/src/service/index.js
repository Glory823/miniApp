import request from "../utils/request";

//用户登陆接口
export function login(code){
    return request.post("/user/code2session",{
        code
    })
}


//解密数据
export function encrypteData(data){
    return request.post("/user/decrypt",data)
}