<template>
  <div class="alert confirm">
    <div class="alert-content clearfloat">
      <h3 v-html="title"></h3>
      <p v-html="tips"></p>
      <a class="btn" style="background:red"  @click="fn_yes">{{btn1}}</a>
       <a class="btn" @click="fn_no" >{{btn2}}</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Confirm",
  props: {
    title: String,
    tips: String,
    btn1: {
      type: String,
      default: "确定"
    },
    btn2: {
      type: String,
      default: "取消"
    }
  },
  mounted() {

  },
  created() {

  },
  methods: {
    fn_no(){
      this.$emit("child-event-fn-confirm-no");
    },
    fn_yes(){
      this.$emit("child-event-fn-confirm-yes");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.alert {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 8888;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.7);
}

.alert-content {
  position: relative;
  width: 6rem;

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
  font-size: 0.315rem;
  padding-top: 0.125rem;
}
.icon_close{
  position: absolute;
  right: 0;
  top: 0;
}


.btn {
  /* 按钮美化 */

  display: block;
  width: 40%; /* 宽度 */
  float: left;
  margin-left: 7%;



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
}
.btn:hover {
  /* 鼠标移入按钮范围时改变颜色 */
  background: #5599ff;
}

p{
  margin: 8px 0;
}
input{
  max-width: 100%;
  height: 1.5em;
  line-height: 1.5em;
  text-align: center;
}
</style>

 