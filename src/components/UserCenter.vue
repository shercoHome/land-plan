<template>
  <div class="alert userCenter">
    <div class="alert-content">
      <span class="icon icon_close" @click="fn_close"></span>
      <p>
        <span>注册账号</span>
        ：{{userCenter.info.userName}}
        <a
          class="btn middle letter"
          @click="fn_alert_letter"
        >消息<label :class="{ unRead: letter.unRead>0 }">({{letter.unRead}}/{{letter.count}})</label></a>
      </p>
      <p>
        <span>账号类型</span>：{{c_user_title}}{{userCenter.info.agentStatus==1?"代理":"会员"}}
        <a
          class="btn middle"
          @click="fn_reSetPSW"
        >修改密码</a>

        <!-- <a
          v-if="userCenter.info.agentStatus==0 && webSet.submitUpdateUserLevel==1"
          class="btn middle"
           @click="fn_show_page('PageUS')"
        >申请成为代理</a>-->
        <!-- <a v-if="userCenter.info.agentStatus==2" class="btn middle bk-gray">代理审核中</a> -->
        <!-- <a v-if="userCenter.info.agentStatus==1" class="btn middle" @click="$$.blank2Url('http://planconsole.top')">代理后台</a> -->
      </p>
      <p>
        <span>注册时间</span>
        ：{{userCenter.info.registerTime}}
      </p>
      <p>
        <span>计划网址</span>
        ：{{userCenter.info.aff}}
      </p>
      <p>
        <span>我的QQ</span>
        ：{{userCenter.info.userQQ=='isNull'?'请完善':userCenter.info.userQQ}}
        <a
          v-if="webSet.updateUserQQ==1"
          class="btn short bk-gray"
          @click="fn_update_contact_info('userQQ')"
        >修改</a>
      </p>
      <p>
        <span>我的微信</span>
        ：{{userCenter.info.userWechat=='isNull'?'请完善':userCenter.info.userWechat}}
        <a
          v-if="webSet.updateUserWechat==1"
          class="btn short bk-gray"
          @click="fn_update_contact_info('userWechat')"
        >修改</a>
      </p>
      <p>
        <span>我的手机</span>
        ：{{userCenter.info.userPhone=='isNull'?'请完善':userCenter.info.userPhone}}
        <a
          v-if="webSet.updateUserPhone==1"
          class="btn short bk-gray"
          @click="fn_update_contact_info('userPhone')"
        >修改</a>
      </p>
      <p>
        <span>我的邮箱</span>
        ：{{userCenter.info.userEmail=='isNull'?'请完善':userCenter.info.userEmail}}
        <a
          v-if="webSet.updateUserEmail==1"
          class="btn short bk-gray"
          @click="fn_update_contact_info('userEmail')"
        >修改</a>
      </p>
      <p
        v-show="userCenter.info.userQQ==''||userCenter.info.userQQ=='isNull'||userCenter.info.userWechat==''||userCenter.info.userWechat=='isNull'||userCenter.info.userPhone==''||userCenter.info.userPhone=='isNull'||userCenter.info.userEmail==''||userCenter.info.userEmail=='isNull'"
        style="color:red"
      >完善资料即有机会免费获取【永久授权】</p>
      <p>
        <span>分享链接</span>
        ：{{userCenter.info.shareLink}}
        <a class="btn" @click="fn_copy_text">复制分享链接</a>
      </p>
      <p v-if="userCenter.info.shareRequiredIP!=0">
        <span>分享进度</span>
        ：{{userCenter.info.shareCount}}/{{userCenter.info.shareRequiredIP}}
        <a
          class="btn short"
          @click="fn_reflash"
        >刷新</a>
      </p>
      <p v-else>
        <span>分享成就</span>
        ：{{userCenter.info.shareCount}}
        <a class="btn short" @click="fn_reflash">刷新</a>
      </p>
      <p
        v-if="userCenter.info.shareRequiredIP!=0"
        class="tips"
      >显示有多少位好友访问了您的分享链接，达到{{userCenter.info.shareRequiredIP}}后，可解锁下方的授权</p>
      <p v-else class="tips">显示有多少位好友访问了您的分享链接</p>
      <p>
        <span>授权状态</span>
        ：{{userCenter.info.shareState}}
        <small
          v-show="c_quickAuthorization"
          class="show-link"
        >点击进入>></small>
        <a v-show="c_quickAuthorization" class="btn quick-authorization" @click="fn_show_info">快速授权</a>
      </p>
      <p class="tips">已授权的会员，可以查看更精准的计划、获取更详细的内部资料、享受更贴心的全面服务</p>
      <p>
        <a class="btn" @click="fn_logout">安全退出</a>
      </p>
    </div>
    <transition name="fade">
      <Confirm
        v-if="confirm.show"
        :title="confirm.title"
        :tips="confirm.tips"
        :btn1="confirm.btn1"
        @child-event-fn-confirm-yes="confirm.__yes"
        @child-event-fn-confirm-no="confirm.__no"
      />
    </transition>
  </div>
</template>

<script>
import Alert from "./common/Alert.vue";
import Confirm from "./common/Confirm.vue";

export default {
  name: "UserCenter",
  data() {
    const that = this;
    return {
      confirm: {
        show: false,
        title: "title",
        tips: "tips",
        btn1: "确定",
        __yes: function() {},
        __no: function() {
          that.confirm.show = false;
        }
      },
      userCenter: this.appUserCenter
    };
  },
  props: {
    letter:Object,
    c_my_api: Object,
    appUserCenter: Object,
    c_data: Object,
    webSet: Object,
    ToCopyPlan: Object
  },
  computed: {
    c_quickAuthorization() {
      return this.userCenter.info.shareState == "未" ? true : false;
    },
    c_user_title() {
      const arr = this.webSet.stringUserTitle.split("|");
      const ii = this.userCenter.info.userTitle;
      return arr[ii - 1];
    }
  },
  components: {
    Alert,
    Confirm
  },
  mounted() {},
  created() {},
  methods: {
    fn_show_page(v) {
      if (v == "PageAdmin") {
        location.replace(this.$$.getDomain() + "?admin");
      }

      this.userCenter.__hide();

      this.$emit("child-event-fn-show-page", v);
    },
    fn_alert_letter(){
      this.$emit("child-event-alert-letter");
    },
    fn_close() {
      this.$emit("child-event-fn-userCenter-hide");
    },
    fn_copy_text() {
      this.ToCopyPlan.__show();
      this.$emit("child-event-fn-copy-text", this.userCenter.info.shareLink);
    },
    fn_logout() {
      this.$$.console.red("userCenter-->fn_logou");
      this.$emit("child-event-fn-userCenter-out");
      this.$emit("child-event-fn-userCenter-hide");
    },
    fn_reflash() {
      this.$emit("child-event-fn-userCenter-reflash");
    },
    fn_alert(tips, title) {
      this.$emit("child-event-alert", tips, title);
    },
    fn_reSetPSW() {
      this.$emit("child-event-fn-reSetPSW");
    },
    fn_promt_for_child(title, tips, fn_yes, key) {
      this.$emit("child-event-fn-promt", title, tips, fn_yes, key);
    },
    fn_update_contact_info(key) {
      const that = this;

      const _title = this.$chinese["user"][key];

      that.fn_promt_for_child(
        "请输入新的" + _title,
        "",
        function(k, v) {
          that.$$.console.red(k + "=" + v);

          if (
            !that.$pattJson[k].test(v) &&
            !(k == "userWechat" && that.$pattJson["userPhone"].test(v))
          ) {
            that.fn_alert("输入不正确！");
            return;
          }

          that.fn_async_update_contact_info(k, v).then(function(re) {
            that.$$.console.black(
              "admin >>>>>>>>> fn_update_contact_info >>>>>>>>>>>> " +
                re.data.msg
            );
            console.log(re.data);
            if (re.data.code == "1") {
              that.userCenter.info[k] = v;
            }
            that.fn_alert(re.data.msg);
          });
        },
        key
      );
    },
    async fn_async_update_contact_info(k, v) {
      const that = this;
      const data_ = that.$qs.stringify({
        type: "updateUser",
        uid: that.userCenter.info.id,
        token: that.userCenter.info.loginToken,
        formKey: k,
        formValue: v
      });
      try {
        return await that.$axios.post(that.c_my_api.user, data_);
      } catch (error) {
        console.warn(error);
      }
    },
    fn_show_info() {
      console.log(this.c_data);
      // this.alert.show= true;
      // this.alert.title="快速授权";
      // this.alert.tips= '在推荐网站充值1000元<br><br>直接联系管理员快速授权<br><br>微信号：'+this.c_data.wechat.id;

      const that = this;

      this.confirm.show = true;
      this.confirm.title = "快速授权";
      this.confirm.tips =
        "在推荐平台注册并娱乐<br><br>可以联系下方管理员快速授权<br><br>微信号：" +
        this.c_data.wechat.id;
      this.confirm.btn1 = "注册入口";
      this.confirm.__yes = function() {
        that.$$.blank2Url(that.c_data.affurl);
      };
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@rem: 32/1rem;
.alert {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.7);
}

.alert-content {
  position: relative;
  width: 8rem;

  margin: 0 auto;

  top: 50%;
  transform: translateY(-50%);

  background: #fff;
  text-align: center;
  padding: 0.5rem;
  box-sizing: border-box;
  border-radius: 4px;
}
.alert-content img {
  width: 5rem;
  border: 1px #ddd solid;
  margin: 0 auto;
}
.alert-content p {
  font-size: 12 / @rem;
  padding-top: 0.125rem;
  text-align: left;
  margin-top: 2 / @rem;
}
.alert-content p span {
  font-size: 12 / @rem;
  color: #ff7600;
  font-weight: bold;
}
.alert-content p.tips {
  font-size: 10 / @rem;
  color: #777;
  margin-top: 0;
}
.icon_close {
  position: absolute;
  right: 0;
  top: 0;
}

.btn {
  /* 按钮美化 */

  display: inline-block;
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

  text-align: center;
}
.btn:hover {
  /* 鼠标移入按钮范围时改变颜色 */
  background: #5599ff;
}
.short.btn {
  width: 3em;
  margin-left: 1em;
  background-color: #777;
}
.bk-gray {
  background-color: #777 !important;
}
.middle.btn {
  width: 7em;
  margin-left: 0.5em;
  background-color: #1e90ff;
}
.quick-authorization.btn,
.aff {
  width: 5em;
  // margin-left: 1em;
  background-color: red;
  height: 1.8em;
  line-height: 1.8em;
}
.show-link {
  font-size: 10 / @rem;
  margin: 0 0.5em 0 3em;
}
.aff {
  background-color: #ff2600;
}
.letter label{padding-left: 0.25em;}
.letter label.unRead{color: #ff7600;font-weight: bold;}
</style>
