// import axios from 'axios';

// let CancelToken = axios.CancelToken;
// let instance;

// let request = (url, data, type = 'post') => {
//   let Cancel;
//   instance = axios.create({
//     baseURL: "",
//     timeout: 20000,
//     cancelToken: new CancelToken(function executor(c) {
//       Cancel = c;
//     }),
//   });

//   // 请求拦截
//   const requestInterceptor = instance.interceptors.request.use((config) => {
//     return config;
//   }, function (error) {
//     return Promise.reject(error);
//   });

//   // 返回拦截
//   const responseInterceptor = instance.interceptors.response.use((response) => {
//     let rs = response.data || {};
//     let status = response.status || 400;
//     return status === 200?rs:{};
//   }, function (error) {
//     return Promise.reject(error);
//   });

//   let promise = new Promise((resolve, reject)=> {
//     instance({
//       method: type || 'post',
//       url: url,
//       data: data
//     }).then(response => {
//       resolve(response);
//     }).catch(e => {
//       reject(e);
//     });
//   });

//   return new AxiosObject(promise, Cancel);
// };

// class AxiosObject {
//   constructor(promise, cancel) {
//     /** 异步请求返回 **/
//     this.promise = promise;
//     /** 请求取消 **/
//     this.cancel = (()=>{
//       return typeof cancel === 'function'?cancel: function(){}
//     })();
//   }
// }

// export default {
//   /**
//    * post 请求
//    * @param url
//    * @param data
//    */
//   post(url, data) {
//     /*return new Promise((resolve, reject) => {
//       request(url, data, 'post').then(response=>{
//         resolve(response);
//       }).catch(e=>{
//         reject(e);
//       });
//     })*/

//     return request(url, data, 'post');
//   },

//   /**
//    * get 请求
//    * @param url
//    * @param data
//    */
//   get(url, data) {
//     url += '?';
//     let ls = [];
//     for (let k in data) {
//       ls.push(k + "=" + data[k]);
//     }
//     url += ls.join('&');
// console.log('我执行了吗，9999999999999')
//     return request(url, {}, 'get');
//   },

//   /**
//    * 多组同时请求 TODO
//    * @param array
//    *  多组请求
//    * @param callback
//    */
//   all(array, callback) {
//   }
// }
