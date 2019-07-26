<template>
  <div class="alert_321591234">
    <div class="alert-content clearfloat" :class="{big:big}">
      <span v-show="closePosition=='top'" class="icon icon_close" @click="fn_hide"></span>
      <h3 v-html="title"></h3>
      <hr v-show="big" />
      <p v-html="tips" @click="cb" :class="{left:left}"></p>
      <a v-show="closePosition!='top'" class="btn" @click="fn_hide">确定</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Alert",
  props: {
    title: String,
    tips: String,
    setClass: Object
  },
  computed: {
    big() {
      return this.setClass.big;
    },
    left() {
      return this.setClass.left;
    },
    closePosition() {
      return this.setClass.closePosition;
    }
  },
  created() {},
  methods: {
    fn_hide() {
      this.$emit("child-event-fn-alert-hide");
    },
    cb(event) {
      let el = event.target;
      if (el.nodeName === "B") {
        let thisID = el.id;
        if (thisID.indexOf("letter_") == 0) {
          el.innerHTML = el.innerHTML.replace("【未】", "【已】");

          let letterID = thisID.slice(7);
          console.log(letterID);

          this.$emit("child-event-fn-read-letter", letterID);

          let eles_letter_content = document.getElementsByClassName(
            "letter_content"
          );
          for (let i = 0; i < eles_letter_content.length; i++) {
            eles_letter_content[i].style = "display:none;";
          }

          document.getElementById("letter_content_" + letterID).style =
            "display:block;";
        }
      }
    },
    fn_to_agent() {
      // this.$emit("child-event-fn-to-agent");
    },
    fn_show_page(v) {
      console.log("home-fn_show_page:" + v);
      this.$emit("child-event-fn-show-page", v);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.alert_321591234 .letter_title {
  display: block;
  text-decoration: underline;
}
.alert_321591234 .letter_content {
  color: #333;
  border: 1px #777 solid;
  padding: 0.5em;
}
.alert_321591234 {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.7);
}

.alert_321591234 .alert-content {
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
.alert_321591234 .alert-content.big {
  width: 8rem;
}
.alert_321591234 .alert-content .left {
  text-align: left;
}
.alert_321591234 .alert-content img {
  width: 5rem;
  border: 1px #ddd solid;
  margin: 0 auto;
}
.alert_321591234 .alert-content h3 {
  font-size: 0.425rem;
}
.alert_321591234 .alert-content p {
  font-size: 0.315rem;
  line-height: 2em;
  padding-top: 0.125rem;
  padding-bottom: 0.125rem;
}
.alert_321591234 .icon_close {
  position: absolute;
  right: 0;
  top: 0;
}

.alert_321591234 .btn {
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
.alert_321591234 .btn:hover {
  /* 鼠标移入按钮范围时改变颜色 */
  background: #5599ff;
}

.alert_321591234 p {
  margin: 8px 0;
}
.alert_321591234 input {
  max-width: 100%;
  height: 1.5em;
  line-height: 1.5em;
  text-align: center;
}

.alert_321591234 .icon_close {
  position: absolute;
  right: 0;
  top: 0;
}
</style>

 