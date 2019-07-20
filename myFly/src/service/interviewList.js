import request from "../utils/request";

//获取面试列表
export function interview(params){
    if(params.status === 2){
        return request.get("/sign",{page:params.page,pageSize:params.pageSize})
    }else{
        return request.get("/sign",params)
    }
}

//获取面试详情
export function interviewDetail(id){
    return request.get(`/sign/${id}`)
}


//更新面试信息
export function updateList(id,params){
    return request.put(`/sign/${id}`,params)
}