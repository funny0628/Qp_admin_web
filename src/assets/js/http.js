import axios from 'axios'
import Qs from 'qs'
import HallFunConfig from './HallFunConfig.js'
const httpHelper = {};
// 配置Vue插件
httpHelper.install = function fn(Vue) {
  axios.defaults.baseURL = 'http://192.168.1.64:8000/v1/backend/';
  // axios.defaults.baseURL = 'http://192.168.1.24:8000/v1/backend/';
  // axios 拦截器
  // 当不是登录的时候添加Authorization
  // axios.interceptors.request.use(function (config) {
  //   console.log(config)
  //   // Do something before request is sent
  //   if (config.url !== '/login') {
  //     config.headers.Authorization = localStorage.getItem('token');
  //   }
  //   return config;
  // }, function (error) {
  //   // Do something with request error
  //   return Promise.reject(error);
  // });

  //大厅功能配置
  axios.HallFunConfig = HallFunConfig;

  // axios.POST = (url, params) => {
  //   return new Promise((resolve, reject) => {
  //     axios({
  //       method: 'post', 
  //       url,
  //       headers: {
  //         "Content-type": "application/x-www-form-urlencoded"
  //       },
  //       data: Qs.stringify(params),
  //     })
  //       .then(res => {
  //         resolve(res.data);
  //       })
  //       .catch(err => {
  //         reject(err.data)
  //       })
  //   });
  // }


  Vue.prototype.$http = axios;
};

export default httpHelper;
