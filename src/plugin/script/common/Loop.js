/** 轮询对象 **/

function _loop(self) {
    self.clear();
    self.timer = setTimeout(function () {
        _loop(self);
    }, self.time);
    typeof self.Func === "function" && self.Func();
}

class Loop {

    timer = null;

    constructor(func, time) {
        this.Func = func;
        this.time = time;
    }

    start() {
        _loop(this);
    }

    clear() {
        clearTimeout(this.timer);
        this.timer = null;
    }
}

export default Loop;
