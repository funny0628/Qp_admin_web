<template>
  <div id="GameSortConf-main">
    <input-area>
      <div>
        <!-- <el-button type="danger">删除</el-button> -->
        <el-button type="primary" @click="openAddDialog">添加</el-button>
        <el-button type="primary" @click="sendDataToServer">发送到服务端配置</el-button>
      </div>
      <el-select v-model="searchChannel" placeholder="请选择渠道" style="margin-top:10px;">
        <el-option
          v-for="(item) in allChannelOpts"
          :key="item.id"
          :label="item.channel_name"
          :value="item.channel_name"
        ></el-option>
      </el-select>
    </input-area>
    <div class="bd">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="ID" prop="id" align="center" width="100"></el-table-column>
        <el-table-column label="渠道名称" prop="channel_name" align="center" width="100"></el-table-column>
        <el-table-column label="渠道KEY" prop="channel_code" align="center" width="100"></el-table-column>
        <el-table-column
          v-for="(value, name) in gameList"
          :key="name"
          :label="`游戏${name}`"
          :prop="`game_${name}`"
          align="center"
          width="120"
        >
          <template slot-scope="scope">
            <span v-if="scope.row[`game_${name}`] == 0">留空</span>
            <span v-if="scope.row[`game_${name}`] == 2">抢庄牛牛</span>
            <span v-if="scope.row[`game_${name}`] == 3">斗地主</span>
            <span v-if="scope.row[`game_${name}`] == 6">捕鱼</span>
            <span v-if="scope.row[`game_${name}`] == 2000">红黑大战</span>
            <span v-if="scope.row[`game_${name}`] == 2001">三倍场百人牛牛</span>
            <span v-if="scope.row[`game_${name}`] == 2002">十倍场百人牛牛</span>
            <span v-if="scope.row[`game_${name}`] == 2003">龙虎斗</span>
            <span v-if="scope.row[`game_${name}`] == 2004">水果机</span>
            <span v-if="scope.row[`game_${name}`] == 2005">奔驰宝马</span>
            <span v-if="scope.row[`game_${name}`] == 2006">百家乐</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" prop="created_at" align="center" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.created_at | dateFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="150">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <!-- 游戏排序配置 -->
      <el-dialog title="游戏排序配置" :visible.sync="dialogFormVisible">
        <el-form :model="form" label-position="top">
          <el-form-item label="渠道(可多选)">
            <el-checkbox-group v-model="form.checkList" :max="1">
              <el-checkbox
                v-for="(item,index) in channelOpts"
                :key="index"
                :label="item.channel_name"
                :value="item.channel_code"
              >{{item.channel_name}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="游戏1">
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">游戏名称</el-col>
              <el-col :span="20">
                <el-select v-model="form.game_1_obj.game_des">
                  <el-option label="留空" value="0"></el-option>
                  <el-option
                    v-for="(item,index) in gameOpts"
                    :key="index"
                    :label="item.game_name"
                    :value="item.game_id"
                  ></el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">角标</el-col>
              <el-col :span="20">
                <el-select v-model="form.game_1_obj.corner_remark">
                  <el-option label="无" value="0"></el-option>
                  <el-option label="推荐" value="1"></el-option>
                  <el-option label="热门" value="2"></el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">状态</el-col>
              <el-col :span="20">
                <el-select v-model="form.game_1_obj.status">
                  <el-option label="正常" value="0"></el-option>
                  <el-option label="敬请期待" value="1"></el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">是否强引导</el-col>
              <el-col :span="20">
                <el-select v-model="form.game_1_obj.leader">
                  <el-option label="是" value="2"></el-option>
                  <el-option label="否" value="1"></el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="游戏2">
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">游戏名称</el-col>
              <el-col :span="20">
                <el-select v-model="form.game_2_obj.game_des">
                  <el-option label="留空" value="0"></el-option>
                  <el-option
                    v-for="(item,index) in gameOpts"
                    :key="index"
                    :label="item.game_name"
                    :value="item.game_id"
                  ></el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">角标</el-col>
              <el-col :span="20">
                <el-select v-model="form.game_2_obj.corner_remark">
                  <el-option label="无" value="0"></el-option>
                  <el-option label="推荐" value="1"></el-option>
                  <el-option label="热门" value="2"></el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">状态</el-col>
              <el-col :span="20">
                <el-select v-model="form.game_2_obj.status">
                  <el-option label="正常" value="0"></el-option>
                  <el-option label="敬请期待" value="1"></el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">是否强引导</el-col>
              <el-col :span="20">
                <el-select v-model="form.game_2_obj.leader">
                  <el-option label="是" value="2"></el-option>
                  <el-option label="否" value="1"></el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="游戏3">
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">游戏名称</el-col>
              <el-col :span="20">
                <el-select v-model="form.game_3_obj.game_des">
                  <el-option label="留空" value="0"></el-option>
                  <el-option
                    v-for="(item,index) in gameOpts"
                    :key="index"
                    :label="item.game_name"
                    :value="item.game_id"
                  ></el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">角标</el-col>
              <el-col :span="20">
                <el-select v-model="form.game_3_obj.corner_remark">
                  <el-option label="无" value="0"></el-option>
                  <el-option label="推荐" value="1"></el-option>
                  <el-option label="热门" value="2"></el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">状态</el-col>
              <el-col :span="20">
                <el-select v-model="form.game_3_obj.status">
                  <el-option label="正常" value="0"></el-option>
                  <el-option label="敬请期待" value="1"></el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">是否强引导</el-col>
              <el-col :span="20">
                <el-select v-model="form.game_3_obj.leader">
                  <el-option label="是" value="2"></el-option>
                  <el-option label="否" value="1"></el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="游戏4">
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">游戏名称</el-col>
              <el-col :span="20">
                <el-select v-model="form.game_4_obj.game_des">
                  <el-option label="留空" value="0"></el-option>
                  <el-option
                    v-for="(item,index) in gameOpts"
                    :key="index"
                    :label="item.game_name"
                    :value="item.game_id"
                  ></el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">角标</el-col>
              <el-col :span="20">
                <el-select v-model="form.game_4_obj.corner_remark">
                  <el-option label="无" value="0"></el-option>
                  <el-option label="推荐" value="1"></el-option>
                  <el-option label="热门" value="2"></el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">状态</el-col>
              <el-col :span="20">
                <el-select v-model="form.game_4_obj.status">
                  <el-option label="正常" value="0"></el-option>
                  <el-option label="敬请期待" value="1"></el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">是否强引导</el-col>
              <el-col :span="20">
                <el-select v-model="form.game_4_obj.leader">
                  <el-option label="是" value="2"></el-option>
                  <el-option label="否" value="1"></el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="游戏5">
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">游戏名称</el-col>
              <el-col :span="20">
                <el-select v-model="form.game_5_obj.game_des">
                  <el-option label="留空" value="0"></el-option>
                  <el-option
                    v-for="(item,index) in gameOpts"
                    :key="index"
                    :label="item.game_name"
                    :value="item.game_id"
                  ></el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">角标</el-col>
              <el-col :span="20">
                <el-select v-model="form.game_5_obj.corner_remark">
                  <el-option label="无" value="0"></el-option>
                  <el-option label="推荐" value="1"></el-option>
                  <el-option label="热门" value="2"></el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">状态</el-col>
              <el-col :span="20">
                <el-select v-model="form.game_5_obj.status">
                  <el-option label="正常" value="0"></el-option>
                  <el-option label="敬请期待" value="1"></el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">是否强引导</el-col>
              <el-col :span="20">
                <el-select v-model="form.game_5_obj.leader">
                  <el-option label="是" value="2"></el-option>
                  <el-option label="否" value="1"></el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="游戏6">
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">游戏名称</el-col>
              <el-col :span="20">
                <el-select v-model="form.game_6_obj.game_des">
                  <el-option label="留空" value="0"></el-option>
                  <el-option
                    v-for="(item,index) in gameOpts"
                    :key="index"
                    :label="item.game_name"
                    :value="item.game_id"
                  ></el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">角标</el-col>
              <el-col :span="20">
                <el-select v-model="form.game_6_obj.corner_remark">
                  <el-option label="无" value="0"></el-option>
                  <el-option label="推荐" value="1"></el-option>
                  <el-option label="热门" value="2"></el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">状态</el-col>
              <el-col :span="20">
                <el-select v-model="form.game_6_obj.status">
                  <el-option label="正常" value="0"></el-option>
                  <el-option label="敬请期待" value="1"></el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">是否强引导</el-col>
              <el-col :span="20">
                <el-select v-model="form.game_6_obj.leader">
                  <el-option label="是" value="2"></el-option>
                  <el-option label="否" value="1"></el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="游戏7">
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">游戏名称</el-col>
              <el-col :span="20">
                <el-select v-model="form.game_7_obj.game_des">
                  <el-option label="留空" value="0"></el-option>
                  <el-option
                    v-for="(item,index) in gameOpts"
                    :key="index"
                    :label="item.game_name"
                    :value="item.game_id"
                  ></el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">角标</el-col>
              <el-col :span="20">
                <el-select v-model="form.game_7_obj.corner_remark">
                  <el-option label="无" value="0"></el-option>
                  <el-option label="推荐" value="1"></el-option>
                  <el-option label="热门" value="2"></el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">状态</el-col>
              <el-col :span="20">
                <el-select v-model="form.game_7_obj.status">
                  <el-option label="正常" value="0"></el-option>
                  <el-option label="敬请期待" value="1"></el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">是否强引导</el-col>
              <el-col :span="20">
                <el-select v-model="form.game_7_obj.leader">
                  <el-option label="是" value="2"></el-option>
                  <el-option label="否" value="1"></el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="游戏8">
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">游戏名称</el-col>
              <el-col :span="20">
                <el-select v-model="form.game_8_obj.game_des">
                  <el-option label="留空" value="0"></el-option>
                  <el-option
                    v-for="(item,index) in gameOpts"
                    :key="index"
                    :label="item.game_name"
                    :value="item.game_id"
                  ></el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">角标</el-col>
              <el-col :span="20">
                <el-select v-model="form.game_8_obj.corner_remark">
                  <el-option label="无" value="0"></el-option>
                  <el-option label="推荐" value="1"></el-option>
                  <el-option label="热门" value="2"></el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">状态</el-col>
              <el-col :span="20">
                <el-select v-model="form.game_8_obj.status">
                  <el-option label="正常" value="0"></el-option>
                  <el-option label="敬请期待" value="1"></el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">是否强引导</el-col>
              <el-col :span="20">
                <el-select v-model="form.game_8_obj.leader">
                  <el-option label="是" value="2"></el-option>
                  <el-option label="否" value="1"></el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="游戏9">
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">游戏名称</el-col>
              <el-col :span="20">
                <el-select v-model="form.game_9_obj.game_des">
                  <el-option label="留空" value="0"></el-option>
                  <el-option
                    v-for="(item,index) in gameOpts"
                    :key="index"
                    :label="item.game_name"
                    :value="item.game_id"
                  ></el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">角标</el-col>
              <el-col :span="20">
                <el-select v-model="form.game_9_obj.corner_remark">
                  <el-option label="无" value="0"></el-option>
                  <el-option label="推荐" value="1"></el-option>
                  <el-option label="热门" value="2"></el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">状态</el-col>
              <el-col :span="20">
                <el-select v-model="form.game_9_obj.status">
                  <el-option label="正常" value="0"></el-option>
                  <el-option label="敬请期待" value="1"></el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">是否强引导</el-col>
              <el-col :span="20">
                <el-select v-model="form.game_9_obj.leader">
                  <el-option label="是" value="2"></el-option>
                  <el-option label="否" value="1"></el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="游戏10">
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">游戏名称</el-col>
              <el-col :span="20">
                <el-select v-model="form.game_10_obj.game_des">
                  <el-option label="留空" value="0"></el-option>
                  <el-option
                    v-for="(item,index) in gameOpts"
                    :key="index"
                    :label="item.game_name"
                    :value="item.game_id"
                  ></el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">角标</el-col>
              <el-col :span="20">
                <el-select v-model="form.game_10_obj.corner_remark">
                  <el-option label="无" value="0"></el-option>
                  <el-option label="推荐" value="1"></el-option>
                  <el-option label="热门" value="2"></el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">状态</el-col>
              <el-col :span="20">
                <el-select v-model="form.game_10_obj.status">
                  <el-option label="正常" value="0"></el-option>
                  <el-option label="敬请期待" value="1"></el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">是否强引导</el-col>
              <el-col :span="20">
                <el-select v-model="form.game_10_obj.leader">
                  <el-option label="是" value="2"></el-option>
                  <el-option label="否" value="1"></el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
          <!-- <el-form-item label="游戏11">
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">游戏名称</el-col>
              <el-col :span="20">
                <el-select v-model="form.game_11" placeholder="请选择活动区域">
                  <el-option
                    v-for="(item,index) in gameOpts"
                    :key="index"
                    :label="item.game_name"
                    :value="item.game_id"
                  ></el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">角标</el-col>
              <el-col :span="20">
                <el-select v-model="form.function">
                  <el-option
                    v-for="(item,index) in funOpts"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">状态</el-col>
              <el-col :span="20">
                <el-select v-model="form.function">
                  <el-option
                    v-for="(item,index) in funOpts"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">是否强引导</el-col>
              <el-col :span="20">
                <el-select v-model="form.function">
                  <el-option
                    v-for="(item,index) in funOpts"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="游戏12">
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">游戏名称</el-col>
              <el-col :span="20">
                <el-select v-model="form.game_12" placeholder="请选择活动区域">
                  <el-option
                    v-for="(item,index) in gameOpts"
                    :key="index"
                    :label="item.game_name"
                    :value="item.game_id"
                  ></el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">角标</el-col>
              <el-col :span="20">
                <el-select v-model="form.function">
                  <el-option
                    v-for="(item,index) in funOpts"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">状态</el-col>
              <el-col :span="20">
                <el-select v-model="form.function">
                  <el-option
                    v-for="(item,index) in funOpts"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="width:100%;">
              <el-col :span="4" style="text-align:right;">是否强引导</el-col>
              <el-col :span="20">
                <el-select v-model="form.function">
                  <el-option
                    v-for="(item,index) in funOpts"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>-->
          <div>{{form}}</div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addGameSortConf">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
         

<script>
import SelectTime from "../../plugin/components/SelectTime";
import InfoTable from "../../plugin/components/InfoTable";
import PageInfo from "../../plugin/script/common/PageInfo";
import BaseIframe from "../../plugin/script/common/BaseIframe";
import PermissionButton from "../../plugin/components/PermissionButton";
import UserHandler from "../../script/handlers/UserHandler";
import InputArea from "../../plugin/components/InputArea";
import InfoTableItem from "../../plugin/components/InfoTableItem";

export default {
  name: "GameSortConf",
  extends: BaseIframe,
  components: {
    InfoTableItem,
    InputArea,
    SelectTime,
    InfoTable,
    PermissionButton
  },
  data() {
    return {
      value: true,
      labelPosition: "left", //左对齐
      dialogFormVisible: false,
      searchChannel: "", //table页面渠道列表
      funOpts: [
        { value: "1", label: "留空" },
        { value: "2", label: "活动" },
        { value: "3", label: "邮件" },
        { value: "4", label: "排行榜" },
        { value: "5", label: "设置" },
        { value: "6", label: "保险箱" },
        { value: "7", label: "广播" },
        { value: "8", label: "财神" }
      ],
      gameOpts: [],
      tableData: [],
      form: {
        id: null,
        checkList: [],
        game_1_obj: {
          game_des: "",
          corner_remark: "0",
          status: "0",
          leader: "1"
        },
        game_2_obj: {
          game_des: "",
          corner_remark: "0",
          status: "0",
          leader: "1"
        },
        game_3_obj: {
          game_des: "",
          corner_remark: "0",
          status: "0",
          leader: "1"
        },
        game_4_obj: {
          game_des: "",
          corner_remark: "0",
          status: "0",
          leader: "1"
        },
        game_5_obj: {
          game_des: "",
          corner_remark: "0",
          status: "0",
          leader: "1"
        },
        game_6_obj: {
          game_des: "",
          corner_remark: "0",
          status: "0",
          leader: "1"
        },
        game_7_obj: {
          game_des: "",
          corner_remark: "0",
          status: "0",
          leader: "1"
        },
        game_8_obj: {
          game_des: "",
          corner_remark: "0",
          status: "0",
          leader: "1"
        },
        game_9_obj: {
          game_des: "",
          corner_remark: "0",
          status: "0",
          leader: "1"
        },
        game_10_obj: {
          game_des: "",
          corner_remark: "0",
          status: "0",
          leader: "1"
        }
      },
      gameList: {},
      channelOpts: [],
      allChannelOpts: []
    };
  },
  methods: {
    resetForm() {
      this.form = {
        id: null,
        checkList: [],
        game_1_obj: {
          game_des: "",
          corner_remark: "0",
          status: "0",
          leader: "1"
        },
        game_2_obj: {
          game_des: "",
          corner_remark: "0",
          status: "0",
          leader: "1"
        },
        game_3_obj: {
          game_des: "",
          corner_remark: "0",
          status: "0",
          leader: "1"
        },
        game_4_obj: {
          game_des: "",
          corner_remark: "0",
          status: "0",
          leader: "1"
        },
        game_5_obj: {
          game_des: "",
          corner_remark: "0",
          status: "0",
          leader: "1"
        },
        game_6_obj: {
          game_des: "",
          corner_remark: "0",
          status: "0",
          leader: "1"
        },
        game_7_obj: {
          game_des: "",
          corner_remark: "0",
          status: "0",
          leader: "1"
        },
        game_8_obj: {
          game_des: "",
          corner_remark: "0",
          status: "0",
          leader: "1"
        },
        game_9_obj: {
          game_des: "",
          corner_remark: "0",
          status: "0",
          leader: "1"
        },
        game_10_obj: {
          game_des: "",
          corner_remark: "0",
          status: "0",
          leader: "1"
        }
      };
    },
    sendDataToServer() {
      let data = {
        type_id: 4
      };
      this.$http.post("v1/backend/lobby/server_config_two", data).then(res => {
        console.log(res);
        if (res.data.code === 1) {
          this.$message({
            type: "success",
            message: res.data.msg
          });
        }
      });
    },
    getGameSortList() {
      this.$http
        .get("v1/backend/lobby/game_sort", {
          params: {
            page: 1,
            limit: 10
          }
        })
        .then(res => {
          console.log(res);
          if (res.data.code === 1) {
            this.tableData = res.data.data;
            this.game_list_index();
            console.log(this.tableData);
          }
        });
    },
    game_list_index: function() {
      this.tableData.map(item => {
        var gameList = JSON.parse(item.game_list);
        this.gameList = JSON.parse(item.game_list);
        for (var key in gameList) {
          item[`game_${key}`] = gameList[key].game_type;
        }
      });
    },
    getGameList() {
      this.$http
        .get("v1/backend/lobby/all_game_list", {
          params: {
            page: this.currentPage,
            limit: this.pagesize,
            type_id: 1
          }
        })
        .then(res => {
          console.log(res);
          if (res.data.code === 1) {
            this.gameOpts = res.data.data.slice(1);
          }
        });
    },
    //获取新增页面的渠道列表
    getAddChannelList() {
      let data = {
        type_id: 2,
        add_id: 1
      };
      this.$http.post("v1/backend/no_channel", data).then(res => {
        console.log(res);
        if (res.data.code === 1) {
          this.channelOpts = res.data.data;
        }
      });
    },
    //获取列表页的所有渠道
    getAllChannelList() {
      let data = {
        type_id: 2,
        add_id: 2
      };
      this.$http.post("v1/backend/no_channel", data).then(res => {
        console.log(res);
        if (res.data.code === 1) {
          this.allChannelOpts = res.data.data;
        }
      });
    },
    openAddDialog() {
      this.dialogFormVisible = true;
      this.getAddChannelList();
      this.getGameList();
      this.resetForm();
    },
    addGameSortConf() {
      if (!this.form.id) {
        let gameList = {
          "1": {
            position: 1,
            game_type: this.form.game_1_obj.game_des,
            shown_type: 1,
            notice_type: this.form.game_1_obj.corner_remark,
            status: this.form.game_1_obj.status,
            guide_status: this.form.game_1_obj.leader
          },
          "2": {
            position: 2,
            game_type: this.form.game_2_obj.game_des,
            shown_type: 1,
            notice_type: this.form.game_2_obj.corner_remark,
            status: this.form.game_2_obj.status,
            guide_status: this.form.game_2_obj.leader
          },
          "3": {
            position: 3,
            game_type: this.form.game_3_obj.game_des,
            shown_type: 1,
            notice_type: this.form.game_3_obj.corner_remark,
            status: this.form.game_3_obj.status,
            guide_status: this.form.game_3_obj.leader
          },
          "4": {
            position: 4,
            game_type: this.form.game_4_obj.game_des,
            shown_type: 1,
            notice_type: this.form.game_4_obj.corner_remark,
            status: this.form.game_4_obj.status,
            guide_status: this.form.game_4_obj.leader
          },
          "5": {
            position: 5,
            game_type: this.form.game_5_obj.game_des,
            shown_type: 1,
            notice_type: this.form.game_5_obj.corner_remark,
            status: this.form.game_5_obj.status,
            guide_status: this.form.game_5_obj.leader
          },
          "6": {
            position: 6,
            game_type: this.form.game_6_obj.game_des,
            shown_type: 1,
            notice_type: this.form.game_6_obj.corner_remark,
            status: this.form.game_6_obj.status,
            guide_status: this.form.game_6_obj.leader
          },
          "7": {
            position: 7,
            game_type: this.form.game_7_obj.game_des,
            shown_type: 7,
            notice_type: this.form.game_7_obj.corner_remark,
            status: this.form.game_7_obj.status,
            guide_status: this.form.game_7_obj.leader
          },
          "8": {
            position: 8,
            game_type: this.form.game_8_obj.game_des,
            shown_type: 1,
            notice_type: this.form.game_8_obj.corner_remark,
            status: this.form.game_8_obj.status,
            guide_status: this.form.game_8_obj.leader
          },
          "9": {
            position: 9,
            game_type: this.form.game_9_obj.game_des,
            shown_type: 1,
            notice_type: this.form.game_9_obj.corner_remark,
            status: this.form.game_9_obj.status,
            guide_status: this.form.game_9_obj.leader
          },
          "10": {
            position: 10,
            game_type: this.form.game_10_obj.game_des,
            shown_type: 1,
            notice_type: this.form.game_10_obj.corner_remark,
            status: this.form.game_10_obj.status,
            guide_status: this.form.game_10_obj.leader
          }
        };
        let data = {
          name: String(this.form.checkList),
          code: String(this.form.checkList),
          game_list: JSON.stringify(gameList)
        };
        this.$http.post("v1/backend/lobby/game_sort", data).then(res => {
          console.log(res);
          if (res.data.code === 1) {
            this.dialogFormVisible = false;
            this.getGameSortList();
          }
        });
      } else {
        let gameList = {
          "1": {
            position: 1,
            game_type: this.form.game_1_obj.game_des,
            shown_type: 1,
            notice_type: this.form.game_1_obj.corner_remark,
            status: this.form.game_1_obj.status,
            guide_status: this.form.game_1_obj.leader
          },
          "2": {
            position: 2,
            game_type: this.form.game_2_obj.game_des,
            shown_type: 1,
            notice_type: this.form.game_2_obj.corner_remark,
            status: this.form.game_2_obj.status,
            guide_status: this.form.game_2_obj.leader
          },
          "3": {
            position: 3,
            game_type: this.form.game_3_obj.game_des,
            shown_type: 1,
            notice_type: this.form.game_3_obj.corner_remark,
            status: this.form.game_3_obj.status,
            guide_status: this.form.game_3_obj.leader
          },
          "4": {
            position: 4,
            game_type: this.form.game_4_obj.game_des,
            shown_type: 1,
            notice_type: this.form.game_4_obj.corner_remark,
            status: this.form.game_4_obj.status,
            guide_status: this.form.game_4_obj.leader
          },
          "5": {
            position: 5,
            game_type: this.form.game_5_obj.game_des,
            shown_type: 1,
            notice_type: this.form.game_5_obj.corner_remark,
            status: this.form.game_5_obj.status,
            guide_status: this.form.game_5_obj.leader
          },
          "6": {
            position: 6,
            game_type: this.form.game_6_obj.game_des,
            shown_type: 1,
            notice_type: this.form.game_6_obj.corner_remark,
            status: this.form.game_6_obj.status,
            guide_status: this.form.game_6_obj.leader
          },
          "7": {
            position: 7,
            game_type: this.form.game_7_obj.game_des,
            shown_type: 7,
            notice_type: this.form.game_7_obj.corner_remark,
            status: this.form.game_7_obj.status,
            guide_status: this.form.game_7_obj.leader
          },
          "8": {
            position: 8,
            game_type: this.form.game_8_obj.game_des,
            shown_type: 1,
            notice_type: this.form.game_8_obj.corner_remark,
            status: this.form.game_8_obj.status,
            guide_status: this.form.game_8_obj.leader
          },
          "9": {
            position: 9,
            game_type: this.form.game_9_obj.game_des,
            shown_type: 1,
            notice_type: this.form.game_9_obj.corner_remark,
            status: this.form.game_9_obj.status,
            guide_status: this.form.game_9_obj.leader
          },
          "10": {
            position: 10,
            game_type: this.form.game_10_obj.game_des,
            shown_type: 1,
            notice_type: this.form.game_10_obj.corner_remark,
            status: this.form.game_10_obj.status,
            guide_status: this.form.game_10_obj.leader
          }
        };
        let data = {
          id: this.form.id,
          name: String(this.form.checkList),
          code: String(this.form.checkList),
          game_list: JSON.stringify(gameList)
        };
        this.$http.put("v1/backend/lobby/game_sort", data).then(res => {
          console.log(res);
          if (res.data.code === 1) {
            this.dialogFormVisible = false;
            this.getGameSortList();
          }
        });
      }
    },
    handleEdit(row) {
      console.log(row);
      this.getAddChannelList();
      this.getGameList();
      this.dialogFormVisible = true;
      this.form.id = row.id;
      this.form.checkList = [row.channel_name];
      let game_list = JSON.parse(row.game_list);
      console.log(game_list);
      for (var key in game_list) {
        this.form[`game_${key}_obj`] = {
          game_des: game_list[key].game_type,
          corner_remark: game_list[key].notice_type,
          status: game_list[key].status,
          leader: game_list[key].guide_status
        };
      }
    },
    handleDelete(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http
            .delete("v1/backend/lobby/game_sort", {
              params: {
                id: row.id
              }
            })
            .then(res => {
              if (res.data.code === 1) {
                this.getGameSortList();
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
              }
            });
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
    this.getGameSortList();
    this.getAllChannelList();
  }
};
</script>

<style scoped>
#GameSortConf-main .bd {
  padding-left: 20px;
}
#GameSortConf-main .bd p {
  margin: 0;
}
#GameSortConf-main .bd >>> .el-button {
  margin-left: 0px;
  min-width: 30px;
}
</style>
