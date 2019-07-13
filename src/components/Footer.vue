 <template>
  <footer :style="{background:webSet.siteConfig.backColor}">
    <ul>
      <!-- <li  v-if="webSet.mark5.length>20 && webSet.mark5.indexOf('isNull')==-1">
        <a  @click="fn_show_page('PageAgent')">
          <span class="icon icon_love"></span>
          <span>优惠速递</span>
        </a>
      </li>
     <li  v-else>
        <a  @click="fn_show_page('PageAgent')">
          <span class="icon icon_zc"></span>
          <span>代理申请</span>
        </a>
      </li> -->


      <li>
        <a  @click="fn_show_page('PageAgent')">
          <span class="icon icon_love"></span>
          <span>优惠速递</span>
        </a>
      </li>



      <!-- <li>
      <a
        v-if="!userCenter.isLogin"   icon_love
        @click="fn_PromptTwo_login"
      ><span class="icon icon_zc"></span>
          <span>代理申请</span></a>
      <a v-else @click="userCenter.__show" ><span class="icon icon_zc"></span>
          <span v-show="userCenter.info.agentStatus==1">代理中心</span>
          <span v-show="userCenter.info.agentStatus==0 && webSet.submitUpdateUserLevel==0">会员中心</span>
           <span v-show="userCenter.info.agentStatus==0 && webSet.submitUpdateUserLevel==1">代理申请</span>
          </a>
      </li> -->
      <li>
        <a href="###" @click="fn_show_page('PageUS')">
          <span class="icon icon_kf"></span>
          <span>人工计划</span>
        </a>
      </li>
      <li :class="{active:isActive}" @click="fn_show_page('PageHome')">
        <a href="###">
          <span class="icon icon_home"></span>
          <span>首页</span>
        </a>
      </li>

      <li @click="fn_show_page('PageHistory')">
        <a href="###">
          <span class="icon icon_label"></span>
          <span>开奖历史</span>
        </a>
      </li>
      <li>

              <a
        v-if="!userCenter.isLogin"
    href="###" 
        @click="fn_PromptTwo_login"
     
      >                  <span class="icon icon_set"></span>
          <span>登录计划</span></a>


      <a v-else  href="###" @click="userCenter.__show">
        
                  <span class="icon icon_love"></span>
          <span>会员中心</span>
      </a>

      </li>
    </ul>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return{
      userCenter: this.appUserCenter,

      isActive: true,
      setTime:null
    };
  },
  props: {
    txtData: Object,
    webSet:Object,
    homeBlink:Boolean,
    appUserCenter:Object
  },
  created() {},
  methods: {
    fn_PromptTwo_login() {
      this.$emit("child-event-fn-show-login");
    },
    fn_show_page(v) {
      this.$emit("child-event-fn-show-page", v);
    },
    fn_qrcode(n) {
      this.$emit("child-event-fn-show-qrcode", n);
    },
    fn_home_blink() {
      const that = this;
      this.setTime=setInterval(function() {
        that.isActive = !that.isActive;
      }, 200);
    }
  },watch: {
    homeBlink(n,o){
      if(n){
        this.fn_home_blink();
      }else{
         clearInterval(this.setTime);
      }
      
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
footer {
  display: block;
  position: absolute;
  width: 100%;
  z-index: 999;
  // background-color: #201617;
  height: 1.5rem;
}
footer {
  bottom: 0;
}
ul {
  display: block;
  float: left;
  width: 10rem;
}
li {
  display: block;
  float: left;
  text-align: center;
  width: 2rem;
  box-sizing: border-box;

  color: #ccc;
}
a {
  color: #ccc;
}
li.active a span {
  color: #f90;
}
</style>

 