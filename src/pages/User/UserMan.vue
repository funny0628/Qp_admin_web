<template>
  <div id="userMan—main">
    <input-area>
      <!-- <el-button type="danger">删除</el-button> -->
      <el-button v-has="'add_user'" type="primary" @click="addUser">添加</el-button>
    </input-area>
    <div class="bd">
      <el-table
        v-has="'users'"
        border
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%;"
        @selection-change="handleSelectionChange"
      >
        <el-table-column prop="id" label="ID" align="center"></el-table-column>
        <el-table-column prop="username" label="用户名" align="center"></el-table-column>
        <el-table-column prop="email" label="邮箱" align="center"></el-table-column>
        <el-table-column prop="phone" label="电话" align="center"></el-table-column>
        <el-table-column prop="channel" label="渠道" align="center">
          <template slot-scope="scope">
            <span>{{String(JSON.parse(scope.row.channel))}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="创建时间" align="center">
          <template slot-scope="scope">{{scope.row.create_time | dateFormat}}</template>
        </el-table-column>
        <el-table-column prop="update_time" label="更新时间" align="center">
          <template slot-scope="scope">{{scope.row.update_time | dateFormat}}</template>
        </el-table-column>
        <el-table-column fixed="right" align="center" width="200">
          <template slot-scope="scope">
            <el-button
              v-has="'modify_user'"
              size="mini"
              type="primary"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              v-if="scope.row.username !== 'root'"
              size="mini"
              type="primary"
              @click="handlePsd(scope.row)"
            >修改密码</el-button>
            <el-button
              v-has="'role_assign'"
              size="mini"
              type="primary"
              @click="handleRole(scope.$index, scope.row)"
            >角色</el-button>
            <el-button
              v-has="'admin_user_unlock'"
              v-if="scope.row.username !== 'root' && scope.row.status == 1"
              size="mini"
              type="danger"
              @click="handleFreeze(scope.row)"
            >账号解冻</el-button>
            <el-button
              v-if="scope.row.username !== 'root'"
              v-has="'delete_user'"
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 15, 20]"
        :page-size="pagesize"
        layout="total,sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <!-- 添加用户 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogAddUser">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="用户名" :label-width="formLabelWidth" style="width:50%;">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称" :label-width="formLabelWidth" style="width:50%;">
          <el-input v-model="form.nick_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth" style="width:50%;">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone" :label-width="formLabelWidth" style="width:50%;">
          <el-input v-model="form.phone" maxlength="11" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          v-if="!form.uid"
          label="密码"
          prop="password"
          :label-width="formLabelWidth"
          style="width:50%;"
        >
          <el-input v-model="form.password" type="password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          v-if="!form.uid"
          label="确认密码"
          prop="password2"
          :label-width="formLabelWidth"
          style="width:50%;"
        >
          <el-input v-model="form.password2" type="password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="渠道" :label-width="formLabelWidth" style="width:100%;">
          <el-checkbox-group :limit="1" v-model="form.channel">
            <el-checkbox v-for="(item,index) in channelList" :key="index" :label="item.name"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddUser = false">取 消</el-button>
        <el-button type="primary" @click="addUserFn">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分配角色 -->
    <el-dialog title="用户分配角色" :visible.sync="dialogRoleAssign" width="25%">
      <el-form :model="form2">
        <el-form-item label="角色" label-width="80px">
          <el-select v-model="form2.role">
            <el-option
              v-for="(item,index) in roleOpts"
              :key="index"
              :label="item.display_name"
              :value="item.id"
            >{{item.display_name}}</el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogRoleAssign = false">取 消</el-button>
        <el-button type="primary" @click="assignRole">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改密码 -->
    <el-dialog title="修改用户密码" :visible.sync="dialogPsdVisible" width="30%">
      <el-form :model="psdForm">
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input type="password" v-model="psdForm.psd" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" :label-width="formLabelWidth">
          <el-input type="password" v-model="psdForm.checkPsd" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogPsdVisible = false">取 消</el-button>
        <el-button type="primary" @click="modifyPsd">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import InputArea from "../../plugin/components/InputArea";
export default {
  name: "user_manage",
  components: {
    InputArea
  },
  data() {
    let checkUsername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      }
      // else {
      //   if(this.form.username.length < 6) {
      //     return callback(new Error('长度在 6 到 8 个字符'))
      //   }
      // }
    };
    /*校验手机号*/
    let checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      } else {
        if (/^[1][345789]\d{9}$/.test(value)) {
          callback();
        } else {
          return callback(new Error("请输入正确的手机号"));
        }
      }
    };
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.form.password2 !== "") {
          this.$refs.form.validateField("password2");
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    let validateEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入验证邮箱"));
      } else {
        if (
          /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(
            value
          )
        ) {
          callback();
        } else {
          return callback(new Error("请输入正确的邮箱地址"));
        }
      }
    };
    return {
      dialogFormVisible: false,
      pagesize: 10,
      currentPage: 1,
      total: 0,
      dialogAddUser: false,
      dialogPsdVisible: false,
      dialogTitle: "",
      formLabelWidth: "120px",
      form: {
        uid: null,
        username: "",
        nick_name: "",
        email: "",
        phone: "",
        password: "",
        password2: "",
        channel: []
      },
      psdForm: {
        uid: null,
        psd: "",
        checkPsd: ""
      },
      channelList: [],
      form2: {
        role: ""
      },
      rules: {
        username: [{ validator: checkUsername, trigger: "blur" }],
        phone: [{ validator: checkPhone, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        password2: [{ validator: validatePass2, trigger: "blur" }],
        email: [{ validator: validateEmail, trigger: "blur" }]
      },
      dialogRoleAssign: false,
      dialogRightAssign: false,
      roleOpts: [],
      tableData: [],
      multipleSelection: [],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },

  methods: {
    resetForm() {
      this.form = {
        uid: null,
        username: "",
        nick_name: "",
        email: "",
        phone: "",
        password: "",
        password2: "",
        channel: []
      };
    },
    async getUserList() {
      const res = await this.$http.get("v1/backend/auth/users", {
        params: {
          page: this.currentPage,
          limit: this.pagesize
        }
      });
      console.log(res);
      if (res.data.code === 200) {
        this.tableData = res.data.data;
        this.total = res.data.total;
      }
    },
    async addUserFn() {
      if (!this.form.uid) {
        let data = {
          username: this.form.username,
          nick_name: this.form.nick_name,
          email: this.form.email,
          phone: this.form.phone,
          password: this.form.password,
          password2: this.form.password2,
          channel: JSON.stringify(this.form.channel)
        };
        const res = await this.$http.post("v1/backend/auth/users", data);
        console.log(res);
        if (res.data.code === 200) {
          this.dialogAddUser = false;
          this.$message({
            type: "success",
            message: res.data.msg
          });
          this.getUserList();
        }
      } else {
        let data = {
          uid: this.form.uid,
          username: this.form.username,
          nick_name: this.form.nick_name,
          email: this.form.email,
          phone: this.form.phone,
          // password: this.form.password,
          // password2: this.form.password2,
          channel: JSON.stringify(this.form.channel)
        };
        const res = await this.$http.put("v1/backend/auth/users", data);
        console.log(res);
        if (res.data.code === 200) {
          this.dialogAddUser = false;
          this.getUserList();
        }
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection);
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.getUserList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getUserList();
    },
    addUser() {
      this.dialogAddUser = true;
      this.dialogTitle = "添加用户";
      this.resetForm();
      if (this.$refs.form) {
        this.$refs.form.resetFields();
      }
      this.getChannelList();
    },
    handleEdit(index, row) {
      console.log(index, row);
      this.dialogAddUser = true;
      this.dialogTitle = "编辑用户";
      if (this.$refs.form) {
        this.$refs.form.resetFields();
      }
      this.getChannelList();
      this.form.username = row.username;
      this.form.nick_name = row.username;
      this.form.email = row.email;
      this.form.phone = row.phone;
      this.form.uid = row.id;
      this.form.channel = JSON.parse(row.channel);
    },
    handlePsd(row) {
      console.log(row);
      this.dialogPsdVisible = true;
      this.psdForm = {
        uid: null,
        psd: "",
        checkPsd: ""
      };
      this.psdForm.uid = row.id;
    },
    modifyPsd() {
      let data = {
        uid: this.psdForm.uid,
        password: this.psdForm.psd,
        password2: this.psdForm.checkPsd
      };
      this.$http.post("v1/backend/operation/user/password", data).then(res => {
        console.log(res);
        if (res.data.code == 200) {
          this.dialogPsdVisible = false;
          this.$message({
            type: "success",
            message: res.data.msg
          });
        }
      });
    },
    handleRole(index, row) {
      console.log(row);
      this.dialogRoleAssign = true;
      this.form.uid = row.id;
      if (row.role_id == null) {
        this.form2.role = "未分配角色";
      } else {
        this.form2.role = row.role_id;
      }
      this.getRoleList();
    },
    async assignRole() {
      console.log(this.form.uid, this.form2.role);
      let data = {
        role_id: this.form2.role,
        user_id: this.form.uid
      };
      const res = await this.$http.post(
        `v1/backend/auth/role-assignment`,
        data
      );
      console.log(res);
      if (res.data.code === 200) {
        this.dialogRoleAssign = false;
        this.$message({
          type: "success",
          message: "分配角色成功"
        });
      } else {
        this.dialogRoleAssign = false;
        this.$message({
          type: "error",
          message: "分配角色失败"
        });
      }
    },
    handleDelete(index, row) {
      console.log(row);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$http.delete("v1/backend/auth/users", {
            params: {
              uid: row.id
            }
          });
          console.log(res);
          if (res.data.code === 200) {
            this.dialogAddUser = false;
            this.getUserList();
            this.$message({
              type: "success",
              message: res.data.msg
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: res.data.msg
          });
        });
    },
    handleFreeze(row) {
      console.log(row);
      let data = {
        user_id: row.id
      };
      this.$http.post("v1/backend/auth/user/unlock", data).then(res => {
        console.log(res)
        if (res.data.code === 200) {
          this.$message({
            type: "success",
            message: res.data.msg
          });
          this.getUserList()
        }
      });
    },
    //角色列表
    async getRoleList() {
      const res = await this.$http.get("v1/backend/auth/roles");
      console.log(res);
      if (res.data.code === 200) {
        this.roleOpts = res.data.data;
      } else {
        this.$message({
          type: "info",
          message: res.data.msg
        });
      }
    },
    getChannelList() {
      this.$http
        .get("v1/backend/operation/channels", {
          params: {
            page: 1,
            limit: 100
          }
        })
        .then(res => {
          console.log(res);
          if (res.data.code === 200) {
            this.channelList = res.data.data;
          }
        });
    }
  },
  mounted() {
    this.getUserList();
  }
};
</script>

<style scoped>
#userMan—main .bd {
  padding-left: 20px;
  padding-right: 20px;
}
#userMan—main .bd p {
  margin: 0;
}
.el-pagination {
  margin-top: 20px;
}
.el-button {
  margin-top: 5px;
}
#userMan—main >>> .el-dialog .el-dialog__header {
  text-align: left;
}
#userMan—main >>> .el-tree-node__label {
  margin-left: 10px;
}
#userMan—main .bd >>> .el-button {
  margin-left: 0px;
  min-width: 30px;
}
</style>
