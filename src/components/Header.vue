<template>
  <header :style="{background:webSet.siteConfig.backColor}">
    <img class="logo" :src="webSet.siteConfig.logo" />
    <h1>
      {{webSet.siteConfig.name.substr(0,6)}}
      <br />
      <small>{{webSet.siteConfig.slogan.substr(0,15)}}</small>
    </h1>
    <a v-if="topIMG.url!='isNull' && topIMG.url.indexOf('http')==-1" :href="topIMG.url">
      <img v-if="topIMG.src" :src="topIMG.src" />
    </a>
    <a
      v-if="topIMG.url!='isNull' && topIMG.url.indexOf('http')!=-1"
      :href="topIMG.url"
      target="_blank"
    >
      <img v-if="topIMG.src" :src="topIMG.src" />
    </a>
  </header>
</template>

<script>
export default {
  name: "Header",
  props: {
    webSet: {
      type: Object,
      // 对象或数组默认值必须从一个工厂函数获取
      default: function() {
        return { downLoadImg: { src: "isNull", url: "isNull" } };
      }
    }
  },
  computed: {
    topIMG() {
      const that = this;
      return {
        src: that.webSet["downLoadImg"]["src"],
        url: that.webSet["downLoadImg"]["url"]
      };
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only  <img alt="logo" src="top.jpg">-->
<style scoped lang="less">
@rem: 32/1rem;
header {
  display: block;
  position: absolute;
  width: 10rem;
  z-index: 999;
  float: left;
  height: 1.65rem;
  // background: url("../assets/top.jpg");
  background-size: 100%;
  background-position: center;
  box-sizing: border-box;
}
.logo {
  display: block;
  position: absolute;
  float: left;
  height: 1.65rem;
  width: 1.65rem;
}
a {
  height: 1.65rem;
  width: 1.65rem;
  float: right;
  box-sizing: border-box;
  text-align: right;
}
img {
  max-width: 1.65rem;
  height: 100%;
  float: right;
}

h1 {
  box-sizing: border-box;
  float: left;
  /*
        文字阴影：
        text-shadow: 水平位移 垂直位移  模糊程度  阴影颜色;
    */
  width: 6.5rem;
  margin-left: 1.8rem;
  margin-top: 0.3rem;
  text-align: left;
  font-weight: bolder;
  font-size: 100/6 / @rem;
  color: #201617;
  //  text-shadow: rgba(255,255,255,0.9) 0/@rem 3/@rem 3/@rem;
  // color: rgba(0, 0, 0, 0.6);
  // text-shadow: 2 / @rem 8 / @rem 6 / @rem rgba(0, 0, 0, 0.2),
  //   0 / @rem -5 / @rem 35 / @rem rgba(255, 255, 255, 0.3);

  text-shadow: 0 / @rem 0 / @rem 3 / @rem rgba(218, 238, 191, 0.8),
               1 / @rem 1 / @rem 6 / @rem rgba(255, 255, 255, 0.7),
               2 / @rem 2 / @rem 9 / @rem rgba(255, 255, 255, 0.6);
  // text-shadow: 0 1/@rem 0 #ccc,
  //            0 2/@rem 0 #c9c9c9,
  //            0 3/@rem 0 #bbb,
  //            0 4/@rem 0 #b9b9b9,
  //            0 5/@rem 0 #aaa,
  //            0 6/@rem 1/@rem rgba(0,0,0,.1),
  //            0 0 5/@rem rgba(0,0,0,.1),
  //            0 1/@rem 3/@rem rgba(0,0,0,.3),
  //            0 3/@rem 5/@rem rgba(0,0,0,.2),
  //            0 5/@rem 10/@rem rgba(0,0,0,.25),
  //            0 10/@rem 10/@rem rgba(0,0,0,.2),
  //            0 20/@rem 20/@rem rgba(0,0,0,.15);
  // text-shadow: 0 0 20/6/@rem #fdec84,
  //         10/6/@rem -10/6/@rem 30/6/@rem #ffae35,
  //         20/6/@rem -20/6/@rem 40/6/@rem #ec760c,
  //         -20/6/@rem -60/6/@rem 50/6/@rem #cd4607,
  //         // 0 -80/6/@rem 60/6/@rem #973717,
  //         10/6/@rem -40/6/@rem 70/6/@rem #451b0e;
}
h1 small {
  font-size: 80%;
  color: rgba(255, 255, 255, 0.75);
  text-shadow: 2 / @rem 2 / @rem 3 / @rem rgba(227, 231, 186, 0.25);
  // text-shadow: 4 / @rem 3 / @rem 0 / @rem #fff,
  //   9 / @rem 8 / @rem 0 / @rem rgba(0, 0, 0, 0.15);
}
</style>

 