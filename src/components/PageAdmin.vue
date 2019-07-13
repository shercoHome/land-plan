<template>
  <div id="page-admin">
    <h1>
      管理后台
      <small>[{{userInfo.userName}}]</small>
    </h1>
    <a class="underline btn long20" @click="fn_log_out">登出</a>
    &nbsp;
    <a class="underline btn long20" @click="fn_show_page('PageHome')">首页</a>
    &nbsp;
    <a class="underline btn long20" @click="fn_show_page('PagePlan')">计划</a>

    <ul class="backlist">
      <li
        v-for="(d,i) in backList.name"
        :key="i"
        @click="backList.show=i"
        v-bind:class="{ active: backList.show==i }"
        v-show="i<4||userInfo.agentAdmin=='0'"
      >{{d}}</li>
    </ul>
    <div class="clearfloat"></div>
    <!-- 网站 -->
    <div v-show="backList.show==0" class="info-box">
      <div class="btngroup">
        <a v-show="userInfo.agentAdmin=='0'" class="btn half">
          账号网址：
          <input v-model="webNameForSearch" placeholder="www.xxx.com 或 代理账号">
        </a>
        <a class="btn half" @click="fn_get_web_set_by_id()">[ 获取 / 刷新 ] 网站配置</a>
      </div>


<table class="list-table">
          <tr>
            <th>No.</th>
            <th @click="fn_sort_by('myWebSet','userName')">站长(代理)账号</th>
            <th @click="fn_sort_by('myWebSet','userID')">代理ID</th>
            <th @click="fn_sort_by('myWebSet','siteLink')">专属网址</th>
            <th @click="fn_sort_by('myWebSet','siteConfig')">网站名称</th>
            <th @click="fn_sort_by('myWebSet','id')">网站ID</th>
          </tr>
          <template v-for="(myWebSetItem, n) in myWebSet">
            <tr :key="n"  @click="webSetShow=webSetShow==n?-1:n" class="underline">
              <td>{{n+1}}</td>
              <td>{{myWebSetItem['userName']}}</td>
              <td>{{myWebSetItem['userID']}}</td>
              <td>{{myWebSetItem['siteLink']}}</td>
              <td>{{myWebSetItem['siteConfig']}}</td>
              <td>{{myWebSetItem['id']}}</td>
            </tr>
            <tr v-show="webSetShow==n" :key="n+'_'+index" v-for="(value, key, index) in myWebSetItem">
              <td colspan="6">
                <p id="v-for-object" class="demo">
                  <span>{{ index }}. {{ $chinese.webSetting[key] }}</span>：
                  <label
                    v-if="key!='csQQ' && key!='csQQGroup' && key!='csWechat' && key!='csEmail'"
                  >{{value}}</label>

                  <template v-else>
                    <input
                      type="button"
                      class="btn shareRequired middle"
                      @click="fn_cs_fj(value,key)"
                      value="查看/隐藏"
                    >

                    <div
                      v-show="key==temps.key"
                      v-for="(temp,iii) in temps.arr"
                      :key="iii"
                      style="border-bottom:#ccc 1px solid;padding-bottom:8px;"
                    >
                      <p>账号：
                        <input v-model="temps.arr[iii][0]">
                      </p>
                      <p>图片：
                        <input v-model="temps.arr[iii][1]">，支持网络图片（或联系管理员上传）
                      </p>
                      <p v-if="key!='csQQ'">链接：
                        <input v-model="temps.arr[iii][2]">
                      </p>
                    </div>请先
                    <input
                      type="button"
                      class="btn shareRequired middle"
                      @click="fn_cs_get(key)"
                      value="复制信息"
                    >，再粘贴到
                  </template>
                  <a
                    v-if="key=='siteLink'"
                    class="btn shareRequired middle"
                    @click="fn_copy('http://'+value)"
                  >复制链接</a>
                  <a
                    v-if="myWebSetLimit[key]==1"
                    class="btn shareRequired short"
                    @click="fn_new('webSetting|'+key+'|'+myWebSetItem['userID'])"
                  >修改</a>
                  <a
                    v-if="myWebSetLimit[key]==2"
                    class="btn shareRequired middle"
                    @click="fn_submit_new('webSetting|'+key+'|'+myWebSetItem['userID'])"
                  >申请修改</a>
                </p>
              </td>
            </tr>
          </template>
        </table>



      <!-- <dl id="myWebSet" class="myWebSet">
        <template v-for="(myWebSetItem, n) in myWebSet">
          <dt
            :key="n"
            @click="webSetShow=webSetShow==n?-1:n"
          >[{{myWebSetItem.userName}}]{{myWebSetItem.siteLink}}，点击[ 显示 / 隐藏 ]</dt>
          <dd v-show="webSetShow==n" :key="n+'_'+index" v-for="(value, key, index) in myWebSetItem">
            <p id="v-for-object" class="demo">
              <span>{{ index }}. {{ $chinese.webSetting[key] }}</span>：
              <label
                v-if="key!='csQQ' && key!='csQQGroup' && key!='csWechat' && key!='csEmail'"
              >{{value}}</label>

              <template v-else>
                <input
                  type="button"
                  class="btn shareRequired middle"
                  @click="fn_cs_fj(value,key)"
                  value="查看/隐藏"
                >

                <div
                  v-show="key==temps.key"
                  v-for="(temp,iii) in temps.arr"
                  :key="iii"
                  style="border-bottom:#ccc 1px solid;padding-bottom:8px;"
                >
                  <p>账号：
                    <input v-model="temps.arr[iii][0]">
                  </p>
                  <p>图片：
                    <input v-model="temps.arr[iii][1]">，支持网络图片（或联系管理员上传）
                  </p>
                  <p v-if="key!='csQQ'">链接：
                    <input v-model="temps.arr[iii][2]">
                  </p>
                </div>请先
                <input
                  type="button"
                  class="btn shareRequired middle"
                  @click="fn_cs_get(key)"
                  value="复制信息"
                >，再粘贴到
              </template>
              <a
                v-if="key=='siteLink'"
                class="btn shareRequired middle"
                @click="fn_copy('http://'+value)"
              >复制链接</a>
              <a
                v-if="myWebSetLimit[key]==1"
                class="btn shareRequired short"
                @click="fn_new('webSetting|'+key+'|'+myWebSetItem['userID'])"
              >修改</a>
              <a
                v-if="myWebSetLimit[key]==2"
                class="btn shareRequired middle"
                @click="fn_submit_new('webSetting|'+key+'|'+myWebSetItem['userID'])"
              >申请修改</a>
            </p>
          </dd>
        </template>
      </dl> -->
    </div>
    <!-- 授权 -->
    <div v-show="backList.show==1" class="info-box">
      <p class="tips">
        <span>白名单</span>：无分享ip限制;
        <span>黑名单</span>：永不授权
      </p>
      <div v-if="myLimit.user_authorizationStatus!=='0'">
        <input class="btn long30 bkwhite" v-model="authorizeUserName" placeholder="填写账号">
        <div class="btn long50 bkwhite">
          <label>
            <input type="radio" id="one" value="1" v-model="authorizePicked">白
          </label>
          <label>
            <input type="radio" id="two" value="2" v-model="authorizePicked">黑
          </label>
          <label>
            <input type="radio" id="two" value="0" v-model="authorizePicked">删
          </label>
        </div>
        <a
          v-if="myLimit.user_authorizationStatus=='1'"
          class="btn long20 bkgreen"
          @click="fn_authorize_list_add()"
        >执行</a>
        <a
          v-if="myLimit.user_authorizationStatus=='2'"
          class="btn long20 bkgreen"
          @click="fn_authorize_list_submit_to_add()"
        >申请执行</a>
      </div>
      <div class="btngroup">
        <a class="btn half" @click="fn_get_my_authorize_list()">[ 获取 / 刷新 ] 授权列表</a>
        <a class="btn half" @click="authorizeListShow=!authorizeListShow">[ 显示 / 隐藏 ] 授权列表</a>
      </div>

      <div class="clearfloat"></div>

      <table v-show="authorizeListShow" class="list-table">
        <tr>
          <th>No.</th>
          <th @click="fn_sort_by('authorizeList','userName')">账号</th>
          <th @click="fn_sort_by('authorizeList','wbStatus')">W/B</th>
          <th @click="fn_sort_by('authorizeList','loginTime')">最后登录</th>
          <th @click="fn_sort_by('authorizeList','updateTime')">授权时间</th>
          <th @click="fn_sort_by('authorizeList','updateIP')">IP</th>
          
        </tr>
        <tr></tr>
        <tr v-for="(jsond,i) in authorizeList" :key="i">
          <td>{{i+1}}</td>
          <td>{{jsond.userName}}</td>
          <td v-if="jsond.wbStatus=='1'">白</td>
          <td v-else-if="jsond.wbStatus=='2'">黑</td>
          <td v-else>享</td>
          <td>{{jsond.loginTime}}</td>
          <td>{{jsond.updateTime}}.{{jsond.authorizationTime}}</td>
          <td>{{jsond.updateIP}}</td>
        </tr>
      </table>
    </div>
    <div class="clearfloat"></div>
    <!-- 会员列表 -->
    <div v-show="backList.show==2" class="info-box">
      <div class="btngroup">
        <a v-show="userInfo.agentAdmin=='0'" class="btn half">
          代理账号：
          <input v-model="userNameForSearchAgent" placeholder="比如 admin">
        </a>
        <a class="btn half" @click="fn_get_my_userList(userNameForSearchAgent)">[ 获取 / 刷新 ] 会员列表</a>
      </div>
      <input class="btn long30 bkwhite" v-model="searchUserInfoUserName" placeholder="填写会员账号">
      <div class="btn long50 bkwhite">
        <label>
          <input type="radio" value="0" v-model="searchNet">普通
        </label>
        <label>
          <input type="radio" value="1" v-model="searchNet">强制
        </label>
      </div>
      <a class="btn long20 bkgreen" @click="fn_show_user_by_name()">搜索会员</a>
      <ul class="ul-listLabel">
        <li
          v-for="(userNameItem,i) in listLabelName"
          :key="i"
          @click="fn_get_my_userList(userNameItem)"
        >
          >
          <a class="underline">{{userNameItem}}</a>
        </li>
      </ul>
      <div class="info-box" v-show="userListShow">
        <table class="list-table">
          <tr>
            <th>No.</th>
            <th @click="fn_sort_by('userList','userName')">账号</th>
            <th @click="fn_sort_by('userList','registerTime')">注册时间</th>
            <th @click="fn_sort_by('userList','registerIP')">IP</th>
            <th >分享</th>
            <th @click="fn_sort_by('userList','userLevel')">层级</th>
            <th @click="fn_sort_by('userList','nextCount')">代理</th>
            <th @click="fn_sort_by('userList','userActive')">状态</th>
            <th @click="fn_sort_by('userList','loginTime')">最后登录</th>
          </tr>
          <template v-for="(user, n) in userList">
            <tr :key="n">
              <td>{{n+1}}</td>
              <td>
                <a @click="userInfoShow=userInfoShow==n?-1:n" class="underline">{{user['userName']}}</a>
              </td>
              <td>{{user['registerTime']}}</td>
              <td>{{user['registerIP']}}</td>
              <td>
                <a class="underline" @click="fn_get_share_ip_list_by_code(user['shareCode'])">查看</a>
              </td>
              <td>{{user['userLevel']=='1'?'总代':user['userLevel']=='2'?'代理':'会员'}}</td>
              <td v-if="user['agentStatus']=='1'&&user['nextCount']<=0">下线({{user['nextCount']}})</td>
              <td
                v-if="user['agentStatus']=='1'&&user['nextCount']>0&&user['nextCanShow']==0"
              >下线({{user['nextCount']}})</td>
              <td
                v-if="user['agentStatus']=='1'&&user['nextCount']>0&&user['nextCanShow']==1"
                @click="fn_get_my_userList(user['userName'])"
              >
                <a class="underline">下线({{user['nextCount']}})</a>
              </td>
              <td v-if="user['agentStatus']=='2'">待审</td>
              <td v-if="user['agentStatus']=='0'">会员</td>
              <td v-if="user['userActive']=='0'">禁用</td>
              <td v-if="user['userActive']=='1'">正常</td>
              <td>{{user['loginTime']}}</td>
            </tr>
            <tr v-show="userInfoShow==n" :key="n+'_'+index" v-for="(value, key, index) in user">
              <td colspan="8">
                <p id="v-for-object" class="demo">
                  <span>{{ index }}. {{ $chinese.user[key] }}</span>
                  ： {{ value }}
                  <a
                    v-if="userLimit[key]==1"
                    class="btn shareRequired short"
                    @click="fn_new('user|'+key+'|'+user['id'])"
                  >修改</a>
                  <a
                    v-if="userLimit[key]==2"
                    class="btn shareRequired middle"
                    @click="fn_submit_new('user|'+key+'|'+user['id'])"
                  >申请修改</a>
                </p>
              </td>
            </tr>
          </template>
        </table>
      </div>
    </div>
    <div class="clearfloat"></div>
    <!-- 创建晋升 -->
    <div v-show="backList.show==3" class="info-box"
      v-if="myLimit.create_user_3!=='0'||myLimit.create_user_2!=='0'||myLimit.create_user_1!=='0'">
      <p v-show="myLimit['create_user_'+addUserLevel]=='1'">
        将会员/代理归属到
        <input class="btn long20 bkwhite" v-model="addUserFrom" placeholder=" 账号或id">，不填表示归到自己线下
      </p>

      <input class="btn long30 bkwhite" v-model="addUserName" placeholder="填写账号">
      <div class="btn long50 bkwhite">
        <label v-if="myLimit.create_user_3!=='0'">
          <input type="radio" id="one" value="3" v-model="addUserLevel">会员
        </label>
        <label v-if="myLimit.create_user_2!=='0'">
          <input type="radio" id="two" value="2" v-model="addUserLevel">代理
        </label>
        <label v-if="myLimit.create_user_1!=='0'">
          <input type="radio" id="two" value="1" v-model="addUserLevel">总代
        </label>
      </div>

      <a
        v-show="myLimit['create_user_'+addUserLevel]=='1'"
        class="btn long20 bkgreen"
        @click="fn_create_one_user()"
      >{{addUserLevel==3?"创建会员":"执行晋升"}}</a>
      <a
        v-show="myLimit['create_user_'+addUserLevel]=='2'"
        class="btn long20 bkgreen"
        @click="fn_submit_to_create_one_user()"
      >{{addUserLevel==3?"申请创建":"申请晋升"}}</a>
      <a
        v-show="myLimit['create_user_'+addUserLevel]=='0'"
        class="btn long20 bkgreen"
        @click="fn_alert('联系管理员开通')"
      >未开通</a>
    </div>

    <!-- 采种api设置 -->
    <div v-show="backList.show==4" v-if="userInfo.agentAdmin=='0'" class="info-box">


               <div class="btngroup">

                             <a
              class="btn half bkred"
              @click="fn_get_lottery_api_by_id('delete')"
            >删除下面这个彩种</a>
            <a
              class="btn half bkgreen"
              @click="fn_get_lottery_api_by_id('create')"
            >增加一个彩种</a>

        <!-- <a class="btn half" @click="lotteryApiShow=!lotteryApiShow">[ 显示 / 隐藏 ] 彩种配置</a> -->
      </div>

      <div class="btngroup">
        <a class="btn half">
          彩种代号：
          <input v-model="lotteryApiForSearch" placeholder="比如 pk10-js">
        </a>
        <a class="btn half" @click="fn_get_lottery_api_by_id()">[ 获取 / 刷新 ] 彩种配置</a>
         </div>

      <dl id="lotteryApi" class="lotteryApi">
        <template v-for="(lotteryApiItem, n) in myLotteryApis">
          <dt
            :key="n"
            @click="lotteryApiShow=lotteryApiShow==n?-1:n"
          >[{{lotteryApiItem.lotteryID}}]{{lotteryApiItem.lotteryname}}，点击[ 显示 / 隐藏 ]</dt>
          <dd
            v-show="lotteryApiShow==n"
            :key="n+'_'+index"
            v-for="(value, key, index) in lotteryApiItem"
          >
            <p id="v-for-object" class="demo">
              <span>{{ index }}. {{ $chinese.api[key] }}</span>
              ： {{ value }}
              <a
                class="btn shareRequired short"
                @click="fn_new('api|'+key+'|'+lotteryApiItem['id'])"
              >修改</a>
            </p>
          </dd>
        </template>
      </dl>
    </div>
    <!-- 权限表的设置，仅管理员 -->
    <div v-show="backList.show==5" v-if="userInfo.agentAdmin=='0'" class="info-box">
      <div class="btngroup">
        <a class="btn half">
          代理账号：
          <input v-model="getAdminLimitInfoUserName" placeholder="填写代理账号">
        </a>
        <a class="btn half" @click="fn_get_admin_limit_by_user()">[ 获取 / 刷新 ] 权限配置</a>
      </div>
      <p class="tips">
        <span>注</span> 修改初始化账号（如admin,zdadmin,cdadmin)将修改所有同层级的代理;0否1可2需申请
      </p>



<table class="list-table">
          <tr>
            <th>No.</th>
            <th @click="fn_sort_by('adminLimit','userName')">站长(代理)账号</th>
            <th @click="fn_sort_by('adminLimit','userID')">代理ID</th>
          </tr>
          <template v-for="(adminLimitItem, n) in adminLimit">
            <tr :key="n"  @click="adminLimitShow=adminLimitShow==n?-1:n" class="underline">
              <td>{{n+1}}</td>
              <td>{{adminLimitItem['userName']}}</td>
              <td>{{adminLimitItem['userID']}}</td>
            </tr>
            <tr v-show="adminLimitShow==n" :key="n+'_'+index" v-for="(value, key, index) in adminLimitItem">
              <td colspan="3">
            <p id="v-for-object" class="demo">
              <span>{{ index }}. {{ $chinese.adminLimit[key] }}</span>
              ： {{ value }}
              <a
                class="btn shareRequired short"
                @click="fn_new('adminLimit|'+key+'|'+adminLimitItem['userID'])"
              >修改</a>
            </p>
              </td>
            </tr>
          </template>
        </table>




      <!-- <dl>
        <template v-for="(adminLimitItem, n) in adminLimit">
          <dt
            :key="n"
            @click="adminLimitShow=adminLimitShow==n?-1:n"
          >[{{adminLimitItem.id}}]{{adminLimitItem.userName}}，点击[ 显示 / 隐藏 ]</dt>
          <dd
            v-show="adminLimitShow==n"
            :key="n+'_'+index"
            v-for="(value, key, index) in adminLimitItem"
          >
            <p id="v-for-object" class="demo">
              <span>{{ index }}. {{ $chinese.adminLimit[key] }}</span>
              ： {{ value }}
              <a
                class="btn shareRequired short"
                @click="fn_new('adminLimit|'+key+'|'+adminLimitItem['userID'])"
              >修改</a>
            </p>
          </dd>
        </template>
      </dl> -->
    </div>
    <!-- 获取申请信息，以便审核，仅管理员 -->
    <div v-show="backList.show==6" v-if="userInfo.agentAdmin=='0'" class="info-box">
      <div class="btngroup">
        <a class="btn half" @click="fn_get_log_submit_list()">[ 获取 / 刷新 ] 审核申请</a>
        <a class="btn half" @click="logSubmitListShow=!logSubmitListShow">[ 显示 / 隐藏 ] 审核申请</a>
      </div>

      <div v-show="logSubmitListShow" class="info-box">
        <table class="list-table list-table-line">
          <tr>
            <th>No.</th>
            <th>申请人</th>
            <th>改变者</th>
            <th>类别</th>
            <th>属性</th>
            <th>值</th>
            <th>提交时间</th>
            <th>处理时间</th>
            <th>结果</th>
            <th>操作</th>
            <!-- <th>Action</th> -->
          </tr>
          <tr></tr>
          <tr v-for="(jsond,i) in logSubmitList" :key="i">
            <td>{{i+1}}</td>
            <td>{{jsond.createName}}[{{jsond.creater}}]</td>
            <td>{{jsond.actorName}}[{{jsond.actor}}]</td>
            <td>{{$chinese[jsond.form]['formName']}}</td>
            <td>{{$chinese[jsond.form][jsond.formKey]}}</td>
            <td style="max-width:2rem;white-space: inherit;">{{jsond.formValue}}</td>
            <td>{{jsond.submitTime}}</td>
            <td>{{jsond.doneTime}}</td>
            <td>{{jsond.result==1?"成功":jsond.result==0?"未":jsond.result==2?"失败":"err"}}</td>
            <td>
              <a
                v-show="jsond.result==0"
                class="btn short"
                @click="fn_set_log_submit_result(jsond.id,'1')"
              >完成</a>
              <a
                v-show="jsond.result==0"
                class="btn short"
                @click="fn_set_log_submit_result(jsond.id,'2')"
              >驳回</a>
            </td>
          </tr>
        </table>
      </div>
    </div>

    <transition name="fade">
      <AlertTable
        v-if="alerttable.show"
        :title="alerttable.title"
        :tips="alerttable.tips"
        :index="alerttable.index"
        :thArray="alerttable.thArray"
        :tdArray="alerttable.tdArray"
        @child-event-fn-alerttable-hide="alerttable.__hide"
        @child-event-fn-alerttable-click-td="alerttable.__clickTD"
      />
    </transition>
  </div>
</template>

<script>
import AlertTable from "../components/common/AlertTable.vue";

import ToggleSwitch from "../components/common/ToggleSwitch.vue";

export default {
  name: "PageAdmin",
  data() {
    const that = this;
    return {
      backList: {
        name: ["网站", "授权", "会员", "晋升", "计划", "权限", "审核"],
        show: 0
      },
      temps: { arr: [], str: "", key: "" },
      myLimit: {},
      addUserName: "",
      addUserLevel: "3",
      addUserFrom: "",

      webNameForSearch: "",
      webSetShow: -1,
      myWebSet: [],
      myWebSetLimit: {},

      userNameForSearchAgent: "",
      userListShow: false,
      userInfoShow: -1,
      userList: [],
      userLimit: {},
      userInfo: {},
      listLabelID: [],
      listLabelName: [],
      agentListTemple: [],
      userListTemple: [],

      authorizeListShow: false,
      authorizeUserName: "",
      authorizePicked: "1",
      authorizeList: [],
      shareIPList: [],
      shareIPListTemp: [],
      searchUserInfoUserName: "",
      searchNet: "0",

      myLotteryApis: [],
      lotteryApiShow: -1,
      lotteryApiForSearch: "",

      adminLimit: [],
      adminLimitShow: -1,
      getAdminLimitInfoUserName: "",

      logSubmitList: [],
      logSubmitListShow: false,

      alerttable: {
        show: false,
        title: "title",
        tips: "tips",
        index: true,
        thArray: [],
        tdArray: [],
        __hide: function() {
          that.alerttable.show = false;
        },
        __clickTD: function(i, ii) {
          console.log("click table", i, "tr", ii[0], "td", ii[1]);
        }
      }
    };
  },
  props: {
    c_my_api: Object,
    webSet: Object
  },
  computed: {
    c_authorize() {
      return this.info.authorize === "0" ? false : true;
    },
    c_log() {
      const logArr = this.user.log;
      const n = logArr.length;
      let logArr_ = [];
      for (var i = 0; i < n; i++) {
        let temp = logArr[i].split("|").slice(1, -1); //用slice去除数组第1个（序号）、最后一个元素（空的）
        logArr_.push(temp);
      }
      return logArr_;
    },
    c_share() {
      const logArr = this.user.share;
      const n = logArr.length;
      let logArr_ = [];
      for (var i = 0; i < n; i++) {
        let temp = logArr[i].split("|").slice(1, -1); //用slice去除数组第1个（序号）、最后一个元素（空的）
        logArr_.push(temp);
      }
      return logArr_;
    }
  },
  created() {
    let that = this;

    that.$$.console.black(
      "admin >>>>>>>>> this.c_my_api.admin = " + this.c_my_api.admin
    );
    if (that.c_my_api.admin.indexOf("http") === 0) {
      that.fn_inint_2();
      that.fn_prompt_login_reflash();
    }
  },
  components: {
    AlertTable,
    ToggleSwitch
  },
  methods: {
    fn_sort_by(JsonName,str){
      if(!str)return;
      let __json=this[JsonName];
      sessionStorage.markxxx=sessionStorage.markxxx?(Number(sessionStorage.markxxx) *-1):1
      let t=Number(sessionStorage.markxxx);
      this.$$.sortBy(__json,str,t);
    },
    fn_cs_fj(v, k) {
      this.temps.str = v;
      const arr = v.split("||");
      for (let i in arr) {
        arr[i] = arr[i].split("|");
      }
      this.temps.arr = arr;
      this.temps.key = this.temps.key == k ? "" : k;
    },
    fn_copy(v, t) {
      t = t || "复制成功";
      this.$$.copyText(v, t);
    },
    fn_cs_get(key) {
      const _temps = this.temps.arr;
      const _tempsTwo = [];
      for (let i in _temps) {
        if (key == "csQQ") {
          _temps[i][2] ="isNull";
        }
        _tempsTwo[i] = _temps[i].join("|");
      }

      this.temps.str = _tempsTwo.join("||");

      this.$$.copyText(this.temps.str, "已复制，请点击修改");
    },
    fn_log_out() {
      localStorage.removeItem("userInfo");
      location.replace(this.$$.getDomain());
    },
    fn_show_user_by_name() {
      const that = this;
      if (that.searchUserInfoUserName == "") {
        that.fn_alert("请填写会员账号");
        return;
      }
      that.userInfoShow = 0;
      that.userListShow = true;

      if (
        that.searchNet == "0" &&
        that.userListTemple[that.searchUserInfoUserName]
      ) {
        that.userList = that.userListTemple[that.searchUserInfoUserName];
        that.$$.console.black(
          "admin >>>>>>>>> fn _show_user_by_name >>>>>>>>>>>> userListTemple[" +
            that.searchUserInfoUserName +
            "]"
        );
        return;
      }

      that.fn_async_show_user_by_name().then(function(re) {
        that.$$.console.black(
          "admin >>>>>>>>> fn _show_user_by_name >>>>>>>>>>>> " + re.data.msg
        );
        console.log(re.data);

        that.userList = re.data.data.userList;

        that.userLimit = re.data.data.userLimit;

        console.log(re.data);
        if (re.data.code === "1") {
          that.userListTemple[that.searchUserInfoUserName] =
            re.data.data.userList;
        } else if (re.data.code === "-9") {
          that.fn_alert("登录超时");
          setTimeout(() => {
            location.reload();
          }, 2000);
        } else {
          that.fn_alert(re.data.msg);
        }
      });
    },
    async fn_async_show_user_by_name() {
      const that = this;
      const data_ = that.$qs.stringify({
        type: "getUserByName",
        uid: that.userInfo.id,
        token: that.userInfo.loginToken,
        userName: that.searchUserInfoUserName
      });
      try {
        return await that.$axios.post(that.c_my_api.admin, data_);
      } catch (error) {
        console.log(that.c_my_api);
        console.warn(error);
      }
    },
    fn_show_share_ip_list() {
      const that = this;
      let ar = [];
      const l = that.shareIPList.length;
      for (let i = 0; i < l; i++) {
        let json__ = that.shareIPList[i];
        ar.push([json__.createIP, json__.createTime, json__.shareCount]);
      }
      that.fn_alert_table("分享列表("+l+")", ["No.", "IP", "时间", "访问次数"], ar);
    },
    fn_get_share_ip_list_by_code(shareCode) {
      const that = this;


      if (that.searchNet == "0" &&that.shareIPListTemp[shareCode]) {
        that.shareIPList = that.shareIPListTemp[shareCode];
        that.fn_show_share_ip_list();
        that.$$.console.black(
          "admin >>>>>>>>> fn_get_share_ip_list_by_code >>>>>>>>>>>> shareIPListTemp[" +
            shareCode +
            "]"
        );
        return;
      }

      that.fn_async_get_share_ip_list_by_code(shareCode).then(function(re) {
        that.$$.console.black(
          "admin >>>>>>>>> fn_get_share_ip_list_by_code >>>>>>>>>>>> " +
            re.data.msg
        );
        console.log(re.data);
        if (re.data.code === "1") {
          that.shareIPList = re.data.data;
          that.shareIPListTemp[shareCode] = re.data.data;
          that.fn_show_share_ip_list();
        } else if (re.data.code === "-9") {
          that.fn_alert("登录超时");
          setTimeout(() => {
            location.reload();
          }, 2000);
        } else {
          that.fn_alert(re.data.msg);
        }
      });
    },
    async fn_async_get_share_ip_list_by_code(shareCode) {
      const that = this;
      const data_ = that.$qs.stringify({
        type: "getMyShareIPList",
        uid: that.userInfo.id,
        token: that.userInfo.loginToken,
        shareCode: shareCode
      });
      try {
        return await that.$axios.post(that.c_my_api.admin, data_);
      } catch (error) {
        console.log(that.c_my_api);
        console.warn(error);
      }
    },
    fn_authorize_list_delete(authorizeID) {
      const that = this;

      that.fn_async_authorize_list_delete(authorizeID).then(function(re) {
        that.$$.console.black(
          "admin >>>>>>>>> fn_authorize_list_delete >>>>>>>>>>>> " + re.data.msg
        );
        console.log(re.data);
        if (re.data.code === "1") {
          that.fn_alert(re.data.msg);
        } else if (re.data.code === "-9") {
          that.fn_alert("登录超时");
          setTimeout(() => {
            location.reload();
          }, 2000);
        } else {
          that.fn_alert(re.data.msg);
        }
      });
    },
    async fn_async_authorize_list_delete(authorizeID) {
      const that = this;
      const data_ = that.$qs.stringify({
        type: "deleteMyAuthorizeList",
        uid: that.userInfo.id,
        token: that.userInfo.loginToken,
        authorizeID: authorizeID
      });
      try {
        return await that.$axios.post(that.c_my_api.admin, data_);
      } catch (error) {
        console.log(that.c_my_api);
        console.warn(error);
      }
    },
    fn_authorize_list_update(authorizeID, wbStatus) {
      const that = this;

      that
        .fn_async_authorize_list_update(authorizeID, wbStatus)
        .then(function(re) {
          that.$$.console.black(
            "admin >>>>>>>>> fn_authorize_list_update >>>>>>>>>>>> " +
              re.data.msg
          );
          console.log(re.data);
          if (re.data.code === "1") {
            that.fn_alert(re.data.msg);
          } else if (re.data.code === "-9") {
            that.fn_alert("登录超时");
            setTimeout(() => {
              location.reload();
            }, 2000);
          } else {
            that.fn_alert(re.data.msg);
          }
        });
    },
    async fn_async_authorize_list_update(authorizeID, wbStatus) {
      const that = this;
      const data_ = that.$qs.stringify({
        type: "updateMyAuthorizeList",
        uid: that.userInfo.id,
        token: that.userInfo.loginToken,
        authorizeID: authorizeID,
        wbStatus: wbStatus
      });
      try {
        return await that.$axios.post(that.c_my_api.admin, data_);
      } catch (error) {
        console.log(that.c_my_api);
        console.warn(error);
      }
    },
    fn_get_my_authorize_list() {
      const that = this;

      that.fn_async_get_my_authorize_list().then(function(re) {
        that.$$.console.black(
          "admin >>>>>>>>> fn_async_get_my_authorize_list >>>>>>>>>>>> " +
            re.data.msg
        );
        console.log(re.data);
        if (re.data.code === "1") {
          that.authorizeList = re.data.data;
          that.authorizeListShow = true;
        } else if (re.data.code === "-9") {
          that.fn_alert("登录超时");
          setTimeout(() => {
            location.reload();
          }, 2000);
        } else {
          that.fn_alert(re.data.msg);
        }
      });
    },
    async fn_async_get_my_authorize_list() {
      const that = this;
      const data_ = that.$qs.stringify({
        type: "getMyAuthorizeList",
        uid: that.userInfo.id,
        token: that.userInfo.loginToken
      });
      try {
        return await that.$axios.post(that.c_my_api.admin, data_);
      } catch (error) {
        console.log(that.c_my_api);
        console.warn(error);
      }
    },
    fn_authorize_list_submit_to_add() {
      const that = this;
      if (that.authorizeUserName == "") {
        that.fn_alert("请填写会员账号");
        return;
      }

      that
        .fn_async_to_log_submit(
          that.authorizeUserName,
          "",
          "authorizationWBStatus",
          "wbStatus",
          that.authorizePicked
        )
        .then(function(re) {
          if (re.data.code === "-9") {
            that.fn_alert("登录超时");
            setTimeout(() => {
              location.reload();
            }, 2000);
          }
          that.$$.console.black(
            "admin >>>>>>>>> fn_authorize_list_submit_to_add >>>>>>>>>>>> " +
              re.data.msg
          );
          that.fn_alert(re.data.msg);
        });
    },
    fn_create_one_user() {
      const that = this;
      if (that.addUserFrom == "" && that.userInfo.agentAdmin == 0) {
        that.fn_alert("不能将会员归到管理员（管理员的直接下线必须为总代），请将会员/代理归属到一个代理账号下");
        return;
      }

      if (that.addUserName == "") {
        that.fn_alert("请填写会员账号");
        return;
      }

      that.fn_async_create_one_user().then(function(re) {
        if (re.data.code === "-9") {
          that.fn_alert("登录超时");
          setTimeout(() => {
            location.reload();
          }, 2000);
        }

        that.$$.console.black(
          "admin >>>>>>>>> fn_authorize_list_submit_to_add >>>>>>>>>>>> " +
            re.data.msg
        );
        that.fn_alert(re.data.msg);
      });
    },
    async fn_async_create_one_user() {
      const that = this;
      const data_ = that.$qs.stringify({
        type: "createOneUser",
        uid: that.userInfo.id,
        token: that.userInfo.loginToken,
        userName: that.addUserName,
        userLevel: that.addUserLevel,
        fromUserID: that.addUserFrom
      });
      try {
        return await that.$axios.post(that.c_my_api.admin, data_);
      } catch (error) {
        console.log(that.c_my_api);
        console.warn(error);
      }
    },
    fn_submit_to_create_one_user() {
      //that.addUserLevel
      const that = this;
      if (that.addUserLevel == "2") {
        const that = this;
        if (that.addUserName == "") {
          that.fn_alert("请填写会员账号");
          return;
        }

        that
          .fn_async_to_log_submit(
            that.addUserName,
            "",
            "user",
            "agentStatus",
            "1"
          )
          .then(function(re) {
            if (re.data.code === "-9") {
              that.fn_alert("登录超时");
              setTimeout(() => {
                location.reload();
              }, 2000);
            }
            that.$$.console.black(
              "admin >>>>>>>>> fn_authorize_list_submit_to_add >>>>>>>>>>>> " +
                re.data.msg
            );
            that.fn_alert(re.data.msg);
          });
      }
      if (that.addUserLevel == "3") {
        that.fn_alert("无法申请成为会员，请让会员自行注册");
      }
      if (that.addUserLevel == "1") {
        that.fn_alert("无法申请成为总代，请联系管理员开通");
      }
    },
    async fn_async_to_log_submit(userName, childID, form, formKey, formValue) {
      const that = this;
      const data_ = that.$qs.stringify({
        type: "submitToUpdate",
        uid: that.userInfo.id,
        token: that.userInfo.loginToken,
        userName: userName,
        childID: childID,
        form: form,
        formKey: formKey,
        formValue: formValue
      });
      try {
        return await that.$axios.post(that.c_my_api.admin, data_);
      } catch (error) {
        console.log(that.c_my_api);
        console.warn(error);
      }
    },
    fn_authorize_list_add() {
      const that = this;
      if (that.authorizeUserName == "") {
        that.fn_alert("请填写会员账号");
        return;
      }

      that
        .fn_async_authorize_list_add(
          that.authorizeUserName,
          that.authorizePicked
        )
        .then(function(re) {
          if (re.data.code === "-9") {
            that.fn_alert("登录超时");
            setTimeout(() => {
              location.reload();
            }, 2000);
          }
          that.$$.console.black(
            "admin >>>>>>>>> fn_authorize_list_add >>>>>>>>>>>> " + re.data.msg
          );
          that.fn_alert(re.data.msg);
        });
    },
    async fn_async_authorize_list_add(userName, wbStatus) {
      const that = this;
      const data_ = that.$qs.stringify({
        type: "insertAuthorization",
        uid: that.userInfo.id,
        token: that.userInfo.loginToken,
        userName: userName,
        wbStatus: wbStatus
      });
      try {
        return await that.$axios.post(that.c_my_api.admin, data_);
      } catch (error) {
        console.log(that.c_my_api);
        console.warn(error);
      }
    },
    fn_show_user_info(json) {
      const that = this;
      let ar = [];
      let action1 = '<a class="btn shareRequired short">修改</a>';
      let action2 = '<a class="btn shareRequired middle">申请修改</a>';
      for (var key in json) {
        let action = "";
        if (that.userLimit.hasOwnProperty(key)) {
          if (that.userLimit[key] === "1") {
            action = action1;
          }
          if (that.userLimit[key] === "2") {
            action = action2;
          }
        }
        if (key !== "id") {
          ar.push([key, json[key], action]);
        }
      }
      that.fn_alert_table("会员详情", ["属性", "值", "操作"], ar, "", false);
      that.alerttable.__clickTD = function(n, td) {
        if (n == "会员详情") {
          let action__ = ar[td[0]][td[1]];
          let key__ = ar[td[0]][0];
          if (action__ == action1) {
            that.fn_new("user|" + key__ + "|" + json["id"]);
          }
          if (action__ == action2) {
            that.fn_submit_new("user|" + key__ + "|" + json["id"]);
          }
        }
      };
    },
    fn_get_my_userList(agentName) {
      const that = this;

      that.userListShow = true;

      agentName = agentName || "";
      if (agentName == "") {
        agentName = that.userInfo.userName;
      }
      that.$$.console.blue("search agent by name :" + agentName);

      if (agentName) {
        const i = that.listLabelName.indexOf(agentName);
        if (i == -1) {
          that.listLabelName.push(agentName);
        } else {
          const l = that.listLabelName.length;
          that.listLabelName.splice(i + 1, l - i);
        }
      } else {
        that.listLabelName = ["线下"];
      }

      if (
        that.agentListTemple[agentName] !== undefined &&
        that.searchNet == "0"
      ) {
        that.userList = that.agentListTemple[agentName];
        that.$$.console.black(
          "admin >>>>>>>>> fn_get_my_userList >>>>>>>>>>>>  from agentListTemple"
        );
        console.log(that.agentListTemple);
        console.log(that.userList);

        return;
      }

      that.fn_async_get_my_userlist(agentName).then(function(re) {
        that.$$.console.black(
          "admin >>>>>>>>> fn_get_my_userList >>>>>>>>>>>> " + re.data.msg
        );

        console.log(re.data);
        if (re.data.code === "1") {
          that.userList = re.data.data.userList;
          that.userLimit = re.data.data.userLimit;
          that.agentListTemple[agentName] = that.userList;
        } else if (re.data.code === "-9") {
          that.fn_alert("登录超时");
          setTimeout(() => {
            location.reload();
          }, 2000);
        } else {
          that.fn_alert(re.data.msg);
        }
        //  that.webSet = re.data.data;
      });
    },
    async fn_async_get_my_userlist(agentName) {
      const that = this;
      const data_ = that.$qs.stringify({
        type: "getMyUsers",
        uid: that.userInfo.id,
        token: that.userInfo.loginToken,
        userName: agentName
      });
      try {
        return await that.$axios.post(that.c_my_api.admin, data_);
      } catch (error) {
        console.log(that.c_my_api);
        console.warn(error);
      }
    },
    fn_new(key) {
      const keyArr = key.split("|");
      const form = keyArr[0];
      const formKey = keyArr[1];
      const _title = this.$chinese[form][formKey];

      this.$emit(
        "child-event-fn-promt",
        _title,
        "点击确定完成修改",
        this.fn_to_update,
        key
      );
    },
    fn_to_update(key, value) {
      if (!value) {
        return;
      }
      this.$$.console.blue("admin want to change " + key + " => " + value);
      const that = this;

      const keyArr = key.split("|");
      const form = keyArr[0];
      const formKey = keyArr[1];
      const userID = keyArr.length >= 3 ? keyArr[2] : that.userInfo.id;
      that
        .fn_async_to_update(
          "doChange",
          that.userInfo.id,
          that.userInfo.loginToken,
          userID,
          form,
          formKey,
          value
        )
        .then(function(re) {
          if (re.data.code === "-9") {
            that.fn_alert("登录超时");
            setTimeout(() => {
              location.reload();
            }, 2000);
          }

          that.$$.console.black(
            "admin >>>>>>>>> fn_to_update >>>>>>>>>>>> " + re.data.msg
          );
          console.log(re.data);

          that.fn_alert(re.data.msg);

          //  that.webSet = re.data.data;
        });
    },
    fn_submit_new(key) {
      const keyArr = key.split("|");
      const form = keyArr[0];
      const formKey = keyArr[1];
      const _title = this.$chinese[form][formKey];

      this.$emit(
        "child-event-fn-promt",
        _title,
        "点击确定完成修改",
        this.fn_submit_to_update,
        key
      );
    },
    fn_submit_to_update(key, value) {
      if (!value) {
        return;
      }
      this.$$.console.red("admin submit to change " + key + " => " + value);
      const that = this;

      const keyArr = key.split("|");
      const form = keyArr[0];
      const formKey = keyArr[1];
      const userID = keyArr.length >= 3 ? keyArr[2] : that.userInfo.id;
      that
        .fn_async_to_update(
          "submitChange",
          that.userInfo.id,
          that.userInfo.loginToken,
          userID,
          form,
          formKey,
          value
        )
        .then(function(re) {
          if (re.data.code === "-9") {
            that.fn_alert("登录超时");
            setTimeout(() => {
              location.reload();
            }, 2000);
          }

          that.$$.console.black(
            "admin >>>>>>>>> fn_submit_to_update >>>>>>>>>>>> " + re.data.msg
          );
          console.log(re.data);

          that.fn_alert(re.data.msg);

          //  that.webSet = re.data.data;
        });
    },
    async fn_async_to_update(
      type,
      uid,
      token,
      childID,
      form,
      formKey,
      formValue
    ) {
      const that = this;
      const data_ = that.$qs.stringify({
        type: type,
        uid: uid,
        token: token,
        childID: childID,
        form: form,
        formKey: formKey,
        formValue: formValue
      });
      try {
        return await that.$axios.post(that.c_my_api.admin, data_);
      } catch (error) {
        console.log(that.c_my_api);
        console.warn(error);
      }
    },
    fn_set_log_submit_result(id, submitResult) {
      const that = this;

      that.logSubmitListShow = true;
      that.fn_async_set_log_submit_result(id, submitResult).then(function(re) {
        that.$$.console.black(
          "admin >>>>>>>>> fn_set_log_submit_result " +
            id +
            "=" +
            submitResult +
            " >>>>>>>>>>>> " +
            re.data.msg
        );
        console.log(re.data);
        if (re.data.code === "1") {
          that.logSubmitListShow = true;
          that.fn_async_get_log_submit_list().then(function(re) {
            that.$$.console.black(
              "admin >>>>>>>>> fn_get_log_submit_list >>>>>>>>>>>> " +
                re.data.msg
            );
            that.logSubmitList = re.data.data;
            console.log(re.data);
            if (re.data.code === "1") {
            } else {
              that.fn_alert(re.data.msg);
            }
            //  that.webSet = re.data.data;
          });
        } else if (re.data.code === "-9") {
          that.fn_alert("登录超时");
          setTimeout(() => {
            location.reload();
          }, 2000);
        } else {
          that.fn_alert(re.data.msg);
        }
        //  that.webSet = re.data.data;
      });
    },
    async fn_async_set_log_submit_result(id, submitResult) {
      const that = this;
      const data_ = that.$qs.stringify({
        type: "updateLogSubmitList",
        uid: that.userInfo.id,
        token: that.userInfo.loginToken,
        childID: id,
        formValue: submitResult
      });
      try {
        return await that.$axios.post(that.c_my_api.admin, data_);
      } catch (error) {
        console.log(that.c_my_api);
        console.warn(error);
      }
    },
    fn_get_log_submit_list() {
      const that = this;

      that.logSubmitListShow = true;
      that.fn_async_get_log_submit_list().then(function(re) {
        that.$$.console.black(
          "admin >>>>>>>>> fn_get_log_submit_list >>>>>>>>>>>> " + re.data.msg
        );

        console.log(re.data);
        if (re.data.code === "1") {
          that.logSubmitList = re.data.data;
        } else if (re.data.code === "-9") {
          that.fn_alert("登录超时");
          setTimeout(() => {
            location.reload();
          }, 2000);
        } else {
          that.fn_alert(re.data.msg);
        }
        //  that.webSet = re.data.data;
      });
    },
    async fn_async_get_log_submit_list() {
      const that = this;
      const data_ = that.$qs.stringify({
        type: "getLogSubmitList",
        uid: that.userInfo.id,
        token: that.userInfo.loginToken
      });
      try {
        return await that.$axios.post(that.c_my_api.admin, data_);
      } catch (error) {
        console.log(that.c_my_api);
        console.warn(error);
      }
    },
    fn_get_admin_limit_by_user() {
      const that = this;

      that.fn_async_get_admin_limit_by_user().then(function(re) {
        that.$$.console.black(
          "admin >>>>>>>>> fn_get_admin_limit_by_id >>>>>>>>>>>> " + re.data.msg
        );

        console.log(re.data);
        if (re.data.code === "1") {
          that.adminLimit = re.data.data;
          if (that.adminLimit.length == 1) {
            that.adminLimitShow = 0;
          }
        } else if (re.data.code === "-9") {
          that.fn_alert("登录超时");
          setTimeout(() => {
            location.reload();
          }, 2000);
        } else {
          that.fn_alert(re.data.msg);
        }
        //  that.webSet = re.data.data;
      });
    },
    async fn_async_get_admin_limit_by_user() {
      const that = this;
      const data_ = that.$qs.stringify({
        type: "getAdminLimits",
        uid: that.userInfo.id,
        token: that.userInfo.loginToken,
        userName: that.getAdminLimitInfoUserName
      });
      try {
        return await that.$axios.post(that.c_my_api.admin, data_);
      } catch (error) {
        console.log(that.c_my_api);
        console.warn(error);
      }
    },
    fn_get_web_set_by_id() {
      const that = this;

      that.fn_async_get_web_set_by_id().then(function(re) {
        that.$$.console.black(
          "admin >>>>>>>>> fn_get_web_set_by_id >>>>>>>>>>>> " + re.data.msg
        );
        console.log(re.data);
        if (re.data.code === "1") {
          that.myWebSet = re.data.data.set;
          if (that.myWebSet.length == 1) {
            that.webSetShow = 0;
          }
          that.myWebSetLimit = re.data.data.limit;
        } else if (re.data.code === "-9") {
          that.fn_alert("登录超时");
          setTimeout(() => {
            location.reload();
          }, 2000);
        } else {
          that.fn_alert(re.data.msg);
        }
        //  that.webSet = re.data.data;
      });
    },
    async fn_async_get_web_set_by_id() {
      const that = this;
      const data_ = that.$qs.stringify({
        type: "getMySiteSetting",
        uid: that.userInfo.id,
        childID:
          that.userInfo.agentAdmin == "0"
            ? that.webNameForSearch
            : that.userInfo.id,
        token: that.userInfo.loginToken
      });
      try {
        return await that.$axios.post(that.c_my_api.admin, data_);
      } catch (error) {
        console.log(that.c_my_api);
        console.warn(error);
      }
    },
    fn_get_lottery_api_by_id(mark) {
      const that = this;
mark=mark||"get";
if(mark=="create"){
  if(that.lotteryApiForSearch==""){
    that.fn_alert("请填写要新增的彩种的代号");
    return;
  }

}
if(mark=="delete"){
  if(that.lotteryApiForSearch==""){
    that.fn_alert("请填写要删除的彩种的代号");
    return;
  }
}
      that.fn_async_get_lottery_api_by_id(mark).then(function(re) {
        that.$$.console.black(
          "admin >>>>>>>>> fn_get_lottery_api_by_id >>>>>>>>>>>> " + re.data.msg
        );
        console.log(re.data);
        if (re.data.code === "1") {
          that.myLotteryApis = re.data.data;
          if (that.myLotteryApis.length == 1) {
            that.lotteryApiShow = 0;
          }
        } else if (re.data.code === "-9") {
          that.fn_alert("登录超时");
          setTimeout(() => {
            location.reload();
          }, 2000);
        } else {
          that.fn_alert(re.data.msg);
        }
        //  that.webSet = re.data.data;
      });
    },
    async fn_async_get_lottery_api_by_id(mark) {
      mark=mark+"MyLotteryApi";
      const that = this;
      const data_ = that.$qs.stringify({
        type: mark,
        uid: that.userInfo.id,
        childID: that.lotteryApiForSearch || "",
        token: that.userInfo.loginToken
      });
      try {
        return await that.$axios.post(that.c_my_api.admin, data_);
      } catch (error) {
        console.log(that.c_my_api);
        console.warn(error);
      }
    },
    fn_prompt_login_reflash_call_back(t) {
      const that = this;

      if (t === "0") {
        console.log(">>> admin fn_prompt_login_reflash_call_back >>> false");
        if (that.$$.getSearch().hasOwnProperty("admin")) {
          console.log(
            '>>> admin fn_prompt_login_reflash_call_back >>> false >>> hasOwnProperty("admin")'
          );
          // location.replace(that.$$.getDomain());
          that.fn_PromptTwo_login();
        } else {
          console.log(
            ">>> admin fn_prompt_login_reflash_call_back >>> false >>> child-event-fn-show-page PageHome"
          );
          that.$emit("child-event-fn-show-page", "PageHome");
        }
      } else if (t === "1") {
        console.log(">>> admin fn_prompt_login_reflash_call_back >>> success");

        that.userInfo = JSON.parse(localStorage.userInfo);
        that.$$.console.black("admin >>>>>>>>> userInfo >>>>>>>>>>>>");
        console.log(that.userInfo);
        if (that.userInfo.agentStatus !== "1") {
          console.log(
            ">>> admin >>> userInfo.agentStatus=" + that.userInfo.agentStatus
          );
          location.replace(that.$$.getDomain());
        } else {
          that.fn_async_get_my_limit().then(function(re) {
            that.$$.console.black(
              "admin >>>>>>>>> get_my_limit >>>>>>>>>>>> " + re.data.msg
            );
            console.log(re.data);
            if (re.data.code === "1") {
              that.myLimit = re.data.data;
            } else if (re.data.code === "-9") {
              that.fn_alert("登录超时");
              setTimeout(() => {
                location.reload();
              }, 2000);
            } else {
              that.fn_alert(re.data.msg);
            }
          });
        }
      } else {
        that.$$.console.red(
          ">>>>>>>>>>>>fn_prompt_login_reflash_call_back>>>>>>>>>>>> t=" + t
        );
      }
    },
    fn_prompt_login_reflash() {
      if (localStorage.userInfo) {
        console.log(
          ">>> fn_prompt_login_reflash >>> localStorage.userInfo yes"
        );
        this.$emit(
          "child-event-fn-check-login",
          this.fn_prompt_login_reflash_call_back
        );
      } else {
        console.log(">>> fn_prompt_login_reflash >>> localStorage.userInfo no");
        this.fn_prompt_login_reflash_call_back("0");
      }
    },
    async fn_async_get_my_limit() {
      const that = this;
      const data_ = that.$qs.stringify({
        type: "getMyLimit",
        uid: that.userInfo.id,
        token: that.userInfo.loginToken
      });
      try {
        return await that.$axios.post(that.c_my_api.admin, data_);
      } catch (error) {
        console.log(that.c_my_api);
        console.warn(error);
      }
    },
    fn_alert_table(title, thArray, tdArray, tips, index) {
      this.alerttable.show = true;
      this.alerttable.title = title || "温馨提示";
      this.alerttable.tips = tips || "";
      this.alerttable.index = index === false ? false : true;
      this.alerttable.thArray = thArray;
      this.alerttable.tdArray = tdArray;
    },
    fn_get_user_log(user) {
      let that = this;
      const data_ = that.$qs.stringify({
        type: "userLog",
        user: user
      });

      that.$axios
        .post(that.api + "admin.php", data_)
        .then(function(response) {
          // handle success
          console.log("success-->fn_admin_alter :");
          console.log(response.data);
          const re = response.data;
          if (re.code == "1") {
            that.user.log = re.data;
            that.fn_alert_table(
              "会员登录日志",
              ["ID", "IP", "Time"],
              that.c_log
            );
          } else if (re.code === "-9") {
            that.fn_alert("登录超时");
            setTimeout(() => {
              location.reload();
            }, 2000);
          } else {
            that.fn_alert(re.msg);
          }
        })
        .catch(function(error) {
          // handle error
          console.log("error-->fn_admin_alter :");
          console.warn(error);
        })
        .then(function() {
          // always executed
        });
    },
    fn_get_user_share(code) {
      let that = this;
      const data_ = that.$qs.stringify({
        type: "userShare",
        code: code
      });

      that.$axios
        .post(that.api + "admin.php", data_)
        .then(function(response) {
          // handle success
          console.log("success-->fn_admin_alter :");
          console.log(response.data);
          const re = response.data;
          if (re.code == "1") {
            that.user.share = re.data;
            const link__ = that.$$.getDomain() + "?plan&share=" + code;
            that.fn_alert_table(
              "会员分享统计",
              ["ID", "IP", "Time", "visitors"],
              that.c_share,
              "分享链接为：" + link__
            );
          } else if (re.code === "-9") {
            that.fn_alert("登录超时");
            setTimeout(() => {
              location.reload();
            }, 2000);
          } else {
            that.fn_alert(re.msg);
          }
        })
        .catch(function(error) {
          // handle error
          console.log("error-->fn_admin_alter :");
          console.warn(error);
        })
        .then(function() {
          // always executed
        });
    },
    fn_get_userList() {
      let that = this;
      const data_ = that.$qs.stringify({
        type: "userList"
      });

      that.$axios
        .post(that.api + "admin.php", data_)
        .then(function(response) {
          // handle success
          console.log("success-->fn_admin_alter :");
          console.log(response.data);
          const re = response.data;
          if (re.code == "1") {
            that.user.base = re.data;
          } else if (re.code === "-9") {
            that.fn_alert("登录超时");
            setTimeout(() => {
              location.reload();
            }, 2000);
          } else {
            that.fn_alert(re.msg);
          }
        })
        .catch(function(error) {
          // handle error
          console.log("error-->fn_admin_alter :");
          console.warn(error);
        })
        .then(function() {
          // always executed
        });
    },
    // fn_swith_toggle(e) {
    //   console.log(
    //     e.target.checked + "____fn_swith_toggle____" + this.info.authorize
    //   );
    //   const value = e.target.checked ? "1" : "0";
    //   this.fn_admin_alter("authorize", value);
    // },
    fn_show_page(v) {
      this.$emit("child-event-fn-show-page", v);
      if (v == "PageHome") location.replace(this.$$.getDomain());
      if (v == "PagePlan") location.replace(this.$$.getDomain() + "?plan");
    },
    fn_PromptTwo_login() {
      this.$emit("child-event-fn-show-login");
    },
    fn_alert(tips, title) {
      this.$emit("child-event-alert", tips, title);
    },
    fn_inint_2() {
      this.$emit("child-event-end-apploading");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@rem: 32/1rem;

#page-admin {
  padding: 0.25rem;
}
p {
  font-size: 12 / @rem;
  padding-top: 0.025rem;
  text-align: left;
  margin-top: 2 / @rem;
}
p span {
  font-size: 12 / @rem;
  color: #ff7600;
  font-weight: bold;
}
p.tips {
  font-size: 10 / @rem;
  color: #777;
  margin-top: 0;
}

li {
  font-size: 0.315rem;
  text-align: left;
}

.fl {
  width: 4.75rem;
  min-height: 50 / @rem;
  box-sizing: border-box;
  padding: 0.25rem;
  padding-right: 0;
  padding-top: 0;
}
.fl:first-of-type {
  border-right: 1 / @rem #ddd solid;
  box-sizing: border-box;
  padding-left: 0;
  padding-right: 0.25rem;
}

.list-table .short {
  margin-left: 0;
}

ul {
  margin-top: 0.5em;
}
.ul-listLabel {
  text-align: left;
}
.ul-listLabel li {
  display: inline-block;
}
.ul-listLabel li a {
  display: inline-block;
  padding: 0 4px;
}
.bottom-border {
  border-bottom: 1 / @rem #ccc solid;
  margin-bottom: 0.25rem;
  padding-bottom: 0.25rem;
}
.info-box {
  width: 100%;
  min-height: 1rem;
  // border-top: 1 / @rem #ccc solid;
  margin-top: 0.25rem;
}

.underline {
  text-decoration: underline;
  cursor: pointer;
}

.info-box {
  width: 100%;
  overflow: auto;
}
.list-table {
  table-layout: fixed;
width: 100%;

}

table.list-table *{
  word-break:break-all;
  max-width: 100%;
  font-size: 12px;
}
table.list-table td p{
  font-size: 12 px;
}
dt {
  font-size: 10 / @rem;
  color: #777;
  margin-top: 0;
  background-color: aquamarine;
  margin-top: 0.125rem;
  padding: 4 / @rem 0;
}
.btn.half > input {
  width: 2.5rem;
}
.backlist {
  display: block;
  width: 9.5rem;
  border-bottom: #777 1 / @rem solid;
  height: 0.75rem;
}
.backlist li {
  display: block;
  float: left;
  width: 1rem;
  padding: 0.125rem;
  box-sizing: border-box;
  height: 0.75rem;
}
.backlist li.active {
  background: #777;
  color: #fff;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}
</style>
