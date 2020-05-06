let deepData = (data)=>{
    return JSON.parse(JSON.stringify(data))
}

export const CheckValue = (ruleForm,rule, theObj, callback) => {
    // console.log(theObj);
    var regg = /^[0-9|,=]+.?[0-9|,=]*$/;
    var reg = /^[0-9]+.?[0-9]*$/;
    var regl = new RegExp("([0]*)([0-9]+[0-9]+)", "g");
    if (reg.test(theObj)) {
      theObj = theObj + ''
      let str = theObj.split('');
      let ind = str.includes('.')
      if (ind) {//有 . 判断是不是所有的都为0
          for (var i = 0; i < str.length; i++) {
              if (str[i] == '.'){
                  str.splice(i, 1);
                  i--;
              }
          }
      }
      let resul = str.every((item) => {
          return item === '0'
      })
      if(!resul){//不是所有都为0
          if(regg.test(theObj)){
            ruleForm[rule.fullField] = theObj.replace(regl, "$2")
            callback();
          }else{

              ruleForm[rule.fullField] = +theObj.replace(regl, "$2")
              callback();
          }
      }else{
        ruleForm[rule.fullField] = 0 
      } 
    //   else ruleForm[rule.fullField] = +theObj.replace(regl, "$2")
    //   callback();
    } else {
      return callback(new Error("输入正确格式的数字,必填项不能为空"));
    }
  };



export default deepData;