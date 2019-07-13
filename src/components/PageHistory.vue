<template>
  <div id="PageHistory">
    <marquee scrollamount="3" v-if="webSet.mark1!='' && webSet.mark1!='isNull'">{{webSet.mark1}}</marquee>

    <a href="###" class="btn min long20" @click="fn_show_page('PagePlan|'+webSet.plantype)">
      <span>返回计划</span>
    </a>

    <a href="###" class="btn min long20" @click="fn_show_page('PagePlan|all')">
      <span>全部计划</span>
    </a>
    <a href="###" class="btn min long20" @click="fn_show_page('PagePlan|pk10')">
      <span>PK10</span>
    </a>
    <a href="###" class="btn min long20" @click="fn_show_page('PagePlan|ssc')">
      <span>时时彩</span>
    </a>
    <a href="###" class="btn min long20" @click="fn_show_page('PagePlan|pcdd')">
      <span>PC蛋蛋</span>
    </a>

    <div class="select-box"  :style="{background:webSet.siteConfig.backColor}">
      <select class="select-api" v-model="apiSelect">
        <option v-for="(lottery,k) in lotterys" :key="k" :value="k">{{lottery.lotteryname}}</option>
      </select>
      <input type="date" v-model="planDate">

      <select class="select-api line-two" v-model="planPos">
        <option v-for="(item,k) in c_Position[0].item" :key="k" :value="k">{{item.name}}</option>
      </select>
      <select class="select-api line-two" v-model="max">
        <option value="10">近10期</option>
        <option value="30">近30期</option>
        <option value="50">近50期</option>
        <option value="100">近100期</option>
        <option value="300">近300期</option>
        <option value="2000">所有</option>
      </select>

      <!-- 
      <input class="line-two" type="number" v-model="max">-->
      <a href="###" class="btn line-two" @click="fn_get_history">
        <span>刷新</span>
      </a>
    </div>
    <div id="scrollDiv" class="scroll" :style="{ height: scrollHeight + 'px' }">
      <table class="gridtable">
        <tr>
          <th>期号</th>
          <th>开奖</th>
          <th colspan="10">遗漏</th>
        </tr>
        <tr v-for="(obj,i) in history" :key="i">
          <td>{{ obj.expect}}</td>
          <td class="td-plan-code">
            <span
              v-for="(e,i) in fn_codeToArr(obj.opencode)"
              :class="'plan-code code-'+e"
              :key="i"
            >{{e}}</span>
          </td>
          <td v-for="(num,j) in obj.miss[planPos]" :key="j">
            <span :class="{active:(num>=0)}">{{Math.abs(num)}}</span>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageHistory",
  data() {
    return {
      apilink: "",
      apiSelect: "0",
      lotterys: [
        {
          code: "10",
          defaultNumbers: "1",
          defaultPlanPosition: "0",
          defaultPlanQi: "2",
          delayPeriod: "10",
          dir: "pk10-js",
          id: "1",
          intervalPeriod: "60",
          link: "/api/",
          lotteryID: "js",
          lotteryname: "暂无可用彩种",
          maxPeriod: "1440",
          strPlanName: "",
          strPosition: '[{"name":"定位胆","item":[{"name":"冠","item":[]}]}]',
          switch: "0",
          mark2: "pcdd"
        }
      ],
      max: 30,
      planDate: new Date().format("yyyy-MM-dd"),
      planPos: 0,
      planPositions: [],
      history: [
        {
          expect: "******",
          opencode: "*,*,*,*,*",
          miss: [
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, 1],
            [-1, -1, -1, -1, -1, 1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, 1],
            [-1, -1, -1, -1, -1, -1, -1, 1, -1, -1],
            [-1, -1, -1, -1, -1, 1, -1, -1, -1, -1]
          ]
        }
      ],
      scrollHeight: "300"
    };
  },
  props: {
    c_my_api: Object,
    webSet: Object,
    txtData: Object
  },
  computed: {
    c_Position() {
      return JSON.parse(this.lotterys[this.apiSelect].strPosition);
    },

    c_planCode() {
      return this.lotterys[this.apiSelect].lotteryID;
    },
    c_planDate() {
      let oldTime = new Date(this.planDate).getTime();
      let curTime = new Date(oldTime).format("yyyyMMdd");

      return curTime;
    }
  },
  components: {},
  mounted() {
    const that = this;
    setTimeout(function() {
      let scrollDiv = document.getElementById("scrollDiv");
      let scrollSize = scrollDiv.getBoundingClientRect();
      // console.error(scrollSize.top);
      let bodyHeight = document.documentElement.clientHeight;
      let footerSize = 1.5 * rem;
      that.scrollHeight = bodyHeight - scrollSize.top - footerSize;
    }, 1000);
  },
  created() {
    const that = this;
    that.fn_get_plan_api().then(function(e) {
      console.log(">>> fn_get_plan_api >>> " + e);
      console.log(e.data.data);
      const oldAPI = e.data.data;
      let tempAPI = [];
      oldAPI.forEach(element => {
        if (element.switch == "1") {
          tempAPI.push(element);
        }
      });

      that.apilink = that.c_my_api.plan + "getWinRates.php";
      that.lotterys = tempAPI;
    });
  },
  methods: {
    fn_codeToArr(str) {
      const arr = str.split(",");

      let tempAPI = [];
      arr.forEach(element => {
        tempAPI.push(Number(element));
      });

      return tempAPI;
    },
    fn_get_history() {
      const that = this;

      that.fn_async_get_history().then(function(re) {
        console.log(re.data);
        that.history = re.data;
      });
    },
    fn_show_page(v) {
      this.$emit("child-event-fn-show-page", v);
    },
    fn_copy_id(v, msg) {
      console.log("cp-fn_copy_id:" + v);
      this.$emit("child-event-fn-copy-id", v, msg);
    },
    async fn_async_get_history() {
      const that = this;
      try {
        return await that.$axios.get(
          that.apilink +
            "?a=" +
            that.c_planCode +
            "||" +
            that.c_planDate +
            "||" +
            that.max
        );
      } catch (error) {
        console.warn(error);
      }
    },

    async fn_get_plan_api() {
      const that = this;
      const data_ = that.$qs.stringify({
        type: "getAPI",
        aff: localStorage.mySite
      });
      try {
        return await that.$axios.post(that.c_my_api.user, data_);
      } catch (error) {
        console.warn(error);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@rem: 32/1rem;
#PageHistory {
  // background: #f0e3af url("../assets/cp-banner.jpg") no-repeat left top;
  // background-size: 100% auto;
  margin-bottom: -20px;
  min-height: 100%;
}
marquee {
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
}
.active {
  background-color: aqua;
  display: inline-block;
  width: 1em;
  height: 1em;
  line-height: 1em;
  padding: 0.4em;
  margin: 2 / @rem;
}
.gridtable {
  min-width: 100%;
  font-size: 10px;
}

.scroll {
  width: 100%;
  height: 67vh;
  overflow: scroll;
}

/* Removes the clear button from date inputs */
input[type="date"]::-webkit-clear-button {
  display: none;
}

/* Removes the spin button */
input[type="date"]::-webkit-inner-spin-button {
  display: none;
}

/* Always display the drop down caret */
input[type="date"]::-webkit-calendar-picker-indicator {
  color: #4a4a4a;
}

/* A few custom styles for date inputs */
input[type="date"] {
  appearance: none;
  -webkit-appearance: none;
  color: #4a4a4a;
  font-family: "Helvetica", arial, sans-serif;

  background: #ecf0f1;
  display: inline-block !important;
  visibility: visible !important;

  width: 4.5rem;
  max-width: 4.5rem;
  border-radius: 0.125rem;
  padding: 0 0.125rem;
  background-color: #fff;
  border: 1px solid #201617;

  font-size: 0.375rem;
  border: none;
}

input[type="date"],
focus {
  color: #4a4a4a;
  box-shadow: none;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
}

.select-api {
  display: inline-block !important;
  width: 4.5rem;
  max-width: 4.5rem;
  font-size: 0.375rem;
  line-height: 1em;
}

.select-box {
  background: #201617;
  padding: 0.125rem 0;
}
a {
  margin: 0.125rem auto;
}
.select-box a {
  width: 4.5rem;
  max-width: 4.5rem;
  display: inline-block !important;
  line-height: 1.5em;
  height: 1.5em;
  font-size: 0.375rem;
}

.select-box .line-two {
  width: 3rem;
  max-width: 3rem;
}
.td-plan-code {
  word-break: keep-all;
  white-space: nowrap;
}
.td-plan-code > span.plan-code {
  display: inline-block;
  width: 1em;
  height: 1em;
  line-height: 1em;
  padding: 0.4em;
  margin: 2 / @rem;
  border-radius: 4px;
  color: white;
}
</style>
