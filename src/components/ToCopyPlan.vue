<template>
  <div class="alert userCenter">
    <div class="alert-content">
      <span class="icon icon_close" @click="fn_close"></span>
      <br>
       <p style="color:red">分享网址已复制成功，快发送给小伙伴吧</p>
       <p style="color:red">伙伴访问此网址，即可增加一次分享进度</p>
        <p>您还可以去计划页面【复制当前计划】</p>
      <img :src="require('../assets/copy_demo_01.jpg')" />
      <p>粘贴效果如下：</p>
      <img :src="require('../assets/copy_demo_02.jpg')" />

      <p>【计划网址】就是您的分享网址</p>
      
      <p>
        <a class="btn" @click="fn_close">我知道了</a>
      </p>
    </div>
  </div>
</template>

<script>

export default {
  name: "ToCopyPlan",
  data() {
    const that = this;
    return {

    };
  },
  props: {

  },
  computed: {
 
  },
  components: {
  },
  mounted() {},
  created() {},
  methods: {
        fn_close() {
      this.$emit("child-event-fn-ToCopyPlan-hide");
    },
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
  width: 8rem;
  max-height: 6rem;
  border: 1px #ddd solid;
  margin: 0 auto;
}
.alert-content p {
  font-size: 12 / @rem;
  padding-top: 0.125rem;
  text-align: left;
  margin-top: 2 / @rem;
  color:#5234ff;
  font-weight: bold;
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
</style>
