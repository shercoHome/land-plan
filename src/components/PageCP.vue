<template>
  <div id="page-cp">
    <marquee scrollamount="3">2019最精准 勇敢的计划，6期包赔，如需赔付请加微信</marquee>
    <div style="width:100%;height:6rem;"></div>
    <div class="qr">
      <img :src="txtData.qqq.img">
      <span>回血QQ群</span>
      <p id="qqqID">{{txtData.qqq.id}}</p>
      <button @click="fn_copy_id('qqqID','QQ群号复制成功，请直接长按粘贴 -- 查找 -- 加入计划群！')">点击复制QQ群号</button>
    </div>
    <div class="qr">
      <img :src="txtData.wechat.img">
      <span>回血微信群</span>
      <p id="wechatID">{{txtData.wechat.id}}</p>
      <button @click="fn_copy_id('wechatID','微信号已复制成功，选择微信添加朋友，长按粘贴添加VIP导师！')">点击复制微信号</button>
    </div>
    <a :href="txtData.affurl" target="_blank">
      <img class="qr" src="../assets/img_01.jpg">
    </a>
    <a :href="txtData.affurl" target="_blank">
      <img class="qr" src="../assets/img_02.jpg">
    </a>
    <a :href="txtData.affurl" target="_blank">
      <img class="qr" src="../assets/img_03.jpg">
    </a>
    <a :href="txtData.affurl" target="_blank">
      <img class="qr" src="../assets/img_04.jpg">
    </a>

    <div class="qr yh" style="width:92%">
      <a class="title" :href="txtData.affurl" target="_blank">
        <h2>优惠活动</h2>
      </a>
      <a :href="txtData.affurl" target="_blank">❶【棋牌钜惠】每天存多少送多少，招棋牌代理</a>
      <a :href="txtData.affurl" target="_blank">❷【签到彩金】每周星期天联系“在线客服”领取</a>
      <a :href="txtData.affurl" target="_blank">❸【免费红包】每天可以领取3次、0点重新刷新</a>
      <a :href="txtData.affurl" target="_blank">❹【首存活动】首存送388元、最高送10000元</a>
      <a :href="txtData.affurl" target="_blank">
        ❺【更多福利】
        <b>☞点击下方联系客服☜</b>
      </a>
    </div>
    <div class="clearfloat"></div>
  </div>
</template>

<script>
export default {
  name: "PageCP",
  data() {
    return {};
  },
  props: {
    list: Object,
    txtData: Object
  },
  computed: {},
  components: {},
  methods: {
    fn_copy_id(v,msg) {
      console.log("cp-fn_copy_id:" + v);
      this.$emit("child-event-fn-copy-id", v,msg);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
#page-cp {
  background: #f0e3af url("../assets/cp-banner.jpg") no-repeat left top;
  background-size: 100% auto;
  margin-bottom: -20px;
}
marquee {
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
}
.qr {
  width: 44%;
  margin-top: 1em;
  margin-left: 4%;
  float: left;
  text-align: center;
  color: #000;
}
.qr img {
  width: 150px;
  margin: 0 auto;
}
.qr span,
.qr p {
  display: block;
  width: 100%;
  padding: 2px 0;
  font-size: 14px;
}
.qr.yh {
  padding-bottom: 60px;
}
.qr.yh a.title {
  text-align: center;
}
.qr.yh a {
  text-align: left;
  margin-top: 5px;
  font-size: 14px;
  text-decoration: underline;
  cursor: pointer;
  white-space: nowrap;
}
</style>
