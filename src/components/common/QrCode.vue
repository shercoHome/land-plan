<template>
  <div class="alert">
    <div class="alert-content">
      <span class="icon icon_close" @click="fn_qrcode_close"></span>
      <img :src="data[name].img">
      <p>
        加 {{nameCN}} 领彩金：
        <span :id="'id_'+data[name].id">{{data[name].id}}</span>
      </p>
      <p>已复制成功，可直接粘贴</p>
      <a v-if="data[name].url==''||data[name].url=='isNull'" class="btn" style="background:red">{{nameCN}}号已复制，添加领彩金</a>
      <a v-else class="btn" style="background:red" :href="data[name].url">直接打开{{nameCN}}，领彩金</a>
      <a class="btn" @click="$$.blank2Url(data.affurl)" >我不需要彩金，直接注册</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "QrCode",
  props: {
    name: String,
    data: Object
  },
  computed: {
    nameCN() {
      return this.name == "qqq" ? "QQ群" : this.name == "qq" ? "QQ" : "微信";
    }
  },
  mounted() {

  },
  created() {

  },
  methods: {
    fn_qrcode_close(){
      this.$emit("child-event-fn-qrcode-close");
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
  z-index: 1000;
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
}
.btn:hover {
  /* 鼠标移入按钮范围时改变颜色 */
  background: #5599ff;
}
</style>

 