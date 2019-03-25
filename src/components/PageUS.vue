<template>
  <div id="pageHK">
   <marquee scrollamount="3" v-if="bulletin!='' &&bulletin!='isNull'">{{bulletin}}</marquee>

<br><br>

<h2>我们网站提供丰富多样的在线计划<br>如果网站的计划无法满足您的需求<br>那么请您联系下方的人工计划专员</h2>


    <div v-if="txtData.qq.id!='isNull'">
         <h3>QQ</h3>
         <p>QQ号：{{txtData.qq.id}}<a @click="fn_copy(txtData.qq.id)">复制</a></p>
         <p>二维码：<a @click="fn_qrcode('qq')">查看</a></p>
    </div>
<br>
        <div v-if="txtData.wechat.id!='isNull'">
         <h3>微信</h3>

         <p>微信号：{{txtData.wechat.id}}<a @click="fn_copy(txtData.wechat.id)">复制</a></p>
         <p>二维码：<a @click="fn_qrcode('wechat')">查看</a></p>
    </div>
<br>
        <div v-if="txtData.mail!='isNull'">
         <h3>邮箱</h3>
         <p>邮箱号：{{txtData.mail}}<a @click="fn_copy(txtData.mail)">复制</a></p>
    </div>
<br>
        <div v-if="txtData.qqq.id!='isNull'">
         <h3>QQ群</h3>
                  <p>QQ群号：{{txtData.qqq.id}}<a @click="fn_copy(txtData.qqq.id)">复制</a></p>
         <p>二维码：<a @click="fn_qrcode('qqq')">查看</a></p>
    </div>


  </div>
</template>

<script>
export default {
  name: "PageUS",
  props: {
    txtData: Object,
    bulletin:String
  },
  created() {},
  methods: {
    fn_copy(v, t) {
      t = t || "复制成功";
      this.$$.copyText(v, t);
    },
    fn_show_page(v) {
      console.log("home-fn_show_page:" + v);
      this.$emit("child-event-fn-show-page", v);
    },
    fn_qrcode(v){
      this.$emit("child-event-fn-show-qrcode", v);
      
    }
    
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@rem: 32/1rem;
* {
  text-align: left;
}
#pageHK {
  padding: 0.25rem;
}
h2,
h3 {
  font-size: 16 / @rem;
}
h2 {
  color: red;
  
}
h3 {
  font-size: 14 / @rem;
  font-weight: bold;
  margin: 6 / @rem 0;
    border-bottom: 1 / @rem solid #999;
}
ul{
    margin-bottom:.5rem;
}
p,
li {
  font-size: 12 / @rem;
  margin: 4 / @rem 0;
}

.in {
  text-indent: 2em;
}
span {
  font-weight: bold;
  color: #70491d;
}
a {
  font-size: 12 / @rem;
  text-align: center;
  display: inline;
  cursor: pointer;
  color: #fff;
  margin: 6 / @rem;

  border-radius: 8 / @rem;
  padding: 2/@rem 4/@rem;
  font-weight: bold;
  background-color: #201617;
}
</style>
