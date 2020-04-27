<template>
  <div
    id="activityList"
    v-loading="loading"
    element-loading-text="正在上传中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(255, 255, 255, 0.6)"
  >
    <!-- 头部 -->
    <div class="title">
      <div class="botton">
        <el-button type="danger" @click="del">删除</el-button>
        <el-button type="primary" @click="add">添加</el-button>
        <el-button type="primary" @click="send">发送到服务器配置</el-button>
        <el-button type="primary" @click="search">搜索</el-button>
      </div>
      <el-input
        style="margin-top:10px;width:200px;"
        v-model="searchinput"
        placeholder="请输入活动名称"
      ></el-input>
    </div>
    <!-- 表格 -->
    <div>
      <el-table
        border
        highlight-current-row
        :default-sort="{ prop: 'ID', order: orderlist[0] }"
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" align="center"> </el-table-column>
        <el-table-column sortable prop="id" label="ID" align="center">
        </el-table-column>

        <el-table-column
          prop="act_name"
          label="活动名称"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="act_type"
          label="活动类型"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="act_status"
          label="活动状态"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="start_time"
          label="活动开始时间"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>

        <el-table-column
          prop="end_time"
          label="活结束时间"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="auth"
          label="操作者"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="操作时间"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>

        <el-table-column
          prop="change"
          label=""
          align="center"
          show-overflow-tooltip
          width="200px"
        >
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        v-if="total > 5"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 15, 20]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
    <!-- form表单 -->
    <div class="dialog">
      <el-dialog
        :title="title"
        :visible.sync="visible"
        :destroy-on-close="true"
        width="60%"
      >
        <el-form ref="form" :rules="rules" :model="form" label-width="120px">
          <el-form-item label="活动类型" prop="act_type">
            <el-select v-model="form.act_type" @change="Change">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="活动名称" prop="act_name">
            <el-input
              style="width:220px"
              v-model="form.act_name"
              placeholder="活动名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="活动状态" prop="act_status">
            <el-select v-model="form.act_status">
              <el-option label="待上线" :value="1"></el-option>
              <el-option label="生效中" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="活动时间" prop="start_time">
            <el-date-picker
              v-model="form.start_time"
              type="date"
              placeholder="请输入开始时间"
              format="yyyy-MM-dd HH:mm:ss"
            >
            </el-date-picker>
            -
            <el-date-picker
              v-model="form.end_time"
              type="date"
              placeholder="请输入结束时间"
              format="yyyy-MM-dd HH:mm:ss"
            >
            </el-date-picker>
          </el-form-item>

          <h2>{{ titleConfig }}-(额外配置)</h2>
          <!-- type_id = 1 -->
          <div v-if="form.act_type === 101">
            背景图片:
            <el-upload
              class="avatar-uploader"
              action=""
              :show-file-list="false"
              :http-request="upLoad101"
              :before-upload="beforeAvatarUpload101"
              :limit="1"
            >
              <img
                v-if="form.act_info.ac_content"
                :src="form.act_info.ac_content.bg_url"
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <!-- type_id = 2 -->
          <div v-if="form.act_type === 102">
            <p>
              跳转地址:
              <el-select
               v-if="form.act_info.ac_content"
                v-model="form.act_info.ac_content.jump_position"
                placeholder="请选择"
              >
                <el-option label="VIP" value="1001"></el-option>
                <el-option label="全民代理" value="1002"></el-option>
                <el-option label="客服" value="1003"></el-option>
                <el-option label="兑换" value="1004"></el-option>
                <el-option label="充值" value="1005"></el-option>
                <el-option label="活动" value="1006"></el-option>
                <el-option label="绑定手机" value="1007"></el-option>
              </el-select>
              按钮位置:
              <el-select
               v-if="form.act_info.ac_content"
                v-model="form.act_info.ac_content.jump_bt_position"
                placeholder="请选择"
              >
                <el-option label="左下" value="1"></el-option>
                <el-option label="中下" value="2"></el-option>
                <el-option label="右下" value="3"></el-option>
              </el-select>
            </p>
            <p>
              活动图片:
              <el-upload
                class="avatar-uploader"
                action=""
                :show-file-list="false"
                :http-request="upLoad"
                :before-upload="beforeAvatarUpload"
                :limit="1"
              >
                <img
                  v-if="form.act_info.ac_content"
                  :src="form.act_info.ac_content.bg_url"
                  class="avatar"
                />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </p>
            <p>
              按钮图片:
              <el-upload
                class="avatar-uploader"
                action=""
                :show-file-list="false"
                :http-request="upLoad"
                :before-upload="beforeAvatarUpload"
                :limit="1"
              >
                <img
                  v-if="form.act_info.ac_content"
                  :src="form.act_info.ac_content.jump_bt_url"
                  class="avatar"
                />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </p>
          </div>
          <!-- type_id = 3 -->
          <div v-if="form.act_type === 103">
            <p>
              按钮位置:
              <el-select
               v-if="form.act_info.ac_content"
                v-model="form.act_info.ac_content.jump_bt_position"
                placeholder="请选择"
              >
                <el-option label="左下" value="1"></el-option>
                <el-option label="中下" value="2"></el-option>
                <el-option label="右下" value="3"></el-option>
              </el-select>
              URL:
              <el-input
               v-if="form.act_info.ac_content"
                style="margin-top:10px;width:200px;"
                v-model="form.act_info.ac_content.web_url"
              ></el-input>
            </p>
            <p>
              活动图片:
              <el-upload
                class="avatar-uploader"
                action=""
                :show-file-list="false"
                :http-request="upLoad"
                :before-upload="beforeAvatarUpload"
                :limit="1"
              >
                <img
                  v-if="form.act_info.ac_content"
                  :src="form.act_info.ac_content.bg_url"
                  class="avatar"
                />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </p>
            <p>
              按钮图片:
              <el-upload
                class="avatar-uploader"
                action=""
                :show-file-list="false"
                :http-request="upLoad"
                :before-upload="beforeAvatarUpload"
                :limit="1"
              >
                <img
                  v-if="form.act_info.ac_content"
                  :src="form.act_info.ac_content.jump_bt_url"
                  class="avatar"
                />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </p>
          </div>
          <!-- type_id = 4 -->
          <div v-if="form.act_type === 104">
            <div class="topTitle">
              活动介绍:
              <el-input
                style="width:200px;"
                 v-if="form.act_info.ac_content"
                v-model="form.act_info.ac_content.ac_desc"
                placeholder="活动介绍"
              ></el-input>
            </div>
            <p>
              任务:
              <el-button type="primary" @click="addConent">添加</el-button>
            </p>
            <div v-if="form.act_info.ac_content">
            <div
              v-for="(itemConent, indexConent) in form.act_info.ac_content.task_list"
              class="item"
            >
              <p style="margin-top:10px;">
                任务介绍:
                <el-input
                  style="width:200px;"
                  v-model="itemConent.task_desc"
                  placeholder="任务介绍"
                ></el-input>
              </p>
              <p style="margin-top:10px;">
                任务进度:
                <el-input
                  style="width:200px;"
                  v-model="itemConent.task_target"
                  placeholder="(多个以;分号隔开)"
                ></el-input
                >&nbsp;&nbsp;&nbsp;任务奖励(分):
                <el-input
                  style="width:200px;"
                  v-model="itemConent.task_awards"
                  placeholder="(多个以;分号隔开)"
                ></el-input
                >&nbsp;&nbsp;&nbsp;类型:
                <el-select v-model="itemConent.task_type">
                  <el-option label="在线时长" value="1"></el-option>
                  <el-option label="玩牌局数" value="2"></el-option>
                  <el-option label="玩牌局数" value="3"></el-option>
                </el-select>
                &nbsp;&nbsp;<el-button
                  type="danger"
                  @click="delConent(indexConent)"
                  >删除</el-button
                >
              </p>
            </div>
            </div>
          </div>
          <!-- type_id = 5 -->
          <div v-if="form.act_type === 105">
            <p>
              背景图片:
              <el-upload
                class="avatar-uploader"
                action=""
                :show-file-list="false"
                :http-request="upLoad"
                :before-upload="beforeAvatarUpload"
                :limit="1"
              >
                <img
                  v-if="form.act_info.ac_content"
                  :src="form.act_info.ac_content.bg_url"
                  class="avatar"
                />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </p>
            <p>
              描述:
              <el-input
                style="width:280px;"
                 v-if="form.act_info.ac_content"
                v-model="form.act_info.ac_content.ac_desc"
                placeholder="描述"
              ></el-input>
            </p>
            <p>
              累积金币:
              <el-input
                style="width:200px;"
                 v-if="form.act_info.ac_content"
                v-model="form.act_info.ac_content.earn_coins"
                placeholder="累积金币"
              ></el-input>
            </p>
            <p>
              首充金额:
              <el-input
                style="width:200px;"
                 v-if="form.act_info.ac_content"
                v-model="form.act_info.ac_content.charge_target"
                placeholder="首充金额"
              ></el-input>
            </p>
            <p>
              返回金币:
              <el-input
                style="width:200px;"
                 v-if="form.act_info.ac_content"
                v-model="form.act_info.ac_content.back_coins"
                placeholder="返回金币"
              ></el-input>
            </p>
          </div>
          <!-- type_id = 6 -->
          <div v-if="form.act_type === 106">
            <div class="topTitle">
              <p>
                弹窗宣传图:
                <el-upload
                  class="avatar-uploader"
                  action=""
                  :show-file-list="false"
                  :http-request="upLoad"
                  :before-upload="beforeAvatarUpload"
                  :limit="1"
                >
                  <img
                    v-if="form.act_info.ac_content"
                    :src="form.act_info.ac_content.advertise_url"
                    class="avatar"
                  />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </p>
              <p>
                宣传结束时间:
                <el-date-picker
                  v-if="form.act_info.ac_content"
                  v-model="form.act_info.ac_content.advertise_end_time"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy-MM-dd HH:mm:ss"
                  value-format="yyyy-MM-dd HH:mm:ss"
                >
                </el-date-picker>
              </p>
            </div>

            <div v-if="form.act_info.ac_content" class="topTitle" style="border-top:none">
              <p>
                奖励:
                <el-button type="primary" @click="addAward">添加</el-button>
              </p>
              <div
                
                v-for="(itemAward, indexAward) in form.act_info.ac_content.award_list"
                style="margin-top:10px"
              >
                最小值:
                <el-input
                  style="width:200px;"
                  v-model="itemAward.rank_min"
                  placeholder="最小值"
                ></el-input>
                最大值:
                <el-input
                  style="width:200px;"
                  v-model="itemAward.rank_max"
                  placeholder="最大值"
                ></el-input>
                奖励:
                <el-input
                  style="width:200px;"
                  v-model="itemAward.award_coins"
                  placeholder="奖励"
                ></el-input>

                <el-button type="danger" @click="delAward(indexAward)"
                  >删除</el-button
                >
              </div>
            </div>

            <p>
              机器人刷新数值时间(秒):
              <el-input
                v-if="form.act_info.ac_content"
                style="width:200px;"
                v-model="form.act_info.ac_content.robot_update_time"
                placeholder="机器人刷新数值时间(秒)"
              ></el-input>
            </p>
            <p>
              机器人刷新数值概率(百分比):
              <el-input
                v-if="form.act_info.ac_content"
                style="width:200px;"
                v-model="form.act_info.ac_content.robot_update_rate"
                placeholder="机器人刷新数值概率(百分比)"
              ></el-input>
            </p>
            <p>
              机器人刷新数值范围:
              <el-input
                v-if="form.act_info.ac_content"
                style="width:200px;"
                v-model="form.act_info.ac_content.robot_update_range[0]"
                placeholder="机器人刷新范围最小值"
              ></el-input
              >&nbsp;&nbsp;&nbsp;
              <el-input
                v-if="form.act_info.ac_content"
                style="width:200px;"
                v-model="form.act_info.ac_content.robot_update_range[1]"
                placeholder="机器人刷新范围最大值"
              ></el-input>
            </p>
          </div>
          <!-- type_id = 7 -->
          <div v-if="form.act_type === 107">
            <p>
              按钮位置:
              <el-select
                v-if="form.act_info.ac_content"
                v-model="form.act_info.ac_content.jump_bt_position"
                placeholder="请选择"
              >
                <el-option label="左下" value="1"></el-option>
                <el-option label="中下" value="2"></el-option>
                <el-option label="右下" value="3"></el-option>
              </el-select>
            </p>
            <p>
              描述:
              <el-input
                style="width:200px;"
                  v-if="form.act_info.ac_content"
                v-model="form.act_info.ac_content.ac_desc"
                placeholder="描述"
              ></el-input>
            </p>
            <p>
              活动图片:
              <el-upload
                class="avatar-uploader"
                action=""
                :show-file-list="false"
                :http-request="upLoad"
                :before-upload="beforeAvatarUpload"
                :limit="1"
              >
                <img
                  v-if="form.act_info.ac_content"
                  :src="form.act_info.ac_content.bg_url"
                  class="avatar"
                />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </p>
            <p>
              按钮图片:
              <el-upload
                class="avatar-uploader"
                action=""
                :show-file-list="false"
                :http-request="upLoad"
                :before-upload="beforeAvatarUpload"
                :limit="1"
              >
                <img
                  v-if="form.act_info.ac_content"
                  :src="form.act_info.ac_content.jump_bt_url"
                  class="avatar"
                />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </p>
          </div>
        </el-form>
        <div style="margin-top:20px" slot="footer" class="dialog-footer">
          <el-button type="primary" @click="onSubmit('form',title)">保 存</el-button>
          <el-button type="primary" @click="back()">返 回</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import DeepData from "../../../assets/js/formate.js";
export default {
  data() {
    return {
      searchinput: "",
      orderlist: ["ascending", "descending"],
      tableData: [],
      total: 0,
      rules: {
        act_name: [
          { required: true, message: "必填项不可以为空", trigger: "blur" }
        ],
        type_id: [
          { required: true, message: "必填项不可以为空", trigger: "blur" }
        ],
        status_id: [
          { required: true, message: "必填项不可以为空", trigger: "blur" }
        ],
        act_info: [
          { required: true, message: "必填项不可以为空", trigger: "blur" }
        ],
        start_time: [
          { required: true, message: "必填项不可以为空", trigger: "blur" }
        ],
        end_time: [
          { required: true, message: "必填项不可以为空", trigger: "blur" }
        ]
      },
      form: {
        id: "",
        act_name: "",
        act_type: 101,
        act_status: 1,
        act_info: {},
        start_time: "",
        end_time: "",
        auth: "root",
        act_info: {
          ac_content: {
            //type_id = 1
            bg_url: "ddd",
            //type_id = 2
            jump_position: "2",
            jump_bt_url: "3",
            jump_bt_position: "4",
            //type_id = 3
            web_url: "5",
            //type_id = 4
            ac_desc: "6",
            task_list: [
              {
                task_type: "7",
                task_desc: "8",
                task_target: "9",
                task_awards: "10"
              }
            ],
            //type_id = 5
            earn_coins: "12",
            charge_target: "13",
            back_coins: "14",
            //type_id = 6
            advertise_url: "15",
            advertise_end_time: "2019-08-08 23:59:59 ",
            award_list: [
              {
                rank_min: "17",
                rank_max: "18",
                award_coins: "19"
              }
            ],
            robot_update_time: "20",
            robot_update_rate: "21",
            robot_update_range: ["22", "23"]
          }
        }
      },
      currentPage: 1,
      limit: 10,
      visible: false,
      title: "添加系统公告",
      selectList: [],
      loading: false,
      titleConfig: "普通",
      servebg_url:'',
    
      titleList: {
        101: "普通",
        102: "跳转",
        103: "跳转页面",
        104: "任务",
        105: "首冲活动",
        106: "排行榜活动",
        107: "绑定手机活动"
      },
      options: [
        {
          value: 101,
          label: "普通"
        },
        {
          value: 102,
          label: "跳转"
        },
        {
          value: 103,
          label: "跳转页面"
        },
        {
          value: 104,
          label: "任务"
        },
        {
          value: 105,
          label: "首冲活动"
        },
        {
          value: 106,
          label: "排行榜活动"
        },
        {
          value: 107,
          label: "绑定手机活动"
        }
      ],
    };
  },
  created() {
    this.initdata({
      page: this.currentPage,
      limit: this.limit,
      title: this.searchinput
    });
  },
  methods: {
    //多选删除
    del() {
      //勾选需要删除的项目批量删除
      if (this.selectList.length != 0) {
        this.$confirm("确认删除吗?", "信息", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(async () => {
            let str = this.selectList.join();
            // console.log(str);
            let { data } = await this.$http.HallFunConfig.DeleteActivityList({
              id_list: `(${str})`
            });
            console.log(data);
            if (data.code === 1 && data.msg === "ok") {
              this.initdata({
                page: this.currentPage,
                limit: this.limit,
                title: this.searchinput
              });
            }

            this.$message({
              type: "success",
              message: "删除成功!"
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      } else {
        this.$message("请选择需要删除的数据");
      }
    },

    //添加
    add() {
      this.editForm("添加活动", true, DeepData(this.form), "普通");
    },

    //发送到服务器配置
    send() {
      this.$confirm("确认发送吗?", "信息", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(async () => {
        this.loading = true;
        let { data } = await this.$http.HallFunConfig.PostTableConfig({
          type_id: 7
        });
        // console.log(data);
        if (data.code === 1 && data.data) {
          this.loading = false;
          this.$message({
            type: "success",
            message: data.msg
          });
        }
      });
    },

    //搜索
    search() {
      if (this.searchinput === "") {
        this.$message({
          type: "warning",
          message: "请输入你要搜索的活动名称!"
        });
      }
      this.currentPage = 1;
      this.limit = 10;
      this.initdata({
        page: this.currentPage,
        limit: this.limit,
        title: this.searchinput
      });
    },

    //表格多选
    handleSelectionChange(sel) {
      let idList = sel.map(item => item.id);
      this.selectList = idList;
    },

    //页容量发生变化
    handleSizeChange(num) {
      this.currentPage = 1;
      this.limit = num;
      this.initdata({
        page: this.currentPage,
        limit: this.limit,
        title: this.searchinput
      });
    },

    //页码变化
    handleCurrentChange(pagenum) {
      this.currentPage = pagenum;
      this.initdata({
        page: this.currentPage,
        limit: this.limit,
        title: this.searchinput
      });
    },

    upLoad101(file) {
       console.log(file);
      
      const formData = new FormData();
      formData.append("filename", file.file);
      formData.append("types", 1);
      this.$http.post("v1/backend/upload", formData).then(data => {
        console.log(data);
        if (data.data.code === 1 && data.data.msg === "ok") {
          this.servebg_url = data.data.path;
        }
      });
    },
    beforeAvatarUpload101(file) {
       if (file) {
        this.form.act_info.ac_content.bg_url = URL.createObjectURL(file);
      }
     
    },
    upLoad(){},
    beforeAvatarUpload(){},
    Change(val) {
      this.options.forEach(item => {
        if (val === item.value) {
          this.titleConfig = this.titleList[val];
        }
      });
    },
    //type_id = 4的添加
    addConent() {
      this.form.act_info.ac_content.task_list.push({});
    },
    //type_id = 4的删除
    delConent(index) {
      this.$confirm("确认删除吗?", "信息", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(async () => {
          this.form.act_info.ac_content.task_list.splice(index, 1);

          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    //type_id = 6的添加
    addAward() {
      this.form.act_info.ac_content.award_list.push({});
    },
    //type_id = 6的删除
    delAward(index) {
      this.$confirm("确认删除吗?", "信息", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(async () => {
          this.form.act_info.ac_content.award_list.splice(index, 1);

          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    //表格编辑
    handleEdit(row) {
      console.log(row);
      let editForm = DeepData(row);
      this.options.forEach(item => {
        if (item.label === editForm.act_type) {
          console.log(editForm.act_type);

          this.titleConfig = editForm.act_type;
          editForm.act_type = item.value;
        }
        editForm.act_status = editForm.act_status === "待上线" ? 1 : 2;
      });

      this.editForm("更新活动", true, editForm, this.titleConfig);
    },

    //表格删除
    handleDelete(x, row) {
      console.log(x, row.id);

      this.$confirm("确认删除吗?", "信息", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(async () => {
          let { data } = await this.$http.HallFunConfig.DeleteActivityList({
            id: row.id
          });
          if (data.code === 1 && data.msg === "ok") {
            this.initdata({
              page: this.currentPage,
              limit: this.limit,
              title: this.searchinput
            });
          }
          console.log(data);

          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    //表单提交
    onSubmit(form,type) {
      //表单验证
      this.$refs[form].validate(async valid => {
        if (valid) {
          //1.将form数据传递到paylist,新增到table中先显示一个dom
          console.log(this.form);
           this.form.act_info.ac_content.bg_url = this.servebg_url;
          this.form.act_info = JSON.stringify(this.form.act_info);
          console.log(this.form);
          this.form.start_time = this.data(this.form.start_time);
          this.form.end_time = this.data(this.form.end_time);
          console.log(this.form);
          let resData = {
            act_name: this.form.act_name,
            act_type: this.form.act_type,
            act_status: this.form.act_status,
            act_info: this.form.act_info,
            start_time: this.form.start_time,
            end_time: this.form.end_time
          };
          console.log(resData);

          let { data } = await this.$http.HallFunConfig.PostActivityList(
            resData
          );
          console.log(data);

           this.initdata({
      page: this.currentPage,
      limit: this.limit,
      title: this.searchinput
    });

          //2.发送请求追加数据到后台-------------------------------------------------------------

          // console.log("发送请求");

          //3.关闭新增的弹框
          this.editForm("添加活动", false, DeepData(this.form), "普通");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    //表单返回
    back() {
      this.editForm("添加活动", false, DeepData(this.form), "普通");
    },

    editForm(title, visible, form, titleConfig) {
      this.title = title;
      this.visible = visible;
      this.form = form;
      this.titleConfig = titleConfig;
    },

    formateData(res) {
      res.forEach(item => {
        item.act_status = item.act_status === 1 ? "待上线" : "生效中";
        item.act_type = Object.keys(this.titleList).includes(item.act_type + "")
          ? this.titleList[item.act_type]
          : "";
        item.act_info = JSON.parse(item.act_info);
      });
      return res;
    },

    data(time) {
      let long1 = Date.parse(time);
      let long2 = new Date(long1).getTime();
      return long2;
    },

    async initdata(params) {
      let { data } = await this.$http.HallFunConfig.GetActivityList(params);
      console.log(data);
      let localdata = this.formateData(DeepData(data.data));
      this.tableData = localdata;
      this.total = data.total;
      console.log(localdata);
      // console.log(data);
    }
  }
};
</script>

<style lang="less" scoped>
#activityList {
  background-color: #f2f2f2;
  .title {
    padding: 20px 10px;
    box-sizing: border-box;
    border: 1px solid #eee;
  }
  .table {
    margin-top: 10px;
  }
  .dialog {
    p {
      margin-top: 20px;
    }
    .topTitle {
      padding: 20px;
      padding-left: 0;
      padding-right: 0;
      margin: 20px;
      margin-left: 0;
      margin-right: 0;
      border: 1px solid orange;
      border-left: none;
      border-right: none;
    }
    .item {
      margin: 20px;
      margin-left: 0px;
      margin-right: 0px;
      border-bottom: 1px solid #ccc;
    }
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
      border: 1px dashed #ccc;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
      border: 1px dashed #ccc;
    }
  }
  .upload-demo {
    margin-top: 10px;
  }
}
</style>
