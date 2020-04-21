import axios from 'axios'

//用户列表
let GetUsers = (params) => { //get / search
    return axios.get('v1/backend/operation/users', {
        params
    })
}

//用户详情记录
let GetUserDetail = (params) => { //get / search
    return axios.get('v1/backend/operation/user/detail', {
        params
    })
}

//用户封号
let PostUserLock = (params) => { //get / search
    return axios.post('v1/backend/operation/user/lock',params)
}

//用户解封
let PostUserUnlock = (params) => { //get / search
    return axios.post('v1/backend/operation/user/unlock',params)
}

//用户封号状态
let GetUserLock = (params) => { //get / search
    return axios.get('v1/backend/operation/user/lock', {
        params
    })
}

//VIP记录列表
let GetVips = (params) => { //get / search
    return axios.get('v1/backend/operation/vips', {
        params
    })
}

//渠道列表
let GetChannels = (params) => { //get / search
    return axios.get('v1/backend/operation/channels', {
        params
    })
}



//GM控制
let GetGameControl = (params) => {
    return axios.get('v1/backend/inventory/game_control', {
        params
    })
}

//GM库存数据
let GetInvenData = (params) => {
    return axios.get('v1/backend/inventory/inventory_data', {
        params
    })
}

//GM库存流水
let GetGameWater = (params) => {
    return axios.get('v1/backend/inventory/game_water', {
        params
    })
}

export default {
    GetUsers,
    GetUserDetail,
    PostUserLock,
    PostUserUnlock,
    GetUserLock,
    GetVips,
    GetChannels,
    //库存管理->GM控制
    GetGameControl,
    GetInvenData,
    GetGameWater,
}