import axios from 'axios'

//用户列表
let GetUsers = (params) => { //get / search
    return axios.get('v1/backend/operation/users', {
        params
    })
}

export default {
    GetUsers,
    
}