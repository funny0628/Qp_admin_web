<template>
  <div id="userList—main">
    <input-area>
      <!-- <el-button type="danger">删除</el-button> -->
      <el-button v-has="'add_role'" type="primary" @click="addRole">添加</el-button>
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
          <template slot-scope="scope">{{scope.row.create_time | dateFormat}}</template>
        </el-table-column>
        <el-table-column prop="update_time" label="更新时间" align="center">
          <template slot-scope="scope">{{scope.row.update_time | dateFormat}}</template>
        </el-table-column>
        <el-table-column prop="action" label="操作" align="center" width="200">
          <template slot-scope="scope">
            <el-button
              v-has="'modify_role'"
              size="mini"
              type="primary"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button size="mini" type="primary" @click="showRightsDialog(scope.row)">权限</el-button>
            <el-button
              v-has="'delete_role'"
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
  name: "role_manage",
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
      checkedKeys: [], //默认选中的权限id
      currentRole: {} //记录点击权限按钮时的角色信息
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
        this.total = res.data.total;
      } else {
        this.$message({
          type: "info",
          message: res.data.msg
        });
      }
    },
    async getRigthList() {
      const res = await this.$http.get("v1/backend/auth/permissions");
      console.log("getRightList" , res);
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
        const res = await this.$http.put("v1/backend/auth/roles", {
          name: this.form.name,
          display_name: this.form.display_name,
          role_id: this.form.role_id
        });
        console.log(res);
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
      const parentIdArr = this.$refs.tree.getHalfCheckedKeys();
      console.log(parentIdArr)
      const childrenIdArr = this.$refs.tree.getCheckedKeys();
      console.log(childrenIdArr)
      let arr = [...parentIdArr,...childrenIdArr]
      console.log(arr)
      // nodes.forEach(item => {
      //   // 选中的子权限id
      //   arrid.push(item.id.toString());
      //   arrList.push(item.display_name)
      // });
      const set = new Set(arr);
      const ids = [...set].join(",");
      console.log(ids);
      let data = {
        permission_ids: ids,
        role_id: this.currentRole.id
      };
      const res = await this.$http.post(
        "v1/backend/auth/permission-assignment",
        data
      );
      if (res.data.code === 200) {
        this.dialogRightAssign = false;
        this.$message({
          type: "success",
          message: res.data.msg
        });
      } else {
        this.$message({
          type: "error",
          message: res.data.msg
        });
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.getRoleList();
    },
    handleCurrentChange(val) {
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
      console.log(row);
      this.checkedKeys = [];
      this.dialogRightAssign = true;
      this.currentRole = row;
      this.roleId = row.id;
      const res = await this.$http.get("v1/backend/auth/permissions");
      console.log(res);
      if (res.data.code === 200) {
        this.rightData = res.data.data;
      }
      //获取当前角色具有的权限
      function getCurrentRoleRights(rightsList) {
        const arr = [];
        const fn = function(list) {
          if (list.length === 0 || undefined) {
            return undefined;
          }
          list.forEach(item => {
            if (!item.children) {
              arr.push(item.id);
            } else {
              fn(item.children);
            }
          });
        };
        fn(rightsList);
        console.log(arr);
        return arr;
      }
      function getR(r) {
        let arr = getCurrentRoleRights(r);
        let dict = {};
        for (let i = 0; i < r.length; i ++) {
          let item = r[i];
          if (item.parent_id === 0) {
            dict[item.id] = []
          } else {
            if (!dict[item.parent_id]) dict[item.parent_id] = []
            dict[item.parent_id].push(item.id)
          }
        }
        for (let a = arr.length - 1; a >= 0; a--) {
          if (dict[arr[a]]) {
            arr.splice(arr.indexOf(arr[a]), 1)
          } 
        }
        return arr
      }
      const result = await this.$http
        .get("v1/backend/auth/permission-assignment", {
          params: {
            role_id: row.id
          }
        })
        .then(res => {
          console.log(res)
          if (res.data.code === 200) {
            this.check_strictly = false;
            getR(res.data.data)
            this.checkedKeys = getR(res.data.data);
            // this.getRoleList()
          }
        });
    },
    handleDelete(index, row) {
      this.form.role_id = row.id;
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          // let data = {
          //   role_id: this.form.role_id
          // }
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
