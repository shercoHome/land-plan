<template>
    <header>
      <h1>{{webSet.siteName.substr(0,4)}}</h1>
      <a v-if="c_url.indexOf('http')==-1"><img v-if="webSet.mark2!=''&&webSet.mark2!='isNull'" :src="webSet.mark2"></a>
      <a v-else :href="c_url" target="_blank"><img v-if="webSet.mark2!=''&&webSet.mark2!='isNull'" :src="webSet.mark2"></a>
    </header>
</template>

<script>
export default {
  name: "Header",
  props: {

    webSet:Object
  },
  computed: {
    c_url(){
      if(this.webSet.mark3.indexOf('http')==-1){
        return "###";
      }else{
        return this.webSet.mark3;
      }
     
    }
  },
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
  background: url("../assets/top.jpg");
  background-size:100%;
  background-position: center;
  box-sizing: border-box;
}
a{
  height: 1.65rem;
   width:4rem;
  float:right;box-sizing: border-box;
    text-align: right
}
img{
  max-width:100%;
  height: 100%;
  float: right;
}

h1{box-sizing: border-box;float: left;
    /*
        文字阴影：
        text-shadow: 水平位移 垂直位移  模糊程度  阴影颜色;
    */
 width: 3rem;
 margin-left: 2rem;
 margin-top: 0.3rem;
 text-align: left;
    font-weight: bolder;
    font-size: 100/6/@rem;
    color: #201617;
    text-shadow: 0 0 20/6/@rem #fdec84,
            10/6/@rem -10/6/@rem 30/6/@rem #ffae35,
            20/6/@rem -20/6/@rem 40/6/@rem #ec760c,
            -20/6/@rem -60/6/@rem 50/6/@rem #cd4607,
            // 0 -80/6/@rem 60/6/@rem #973717,
            10/6/@rem -40/6/@rem 70/6/@rem #451b0e;
}
</style>

 