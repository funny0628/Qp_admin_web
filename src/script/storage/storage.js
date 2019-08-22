//封装操作localstorage本地存储的方法
var storage = {
  //存储数据
  set(key,value){
    localStorage.setItem(key,JSON.stringify(value));
  },
  //取数据
  get(key,value) {
    localStorage.getItem(key,JSON.stringify(value));
  },
  //删除数据
  remove(key){
    localStorage.removeItem(key);
  }
};
//暴露给外部使用
export default storage;
