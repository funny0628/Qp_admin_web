<template>
  <div id="fishControl">
    <!-- 头部 -->
    <div class="title">
      <el-button style="margin:0px 10px 10px 0px" type="primary" @click="save"
        >保存</el-button
      >
      <el-button type="primary" @click="send">发送给服务器配置</el-button>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="捕鱼-低倍场" name="first"></el-tab-pane>
        <el-tab-pane label="捕鱼-中倍场" name="second"></el-tab-pane>
        <el-tab-pane label="捕鱼-高倍场" name="third"></el-tab-pane>
      </el-tabs>
    </div>

    <!-- form -->
    <div class="form">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="200px"
        class="demo-ruleForm"
      >
        <el-form-item 	 label="机器人命中系数" prop="region">
          命中系数:<el-input style="width:200px" v-model="ruleForm.region"></el-input> <br>
          机器人携带金币范围（元）:<el-input style="width:100px;margin-top:10px" v-model="ruleForm.region"></el-input>&nbsp;&nbsp;~&nbsp;&nbsp;<el-input style="width:100px" v-model="ruleForm.region"></el-input> 
        
        </el-form-item>

         <el-form-item style="margin-top:50px" label="机器人退出房间" prop="region">
          
          退出时间（秒）:<el-input style="width:100px" v-model="ruleForm.region"></el-input>&nbsp;&nbsp;~&nbsp;&nbsp;<el-input style="width:100px" v-model="ruleForm.region"></el-input> <br>
        退出概率(百分比):<el-input style="width:200px;margin-top:10px" v-model="ruleForm.region"></el-input> 
        </el-form-item>

         <el-form-item style="margin-top:50px" label="机器人加入房间" prop="region">
          命中系数:<el-input style="width:200px" v-model="ruleForm.region"></el-input> <br>
          机器人携带金币范围（元）:<el-input style="width:100px;margin-top:10px" v-model="ruleForm.region"></el-input>&nbsp;&nbsp;~&nbsp;&nbsp;<el-input style="width:100px" v-model="ruleForm.region"></el-input> 
        
        </el-form-item>


        <el-form-item style="margin-top:50px" label="子弹切换" prop="region">
              切换时间（秒）:<el-input style="width:100px;" v-model="ruleForm.region"></el-input>&nbsp;&nbsp;~&nbsp;&nbsp;<el-input style="width:100px" v-model="ruleForm.region"></el-input><br>
            炮台倍数(百分比): <el-button style="margin-top:10px" type="primary" @click="add">添加</el-button><br>
            <div v-for="item in list">
                 <el-input  style="width:100px;margin-top:10px" v-model="ruleForm.region"></el-input>&nbsp;&nbsp;~&nbsp;&nbsp;<el-input style="width:100px" v-model="ruleForm.region"></el-input><el-button type="primary" @click="del">删除</el-button>
            </div>
           
        </el-form-item>

        <el-form-item style="margin-top:50px" label="锁定概率" prop="region">
          
            鱼的倍数: <el-button type="primary" @click="add1">添加</el-button><br>
             <div v-for="item in list1">
                  <el-input style="width:100px;margin-top:10px" v-model="ruleForm.region"></el-input>&nbsp;&nbsp;~&nbsp;&nbsp;<el-input style="width:100px" v-model="ruleForm.region"></el-input><el-button type="primary" @click="del">删除</el-button>
            </div>

        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >立即提交</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "first",
      ruleForm:{},
      rules:{},
      input: "",
      list:["",""],
      list1:["",""],
    };
  },
  methods: {
    save() {},
    send() {},
    add() {},
    add1() {},
    del() {},
    ssubmitFormend() {},
    handleClick(tab, event) {
      console.log(tab, event);
    },
  }
};
</script>

<style lang="less" scoped>
#fishControl {
  background-color: #f2f2f2;
//   .title {
//     font-size: 25px;
//     padding: 0px 10px;
//     box-sizing: border-box;
//     border: 1px solid #eee;
//     ul {
//       display: flex;
//       li {
//         list-style: none;
//         margin-right: 10px;
//       }
//     }
//   }
//   .table {
//     // padding: 15px 10px;
//     border: 1px solid #ccc;
//     border-bottom: none;
//     border-right: none;
//     ul {
//       list-style: none;
//       li {
//         // padding: 10px 20px;
//         display: flex;
//         .caption {
//           width: 200px;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           border-bottom: 1px solid #ccc;
//           border-right: 1px solid #ccc;
//         }
//         .content {
//           display: flex;
//           flex-direction: column;
//           justify-content: center;
//           align-items: left;
//           padding-left: 40px;
//           border-bottom: 1px solid #ccc;
//           border-right: 1px solid #ccc;
//         }
//       }
//     }
//   }
}
</style>
