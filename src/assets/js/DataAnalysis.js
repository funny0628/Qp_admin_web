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


export default {
    GetrReportEveryday,
    GetrReportLtv,
    GetrAnalysis,
    GetrPaySwitch,
    GetrMatchOverview,
    GetrNewUsers,
}