<template>
  <div class="loading">
    <div class="content">
      <span class="icon icon_close" @click="fn_alert_close"></span>
      <h3>我查看的历史&emsp;|&emsp;我收藏的计划</h3>
      <hr>
      <p style="font-size:10px;padding:2px 0">仅保留前10个计划</p>
      <div class="left">
        <p v-if="data.length==0">暂无历史记录
          <br>
          <br>1、【换】随机切换计划
          <br>2、【计划大全】选择高胜率计划
        </p>
        <p v-for="(d,i) in data" class :key="i">
          <span class="link" @click="fn_show(d)">{{name.split("|")[d-1]}}</span>
          <span class="button" @click="fn_love(d)">收藏</span>
        </p>
      </div>
      <div class="right">
        <p v-if="love.length==0">查看左侧记录
          <br>点击收藏即可
        </p>
        <p v-for="(d,ii) in love" class :key="ii">
          <span class="link" @click="fn_show(d)">{{name.split("|")[d-1]}}</span>
          <span class="button" @click="fn_love(d,'delete')">删除</span>
        </p>
      </div>
    </div>

    <transition name="fade">
      <Confirm
        v-if="confirm.show"
        :title="confirm.title"
        :tips="confirm.tips"
        @child-event-fn-confirm-yes="confirm.__yes"
        @child-event-fn-confirm-no="confirm.__no"
      />
    </transition>
  </div>
</template>
<script>
import Confirm from "../common/Confirm.vue";
export default {
  name: "HistoryPlanName",
  data() {
    const that = this;
    return {
      love: [],
      confirm: {
        show: false,
        title: "title",
        tips: "tips",
        __yes: function() {},
        __no: function() {
          that.confirm.show = false;
        }
      }
    };
  },
  props: {
    name: String,
    data: Array
  },
  components: {
    Confirm
  },
  created() {
    if (localStorage.lovePlan) {
      this.love = localStorage.lovePlan.split(",");
    }
  },
  methods: {
    fn_alert_close() {
      this.$emit("child-event-fn-history-plan-name-close");
    },
    fn_show(n) {
      this.$emit("child-event-fn-show-plan", n);
      this.fn_alert_close();
    },
    fn_love(n, type) {
      const that = this;
      type = type || "add";
      if (type == "add") {
        if (this.love.indexOf(n) == -1) {
          this.love.unshift(n);

          if (this.love.length > 10) {
            this.love.pop();
          }
        }
      } else if (type == "delete") {
        this.confirm.show = true;
        this.confirm.title = "确认操作";
        this.confirm.tips = "从您的收藏中移除？";
        this.confirm.__yes = function() {
          that.love.forEach((ele, iii) => {
            if (ele == n) {
              that.love.splice(iii, 1);
            }
          });
          that.confirm.show = false;
        };
      }

      localStorage.lovePlan = this.love;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@rem: 32/1rem;
.loading {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1;
  top: 0;
  left: 0;
}

.loading .content {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translateY(-50%) translateX(-50%);
  transform: translateY(-50%) translateX(-50%);
  background-color: #fff;
  color: #000;
  width: 8rem;
  padding-top: 8 / @rem;
  padding-bottom: 16 / @rem;
  border-radius: 2px;
}
.icon {
  // margin-bottom: 8/@rem;
  position: absolute;
  right: 0;
  top: 0;
}
p {
  padding: 4 / @rem 0;
}
.content > div {
  float: left;
  width: 3.5rem;
  margin-left: 0.33333333rem;
}
.content > div.left {
  border-right: #ddd 1px solid;
}

.content > div > p > span.button {
  margin: 0 4 / @rem;
  font-size: 12 / @rem;
  color: red;
  cursor: pointer;
  border: #ddd 1px solid;
  padding: 1 / @rem 4 / @rem;
  background-color: #ddd;
  border-radius: 2px;
}
.content > div > p > span.link {
  text-decoration: underline;
  cursor: pointer;
}
</style>

 