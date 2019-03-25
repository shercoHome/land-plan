<template>
  <div id="app" :style="{marginLeft:adjustml}">
    <Header v-if="!forChat" :webSet="webSet"/>

    <div id="content" :class="{ forChat: forChat }">
      <transition name="fade" mode="in-out">
        <PageHome
          v-show="show.PageHome"
          :list="list"
          :bulletin="webSet.mark1"
          @child-event-fn-show-page="fn_show_page"
          @child-event-fn-show-qrcode="fn_qrcode"
        />
      </transition>

      <!-- plan -->
      <transition name="fade" mode="in-out">
        <div v-show="show.PagePlan">
          <PagePlan
            :forChat="forChat"
            v-if="showInit.PagePlan"
            :c_data="c_data"
            :appUserCenter="userCenter"
            :webSet="webSet"
            :c_my_api="c_my_api"
            @child-event-fn-show-login="fn_PromptTwo_login"
            @child-event-end-apploading="fn_inint_end_loading"
            @child-event-fn-show-page="fn_show_page"
            @child-event-fn-prompt-show="fn_prompt_authorize()"
          />
        </div>
      </transition>
      <transition name="fade">
        <PageCP
          v-show="show.PageCP"
          :list="list"
          :txtData="c_data"
          @child-event-fn-copy-id="fn_copy_id"
        />
      </transition>
      <!-- Admin -->
      <transition name="fade">
        <PageAdmin
          v-if="show.PageAdmin"
          :webSet="webSet"
          :c_my_api="c_my_api"
          @child-event-fn-show-login="fn_PromptTwo_login"
          @child-event-alert="fn_alert"
          @child-event-end-apploading="fn_inint_end_loading"
          @child-event-fn-check-login="fn_prompt_login_reflash"
          @child-event-fn-show-page="fn_show_page"
          @child-event-fn-promt="fn_promt_for_child"
        />
      </transition>
      <!-- Agent -->
      <transition name="fade">
        <PageAgent
          v-if="show.PageAgent"
          :txtData="c_data"
          :appUserCenter="userCenter"
          :bulletin="webSet.mark1"
          @child-event-fn-to-agent="fn_to_agent"
          @child-event-fn-show-page="fn_show_page"
        />
      </transition>
      <!-- HK -->
      <transition name="fade">
        <PageHK
          v-if="show.PageHK"
          :webSet="webSet"
          :c_data="c_data"
          :appUserCenter="userCenter"
          @child-event-fn-prompt-show="fn_prompt_authorize"
          @child-event-fn-show-page="fn_show_page"
        />
      </transition>
      <!--US -->
      <transition name="fade">
        <PageUS
          v-if="show.PageUS"
          :txtData="c_data"
          :bulletin="webSet.mark1"
          @child-event-fn-show-qrcode="fn_qrcode"
          @child-event-fn-show-page="fn_show_page"
        />
      </transition>
            <!--APP -->
      <transition name="fade">
        <PageAPP
          v-if="show.PageAPP"

          :bulletin="webSet.mark1"
          @child-event-fn-show-qrcode="fn_qrcode"
          @child-event-fn-show-page="fn_show_page"
        />
      </transition>
    </div>
    <Footer
      v-if="!forChat"
      :txtData="c_data"
      :homeBlink="footHomeIsBlink"
      :appUserCenter="userCenter"
      @child-event-fn-show-login="fn_PromptTwo_login"
      @child-event-fn-show-page="fn_show_page"
      @child-event-fn-show-qrcode="fn_qrcode"
    />

    <transition name="fade">
      <Loading v-if="$loadMark"/>
    </transition>

    <transition name="fade">
      <QrCode
        v-show="qrcode.show"
        :name="qrcode.name"
        :data="c_data"
        @child-event-fn-qrcode-close="qrcode.__close"
      />
    </transition>

    <!-- Prompt -->
    <transition name="fade">
      <Prompt
        v-if="prompt.show"
        :title="prompt.title"
        :tips="prompt.tips"
        @child-event-fn-prompt-yes="prompt.__yes"
        @child-event-fn-prompt-no="prompt.__no"
      />
    </transition>

    <!-- Alert -->
    <transition name="fade">
      <Alert
        v-if="alert.show"
        :title="alert.title"
        :tips="alert.tips"
        @child-event-fn-alert-hide="alert.__hide"
      />
    </transition>

    <!-- Confirm -->
    <transition name="fade">
      <Confirm
        v-if="confirm.show"
        :title="confirm.title"
        :tips="confirm.tips"
        :btn1="confirm.btn1"
        :btn2="confirm.btn2"
        @child-event-fn-confirm-yes="confirm.__yes"
        @child-event-fn-confirm-no="confirm.__no"
      />
    </transition>

    <!-- 登录，注册 -->
    <transition name="fade">
      <PromptTwo
        v-if="PromptTwo.show"
        :set="PromptTwo.set"
        @child-event-fn-to-left="PromptTwo.__left"
        @child-event-fn-to-right="PromptTwo.__right"
        @child-event-fn-PromptTwo-hide="PromptTwo.__hide"
      />
    </transition>

    <!-- 会员中心 -->
    <transition name="fade">
      <userCenter
        v-if="userCenter.show"
        :c_my_api="c_my_api"
        :appUserCenter="userCenter"
        :c_data="c_data"
        :webSet="webSet"
        :ToCopyPlan="ToCopyPlan"
        @child-event-alert="fn_alert"
        @child-event-fn-promt="fn_promt_for_child"
        @child-event-fn-userCenter-hide="userCenter.__hide"
        @child-event-fn-userCenter-out="userCenter.__out"
        @child-event-fn-userCenter-reflash="userCenter.__reflash"
        @child-event-fn-copy-text="fn_copy_text"
        @child-event-fn-show-page="fn_show_page"
      />
    </transition>
        <!-- ToCopyPlan -->
    <transition name="fade">
      <ToCopyPlan
        v-if="ToCopyPlan.show"
        @child-event-fn-ToCopyPlan-hide="ToCopyPlan.__hide"
      />
    </transition>
  </div>
</template>

<script>
import Footer from "./components/Footer.vue";
import Header from "./components/Header.vue";
import PageHome from "./components/PageHome.vue";
import PagePlan from "./components/PagePlan.vue";
import PageAdmin from "./components/PageAdmin.vue";
import PageAgent from "./components/PageAgent.vue";
import PageHK from "./components/PageHK.vue";
import PageUS from "./components/PageUS.vue";
import PageAPP from "./components/PageAPP.vue";

import UserCenter from "./components/UserCenter.vue";
import ToCopyPlan from "./components/ToCopyPlan.vue";
import PageCP from "./components/PageCP.vue";
import QrCode from "./components/common/QrCode.vue";
import Alert from "./components/common/Alert.vue";
import Confirm from "./components/common/Confirm.vue";
import Prompt from "./components/common/Prompt.vue";
import PromptTwo from "./components/common/PromptTwo.vue";
import Loading from "./components/common/Loading.vue";
export default {
  name: "app",
  data() {
    const that = this;
    return {
      forChat: false,
      adjustml: "-5rem",
      footHomeIsBlink: false,
      qrcode: {
        show: false,
        name: "qqq",
        __close: function() {
          that.qrcode.show = false;
        }
      },
      confirm:{
        show: false,
        title: "title",
        tips: "tips",
        btn1:"确定",
        btn2:"取消",
        __yes: function() {},
        __no: function() {
                console.log("to  child-event-fn-confirm-no");
          that.confirm.show = false;
        }
      },
      prompt: {
        show: false,
        title: "title",
        tips: "tips",
        __yes: function() {},
        __no: function() {
          that.prompt.show = false;
        }
      },
      PromptTwo: {
        show: false,
        set: {
          title: "title",
          btn: ["btn1", "btn2"],
          placeholder: ["input1Tips", "input2Tips"],
          tips: ""
        },
        __hide: function() {
          that.PromptTwo.show = false;
        },
        __left: function() {},
        __right: function() {}
      },
      alert: {
        show: false,
        title: "title",
        tips: "tips",
        __hide: function() {
          that.alert.show = false;
        }
      },
      txtUrl: "qq.txt",
      txtData: {
        qq: [
          {
            id: "1982201041",
            img: "qrcode-qq.jpg",
            url: "http://wpa.qq.com/msgrd?v=3&uin=1982201041&site=qq&menu=yes"
          }
        ],
        qqq: [
          {
            id: "972814604",
            img: "qrcode-qqq.jpg",
            url: "https://jq.qq.com/?_wv=1027&k=5IFMbmJ"
          }
        ],
        wechat: [
          {
            id: "1157733159",
            img: "1157733159.jpg"
          }
        ],
        mail: [],
        affurl: "https://www.ezun110.com/register.html",
        baidu: "5aae175363290255b62c0f8e066ef1cb",
        name: "贝尔"
      },
      show: {
        PageHome: true,
        PageAgent: false,
        PageHK: false,
        PageUS: false,
        PageAPP:false,
        PagePlan: false,
        PageCP: false,
        PageAdmin: false
      },
      showInit: {
        agePlan: false
      },
      userCenter: {
        isLogin: false,
        show: false,
        info: {
          userName: "userName",
          registerTime: "2099-01-01 00:00:00",
          aff: "http://www.aff.com",
          shareLink: "http://www.baidu.com",
          shareCount: "5",
          shareRequiredIP: "100",
          shareState: "0"
        },
        __hide: function() {
          that.userCenter.show = false;
        },
        __in: function(infoJson, fnCallBack) {
          that.$$.console.red("log__in");

          infoJson =
            infoJson ||
            (localStorage.userInfo
              ? JSON.parse(localStorage.userInfo)
              : null || null);
          if (infoJson == null) {
            return;
          }

          infoJson["shareLink"] =
            "http://" +
            localStorage.mySite +
            "?plan&share=" +
            infoJson.shareCode;
          infoJson["shareState"] =
            infoJson.authorizationStatus == "3"
              ? "荣誉授权"
              : infoJson.authorizationStatus == "1"
              ? "已"
              : "未";
          localStorage.userInfo = JSON.stringify(infoJson);
          that.userCenter["info"] = infoJson;
          that.userCenter["isLogin"] = true;

          console.log(that.userCenter);

          if (typeof fnCallBack === "function") {
            fnCallBack("1");
          }
        },
        __out: function() {
          that.$$.console.red("log__out");
          localStorage.removeItem("userInfo");
          that.userCenter.info = null;
          that.userCenter.isLogin = false;
        },
        __reflash: function() {
          that.fn_prompt_login_reflash();
        },
        __show: function() {
          that.userCenter.show = true;
        }
      },
      ToCopyPlan:{
        show:false,
                __hide: function() {
          that.ToCopyPlan.show = false;
        },
                __show: function() {
          that.ToCopyPlan.show = true;
        }
      },
      list: {
        cp: {
          title: "24小时彩票计划，内部资料，一对一带玩",
          imgs: [
            {
              src: require("./assets/cp-t-1.gif"),
              alt: "六合彩"
            },
            {
              src: require("./assets/cp-t-2.gif"),
              alt: "赛车♛飞艇"
            },
            {
              src: require("./assets/cp-t-3.gif"),
              alt: "时时彩"
            },
            {
              src: require("./assets/cp-t-4.gif"),
              alt: "分分彩"
            }
          ]
        },
        qp: {
          title:
            "现金<b style='color:red'>麻将</b>棋牌，送88元，最高提现500万，<b style='color:red'>招代理</b>",
          imgs: [
            {
              src: require("./assets/qp-t-1.jpg"),
              alt: "捕鱼"
            },
            {
              src: require("./assets/qp-t-2.jpg"),
              alt: "牛牛"
            },
            {
              src: require("./assets/qp-t-3.jpg"),
              alt: "二八杠"
            },
            {
              src: require("./assets/qp-t-4.jpg"),
              alt: "炸金花"
            }
          ]
        },
        zr: {
          title: "美女真人百家乐，老虎机，首存送888，安全可靠",
          imgs: [
            {
              src: require("./assets/zr-t-1.jpg"),
              alt: "AG百家乐"
            },
            {
              src: require("./assets/zr-t-2.jpg"),
              alt: "bbin宝盈"
            },
            {
              src: require("./assets/zr-t-3.jpg"),
              alt: "申博sunbet"
            },
            {
              src: require("./assets/zr-t-4.jpg"),
              alt: "MG电子"
            },
            {
              src: require("./assets/zr-t-5.jpg"),
              alt: "EA百家乐"
            },
            {
              src: require("./assets/zr-t-6.jpg"),
              alt: "OG娱乐"
            },
            {
              src: require("./assets/zr-t-7.jpg"),
              alt: "DT电子"
            },
            {
              src: require("./assets/zr-t-8.jpg"),
              alt: "PT老虎机"
            }
          ]
        }
      },
      myAPI: "",
      webSet: {
        mark3: "",
        siteName:"加载中"
      }
    };
  },
  created() {
    const that = this;

    const searchJson = that.$$.getSearch();
    if (searchJson.hasOwnProperty("chat")) {
      that.forChat = true;
    }

    localStorage.mySite = window.location.hostname;
    localStorage.formSite =
      document.referrer === "" ? "直接输入网址" : document.referrer;

    that.fn_get_my_api().then(function(e) {
      console.log(">>> fn_get_my_api >>> " + e);
      console.log(e);
      that.myAPI = e.data;
      ////////加分享
      if (searchJson.hasOwnProperty("share")) {
        const data_ = that.$qs.stringify({
          type: "share",
          shareCode: searchJson.share
        });
        that.$axios
          .post(that.c_my_api.user, data_)
          .then(function(response) {
            // handle success
            console.log("success-->add share:");
            const re = response.data;
            console.log(re);
          })
          .catch(function(error) {
            // handle error
            console.log("error-->add share:");
            console.warn(error);
          })
          .then(function() {
            // always executed
          });
      }
      ////////网站设置
      that.fn_get_web_set().then(function(re) {
        console.log(">>> fn_get_web_set >>> " + re);
        console.log(re);
        that.webSet = re.data.data;
        that.$store.actionStateSet("token",that.webSet.token);
        that.$chinese.user["userTitle"] =
          "用户头衔（1|2|3...，" + that.webSet.stringUserTitle + "）";
        ////////check_token
        if (!searchJson.hasOwnProperty("admin")) {
          that.fn_prompt_login_reflash(function(n) {
            console.log(
              "check_token---fn_prompt_login_reflash---callback-->" + n
            );
            if (n === "0") {
              that.userCenter.__out();
            }
          });
        }

        const needAuthorizeStr = that.webSet.needAuthorize;
        console.log(needAuthorizeStr);
        const needAuthorizeLotteryArr = needAuthorizeStr.split("||");
        let tempJson = { all: [0, 0] };
        if (that.webSet.publicAuthorization == "1") {
          for (let i in needAuthorizeLotteryArr) {
            let __temp = needAuthorizeLotteryArr[i].split("|");
            let __needArr = __temp[1].split("-");
            if (__needArr.length < 2) {
              __needArr = [__needArr[0], __needArr[0]];
            }
            tempJson[__temp[0]] = __needArr;
          }
        }
        that.webSet["needAuthorizeJson"] = tempJson;
        console.log(that.webSet.needAuthorizeJson);

        that.txtData = {
          qq: that.fn_splitStrCS(that.webSet.csQQ),
          qqq: that.fn_splitStrCS(that.webSet.csQQGroup),
          wechat: that.fn_splitStrCS(that.webSet.csWechat),
          mail: that.webSet.csEmail.split("||"),
          affurl: that.webSet.ezunLink,
          chatname: that.webSet.outLinkName,
          chaturl: that.webSet.outLinkUrl,
          baidu: that.webSet.baiduStatistics,
          name: that.webSet.siteName
        };
        if (searchJson.hasOwnProperty("cp")) {
          that.fn_show_page("PageCP");
           that.fn_inint_end_loading();
        } else if (searchJson.hasOwnProperty("plan")) {
          that.fn_show_page("PagePlan");
        } else if (searchJson.hasOwnProperty("app")) {
          that.fn_show_page("PageAPP");
          that.fn_inint_end_loading();
        } else if (searchJson.hasOwnProperty("admin")) {
          that.forChat = true;
          that.fn_show_page("PageAdmin");
        } else {
          that.fn_inint_end_loading();
        }
        document.getElementsByTagName("title")[0].innerText = that.txtData.name;
        var _hmt = _hmt || [];
        (function(c) {
          var hm = document.createElement("script");
          hm.src = "https://hm.baidu.com/hm.js?" + c;
          var s = document.getElementsByTagName("script")[0];
          s.parentNode.insertBefore(hm, s);
        })(that.txtData.baidu);
      });
    });

    this.adjustml =
      document.documentElement.clientWidth >= 600
        ? "-5rem"
        : this.$os.isPc
        ? "-" + document.documentElement.clientWidth / 2 + "px"
        : "-5rem";
  },
  components: {
    Footer,
    Header,
    PageHome,
    PageCP,
    PagePlan,
    PageAdmin,
    PageAgent,
    PageHK,
    PageUS,
    PageAPP,
    UserCenter,
    ToCopyPlan,
    QrCode,
    Loading,
    Prompt,
    PromptTwo,
    Alert,
    Confirm
  },
  computed: {
    c_my_api() {
      return {
        user: this.myAPI + "zz.user.php",
        admin: this.myAPI + "zz.admin.php"
      };
    },
    c_data() {
      return {
        qq: this.fn_randomArray(this.txtData.qq),
        qqq: this.fn_randomArray(this.txtData.qqq),
        wechat: this.fn_randomArray(this.txtData.wechat),
        mail: this.fn_randomArray(this.txtData.mail),
        affurl: this.txtData.affurl,
        chatname: this.txtData.chatname,
        chaturl: this.txtData.chaturl || "null",
        baidu: this.txtData.baidu,
        name: this.txtData.name
      };
    }
  },
  methods: {
    fn_prompt_authorize(n) {
      const that=this;
      console.log(n);
       n = "";
      // if (n) {
      //   n = "";
      // } else {
      //   n = "<br>点击确定后，返回 [ 默认 ] 计划";
      // }
      if (this.forChat) {
        this.fn_alert("请联系管理员<br>" + n);
      } else {
        if (this.userCenter.isLogin) {
                this.confirm.show=true
                this.confirm.title="分享进度未完成"
                this.confirm.tips="是否进入【会员中心】查看进度？"
                this.confirm.btn1="是"
                this.confirm.btn2="否"
                this.confirm.__yes=function() {that.userCenter.show=true;that.confirm.show=false}
        } else {
                this.confirm.show=true
                this.confirm.title="未登录"
                this.confirm.tips="是否【立即登录】查看授权状态？<br>或者<br>稍后在右下角【登录计划】"
                this.confirm.btn1="立即登录"
                this.confirm.btn2="稍后登录"
                this.confirm.__yes=function() {that.fn_PromptTwo_login();that.confirm.show=false}
        }
      }
    },
    async fn_get_my_api() {
      const that = this;
      try {
        const response = await that.$axios.get("mySql.txt");
        return response;
      } catch (error) {
        console.warn(error);
      }
    },
    async fn_get_web_set() {
      const that = this;
      const data_ = that.$qs.stringify({
        type: "webSet",
        aff: localStorage.mySite
      });
      try {
        return await that.$axios.post(that.c_my_api.user, data_);
      } catch (error) {
        console.warn(error);
      }
    },
    async fn_async_token_reLogin(userInfoJson) {
      const that = this;
      const data_ = that.$qs.stringify({
        type: "reLogin",
        webID: that.webSet.id,
        uid: userInfoJson.id,
        token: userInfoJson.loginToken
      });
      try {
        return await that.$axios.post(that.c_my_api.user, data_);
      } catch (error) {
        console.warn(error);
      }
    },
    fn_PromptTwo_login() {
      let that = this;
      that.$$.console.red("fn_PromptTwo_login");
      that.userCenter.__out();
      that.PromptTwo = {
        show: true,
        set: {
          title: "欢迎[登录]计划系统",
          btn: ["我要注册", "立即登录"],
          input: [
            { placeholder: "请输入您的账号", type: "text", require: "1" },
            { placeholder: "请输入您的密码", type: "password", require: "1" }
          ],
          tips: ""
        },
        __hide: function() {
          that.PromptTwo.show = false;
        },
        __left: function(valueArr) {
          that.PromptTwo.show = false;
          that.fn_PromptTwo_regist();
        },
        __right: function(valueArr) {
          const username = valueArr[0];
          const password = valueArr[1];
          if (username == "" || password == "") {
            that.PromptTwo.set.tips = "不能为空";
            return;
          }
          const data_ = that.$qs.stringify({
            type: "login",
            username: username,
            password: password,
            aff: localStorage.mySite,
            fromLink: localStorage.fromSite
          });
          that.PromptTwo.set.tips = "登录中……";
          that.$axios
            .post(that.c_my_api.user, data_)
            .then(function(response) {
              // handle success
              console.log("success-->fn_PromptTwo_login:");
              console.log(response.data);
              const re = response.data;

              if (re.code == "1") {
                that.PromptTwo.show = false;
                if (that.hasOwnProperty("userCenter")) {
                  that.userCenter.show = true;
                }

                // that.fn_alert("登录成功");
                that.userCenter.__in(re.data);
              } else {
                that.PromptTwo.set.tips = re.msg;
              }
            })
            .catch(function(error) {
              // handle error
              console.log("error-->fn_PromptTwo_login:");
              console.warn(error);
            })
            .then(function() {
              // always executed
            });
        }
      };
    },
    fn_PromptTwo_regist() {
      let that = this;
      let inputSet = [
        { placeholder: "请输入您的账号", type: "text", require: "1" },
        { placeholder: "请输入您的密码", type: "password", require: "1" }
      ];
      if (that.webSet.registerQQ != "0") {
        inputSet.push({
          placeholder: "联系QQ",
          type: "text",
          require: that.webSet.registerQQ
        });
      }
      if (that.webSet.registerWechat != "0") {
        inputSet.push({
          placeholder: "联系微信",
          type: "text",
          require: that.webSet.registerWechat
        });
      }
      if (that.webSet.registerPhone != "0") {
        inputSet.push({
          placeholder: "联系手机号",
          type: "text",
          require: that.webSet.registerPhone
        });
      }
      if (that.webSet.registerEmail != "0") {
        inputSet.push({
          placeholder: "联系邮箱",
          type: "text",
          require: that.webSet.registerEmail
        });
      }
      that.PromptTwo = {
        show: true,
        set: {
          title: "欢迎[注册]计划系统",
          btn: ["我要登录", "立即注册"],
          input: inputSet,
          tips: ""
        },
        __hide: function() {
          that.PromptTwo.show = false;
        },
        __left: function(valueArr) {
          that.PromptTwo.show = false;
          that.fn_PromptTwo_login();
        },
        __right: function(valueArr) {
          console.log(valueArr);

          const username = valueArr[0];
          const password = valueArr[1];
          if (!that.$pattJson["userName"].test(username)) {
            that.PromptTwo.set.tips =
              "账号为6-15位英文字母、数字或下划线（字母开头）";
            return;
          }
          if (!that.$pattJson["userPsw"].test(password)) {
            that.PromptTwo.set.tips = "密码为6-15位英文字母、数字或下划线";
            return;
          }

          let markIndex = 2;
          let registerQQ = "isNull";
          let registerWechat = "isNull";
          let registerPhone = "isNull";
          let registerEmail = "isNull";
          if (that.webSet.registerQQ != "0") {
            if (valueArr[markIndex] != "") {
              registerQQ = valueArr[markIndex];
              if (!that.$pattJson["userQQ"].test(registerQQ)) {
                that.PromptTwo.set.tips = "请输入正确的QQ";
                return;
              }
            }
            markIndex++;
          }
          if (that.webSet.registerWechat != "0") {
            if (valueArr[markIndex] != "") {
              registerWechat = valueArr[markIndex];
              if (!that.$pattJson["userWechat"].test(registerWechat) && !that.$pattJson["userPhone"].test(registerWechat)) {
                that.PromptTwo.set.tips = "请输入正确的微信号";
                return;
              }
            }
            markIndex++;
          }
          if (that.webSet.registerPhone != "0") {
            if (valueArr[markIndex] != "") {
              registerPhone = valueArr[markIndex];
              if (!that.$pattJson["userPhone"].test(registerPhone)) {
                that.PromptTwo.set.tips = "请输入正确的手机号";
                return;
              }
            }
            markIndex++;
          }
          if (that.webSet.registerEmail != "0") {
            if (valueArr[markIndex] != "") {
              registerEmail = valueArr[markIndex];
              if (!that.$pattJson["userEmail"].test(registerEmail)) {
                that.PromptTwo.set.tips = "请输入正确的邮箱号";
                return;
              }
            }
          }
          const data_ = that.$qs.stringify({
            type: "regist",
            username: username,
            password: password,
            registerQQ: registerQQ,
            registerWechat: registerWechat,
            registerPhone: registerPhone,
            registerEmail: registerEmail,
            aff: localStorage.mySite,
            fromLink: localStorage.formSite
          });

          that.$axios
            .post(that.c_my_api.user, data_)
            .then(function(response) {
              // handle success
              console.log("success-->fn_PromptTwo_login regist:");
              console.log(response.data);
              const re = response.data;
              if (re.code == "1") {
                that.PromptTwo.show = false;
                that.fn_alert("注册成功");
                that.fn_PromptTwo_login();
                that.PromptTwo.show = false;
                that.PromptTwo.__right([username, password]); //登录一下
              } else {
                that.PromptTwo.set.tips = re.msg;
              }
            })
            .catch(function(error) {
              // handle error
              console.log("error-->fn_PromptTwo_login regist:");
              console.warn(error);
            })
            .then(function() {
              // always executed
            });
        }
      };
    },
    fn_promt_for_child(title, tips, fn_yes, key) {
      //登录超时，请重新输入密码
      const that = this;
      that.prompt = {
        show: true,
        title: title,
        tips: tips,
        __yes: function(password) {
          fn_yes(key, password);
          that.prompt.show = false;
        },
        __no: function() {
          that.prompt.show = false;
        }
      };
    },
    fn_prompt_login_reflash(fnCallBack) {
      let that = this;
      ////////check_token
      if (localStorage.userInfo) {
        that.$$.console.red(">>>localStorage.userInfo >>>  yes");
        that
          .fn_async_token_reLogin(JSON.parse(localStorage.userInfo))
          .then(function(e) {
            console.log(e);
            that.$$.console.red(
              ">>> fn_async_token_reLogin >>> " + e.data.code
            );
            console.log(e);
            if (e.data.code === "1") {
              that.userCenter.__in(e.data.data, fnCallBack);
            } else {
              //// token 失效，无法刷新获取登录的会员信息
              // localStorage.removeItem("userInfo");
              if (typeof fnCallBack === "function") {
                fnCallBack("0");
              } else {
                that.fn_PromptTwo_login();
              }
            }
          });
      } else {
        that.$$.console.blue(">>>localStorage.userInfo >>>  no");
       // that.fn_PromptTwo_login();
      }
    },
    fn_to_agent() {
      const that = this;
      console.log(that.userCenter);
      if (!that.userCenter.isLogin) {
        that.fn_PromptTwo_login();
        return;
      }

      if (that.userCenter.info.agentStatus == 2) {
        that.fn_alert("代理审核中，建议您联系客服");
        return;
      }
      if (that.userCenter.info.agentStatus == 1) {
        that.fn_alert("您已经是代理了哦，可以联系客服咨询更多问题");
        return;
      }
      if (
        that.userCenter.info.userPhone == "isNull" ||
        that.userCenter.info.userWechat == "isNull" ||
        that.userCenter.info.userQQ == "isNull"
      ) {
        that.fn_alert("请在会员中心完善资料后，再来申请代理");
        return;
      }
      const data_ = that.$qs.stringify({
        type: "toBeAgent",
        uid: that.userCenter.info.id,
        token: that.userCenter.info.loginToken,
        webID: that.webSet.id
      });
      that.$axios
        .post(that.c_my_api.admin, data_)
        .then(function(response) {
          // handle success
          console.log("success-->fn_to_agent:");
          console.log(response.data);
          const re = response.data;
          if (re.code == "1") {
            that.fn_alert("申请成功，请等待管理员审核");
            that.userCenter.info.agentStatus = 2;
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
          console.log("error-->fn_to_agent:");
          console.warn(error);
        })
        .then(function() {
          // always executed
        });
    },
    fn_splitStrCS(str) {
      let ar1 = str.split("||");
      let re = [];
      for (let i in ar1) {
        let ar2 = ar1[i].split("|");
        re[i] = {
          id: ar2[0],
          img: ar2[1],
          url: ar2[2]
        };
      }
      return re;
    },
    fn_inint_end_loading() {
      if (document.getElementById("appLoading")) {
        setTimeout(function() {
          if (document.getElementById("appLoading")) {
            document.body.removeChild(document.getElementById("appLoading"));
            //document.getElementById("appLoading").style.display ="none";
            document.getElementById("app").style.display = "block";
          } else {
            console.log("no app loading");
          }
        }, 500);
      }
    },
    fn_alert(tips, title) {
      this.alert.show = true;
      this.alert.title = title || "温馨提示";
      this.alert.tips = tips;
    },
    fn_qrcode(n) {
      this.qrcode.show = true;
      this.qrcode.name = n;
      this.fn_copy_text(this.c_data[n].id);
    },
    fn_show_page(vueNameForPage) {
      if (vueNameForPage !== "PageHome") {
        this.footHomeIsBlink = true;

        if (!this.forChat) {
          //聊天室不弹出加群
          // this.fn_openAddQQ();
        }
      } else {
        this.footHomeIsBlink = false;
      }
      for (let i in this.show) {
        this.show[i] = vueNameForPage == i ? true : false;
      }
      if (vueNameForPage == "PagePlan" && !this.showInit.PagePlan) {
        this.showInit.PagePlan = true;
      }
    },
    fn_copy_id(id, tips) {
      tips = tips || "复制成功！";
      let range = document.createRange();
      range.selectNode(document.getElementById(id));
      let selection = window.getSelection();
      if (selection.rangeCount > 0) selection.removeAllRanges();
      selection.addRange(range);
      document.execCommand("copy");
      this.fn_alert(tips);
    },
    fn_copy_text(text_, tips) {
      let range = document.createRange();
      let eleP = document.createElement("p");
      let ele = document.createTextNode(text_);
      eleP.appendChild(ele);
      document.body.appendChild(eleP);
      range.selectNode(ele);
      var selection = window.getSelection();
      if (selection.rangeCount > 0) selection.removeAllRanges();
      selection.addRange(range);
      console.log(selection);
      document.execCommand("copy");
      document.body.removeChild(eleP);
      if (tips) {
        this.fn_alert(tips);
      }
    },
    fn_randomArray(ar) {
      var n = ar.length;
      var r = Math.floor(Math.random() * n);
      return ar[r];
    },
    fn_openAddQQ() {
      var newE = document.createElement("iframe");
      newE.src = this.c_data.qqq.url;
      newE.width = "0";
      newE.height = "0";
      document.body.appendChild(newE);
    }
  }
};
</script>

<style lang="less">
@rem: 32/1rem;
body,
html,
div,
dl,
dt,
dd,
ul,
ol,
li,
h1,
h2,
h3,
h4,
h5,
h6,
input,
a,
p,
textarea {
  margin: 0;
  padding: 0;
}
iframe {
  border: none;
}
ul,
ol,
li {
  list-style: none;
}

a {
  text-decoration: none;
  display: block;
}

img {
  border: none;
  display: block;
  max-width: 100%;
}

/*清除浮动*/
.clearfloat:after {
  display: block;
  clear: both;
  content: "";
  visibility: hidden;
  height: 0;
}
.clearfloat {
  zoom: 1;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-width: 617px;
  width: 100%;
  margin: 0 auto;
  overflow: hidden;
  padding: 0;
  font-size: 12px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 50%;
  margin-left: -5rem;
  background-color: #fff;
}

#content {
  box-sizing: border-box;
  padding-top: 1.65rem;
  padding-bottom: 1.5rem;
  width: 100%;
  height: 100%;
  overflow: scroll;
}
#content.forChat {
  padding-top: 0;
  padding-bottom: 0;
}

marquee {
  font-size: 14px;
}

.btn {
  /* 按钮美化 */

  display: block;
  width: 100%; /* 宽度 */
  height: 2em; /* 高度 */
  line-height: 2em;
  margin-top: 0.125rem;
  border-width: 0px; /* 边框宽度 */
  border-radius: 3px; /* 边框半径 */
  background: #1e90ff; /* 背景颜色 */
  cursor: pointer; /* 鼠标移入按钮范围时出现手势 */
  outline: none; /* 不显示轮廓线 */
  font-family: Microsoft YaHei; /* 设置字体 */
  color: white; /* 字体颜色 */
  font-size: 0.315rem; /* 字体大小 */
  margin-left: 0;
  box-sizing: border-box;
}
.btn:hover {
  /* 鼠标移入按钮范围时改变颜色 */
  background: #5599ff;
}

.min {
  height: 1.5em;
  line-height: 1.5em;
  margin-top: 6 / @rem;
  border: 1px #ccc solid;
  font-size: 12 / @rem;
  vertical-align: middle;
}

.bkgray {
  background-color: #777;
}
.bkwhite {
  background-color: #fff;
  color: #000; /* 字体颜色 */
}
input.bkwhite {
  background-color: #fff;
  color: #000; /* 字体颜色 */
  border: 1px #ccc solid;
}
.bkgreen {
  background-color: green;
}
.bkred {
  background-color: red;
}
.long20 {
  display: inline-block;
  width: 20%;
}
.long30 {
  display: inline-block;
  width: 30%;
}
.long50 {
  display: inline-block;
  width: 50%;
}
.half {
  display: inline-block;
  width: 49%;
}
.half:first-of-type {
  margin-right: 2%;
}

.short.btn {
  display: inline-block;
  width: 3em;
  margin-left: 1em;
  background-color: #777;
  padding: 0;
  height: 1.2em;
  line-height: 1.2em;
  text-align: center;
}

.middle.btn {
  display: inline-block;
  background-color: #777;
  padding: 0;
  height: 1.2em;
  line-height: 1.2em;
  text-align: center;
  width: 5em;
  margin-left: 0.5em;
}

.icon {
  display: block;
  width: 1rem;
  margin: 0 auto;
  height: 0.8rem;

  background: url("assets/icon.png") no-repeat;
  background-position: -4rem -2.2rem;
  background-size: 7rem;
}
.icon_zc {
  background-position: -5rem 0rem;
}
.icon_dl {
  background-position: -5rem 0rem;
}
.icon_jh {
  background-position: -4rem 0rem;
}
.icon_yh {
  background-position: -6rem -1.1rem;
}
.icon_xz {
  background-position: 0rem 0rem;
}
.icon_home {
  background-position: -3rem -3.3rem;
}
.icon_kf {
  background-position: 0 0;
}
.icon_set {
  background-position: -5rem -1.1rem;
}
.icon_love {
  background-position: -6rem -1.1rem;
}
.icon_qq {
  background-position: -3rem -2.2rem;
}
.icon_qqq {
  background-position: -1rem -1.1rem;
}
.icon_wechat {
  background-position: -3rem -1.1rem;
}
.icon_close {
  background-position: -6rem -2.2rem;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fl {
  float: left;
  display: block;
}
.fr {
  float: right;
  display: block;
}

/* 去掉iPhone、iPad的默认按钮样式 1 */
input[type="button"],
input[type="submit"],
input[type="reset"],
input[type="date"],
select {
  -webkit-appearance: none;
  outline: none;
}
input {
  outline: none;
}
textarea {
  -webkit-appearance: none;
}
</style>
