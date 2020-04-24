/** 全局数据 **/

let _models = {};
let _pageMap = {};
let _pageList = {};
let _loopArray  = [];

let _headerMenuVue = null;
let _loginVue = null;
let _startApp = null;
let _el = "";
let _store = {};

export default {
    /** 校验权限 **/
    checkPermission(name) {
        return true;
    },
    checkLogin() {
        return true;
    },

    get models() {
        return _models;
    },
    set models(val) {
        _models = val;
        if (val === undefined || val === null) {
            _pageMap = {};
            _pageList = {};
        } else {
            _pageMap = (() => {
                /** 搜索所有模块 **/
                let SelectPage = (data, parentName = '') => {
                    let obj = {};
                    let childrenObj = {};

                    if (!data.name) {
                        throw 'no find vue name, data is ' + JSON.stringify(data);
                    }

                    let path = [parentName, data.name].join('/');
                    obj[path] = {};
                    obj[path].vue = data.vue || null;
                    obj[path].parent = parentName;

                    if (data.children && data.children.length > 0) {
                        for (let c in data.children) {
                            childrenObj = {...childrenObj, ...SelectPage(data.children[c], path)};
                        }
                    }

                    return {...obj, ...childrenObj};
                };

                let obj = {};
                for (let m in _models) {
                    obj = {...SelectPage(_models[m], ""), ...obj};
                }
                return obj;
            })();

            _pageList = (() => {
                let SelectPage = (data, parent) => {
                    let obj = {};
                    let childrenObj = {};

                    if (!data.name) {
                        throw 'no find vue name, data is ' + JSON.stringify(data);
                    }
                    obj[data.name] = {};
                    obj[data.name].vue = data.vue || null;
                    obj[data.name].name = data.name;
                    obj[data.name].text = data.text || '';
                    obj[data.name].parent = parent;

                    if (data.children && data.children.length > 0) {
                        for (let c in data.children) {
                            childrenObj = {...childrenObj, ...SelectPage(data.children[c], data.name)};
                        }
                    }

                    return {...obj, ...childrenObj};
                };

                let obj = {};
                for (let m in _models) {
                    obj = {...SelectPage(_models[m], ""), ...obj};
                }
                return obj;
            })();
        }
    },
    get pageMap() {return _pageMap;},
    get pageList() {return _pageList;},

    /** 头部菜单 **/
    get headerVue() {
        return _headerMenuVue;
    },
    set headerVue(val) {
        _headerMenuVue = val;
    },

    /** 首页轮询 **/
    get loopArray() {
        return _loopArray;
    },
    set loopArray(val) {
        _loopArray = val;
    },

    /** 登陆页面vue **/
    get loginVue() {
        return _loginVue;
    },
    set loginVue(val) {
        _loginVue = val;
    },

    /** 根节点 **/
    get startApp() {
        return _startApp;
    },
    set startApp(val) {
        _startApp = val;
    },

    /** 根路径id **/
    get el() {
        return _el;
    },
    set el(val) {
        _el = val;
    },

    /** **/
    get store() {
        return _store;
    },
    set store(val) {
        _store = val;
    }
};
