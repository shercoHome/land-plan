<template>
  <div id="pageHK">
    <marquee scrollamount="3" v-if="webSet.mark1!='' && webSet.mark1!='isNull'">{{webSet.mark1}}</marquee>

    <h2 v-if="webSet.hk49plan1!='isNull'">{{webSet.hk49plan1}}</h2>
    <h3 v-if="webSet.hk49plan2!='isNull'">开奖结果</h3>
    <div class="iframe-box">
     
      <div></div>
       <p v-show="!iframe.loaded">初次加载较慢，请稍候……</p>
      <iframe v-show="iframe.loaded"
        id="hk49ifr"
        :style="iframe.style"
        scrolling="no"
        :src="iframe.src"
        @load="fn_load"
        frameborder="0"
      >加载中</iframe>
    </div>
    <h3 v-if="webSet.hk49plan2!='isNull'">精品推荐</h3>
    <ul v-if="webSet.hk49plan2!='isNull'">
      <li v-for="(d,i) in cp2" :key="i">
        <span>{{d[0]}}</span>：
        <label
          v-if="i>=(c_needAuthorizeArr[0]-1) && i<c_needAuthorizeArr[1]"
          @click="fn_prompt_authorize('1')"
        >点击授权</label>
        <label v-else>{{d[1]}}</label>
      </li>
    </ul>
    <h3 v-if="webSet.hk49plan3!='isNull'">生肖投注</h3>
    <ul v-if="webSet.hk49plan3!='isNull'">
      <li v-for="(d,i) in cp3" :key="i">
        <span>{{d[0]}}</span>
        ：
        {{d[1]}}
        <a @click="fn_copy('【'+d[0]+'】：'+d[1])">复制</a>
      </li>
    </ul>
    <h3 v-if="webSet.hk49plan4!='isNull'">特码投注</h3>
    <ul v-if="webSet.hk49plan4!='isNull'">
      <li v-for="(d,i) in cp4" :key="i">
        <span>{{d[0]}}</span>
        ：
        {{d[1]}}
        <a @click="fn_copy('【'+d[0]+'】：'+d[1])">复制</a>
      </li>
    </ul>
    <h3 v-if="webSet.hk49plan5!='isNull'">特别投注</h3>
    <ul v-if="webSet.hk49plan5!='isNull'">
      <li v-for="(d,i) in cp5" :key="i">
        <span>{{d[0]}}</span>
        ：
        {{d[1]}}
        <a @click="fn_copy('【'+d[0]+'】：'+d[1])">复制</a>
      </li>
    </ul>

    <h3 v-if="webSet.hk49PlanPoet!='isNull'">六合玄机诗</h3>
    <ul v-if="webSet.hk49PlanPoet!='isNull'">
      <li v-for="(d,i) in cpp" :key="i">{{d}}</li>
    </ul>

    <h3 v-if="webSet.hk49PlanPoet!='isNull'">六合玄机图</h3>
    <img
      v-if="webSet.hk49PlanPoet!='isNull'&&webSet.hk49PlanPoet!=''"
      :src="webSet.hk49PlanPicture"
    >
  </div>
</template>

<script>
export default {
  name: "PageHK",
  data() {
    return {
      iframe: {
        src: "https://kj.kai861.com/view/xgc.html?48?10048?none?s?1682019.co",
        style: {
          width: "750px",
          height: "46px",
          transformOrigin: "0 0",
          transform: "scale(0.6)"
        },
        loaded:false
      }
    };
  },
  props: {
    appUserCenter: Object,
    webSet: Object,
    c_data:Object
  },
  computed: {
    c_needAuthorizeArr() {
      const that = this;
      let re = this.webSet.needAuthorizeJson.all;
      if (this.webSet.needAuthorizeJson.hasOwnProperty("hk49")) {
        re = this.webSet.needAuthorizeJson["hk49"];
      }
      if (this.appUserCenter.isLogin) {
        let a = this.appUserCenter.info.authorizationStatus;
        if (a == "3" || a == "1") {
          re = [0, 0];
        }
      }

      return re;
    },
    cp2() {
      if (
        this.webSet.hasOwnProperty("hk49plan2") &&
        this.webSet.hk49plan2 != "isNull"
      ) {
        const ar = this.webSet.hk49plan2.split("||");
        for (let i in ar) {
          let temp = ar[i].split("|");
          ar[i] = [temp[0], temp[1]];
        }
        return ar;
      } else {
        return [];
      }
    },
    cp3() {
      if (
        this.webSet.hasOwnProperty("hk49plan3") &&
        this.webSet.hk49plan3 != "isNull"
      ) {
        const ar = this.webSet.hk49plan3.split("||");
        for (let i in ar) {
          let temp = ar[i].split("|");
          ar[i] = [temp[0], temp[1]];
        }
        return ar;
      } else {
        return [];
      }
    },
    cp4() {
      if (
        this.webSet.hasOwnProperty("hk49plan4") &&
        this.webSet.hk49plan4 != "isNull"
      ) {
        const ar = this.webSet.hk49plan4.split("||");
        for (let i in ar) {
          let temp = ar[i].split("|");
          ar[i] = [temp[0], temp[1]];
        }
        return ar;
      } else {
        return [];
      }
    },
    cp5() {
      if (
        this.webSet.hasOwnProperty("hk49plan5") &&
        this.webSet.hk49plan5 != "isNull"
      ) {
        const ar = this.webSet.hk49plan5.split("||");
        for (let i in ar) {
          let temp = ar[i].split("|");
          ar[i] = [temp[0], temp[1]];
        }
        return ar;
      } else {
        return [];
      }
    },
    cpp() {
      if (
        this.webSet.hasOwnProperty("hk49PlanPoet") &&
        this.webSet.hk49PlanPoet != "isNull"
      ) {
        const ar = this.webSet.hk49PlanPoet.split("|");

        return ar;
      } else {
        return [];
      }
    }
  },
  created() {},
  methods: {
    fn_load() {
      let ifr = document.getElementById("hk49ifr");


      let wd = 750;
      let x = (9.5 * rem) / (wd*0.72);

      console.log(9.5 * rem);
       console.log(x);


      this.iframe.style.width = wd + "px";
      this.iframe.style.transformOrigin = "0 0";
      this.iframe.style.transform = "scale(" + x + ")";
      this.iframe.style.marginLeft = -rem*0.92+"px";
      this.iframe.loaded=true;
    },
    fn_prompt_authorize(t) {
      this.$emit("child-event-fn-prompt-show", t);
    },
    fn_copy(v, t) {
      t = t || "复制成功";


       let url = this.$$.getDomain();
      if (this.appUserCenter.isLogin) {
        if (this.appUserCenter.info.agentStatus == 1) {
          url = this.appUserCenter.info.aff;
        } else {
          url = this.appUserCenter.info.shareLink;
        }
      }


v = "\r\n"+"香 港 六 合 彩" + "\r\n"+"========================" + "\r\n" + "\r\n" +v+"\r\n" + "\r\n";

      v += "========================" + "\r\n";
      v += this.c_data.name.substr(0, 4) + "，彩种丰富，永久免费" + "\r\n";
      v +=
        "善意提醒：" +
        this.c_data.name.substr(0, 2) +
        "无神，跟反自由" +
        "\r\n";
v += "========================" + "\r\n";
v += "计划网址：" + url + "\r\n";
v += "【请复制网址到浏览器打开】\r\n";
      this.$$.copyText(v, t);
    },
    fn_show_page(v) {
      console.log("home-fn_show_page:" + v);
      this.$emit("child-event-fn-show-page", v);
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
ul {
  margin-bottom: 0.5rem;
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
  padding: 2 / @rem 4 / @rem;
  font-weight: bold;
  background-color: #201617;
}

.iframe-box {
  margin-top: 10 / @rem;
  width: 100%;
  height: 30 / @rem;
  overflow: hidden;
  div {
    position: absolute;
    background-color: rgba(255, 255, 255, 0.5);
    opacity: 0;
    width: 100%;
    height: 30 / @rem;
    z-index: 1;
  }
  iframe {
    z-index: 0;
  }
}
</style>
