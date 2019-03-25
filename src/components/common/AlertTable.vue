<template>
  <div class="alert">
    <div class="alert-content clearfloat">
      <h3 v-html="title"></h3>
      <div class="table-box">
        <table>
          <tr>
            <th v-for="(th,k) in thArray" :key="k">{{th}}</th>
          </tr>
          <tr v-for="(tr,i) in tdArray" :key="i">
            <td v-if="index">{{i+1}}</td>
            <td v-for="(td,ii) in tr" :key="ii" @click="fn_click_td(i,ii)" v-html="td"></td>
          </tr>
        </table>
      </div>
      <p v-html="tips"></p>
      <a class="btn" @click="fn_hide">确定</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "AlertTable",
  props: {
    title: String,
    tips: String,
    index:{
      type: Boolean,
      default: true
    },
    thArray: Array,
    tdArray: Array
  },
  mounted() {},
  created() {
   // console.log(this.tdArray);
  },
  methods: {
    fn_hide() {
      this.$emit("child-event-fn-alerttable-hide");
    },
    fn_click_td(i,ii){
      this.$emit("child-event-fn-alerttable-click-td",this.title,[i,ii]);
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
  z-index: 666;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.7);
}

.alert-content {
  position: relative;
  width: 8rem;

  margin: 0 auto;
  overflow: auto;

  top: 50%;
  transform: translateY(-50%);

  background: #fff;
  text-align: center;
  padding: 0.5rem;
  box-sizing: border-box;
  border-radius: 4px;
}
.table-box {
  position: relative;

  max-height: 80vh;

  overflow: auto;
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
.icon_close {
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

p {
  margin: 8px 0;
}
input {
  max-width: 100%;
  height: 1.5em;
  line-height: 1.5em;
  text-align: center;
}

table {
  border-collapse: collapse;
  width: 100%;
}

th,
td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}
</style>

 