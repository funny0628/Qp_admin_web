<template>
  <div id="userList—main">
    <input-area>
      <el-button type="danger">删除</el-button>
      <el-button type="primary" @click="addRole">添加</el-button>
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
        <el-table-column prop="name" label="名称" align="center"></el-table-column>
        <el-table-column prop="display_name" label="显示名称" align="center"></el-table-column>
        <el-table-column prop="create_time" label="创建时间" align="center">
          <template slot-scope="scope">{{scope.row.create_time*1000 | dateFormat}}</template>
        </el-table-column>
        <el-table-column prop="update_time" label="更新时间" align="center">
          <template slot-scope="scope">{{scope.row.update_time*1000 | dateFormat}}</template>
        </el-table-column>
        <el-table-column prop="action" label="操作" align="center" width="200">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="primary" @click="showRightsDialog(scope.row)">权限</el-button>
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
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <!-- 添加角色 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogAddRole" width="30%">
      <el-form :model="form">
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" :label-width="formLabelWidth">
          <el-input v-model="form.display_name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddRole = false">取 消</el-button>
        <el-button type="primary" @click="addRoleFn">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 权限分配 -->
    <el-dialog title="权限分配" :visible.sync="dialogRightAssign" width="30%">
      <div>
        <el-tree
          default-expand-all
          :data="rightData"
          ref="tree"
          show-checkbox
          node-key="id"
          :default-checked-keys="checkedKeys"
          :props="defaultProps"
        ></el-tree>
        <!-- <el-tree
        :data="rightsData"
        ref="tree"
        default-expand-all
        :default-checked-keys="checkedKeys"
        show-checkbox
        node-key="id"
        :props="defaultProps">
      </el-tree> -->
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogRightAssign = false">取 消</el-button>
        <el-button type="primary" @click="handleRights">确 定</el-button>
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
    return {
      currentPage: 1,
      pagesize: 5,
      total: 0,
      dialogAddRole: false,
      dialogTitle: "",
      formLabelWidth: "120px",
      roleId: -1, //权限分配id
      form: {
        role_id: -1,
        name: "",
        display_name: ""
      },
      form2: {
        role: ""
      },
      dialogRoleAssign: false,
      dialogRightAssign: false,
      tableData: [],
      multipleSelection: [],
      rightData: [],
      defaultProps: {
        children: "children",
        label: "display_name"
      },
      checkedKeys: [],//默认选中的权限id
      currentRole: {},//记录点击权限按钮时的角色信息
    };
  },

  methods: {
    async getRoleList() {
      const res = await this.$http.get("v1/backend/auth/roles", {
        params: {
          page: this.currentPage,
          limit: this.pagesize
        }
      });
      console.log(res);
      if (res.data.code === 200) {
        this.tableData = res.data.data;
        this.total = res.data.data.total;
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
    },
    async getRigthList() {
      const res = await this.$http.get("v1/backend/auth/permissions");
      console.log(res);
    },
    async addRoleFn() {
      if (!this.form.role_id) {
        const res = await this.$http.post("v1/backend/auth/roles", {
          name: this.form.name,
          display_name: this.form.display_name
        });
        if (res.data.code === 200) {
          this.dialogAddRole = false;
          this.getRoleList();
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
      } else {
        console.log(this.form);
        const res = await this.$http.put("v1/backend/auth/roles", {
          name: this.form.name,
          display_name: this.form.display_name,
          role_id: this.form.role_id
        });
        console.log(res)
        if (res.data.code === 200) {
          this.dialogAddRole = false;
          this.getRoleList();
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
    async handleRights() {
      // 获取所有选中的权限id
      const nodes = this.$refs.tree.getCheckedNodes();
      console.log(nodes)
      let arr = [];
      nodes.forEach((item) => {
        // 选中的子权限id
        arr.push(item.id.toString());

        // 子权限的id 对应的父权限的id
        if (typeof (item.parent_id) === 'number') {
          arr.push(item.parent_id.toString());
        } else {
          arr = arr.concat(item.parent_id.split(','));
        }
        console.log(arr)
      });

      // 数组去重
      // const set = new Set(arr);

      // const ids = [...set].join(',');

      // const res = await this.$http.post(`/roles/${this.currentRole.id}/rights`, {
      //   rids: ids
      // });
      // if (res.data.meta.status === 200) {
      //   this.editRightsDialog = false;
      //   this.$message({
      //     type: 'success',
      //     message: '权限分配成功'
      //   });
      //   this.loadData();
      // } else {
      //   this.$message({
      //     type: 'error',
      //     message: '权限分配失败'
      //   });
      // }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagesize = val;
      this.getRoleList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getRoleList();
    },
    addRole() {
      this.dialogAddRole = true;
      this.dialogTitle = "添加角色";
      this.form = {
        name: "",
        diaplay_name: ""
      };
    },
    handleEdit(index, row) {
      console.log(index, row);
      this.dialogAddRole = true;
      this.dialogTitle = "编辑角色";
      this.form.name = row.name;
      this.form.display_name = row.display_name;
      this.form.role_id = row.id;
    },
    // async editRoleFn() {
    //   console.log('woshi')
    //   const res = await this.$http.put('auth/roles',{
    //     username: this.form.name,
    //     display_name: this.form.display_name
    //   })
    //   console.log(res)
    // },
    handleRole(index, row) {
      this.dialogRoleAssign = true;
    },
    async showRightsDialog(row) {
      console.log(row)
      this.dialogRightAssign = true;
      this.roleId = row.id;
      //获取当前角色具有的权限
      const result = await this.$http.get("v1/backend/auth/permissions",{
        params: {
          role_id: row.id
        }
      }).then(res => {
      })
      // function getCurrentRoleRights(rightsList) {
      //   const arr = []
      //   const fn = function (list) {
      //     list.forEach((item) => {
      //       if(!item.children) {
      //         arr.push(item.id)
      //       }else {
      //         fn(item.children)
      //       }
      //     })
      //   }
      //   fn(rightsList)
      //   return arr
      // }
      // this.currentRole = role
      const res = await this.$http.get("v1/backend/auth/permissions");
      console.log(res);
      if (res.data.code === 200) {
        this.rightData = res.data.data;
      }
      // this.checkedKeys = getCurrentRoleRights(role.children)
    },
    handleDelete(index, row) {
      this.form.role_id = row.id;
      console.log(this.form.role_id);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$http.delete("v1/backend/auth/roles", {
            params: {
              role_id: this.form.role_id
            }
          });
          if (res.data.code === 200) {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.getRoleList();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  mounted() {
    this.getRoleList();
    this.getRigthList();
  }
};
</script>

<style scoped>
#userList—main .bd {
  padding-left: 20px;
  padding-right: 20px;
}
#userList—main .bd p {
  margin: 0;
}
.el-pagination {
  margin-top: 20px;
}
#userList—main >>> .el-tree-node__label {
  margin-left: 10px;
}
#userList—main >>> .el-dialog .el-dialog__header {
  text-align: left;
}
#userList—main .bd >>> .el-button {
  margin-left: 0px;
  min-width: 30px;
}
</style>
