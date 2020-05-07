let deepData = (data) => {
    return JSON.parse(JSON.stringify(data))
}

//只要有就是true,全部没才是false

export const CheckValue = (ruleForm, rule, theObj, callback) => {
    // console.log(rule);

    if (!isNaN(theObj)) {//是数字
        ruleForm[rule.fullField] = +theObj
        callback();
    } else {
        // console.log('带有字符的格式');
        let objArr = ['|', ',', '=','-']
        let has = true;
        for(var i = 0; i < objArr.length; i++){
            if (theObj.indexOf(objArr[i]) !== -1){
                has = true
                break
            }
            has = false
        }
        if(has){
            ruleForm[rule.fullField] = theObj;
            callback();
        } 
        else callback(new Error("输入正确格式的数字,必填项不能为空"))
    }
};



export default deepData;