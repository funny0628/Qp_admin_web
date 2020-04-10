<template>
  <div id="userMan—main">
    <input-area>
      <el-button type="danger">删除</el-button>
      <el-button type="primary" @click="addUser">添加</el-button>
    </input-area>
    <div class="bd">
      <el-table
        border
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%;"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="id" label="ID" align="center"></el-table-column>
        <el-table-column prop="username" label="用户名" align="center"></el-table-column>
        <el-table-column prop="email" label="邮箱" align="center"></el-table-column>
        <el-table-column prop="phone" label="电话" align="center"></el-table-column>
        <el-table-column prop="channel" label="渠道" align="center"></el-table-column>
        <el-table-column prop="create_time" label="创建时间" align="center">
          <template slot-scope="scope">{{scope.row.create_time | dateFormat}}</template>
        </el-table-column>
        <el-table-column prop="update_time" label="更新时间" align="center">
          <template slot-scope="scope">{{scope.row.update_time | dateFormat}}</template>
        </el-table-column>
        <el-table-column prop="action" label="操作" fixed="right" align="center" width="200">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="primary" @click="handleRole(scope.$index, scope.row)">角色</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20]"
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
        <el-form-item label="密码" prop="password" :label-width="formLabelWidth" style="width:50%;">
          <el-input v-model="form.password" type="password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="确认密码"
          prop="password2"
          :label-width="formLabelWidth"
          style="width:50%;"
        >
          <el-input v-model="form.password2" type="password" autocomplete="off"></el-input>
        </el-form-item>
        <div>{{form}}</div>
        <el-form-item label="渠道" :label-width="formLabelWidth" style="width:100%;">
          <el-checkbox-group v-model="form.channel">
            <el-checkbox label="0902代理">0902代理</el-checkbox>
            <el-checkbox label="官网">官网</el-checkbox>
            <el-checkbox label="ios">ios</el-checkbox>
            <el-checkbox label="殴打平均分IPO">殴打平均分IPO</el-checkbox>
            <el-checkbox label="无服务范围">无服务范围</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddUser = false">取 消</el-button>
        <el-button type="primary" @click="addUserFn">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分配角色 -->
    <el-dialog title="用户[root]分配角色" :visible.sync="dialogRoleAssign" width="25%">
      <el-form :model="form2">
        <el-form-item label="角色" label-width="80px">
          <el-select v-model="form2.role" placeholder="请选择角色">
            <el-option
              v-for="(item,index) in roleOpts"
              :key="index"
              :label="item.display_name"
              :value="item.id"
            >{{item.display_name}}</el-option>
          </el-select>
          <div>{{form2.role}}</div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogRoleAssign = false">取 消</el-button>
        <el-button type="primary" @click="assignRole">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import InputArea from "../../plugin/components/InputArea";
export default {
  name: "userList",
  components: {
    InputArea
  },
  data() {
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
      pagesize: 5,
      currentPage: 1,
      total: 0,
      dialogAddUser: false,
      dialogTitle: "",
      formLabelWidth: "120px",
      form: {
        uid: -1,
        username: "",
        nick_name: "",
        email: "",
        phone: "",
        password: "123456",
        password2: "123456",
        channel: ""
      },
      form2: {
        role: ""
      },
      rules: {
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
        username: "",
        nick_name: "",
        email: "",
        phone: "",
        password: "123456",
        password2: "123456",
        channel: ""
      };
    },
    async getUserList() {
      const res = await this.$http.get("api/auth/users", {
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
        const res = await this.$http.post("api/auth/users", this.form);
        console.log(res);
        if (res.data.code === 200) {
          this.dialogAddUser = false;
          this.getUserList();
        }
      } else {
        const res = await this.$http.put("api/auth/users", this.form);
        console.log(res);
        if (res.data.code === 200) {
          this.dialogAddUser = false;
          this.getUserList();
        }
      }
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
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
    },
    handleEdit(index, row) {
      console.log(index, row);
      this.dialogAddUser = true;
      this.dialogTitle = "编辑用户";
      if (this.$refs.form) {
        this.$refs.form.resetFields();
      }
      this.form.username = row.username;
      this.form.nick_name = row.username;
      this.form.email = row.email;
      this.form.phone = row.phone;
      this.form.uid = row.id;
    },
    // async updateUser() {
    //   console.log(this.form);
    //   const res = await this.$http.put("api/auth/users", this.form);
    //   console.log(res);
    //   if (res.data.code === 200) {
    //     this.dialogAddUser = false;
    //     this.getUserList();
    //   }
    // },
    handleRole(index, row) {
      this.dialogRoleAssign = true;
      this.form.uid = row.id;
      this.getRoleList();
    },
    async assignRole() {
      console.log(this.form.uid, this.form2.role);
      let data = {
        role_id: this.form2.role,
        user_id: this.form.uid
      };
      const res = await this.$http.post(`auth/role-assignment`, data);
      console.log(res)
      if(res.data.code === 200) {
        this.dialogRoleAssign = false
      }
    },
    handleDelete(index, row) {
      console.log(row);
      const ids = row.id.toString();
      console.log(ids);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$http.delete("api/auth/users", {
            params: {
              uids: ids
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
    //角色列表
    async getRoleList() {
      const res = await this.$http.get("auth/roles");
      console.log(res);
      if (res.data.code === 200) {
        this.roleOpts = res.data.data;
        this.$message({
          type: "success",
          message: res.data.msg
        });
      } else {
        this.$message({
          type: "info",
          message: res.data.msg
        });
      }
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
