import axios from 'axios'

//全民代理配置
let GetAllAgency = (params) => { //get / search
    return axios.get('v1/backend/agency/config', {
        params
    })
}

let PostAllAgency = (params) => { 
    return axios.post('v1/backend/agency/config',params)
}

let PutAllAgency = (params) => { 
    return axios.put('v1/backend/agency/config',params)
}

let DeleteAllAgency = (params) => { 
    return axios.delete('v1/backend/agency/config',{
        params
    })
}



//全民代理
let GetAgency = (params) => { //get / search
    return axios.get('v1/backend/agency/data', {
        params
    })
}

//全民代理->收益详情
let GetEarnings = (params) => { //get / search
    return axios.get('v1/backend/agency/earnings_info', {
        params
    })
}

//全民代理->查看下级
let GetAgencyLevel = (params) => { //get / search
    return axios.get('v1/backend/agency/subordinate', {
        params
    })
}

export default {
    GetAllAgency,
    PostAllAgency,
    PutAllAgency,
    DeleteAllAgency,
    GetAgency,
    GetEarnings,
    GetAgencyLevel,
}