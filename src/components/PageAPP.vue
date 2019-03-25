<template>
  <div id="PageAPP">
   <marquee scrollamount="3" v-if="bulletin!='' &&bulletin!='isNull'">{{bulletin}}</marquee>

<br><br>

<h2>下载APP，赚钱更容易</h2>
<br>

<h3 class="tipsWord">{{tipsWord}}</h3>
<br>
<div class="imgbox"><img v-show="tipsShow" :src="tipSrc" alt="微信打开"/></div>
<a v-if="!tipsShow" v-show=" down_can_clicke" @click="to_down" >点击这里下载</a>
<a v-if="!tipsShow" v-show="! down_can_clicke">下载中...</a>
<br>
        
<h3>苹果手机下载须知</h3>
            <p>1、点击下载-安装-后，请按home键<span style="color:red;font-weight:bold">返回到桌面</span>查看下载安装进度</p>

            <p >2、安装完成后，打开会提示【未受信任的企业级开发者】，需要添加【信任】后，才可以打开APP</p>
<h3>如何添加信任</h3>
            <p >进入【设置】——【通用】——【描述文件与设备管理】，找到Shanghai..开头的一项，点击信任</p>
  




  </div>
</template>

<script>
export default {
  name: "PageAPP",
  data() {
    return {
      tipsShow:false,

     tipSrc:"/app/wx-ios.png",
    isWeixin:false,
    isQQ:false,
    tipsWord:"",
     down_can_clicke:true
    }
  },
  props: {

    bulletin:String,
  },
  computed: {
    isAndroid(){
         var u = navigator.userAgent;
    return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    },    isiOS(){
         var u = navigator.userAgent;
    return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    }
  },
  created() {


    this.isWeixin = this.is_weixin();
    this.isQQ = this.is_QQInnerBro();

    if(this.isWeixin || this.isQQ){
       this.tipsShow=true;
        if(this.isAndroid){
          this.tipSrc="/app/wx-a.png";
        }else if(this.isiOS){
           this.tipSrc="/app/wx-ios.png";
           }
    }else{
       this.tipsShow=false;
    }

  },
  methods: {
to_down(){
  const that=this;
         let appname=window.location.hostname.split(".");
       appname=appname[appname.length-2];
       console.log("appname="+appname);
        if(this.isAndroid){
          let url='/app/'+appname+'.apk';
                document.location = url;
            console.log("isAndroid url="+url);

            that.down_can_clicke=false;

            setTimeout(() => {
               that.down_can_clicke=true;
            }, 5000);

        

        }else if(this.isiOS){
           let url='itms-services:///?action=download-manifest&url=https://www.ezun99.com/download/app/pro-'+appname+'.plist';
          
  document.location = url;
            console.log("isiOS url="+url);

  that.down_can_clicke=false;
              setTimeout(() => {
               that.down_can_clicke=true;
            }, 5000);
            
        }else {
           console.log("请用安卓或者苹果设备打开！！");
            this.tipsWord='请用安卓或者苹果设备打开！！';
        }
},
    is_weixin() {// 判断是不是微信浏览器
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            return true;
        } else {
            return false;
        }
    },
    is_QQInnerBro(){//判断是不是QQ浏览器
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/qq\//i) == "qq/") {
            return true;
        } else {
            return false;
        }
    },
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
#PageAPP {
  padding: 0.25rem;
}
.imgbox{
  background-color: rgba(0,0,0,0.6);
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
  font-size: 14 / @rem;
  text-align: center;
  display: block;
  cursor: pointer;
  color: #fff;
  

  border-radius: 8 / @rem;

  font-weight: bold;
  background-color: #201617;

  width: 100%;
  height: 1rem;
  line-height: 1rem;
}



</style>
