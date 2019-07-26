<template>
  <div id="PagePlan">
    <!-- 广告 -->
    <a
      v-if="!forChat && webSet.planTopImg.src!='isNull'"
      @click="$$.blank2Url(webSet.planTopImg.url=='isNull'?c_data.affurl:webSet.planTopImg.url)"
    >
      <img alt="首存即送288" class="ad" :src="webSet.planTopImg.src" />
    </a>

    <h1 class="title" :style="{background:webSet.siteConfig.backColor}">
      <select v-model="apiSelect" class="select-api pointer">
        <template v-for="(d,i) in api">
          <option
            class="positon"
            :class="{active:(i==apiSelect)}"
            :value="i"
            :key="i"
          >{{d.lotteryname}}</option>
        </template>
      </select>
      <span>{{webSet.siteConfig.planSlogan.substr(0,12)}}</span>
    </h1>
    <div class="clearfloat"></div>
    <p class="djs">
      <!-- <span>第{{ issue.period }}期开奖号码</span> -->
      <span class="djs-span">
        第
        <AnimatedInteger :value="issue.period" />期开奖号码
      </span>

      <span class="djs-span">距离封盘：{{c_djs_time}}</span>
    </p>
    <!-- 今日开奖 -->
    <p>
      <template v-for="(d,i) in c_ar_new_kj[0]">
        <span v-show="i<c_api.code" class="code" :class="'code-'+(~~d)" :key="i">
          <AnimatedInteger :value="d" />
        </span>
      </template>
      <!-- PC蛋蛋，幸运28 -->
      <template v-if="c_api.mark2=='pcdd'">
        =
        <span class="code" :class="'code-'+(~~c_ar_new_kj[1][0])" :key="4">
          <AnimatedInteger :value="c_ar_new_kj[1][0]" />
        </span>&emsp;
        <span class="code" :class="'code-0 code-color-'+c_ar_new_kj[1][1]" :key="5">
          <AnimatedInteger :value="c_ar_new_kj[1][1]" />
        </span>
        <span class="code" :class="'code-0 code-color-'+c_ar_new_kj[1][2]" :key="6">
          <AnimatedInteger :value="c_ar_new_kj[1][2]" />
        </span>
        <span
          class="code"
          :class="'code-0 code-color-'+c_ar_new_kj[1][4]"
          :key="7"
          v-if="c_ar_new_kj[1][4].indexOf('||')==-1"
        >
          <AnimatedInteger :value="c_ar_new_kj[1][4]" />
        </span>
        <span
          class="code"
          :class="'code-0 code-length-3 code-color-'+c_ar_new_kj[1][4]"
          :key="7"
          v-else
        >{{$$.arrayIsSame(c_ar_new_kj[1][4].split("||"))?"三同号":"三不同"}}</span>
      </template>
      <!-- 时时彩 -->
      <template v-else-if="c_api.mark2=='ssc'">
        &emsp;后三
        <span v-show="c_ar_new_kj[6][2]!='err'" class="code code-length-2" :key="11">组三</span>
        <span v-show="c_ar_new_kj[7][2]!='err'" class="code code-length-2" :key="12">组六</span>
      </template>
    </p>
    <p class="today-qihao">
      今天已开{{issue.todayPeriod}}/{{c_api.maxPeriod}}期
      <span
        v-if="forChat"
        @click="fn_to_plan_web()"
        class="fr pointer share"
      >计划官网</span>
      <a
        v-show="api[apiSelect].id!='bj'"
        @click="$$.blank2Url(c_data.affurl)"
        class="fr pointer share"
      >注册{{api[apiSelect].lotteryname}}</a>

      <span @click="fn_copy_the_plan()" class="fr pointer copyPlan">复制当前计划</span>
    </p>
    <div class="select" :style="{background:webSet.siteConfig.backColor}">
      <!-- 玩法 -->
      <select v-model="plan.way" class="pointer">
        <template v-for="(d,i) in c_api_name">
          <option
            class="positon"
            v-show="!fn_selectOpitionNoshow(i)"
            :class="{active:(i==plan.way)}"
            :value="i"
            :key="i"
          >{{d.name}}</option>
        </template>
      </select>
      <span>&nbsp;</span>
      <!-- 位置 -->
      <select v-model="plan.positon" class="pointer">
        <template v-for="(d,i) in c_api_name[plan.way].item">
          <option class="positon" :class="{active:(i==plan.positon)}" :value="i" :key="i">{{d.name}}</option>
        </template>
      </select>
      <span>&nbsp;</span>
      <!-- 几期 -->
      <select v-model="plan.planqi" class="pointer">
        <template v-for="(d,i) in plan.str_planqi.split('|')">
          <option class="planqi" :class="{active:(i==plan.planqi)}" :value="i" :key="i">{{d}}</option>
        </template>
      </select>
      <span>&nbsp;</span>
      <!-- 几码 -->
      <select v-model="plan.numbers" class="pointer">
        <template v-for="(d,i) in c_api_name[plan.way].item[plan.positon].item">
          <option class="numbers" :class="{active:(i==plan.numbers)}" :value="i" :key="i">{{d.name}}</option>
        </template>
      </select>
    </div>
    <div class="clearfloat"></div>

    <!-- 计划 -->
    <vueSeamless
      @click.native="fn_vueSeamless"
      :class-option="c_optionLeft"
      :data="newsList"
      class="seamless-warp2"
    >
      <ul class="item">
        <li v-for="(item,i) in newsList" :data-id="item.id" v-html="item.title" :key="i"></li>
      </ul>
    </vueSeamless>
    <div class="plan" v-show="show.view_plan">
      <p class="winRate">
        ♛{{plan.str_name.split("|")[plan.id-1]}}计划♛ {{issue.history.data.length-1}}中{{Number(issue.history.winOrLoseRate*(issue.history.data.length-1)).toFixed(0)}}
        <b>胜率{{Number(issue.history.winOrLoseRate*100).toFixed(0)}}%</b>
        <span class="right">
          <span class="search pointer" @click="fn_change_plan(-1)">保</span>
          <span
            class="search pointer"
            @click="fn_latest_results('view_winRate')"
            style="color:red"
          >计划大全</span>
          <span class="search pointer" @click="fn_change_plan(1)">换</span>
        </span>
      </p>
      <PlanList
        :list="issue.history.data"
        :max="webSet.historyPlanShowLimit"
        @child-event-fn-prompt-show="fn_prompt_authorize"
      />
      <!-- <p class="plan-title">
        <span class="qihao">计划期间</span>
        <span class="n-qi">持续</span>
        <span class="n-qi">当前</span>
        <span class="long">计划预测</span>
        <span>开奖</span>
        <span>结果</span>
      </p>

      <template v-for="(d,i) in issue.history.data">
        <Plan
          v-if="i<webSet.historyPlanShowLimit"
          class="plan-item"
          :planData="d"
          :key="i"
          @child-event-fn-prompt-show="fn_prompt_authorize"
        />
      </template>-->
    </div>

    <!-- 排行榜 -->
    <div class="win-rates" v-show="show.view_winRate">
      <p class="tips">
        ♛胜率排行榜♛
        <span>点击上方菜单可切换排行榜</span>
        <span @click="fn_show_plan()" class="right pointer">返回</span>
      </p>

      <template v-for="(leaderboardItem,i) in c_leaderboard_data">
        <p :key="i" :data-planId="leaderboardItem.id" @click="fn_show_plan(leaderboardItem.id)">
          {{(i>8)?(i+1):("0"+String(i+1))}}. {{plan.str_name.split("|")[leaderboardItem.id-1]}} 胜率{{Number(leaderboardItem.rate*100).toFixed(0)}}%
          <span
            v-if="i>=(c_needAuthorizeArr[0]-1) && i<c_needAuthorizeArr[1]"
            class="right pointer"
          >授权查看</span>
          <span v-else class="right pointer" style="border-color:#ff7600;">免费查看</span>
        </p>
      </template>
    </div>

    <!-- 广告 -->
    <a
      v-if="!forChat && webSet.planBottomImg.src!='isNull'"
      @click="$$.blank2Url(webSet.planBottomImg.url=='isNull'?c_data.affurl:webSet.planBottomImg.url)"
      style="border-top:#ccc 1px solid;margin-top:.5em;"
    >
      <img alt="稳定平台推荐" class="ad" :src="webSet.planBottomImg.src" />
    </a>

    <!-- 历史 -->
    <HistoryPlanName
      v-show="plan.historyId.show"
      :name="plan.str_name"
      :data="plan.historyId.data"
      @child-event-fn-show-plan="fn_show_plan"
      @child-event-fn-history-plan-name-close="plan.historyId.__close"
    />

    <transition name="fade">
      <Prompt
        v-if="prompt.show"
        :title="prompt.title"
        :tips="prompt.tips"
        @child-event-fn-prompt-yes="prompt.__yes"
        @child-event-fn-prompt-no="prompt.__no"
      />
    </transition>

    <!-- <transition name="fade">
      <Alert
        v-if="alert.show"
        :title="alert.title"
        :tips="alert.tips"
        @child-event-fn-alert-hide="alert.__hide"
      />
    </transition>-->

    <!-- 登录，注册 -->
    <transition name="fade">
      <PromptTwo
        v-if="PromptTwo.show"
        :set="PromptTwo.set"
        @child-event-fn-to-left="PromptTwo.__left"
        @child-event-fn-to-right="PromptTwo.__right"
        @child-event-fn-PromptTwo-hide="PromptTwo.__hide"
      />
    </transition>
  </div>
</template>

<script>
import Plan from "../components/PagePlan/Plan.vue";
import PlanList from "../components/PagePlan/PlanList.vue";

import HistoryPlanName from "../components/PagePlan/HistoryPlanName.vue";

import AnimatedInteger from "../components/common/AnimatedInteger";
import Prompt from "../components/common/Prompt.vue";
import PromptTwo from "../components/common/PromptTwo.vue";
import Alert from "../components/common/Alert.vue";

import vueSeamless from "vue-seamless-scroll";
export default {
  name: "app",
  data() {
    const that = this;
    return {
      needAuthorizeJson: { all: [0, 0] },
      api: [
        {
          code: "10",
          defaultNumbers: "0",
          defaultPlanPosition: "0",
          defaultPlanQi: "2",
          delayPeriod: "10",
          dir: "pk10-js",
          id: "1",
          intervalPeriod: "60",
          link: "http://154.92.177.252/api/",
          lotteryID: "js",
          lotteryname: "暂无可用彩种",
          maxPeriod: "1440",
          strPlanName:
            "百折不挠|金蝉脱壳|百里挑一|金玉满堂|壮志凌云|霸王别姬|天上人间|不吐不快|海阔天空|情非得已|满腹经纶|坚定不移|春暖花开|奋发图强|黄道吉日|天下无双|偷天换日|两小无猜|卧虎藏龙|珠光宝气|簪缨世族|花花公子|绘声绘影|国色天香|相亲相爱|八仙过海|金玉良缘|掌上明珠|皆大欢喜|生财有道|极乐世界|情不自禁|坚持不懈|魑魅魍魉|龙生九子|持之以恒|勇往直前|高山流水|卧薪尝胆|壮志凌云|金枝玉叶|四海一家|穿针引线|无忧无虑|坚毅顽强|三位一体|落叶归根|相见恨晚|惊天动地|滔滔不绝|相濡以沫|长生不死|原来如此|女娲补天|三皇五帝|斗志昂扬|水木清华|破釜沉舟|天涯海角|牛郎织女|倾国倾城|飘飘欲仙|福星高照|朝气蓬勃|永无止境|学富五车|饮食男女|英雄豪杰|国士无双|力争上游|万家灯火|石破天惊|精忠报国|养生之道|覆雨翻云|六道轮回|鹰击长空|日日夜夜|厚德载物|锲而不舍|万里长城|黄金时代|出生入死|一路顺风|随遇而安|千军万马|棋逢对手|叶公好龙|至死不懈|守株待兔|凤凰于飞|一生一世|花好月圆|世外桃源|韬光养晦|坚忍不拔|青梅竹马|风花雪月|英勇无畏|总而言之",
          strPosition:
            '[{"name":"定位胆","item":[{"name":"万","item":[{"name":"四码","item":4},{"name":"五码","item":5},{"name":"六码","item":6},{"name":"七码","item":7}]},{"name":"千","item":[{"name":"四码","item":4},{"name":"五码","item":5},{"name":"六码","item":6},{"name":"七码","item":7}]},{"name":"百","item":[{"name":"四码","item":4},{"name":"五码","item":5},{"name":"六码","item":6},{"name":"七码","item":7}]},{"name":"十","item":[{"name":"四码","item":4},{"name":"五码","item":5},{"name":"六码","item":6},{"name":"七码","item":7}]},{"name":"个","item":[{"name":"四码","item":4},{"name":"五码","item":5},{"name":"六码","item":6},{"name":"七码","item":7}]}]},{"name":"大小定位","item":[{"name":"万","item":[{"name":"一码","item":1}]},{"name":"千","item":[{"name":"一码","item":1}]},{"name":"百","item":[{"name":"一码","item":1}]},{"name":"十","item":[{"name":"一码","item":1}]},{"name":"个","item":[{"name":"一码","item":1}]}]},{"name":"单双定位","item":[{"name":"万","item":[{"name":"一码","item":1}]},{"name":"千","item":[{"name":"一码","item":1}]},{"name":"百","item":[{"name":"一码","item":1}]},{"name":"十","item":[{"name":"一码","item":1}]},{"name":"个","item":[{"name":"一码","item":1}]}]},{"name":"和值","item":[{"name":"大小","item":[{"name":"四码","item":4}]},{"name":"单双","item":[{"name":"一码","item":1}]},{"name":"大小单双","item":[{"name":"一码","item":1}]}]},{"name":"龙虎","item":[{"name":"万个","item":[{"name":"一码","item":1}]}]},{"name":"五星","item":[{"name":"定胆","item":[{"name":"一码","item":1}]}]},{"name":"组三","item":[{"name":"前三","item":[{"name":"七码","item":7},{"name":"八码","item":8},{"name":"九码","item":9}]},{"name":"中三","item":[{"name":"七码","item":7},{"name":"八码","item":8},{"name":"九码","item":9}]},{"name":"后三","item":[{"name":"七码","item":7},{"name":"八码","item":8},{"name":"九码","item":9}]}]},{"name":"组六","item":[{"name":"前三","item":[{"name":"六码","item":6},{"name":"七码","item":7},{"name":"八码","item":8},{"name":"九码","item":9}]},{"name":"中三","item":[{"name":"六码","item":6},{"name":"七码","item":7},{"name":"八码","item":8},{"name":"九码","item":9}]},{"name":"后三","item":[{"name":"六码","item":6},{"name":"七码","item":7},{"name":"八码","item":8},{"name":"九码","item":9}]}]}]',
          switch: "0",
          mark2: "pcdd"
        }
      ],
      apiSelect: this.webSet.apiSelect - 1,
      prompt: {
        show: false,
        title: "title",
        tips: "tips",
        __yes: function() {},
        __no: function() {
          that.prompt.show = false;
        }
      },
      // alert: {
      //   show: false,
      //   title: "title",
      //   tips: "tips",
      //   __hide: function() {
      //     that.alert.show = false;
      //   }
      // },
      PromptTwo: {
        show: false,
        set: {
          title: "title",
          btn: ["btn1", "btn2"],
          placeholder: ["input1Tips", "input2Tips"],
          tips: ""
        },
        __hide: function() {
          that.PromptTwo.show = false;
        },
        __left: function() {},
        __right: function() {}
      },
      plan: {
        id: 0, //[1-100]
        whiteId: 0,
        max: 100,
        planqi: "0",
        way: "0",
        positon: "0",
        numbers: "0",
        str_name: "",
        str_positon: "",
        str_numbers: "",
        str_planqi: "",
        historyId: {
          mark: 0,
          data: [],
          show: false,
          __close: function() {
            that.plan.historyId.show = false;
          }
        } //保存看过的id，用于前进后退
      },
      issue: {
        period: 999999,
        todayPeriod: 0, //[1-179]
        name: "loading",
        result: {
          rows: 5,
          code: "xxxx",
          info: "xxxxxx",
          data: [
            {
              expect: "72xxxx",
              opencode:
                "**,**,**|||**,**,**,**,**|||**,**,**|||**,**,**|||**,**,**|||**,**,**|||**,**,**|||**,**,**|||**,**,**",
              opentime: "****-**-** **:**:**",
              opentimestamp: 888888888
            }
          ]
        },
        djsTimer: null,
        djs: -999,
        history: {
          first: 0, //是否初始化历史数据
          limit: this.webSet.historyLimit, //显示近N期的胜率
          data: [
            {
              period: 2019000000,
              todayPeriod: "000",
              openCode: "-1",
              openCodeOne: "\u7b49",
              planOne: "0,0,0,0",
              result: "\u7b49",
              markMark: 1,
              periods: "2019000000~2019000000",
              mark: 0
            }
          ], //历史数据)
          winOrLoseRate: 0
        }
      },
      leaderboard: {
        data: [{ id: 1, rate: 0, countWin: 0, plan: [] }], //c_leaderboard_data 为limit并排序的数据
        limit: this.webSet.leaderboardLimit,
        maxWin: { id: 2, rate: 0.66, countWin: 66 }
      },
      show: {
        view_plan: true,
        view_winRate: false
      },
      setTimeoutMark: null,
      userCenter: this.appUserCenter
    };
  },
  props: {
    c_data: Object,
    webSet: Object,
    appUserCenter: Object,
    c_my_api: Object,
    forChat: Boolean
  },
  computed: {
    newsList() {
      return [
        {
          title:
            "当前最多连中♛" +
            this.plan.str_name.split("|")[
              Number(+this.leaderboard.maxWin.id) - 1
            ] +
            "计划♛ 已连中" +
            this.leaderboard.maxWin.countWin +
            "期，点击查看",
          id: this.leaderboard.maxWin.id
        },
        {
          title:
            "当前最高胜率♛" +
            this.plan.str_name.split("|")[
              Number(+this.c_leaderboard_data[0].id) - 1
            ] +
            "计划♛ " +
            this.webSet.historyLimit +
            "期胜率" +
            Number(this.c_leaderboard_data[0].rate * 100).toFixed(0) +
            "%，点击查看",
          id: this.c_leaderboard_data[0].id
        },
        {
          title:
            "<a>♛" +
            this.plan.str_name.split("|")[
              Number(+this.c_leaderboard_data[0].id) - 1
            ] +
            "计划♛ " +
            this.webSet.historyLimit +
            "期胜率" +
            Number(this.c_leaderboard_data[0].rate * 100).toFixed(0) +
            "%，点击查看</a>",
          id: this.c_leaderboard_data[0].id
        }
      ];
    },
    c_needAuthorizeArr() {
      const that = this;

      const thisLotteryID = that.api[that.apiSelect].lotteryID;
      let re = this.webSet.needAuthorizeJson.all;
      if (that.webSet.needAuthorizeJson.hasOwnProperty(thisLotteryID)) {
        re = this.webSet.needAuthorizeJson[thisLotteryID];
      }
      return re;
    },
    c_optionLeft() {
      return {
        direction: 2,
        limitMoveNum: 1,
        autoPlay: true
      };
    },
    c_domain() {
      return this.$$.getDomain();
    },

    c_api() {
      if (this.api.length > this.apiSelect) {
        return this.api[this.apiSelect];
      } else {
        return this.api[0];
      }
    },
    c_api_name() {
      return JSON.parse(this.c_api.strPosition);
    },
    c_plan_name() {
      return this.plan.str_name.split("|")[this.plan.id - 1];
    },
    c_leaderboard_data() {
      return this.fn_sortByKey(this.leaderboard.data, "rate").slice(
        0,
        this.leaderboard.limit
      );
    },
    c_ar_new_kj() {
      const ar1 = this.issue.result.data[0].opencode.split("|||");
      for (let i in ar1) {
        ar1[i] = ar1[i].split(",");
      }
      return ar1;
    },
    c_djs_time() {
      return this.issue.djs < 0
        ? "封盘开奖中"
        : this.fn_add0(~~(this.issue.djs / 60)) +
            "分" +
            this.fn_add0(this.issue.djs % 60) +
            "秒";
    },
    c_url_day_dir() {
      return (
        this.c_my_api.plan +
        "getFileName.php?dir=" +
        this.c_api.dir +
        "/txt-kj/" +
        this.fn_get_day()
      );
    },
    c_url_kj() {
      return (
        this.c_my_api.plan +
        "getFile.php?f=" +
        this.c_api.dir +
        "/txt-kj/" +
        this.fn_get_day() +
        "/" +
        this.issue.period +
        ".txt"
      );
    },
    c_url_history() {
      const p = this.plan.positon;
      const y = this.plan.way;
      const q = Number(this.plan.planqi) + 1;
      const n = this.plan.numbers;
      const h = this.issue.history.limit;
      const id = this.plan.id;
      const a = this.c_api.dir;
      //登出时，that.userCenter.info = null;
      // const token = this.userCenter.info.hasOwnProperty("loginToken")
      //   ? this.userCenter.info.loginToken
      //   : this.$store.state.token;
      const token = this.userCenter.info
        ? this.userCenter.info.hasOwnProperty("loginToken")
          ? this.userCenter.info.loginToken
          : this.$store.state.token
        : this.$store.state.token;
      const uid = this.userCenter.info ? this.userCenter.info.id : "0";
      const whiteId = this.plan.whiteId;
      this.$$.console.red("this.userCenter.info");
      console.log(this.userCenter.info);
      this.$$.console.red("this.$store.token=" + this.$store.state.token);
      this.$$.console.red("token=" + token);
      return (
        this.c_my_api.plan +
        "getWinRates.php?id=" +
        id +
        "&y=" +
        y +
        "&p=" +
        p +
        "&n=" +
        n +
        "&h=" +
        h +
        "&a=" +
        a +
        "&q=" +
        q +
        "&w=" +
        whiteId +
        "&uid=" +
        uid +
        "&tk=" +
        encodeURIComponent(token)
      );
    }
  },
  components: {
    Plan,
    PlanList,
    AnimatedInteger,
    HistoryPlanName,
    PromptTwo,
    Prompt,
    // Alert,
    vueSeamless
  },
  created() {
    const that = this;

    const searchJson = that.$$.getSearch();

    let __plantype = that.webSet.plantype;

    that.$$.console.red("plan page created: " + __plantype);

    that.fn_get_plan_api().then(function(e) {
      console.log(">>> fn_get_plan_api >>> " + e);
      console.log(e.data.data);
      const oldAPI = e.data.data;
      let tempAPI = [];
      oldAPI.forEach(element => {
        if (
          element.switch == "1" &&
          (element.mark2 == __plantype || __plantype == "all")
        ) {
          tempAPI.push(element);
        }
      });

      that.api = tempAPI;

      that.$$.console.red("that.api");
      console.log(that.api);
      console.log(that.apiSelect);
      that.apiSelect =
        that.apiSelect > that.api.length - 1 ? 0 : that.apiSelect;
      console.log(that.apiSelect);

      that.$$.sortBy(that.api, "mark1", 1);

      that.plan.planqi = that.api[that.apiSelect].defaultPlanQi;
      that.plan.positon = that.api[that.apiSelect].defaultPlanPosition;
      that.plan.numbers = that.api[that.apiSelect].defaultNumbers;
      that.plan.str_name = that.api[that.apiSelect].strPlanName;
      that.plan.str_planqi = that.api[that.apiSelect].strQis;

      //--------------------------get default planID---------------------------------------------
      // if (that.webSet.defaultPlanID != "0") {
      //   that.$$.console.yellow(
      //     "get default planID >>>>" + that.webSet.defaultPlanID
      //   );
      //   that.plan.id = that.webSet.defaultPlanID;

      //   that.plan.whiteId = that.webSet.defaultPlanID; //计划白名单，无须授权可看
      // } else {
      //   that.$$.console.black("looking for best plan >>>> id = ?");
      // }
      //   that.plan.id = that.webSet.defaultPlanID;
      that.fn_inint_1();
    });
  },
  watch: {
    apiSelect(n, o) {
      this.$$.console.black(
        "watch-->apiSelect，更新面板历史数据---" + o + "-->" + n
      );
      console.log("old-->localStorage.apiSelect=" + localStorage.apiSelect);
      //玩法重置
      this.plan.way = 0;

      this.plan.positon = this.api[n].defaultPlanPosition;
      this.plan.numbers = this.api[n].defaultNumbers;
      //获取此彩种的最新开奖数据
      this.fn_api_get_new_qi("newApiSelect"); //加参数，以强制刷新开奖数据；

      if (n != o && localStorage.apiSelect != n) {
        localStorage.apiSelect = n;
        console.log(
          "change-->localStorage.apiSelect=" + localStorage.apiSelect
        );
      }
    },
    "plan.id"(val, oldVal) {
      //更新计划预测
      if (oldVal != 0) {
        this.fn_latest_results();
      }
    },
    "plan.way"(val, oldVal) {
      //玩法重置
      console.warn("玩法重置：" + oldVal + "->" + val);
      const l_p = this.c_api_name[val].item.length;
      if (this.plan.positon >= l_p) {
        if (this.c_api.defaultPlanPosition >= l_p) {
          this.plan.positon = 0;
        } else {
          this.plan.positon = this.c_api.defaultPlanPosition;
        }
      }
      console.warn("玩法重置:positon->" + this.plan.positon);
      const l_n = this.c_api_name[val].item[this.plan.positon].item.length;
      if (this.plan.numbers >= l_n) {
        if (this.c_api.defaultNumbers >= l_n) {
          this.plan.numbers = 0;
        } else {
          this.plan.numbers = this.c_api.defaultNumbers;
        }
      }
      console.warn("玩法重置:numbers->" + this.plan.numbers);
      this.fn_latest_results();
    },
    "plan.positon"(val, oldVal) {
      //位置重置
      console.warn("位置重置：" + oldVal + "->" + val);
      const l_n = this.c_api_name[this.plan.way].item[val].item.length;
      if (this.plan.numbers >= l_n) {
        if (this.c_api.defaultNumbers >= l_n) {
          this.plan.numbers = 0;
        } else {
          this.plan.numbers = this.c_api.defaultNumbers;
        }
      }
      console.warn("位置重置:numbers->" + this.plan.numbers);
      this.fn_latest_results();
    },
    "plan.numbers"(val, oldVal) {
      //码数重置
      console.warn("码数重置：" + oldVal + "->" + val);
      const l_n = this.c_api_name[this.plan.way].item[this.plan.positon].item.length;
       console.warn("码数重置：总数=" + l_n+"，当前="+this.plan.numbers);
      if (this.plan.numbers >= l_n) {
        if (this.c_api.defaultNumbers >= l_n) {
          this.plan.numbers = 0;
        } else {
          this.plan.numbers = this.c_api.defaultNumbers;
        }
      }
       console.warn("码数重置（调整）：" + this.plan.numbers);
      this.fn_latest_results();
    },
    "plan.planqi"(val, oldVal) {
      this.fn_latest_results();
    }
  },
  methods: {
    fn_selectOpitionNoshow(i) {
      if (this.c_api_name[i].name == "定位胆" && this.c_api.mark2 == "pcdd") {
        this.plan.way = this.plan.way == 0 ? 1 : this.plan.way;
        return true;
      } else {
        return false;
      }
    },
    fn_copy_the_plan() {
      let title = this.c_api.lotteryname;
      title = title.split("");
      title = title.join(" ");
      let txtplan = "";
      let theplanArr = this.issue.history.data.slice(0, 6);
      for (let i = 0; i < 6; i++) {
        let plan = theplanArr[i];
        const ar = (plan.periods + "").split("~");
        let a1, a2;
        const n = 3;
        if (ar.length > 1) {
          a1 = ar[0].substr(-n);
          a2 = ar[1].substr(-n);
        } else {
          a2 = ar[0].substr(-n);
          a1 = a2;
        }
        const result =
          plan.result == 1 ? "中" : plan.result == -1 ? "挂" : "等";
        const way = this.c_api_name[this.plan.way].name;
        const positon = this.c_api_name[this.plan.way].item[this.plan.positon]
          .name;
        txtplan =
          a1 +
          "-" +
          a2 +
          "期 " +
          way +
          positon +
          "【" +
          plan.planOne +
          "】" +
          String(plan.period).substr(-3) +
          "期 " +
          result +
          "\r\n" +
          txtplan;
      }
      let txt = title + "\r\n";
      txt += "========================" + "\r\n";
      txt += txtplan;
      txt += "========================" + "\r\n";
      txt +=
        "第 " +
        this.issue.period +
        " 期开奖号码：" +
        this.c_ar_new_kj[0].join(" ") +
        "" +
        "\r\n";
      txt += "========================" + "\r\n";
      txt += this.c_data.name.substr(0, 4) + "，彩种丰富，永久免费" + "\r\n";
      txt +=
        "善意提醒：" +
        this.c_data.name.substr(0, 2) +
        "无神，跟反自由" +
        "\r\n";
      let url = this.c_domain;
      if (this.userCenter.isLogin) {
        if (this.userCenter.info.agentStatus == 1) {
          url = this.userCenter.info.aff;
        } else {
          url = this.userCenter.info.shareLink;
        }
      }
      txt += "计划网址：" + url + "\r\n";
      txt += "【请复制网址到浏览器打开】\r\n";
      this.fn_copy_text(txt, "计划已复制，快去分享给你的小伙伴吧");
    },
    fn_vueSeamless(e) {
      // 检查事件源e.targe是否为Li

      if (e.target.nodeName.toLowerCase() === "li") {
        const id = parseInt(e.target.dataset.id);
        // 获得引索后，只需要修改data数据就能改变UI了
        this.fn_show_plan(id);
      }
    },
    fn_PromptTwo_login() {
      this.$emit("child-event-fn-show-login");
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
    },

    fn_show_page(v) {
      this.$emit("child-event-fn-show-page", v);
    },
    fn_to_plan_web() {
      window.open(this.c_domain + "?plan");
    },
    fn_share() {
      console.log(this.userCenter.isLogin);
      if (this.userCenter.isLogin) {
        this.fn_copy_text(
          this.userCenter.info.shareLink,
          "分享网址已复制，赶快去粘贴并发送给朋友吧"
        );
      } else {
        this.fn_alert("请先注册/登录");
      }
    },
    fn_inint_1() {
      if (localStorage.apiSelect) {
        this.apiSelect = localStorage.apiSelect;
        this.apiSelect =
          this.apiSelect > this.api.length - 1 ? 0 : this.apiSelect;
      }
      if (localStorage.historyplan) {
        this.plan.historyId.data = localStorage.historyplan.split(",");
      }

      this.$$.console.red("递归循环新一期");
      this.fn_api_get_new_qi("loop"); //递归循环
    },
    fn_inint_2() {
      this.$emit("child-event-end-apploading");
    },
    fn_add_0(v, n) {
      n--; //n位数 n=3  001 --999
      for (let i = 1; i <= n; i++) {
        // 1,2
        let n10 = Math.pow(10, i); //10 100
        if (v < n10) {
          v = "0" + v;
        }
      }
      return v;
      //n=1，2,3,4  Math.pow(x,y)  x的y次方
    },
    fn_change_plan(n) {
      if (n === 1) {
        this.plan.historyId.mark--;
        if (this.plan.historyId.mark >= 0) {
          this.plan.id = this.plan.historyId.data[this.plan.historyId.mark];
        } else {
          const plan_id_random =
            Math.round(Math.random() * (this.plan.max - 1)) + 1;
          this.fn_show_plan(plan_id_random);
        }
      } else if (n === -1) {
        console.log("this.plan.historyId.data------------------");
        console.log(this.plan.historyId.data);
        this.plan.historyId.show = true;
      } else {
        console.log("no 1 or -1");
      }
    },
    fn_show_plan(id) {
      this.show.view_plan = true;
      this.show.view_winRate = false;
      console.log("methods-->fn_show_plan-->id:" + id);

      if (id && this.plan.id != id) {
        this.plan.id = id;

        if (this.plan.historyId.data.indexOf(String(this.plan.id)) == -1) {
          this.plan.historyId.data.unshift(String(this.plan.id));
          if (this.plan.historyId.data.length > 10) {
            this.plan.historyId.data.pop();
          }

          localStorage.historyplan = this.plan.historyId.data;
          console.log(localStorage.historyplan);
          this.plan.historyId.mark = 0;
        }
      }
    },
    fn_djs(t) {
      let that = this;
      that.issue.djs = ~~(t
        ? that.c_api.intervalPeriod - t
        : that.c_api.intervalPeriod);

      clearInterval(that.issue.djsTimer);
      that.issue.djsTimer = setInterval(() => {
        that.issue.djs--;
        if (that.issue.djs < 0) {
          clearInterval(that.issue.djsTimer);
        }
      }, 1000);
    },
    fn_latest_results(mark) {
      this.$$.console.blue(mark + ",period=" + this.issue.period);
      if (mark === "view_winRate") {
        // 为了显示最近连中几期…… 2019-03-10 14:20:34
        this.show.view_plan = false;
        this.show.view_winRate = true;
        return;
      }
      const that = this;
      console.log("try-->fn _latest_results()");
      if (that.issue.period == 999999) {
        console.log("error-->period=" + this.issue.period);
        return;
      }
      that.$axios
        .get(that.c_url_history)
        .then(function(response) {
          // handle success
          const re = response.data;

          console.log("success-->fn _latest_results:" + response.config.url);

          if (re == "") {
            if (that.plan.planqi == 0) {
              that.fn_alert("获取计划失败，切换到下一个彩种");
              that.apiSelect =
                that.apiSelect >= that.api.length - 1 ? 0 : that.apiSelect + 1;
              return;
              return;
            } else {
              that.plan.planqi = 0;
              return;
            }
          }
          ///////////////////////////////////////////////////////////////////////////////
          if (re == "Unable to open file!" || re == "Unable to open dir!") {
            that.leaderboard.data = [{ id: 1, rate: 1, countWin: 1 }];
          } else {
            that.leaderboard.data = re;
            const temp = that.fn_sortByKey(that.leaderboard.data, "countWin");
            that.leaderboard.maxWin = temp.slice(0, 1)[0];

            /////////第一次，初始化///////////////////////
            if (that.issue.history.first == 0) {
              that.$$.console.yellow(
                mark +
                  "------that.issue.history.first: 0 to 1 >>> fn _inint_2 ------------"
              );
              that.fn_inint_2();
              that.issue.history.first = 1;
              that.plan.whiteId =
                that.leaderboard.data[that.webSet.defaultPlanID - 1].id;
              that.plan.id = that.plan.whiteId;

              if (
                that.plan.historyId.data.indexOf(String(that.plan.id)) == -1 &&
                that.plan.id != 0
              ) {
                that.plan.historyId.data.unshift(String(that.plan.id));
                if (that.plan.historyId.data.length > 10) {
                  that.plan.historyId.data.pop();
                }
                localStorage.historyplan = that.plan.historyId.data;
                console.log(localStorage.historyplan);
                that.plan.historyId.mark = 0;
              }

              that.$$.console.black(
                "looking for best plan >>>> id = " + that.plan.id
              );
            } else {
              that.$$.console.yellow(
                mark +
                  "that.issue.history.first  >>> " +
                  that.issue.history.first
              );
            }
            ///////////////////////////////
            console.log(that.leaderboard.data);
            for (let iiii in that.leaderboard.data) {
              let ___temp = that.leaderboard.data[iiii];
              if (___temp.id == that.plan.id) {
                that.issue.history.data = ___temp.plan; //2019-03-10 13:00:21修改，倒序输出
                that.issue.history.winOrLoseRate = Number(___temp.rate).toFixed(
                  2
                );
                that.$$.console.red("get-->fn _latest_results:");

                break;
              }
            }
          }
        })
        .catch(function(error) {
          // handle error
          console.log("error-->fn _latest_results:");
          console.warn(error);
        })
        .then(function() {
          // always executed
        });
    },
    fn_api_get_new_qi(callBack) {
      //循环 获取目录，检测是否开奖
      let that = this;
      that.$axios
        .get(this.c_url_day_dir)
        .then(function(response) {
          const re = response.data;
          if (re == "0") {
            that.fn_alert(
              that.c_api.lotteryname + " 还未开奖，切换到下一个彩种"
            );
          //  that.apiSelect =that.apiSelect >= that.api.length - 1 ? 0 : that.apiSelect + 1;
            return;
          }

          let arr = re.split("|");
          if (arr[arr.length - 1] == "") {
            arr.splice(-1, 1);
          }
          arr.sort();
          that.issue.todayPeriod = arr.length;

          const new_txt = arr[that.issue.todayPeriod - 1];
          const new_qi = new_txt.split(".")[0];

          const year_ = new Date().getFullYear();
          if (new_qi.indexOf(year_) == 0) {
            that.issue.todayPeriod = Number(new_qi.slice(8));
          } else {
            that.issue.todayPeriod = new_qi - arr[0].split(".")[0] + 1;
          }

          if (that.issue.period != new_qi || callBack == "newApiSelect") {
            ////////////////////////////////////////////
            ///////////////获取最新一期///////////////////////
            ////////////////////////////////////////////
            that.issue.period = Number(new_qi);
            that.fn_api_get_kj();
          }
        })
        .catch(function(error) {
          // handle error
          console.log("error-->fn _api_get_new_qi:");
          console.warn(error);
        })
        .then(function() {
          if (callBack == "loop") {
            that.setTimeoutMark = setTimeout(function() {
              that.fn_api_get_new_qi("loop");
            }, 1000);
          }
          // always executed
        });
    },
    fn_api_get_kj() {
      //获取开奖，更新计划数据，并倒计时
      let that = this;
      that.$axios
        .get(this.c_url_kj)
        .then(function(response) {
          // handle success
          console.log("success-->fn _api_get_kj:");
          if (response.data == "Unable to open file!") {
            console.log(response);
            return;
          }
          console.log(
            "【当前】第" +
              response.data.data[0].expect +
              "期开奖：" +
              response.data.data[0].opencode +
              " 时间：" +
              response.data.data[0].opentime
          );
          that.issue.result = response.data;
          that.$$.console.red("开奖，更新计划数据");
          that.fn_latest_results();
          //////////////////  开奖延迟  /////////////////////////////
          const opentime = new Date(
            that.issue.result.data[0].opentime.replace(/-/g, "/")
          );
          let time_ = (new Date() - opentime) / 1000;
          let time_delayPeriod = time_ + Number(that.c_api.delayPeriod);
          console.log(
            "---------------------------------------比官方开奖延迟-- time_ = " +
              time_ +
              "--delayPeriod=" +
              that.c_api.delayPeriod +
              "--all=" +
              time_delayPeriod +
              "-------------------"
          );
          /////////////////  开奖延迟  //////////////////////////////
          that.fn_djs(time_delayPeriod);
        })
        .catch(function(error) {
          // handle error
          console.log("error-->fn _api_get_kj:");
          console.warn(error);
        })
        .then(function() {
          // always executed
        });
    },
    fn_add0(n) {
      return n < 10 ? "0" + n : n;
    },
    fn_randomArray(ar) {
      console.log(re);

      var r = Math.floor(Math.random() * n);
      return ar[r];
    },
    fn_sortByKey(array, key) {
      var temp = array.slice(0);
      return temp.sort(function(a, b) {
        var x = a[key];
        var y = b[key];
        return x > y ? -1 : x < y ? 1 : 0;
      });
    },
    fn_getTime() {
      var date = new Date();
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D =
        (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
      var h =
        (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
      var m =
        (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
        ":";
      var s =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return Y + M + D + h + m + s;
    },
    // fn_alert(tips, title) {
    //   this.alert.show = true;
    //   this.alert.title = title || "温馨提示";
    //   this.alert.tips = tips;
    // },
    fn_alert(tips, title) {
      this.$emit("child-event-alert", tips, title);
    },
    fn_prompt_authorize() {
      this.$emit("child-event-fn-prompt-show");
      //   this.plan.id = this.plan.whiteId;
    },

    fn_copy_text(text_, tips) {
      let range = document.createRange();
      let eleP = document.createElement("p");
      let ele = document.createTextNode(text_);
      eleP.appendChild(ele);
      document.body.appendChild(eleP);
      range.selectNode(ele);
      var selection = window.getSelection();
      if (selection.rangeCount > 0) selection.removeAllRanges();
      selection.addRange(range);
      console.log(selection);
      document.execCommand("copy");
      document.body.removeChild(eleP);
      if (tips) {
        alert(tips);
      }
    },
    fn_get_real_day() {
      let today = new Date();
      let y = today.getFullYear();
      let m = today.getMonth() + 1;
      let d = today.getDate();
      return y + "/" + this.fn_add0(m) + "/" + this.fn_add0(d);
    },
    fn_get_day() {
      /*
        2019年7月15日 04:49:26  开奖时间从数据库获取，判断当前是否开奖，以读取今天或昨天的计划
        */
      let kjTime = "00:00:00";
      if (this.c_api.mark3 != null) {
        let timeArr = this.c_api.mark3.split("|");
        kjTime = timeArr[0];
      }

      let nowTime = new Date();
      kjTime = new Date(this.fn_get_real_day() + " " + kjTime);

      console.log("nowTime=" + nowTime);
      console.log("kjTime=" + kjTime);

      //转换成毫秒进行比较
      if (nowTime.getTime() > kjTime.getTime()) {
        //已经超过开奖时间，读取今天的
        console.log(this.c_api.lotteryname + " >>> 读取 今天");
      } else {
        //还没有到开奖时间，读取昨天的
        this.$$.console.red(this.c_api.lotteryname + " >>> 读取 昨天");
        nowTime = new Date(nowTime.getTime() - 24 * 60 * 60 * 1000);
      }
      var y = nowTime.getFullYear();
      var m = nowTime.getMonth() + 1;
      var d = nowTime.getDate();
      return "" + y + this.fn_add0(m) + this.fn_add0(d);
    }
  },
  beforeDestroy() {
    const that = this;
    clearTimeout(that.setTimeoutMark);
    that.setTimeoutMark = null;
  }
};
</script>

<style lang="less">
@rem: 32/1rem;
body,
html {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  background-color: #bfbfbf;
}
#PagePlan {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  font-size: 12px;
  background-color: #fff;
}
/*清除浮动*/
.clearfloat:after {
  display: block;
  clear: both;
  content: "";
  visibility: hidden;
  height: 0;
}
.clearfloat {
  zoom: 1;
}
.pointer {
  cursor: pointer;
}
h1.title {
  padding: 0 0.25rem;
  margin: 0;
  text-align: left;
  width: 100%;
  box-sizing: border-box;
  float: left;
  position: relative;
  background-color: #201617;
  color: #ccc;
  height: 1rem;
  line-height: 1rem;
  font-size: 16 / @rem;
}

h1.title span {
  position: relative;
  display: block;
  max-width: 6rem;
  text-align: right;
  float: right;
}
p {
  font-size: 16 / @rem;
  margin: 0;
  padding: 0;
}
img {
  max-width: 100%;
  padding: 0;
  margin: 0;
  display: block;
}
.djs {
  font-size: 12 / @rem;
}
.djs .djs-span {
  display: inline-block;
  width: 5.5rem;
  text-align: left;
}
.djs .djs-span:last-child {
  width: 4rem;
  text-align: right;
}

.today-qihao {
  text-align: left;
  font-size: 12 / @rem;
  padding: 0 0.25rem;
}

.plan-title > span {
  display: inline-block;
  width: 1rem;
  font-size: 12 / @rem;
}
span.qihao {
  display: inline-block;
  width: 1.6rem;
}
span.n-qi {
  //2
  display: inline-block;
  width: 0.8rem;
}
.plan-item {
  border-top: 1 / @rem #ddd solid;
}
.plan-item > * {
  vertical-align: middle;
}
.plan-title span.long,
.plan-item span.long {
  display: inline-block;
  width: 4.5rem;
  padding: 4 / @rem 0;
}

.plan-item span.long-2,
.plan-title span.long-2 {
  display: inline-block;
  width: 4rem;
}
.plan-item span.long-3,
.plan-title span.long-3 {
  display: inline-block;
  width: 2.8rem;
}
.code {
  font-size: 16 / @rem;
  display: inline-block;
  height: 24 / @rem;
  width: 24 / @rem;
  background: #333;
  color: #fff;
  border-radius: 4 / @rem;
  margin: 4 / @rem;
  text-align: center;
  line-height: 24 / @rem;
}
.code.code-length-1,
.plan-title .code-length-1 {
  width: 26 / @rem;
}
.code.code-length-2,
.plan-title .code-length-2 {
  width: 40 / @rem;
}
.code.code-length-3,
.plan-title .code-length-3 {
  width: 80 / @rem;
}
.code.plan-code.code-length-1 {
  width: 0.5rem;
}
.code.plan-code.code-length-2 {
  width: 1rem;
}
.code-0.code-color-大,
.code-0.code-color-双,
.code-0.code-color-红 {
  background: #ff6666;
}
.code-0.code-color-小,
.code-0.code-color-单,
.code-0.code-color-蓝 {
  background: #0099cc;
}
.code-0.code-color-绿 {
  background: #006633;
}

select {
  outline: none;
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  width: 100%;
  height: 1.375rem;
  border-radius: 1.5625rem;
  background-color: #fff;
  border: 0.03125rem solid #d8d8d8;
  padding: 0 0.75rem;
  display: block;
  font-family: PingFangTC-Regular;
  font-size: 0.375rem;
  color: #4a4a4a;
  text-align: left;
  background: url(https://raw.githubusercontent.com/ourjs/static/gh-pages/2015/arrow.png)
    no-repeat scroll right center transparent;
  background-size: 0.375rem 0.375rem;
  background-position: 90% center;
}
/*清除ie的默认选择框样式清除，隐藏下拉箭头*/
select::-ms-expand {
  display: none;
}
.select {
  margin: 4 / @rem auto;
  position: relative;
  width: 100%;
  float: left;
  padding: 3 / @rem 0.25rem;
  box-sizing: border-box;
  background-color: #201617;
  color: #ccc;
  height: 26 / @rem;
}
.select select {
  max-width: 2rem;
  border-radius: 4 / @rem;
  padding: 0 4 / @rem;
  background-color: #fff;
  border: 0.03125rem solid #201617;
}
.select select:first-of-type {
  max-width: 2.5rem;
}
.select select,
.select span {
  float: left;
  display: block;
  height: 20 / @rem;
  line-height: 20 / @rem;
  font-size: 12 / @rem;
}

.positon {
  display: inline-block;
  width: 1rem;
  height: 0.8rem;
  font-size: 18 / @rem;
  line-height: 0.8rem;

  border-bottom: #ccc 1px solid;
  margin-top: 8 / @rem;
}
.positon.active,
.numbers.active,
.planqi.active {
  // background: #ccc;
  color: #0092dd;
  font-weight: bold;
  border-bottom: #0092dd 1px solid;
}
.planqi {
  display: inline-block;
  width: 2rem;
  height: 0.8rem;
  font-size: 14 / @rem;
  line-height: 0.8rem;

  border-bottom: #ccc 1px solid;
  margin-top: 8 / @rem;
}
.numbers {
  display: inline-block;
  width: 2.5rem;
  height: 0.8rem;
  font-size: 14 / @rem;
  line-height: 0.8rem;

  border-bottom: #ccc 1px solid;
  margin-top: 8 / @rem;
}
.winRate {
  margin: 8px auto;
  color: #0092dd;
  font-size: 12 / @rem;
  text-align: left;
  padding: 0 0.25rem;
  display: block;
  position: relative;
}
.winRate span.right {
  display: inline-block;
  width: 9em;
  border: none;
  text-align: center;
  position: absolute;
  right: 0.5em;
}
span.search {
  border: #333 1px solid;
  text-align: center;
  padding: 2px 4px;
  margin-right: 4px;
  color: #000;
}
span.right {
  display: inline-block;
  width: 4.5em;
  border: #333 1px solid;
  text-align: center;
  position: absolute;
  right: 0.5em;
}
.fr {
  display: block;
  padding: 0 2 / @rem;
  border: #333 1px solid;
  text-align: center;
  position: relative;
  float: right;
  margin-left: 2 / @rem;
  text-decoration: none;
  color: #333;
}
.share {
  color: #ff2600;
  border-color: #ff2600;
}
.copyPlan {
  color: #fff;
  border-color: #fff;
  background-color: #ff2600;
}
.win-rates {
  display: block;
  position: relative;
}
.win-rates p {
  text-align: left;
  font-size: 12 / @rem;
  padding: 2 / @rem 0.25rem;
  margin: 4 / @rem 0;
}
.win-rates p span {
  font-size: 10 / @rem;
  padding: 2 / @rem 4 / @rem;
}
.win-rates .tips {
  margin: 8px auto;
  color: #0092dd;
  font-size: 14 / @rem;
  text-align: left;
  padding: 2 / @rem 0.125rem;
}
.win-rates .tips span:first {
  font-size: 10 / @rem;
  padding-left: 1em;
}

.icon {
  display: block;
  width: 1rem;
  margin: 0 auto;
  height: 0.8rem;

  background: url("/img/base/icon.png") no-repeat;
  background-position: -4rem -2.2rem;
  background-size: 7rem;
}
.icon_zc {
  background-position: -5rem 0rem;
}
.icon_dl {
  background-position: -5rem 0rem;
}
.icon_jh {
  background-position: -4rem 0rem;
}
.icon_yh {
  background-position: -6rem -1.1rem;
}
.icon_xz {
  background-position: 0rem 0rem;
}
.icon_home {
  background-position: -3rem -3.3rem;
}
.icon_kf {
  background-position: 0 -3.3rem;
}
.icon_qq {
  background-position: -3rem -2.2rem;
}
.icon_qqq {
  background-position: -1rem -1.1rem;
}
.icon_wechat {
  background-position: -3rem -1.1rem;
}
.icon_close {
  background-position: -6rem -2.2rem;
}

.seamless-warp2 {
  cursor: pointer;
  overflow: hidden;
  height: 1.5em;
  width: 10rem;
  // 显示长度
  ul.item {
    // 每一条的显示长 度 * 条数
    li {
      width: 10rem; // 每一条的显示长 度
      float: left;
      // margin-right: 10px;
      // padding: 0 1em;
      box-sizing: border-box;
    }
  }
}

.ad {
  width: 100%;
}
</style>
