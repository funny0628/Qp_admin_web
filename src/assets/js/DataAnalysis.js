import axios from 'axios'


//数据分析 ->渠道报表日
let GetrReportEveryday = (params) => {
    return axios.get('v1/backend/channel/report_everyday', {
        params
    })
}


//数据分析 ->LTV
let GetrReportLtv = (params) => {
    return axios.get('v1/backend/channel/report_ltv', {
        params
    })
}

//数据分析 ->留存分析
let GetrAnalysis = (params) => {
    return axios.get('v1/backend/channel/retained_analysis', {
        params
    })
}

//数据分析 ->新玩家付费转换
let GetrPaySwitch = (params) => {
    return axios.get('v1/backend/channel/pay_switch', {
        params
    })
}

//数据分析 ->牌局总览
let GetrMatchOverview = (params) => {
    return axios.get('v1/backend/channel/match_overview', {
        params
    })
}

//数据分析 ->新增用户
let GetrNewUsers = (params) => {
    return axios.get('v1/backend/channel/new_users', {
        params
    })
}

//数据分析 ->台费统计
let GetStatistical = (params) => {
    return axios.get('v1/backend/channel/fee_statistical', {
        params
    })
}

//数据分析 ->渠道报表
let GetrReport = (params) => {
    return axios.get('v1/backend/channel/report_eachday', {
        params
    })
}

//数据分析 ->流失于回归
let GetrLoss = (params) => {
    return axios.get('v1/backend/channel/loss_regression', {
        params
    })
}
//数据分析 ->库存统计
let GetNventory = (params) => {
    return axios.get('v1/backend/channel/nventory_statistics', {
        params
    })
}

//子游戏 ->斗地主防刷配置
let GetDdz = (params) => {
    return axios.get('v1/backend/songame/ddz_prevent', {
        params
    })
}
let PostDdz = (params) => {
    return axios.post('v1/backend/songame/ddz_prevent', params)
}
let PutDdz = (params) => {
    return axios.put('v1/backend/songame/ddz_prevent', params)
}
let DeleterDdz = (params) => {
    return axios.delete('v1/backend/songame/ddz_prevent', {
        params
    })
}


export default {
    GetrReportEveryday,
    GetrReportLtv,
    GetrAnalysis,
    GetrPaySwitch,
    GetrMatchOverview,
    GetrNewUsers,
    GetStatistical,
    GetrReport,
    GetrLoss,
    GetDdz,
    PostDdz,
    PutDdz,
    DeleterDdz,
    GetNventory,
}