
<template>
  <!-- <p class="plan-title">【{{name}}】今日第{{todayQi}}期({{newQi}})【{{postion_}}】{{numbers_}}计划</p> -->
  <p>
    <span class="qihao">{{c_qi_hao}}</span>
    <!-- <span class="qihao"><AnimatedInteger :value="c_qi_hao_1"/>~<AnimatedInteger :value="c_qi_hao_2"/></span> -->
    <!-- <span class="n-qi">{{planData.markMark}}</span> -->
    <AnimatedInteger class="n-qi" :value="planData.markMark"/>

    <span class="n-qi">{{String(planData.period).substr(-3)}}</span>
    <!-- <AnimatedInteger class="n-qi" :value="String(planData.period).substr(-3)"/> -->
    <span class="long" :class="'long-'+c_length">
      <template v-for="(d,i) in c_planArr">
        <AnimatedInteger
          class="code plan-code"
          :class="'code-length-'+(~~d==d?1:d.length)"
          :key="i"
          @click.native="fn_check(d)"
          :value="d"
        />
        <!-- <span class="code plan-code" :key="i" @click="fn_check(d)">{{d}}</span> -->
      </template>
    </span>
    <AnimatedInteger
      class="code"
      :class="'code-'+(~~c_kjOne)+' code-length-'+c_length+' code-color-'+c_kjOne"
      :value="c_kjOne=='err'?'不是':c_kjOne"
    />
    <!-- <span class="code" :class="'code-'+c_kjOne">{{c_kjOne}}</span> -->
    <span v-if="planData.result==1" class="code kjStatue suc">中</span>
    <span v-else-if="planData.result==-1" class="code kjStatue err">挂</span>
    <span v-else class="code kjStatue">等</span>
  </p>
</template>

<script>
import AnimatedInteger from "../common/AnimatedInteger";
export default {
  name: "Plan",
  props: {
    planData: {
      type: Object,
      default: function() {
        return {
          period: 9999,
          todayPeriod: 1,
          openCode: "-1",
          openCodeOne: "\u672a",
          planOne: "0548973",
          result: "\u672a",
          periods: "6666~6666",
          markMark: "6666"
        };
      }
    }
  },
  data() {
    return {
      kjStatueName: {
        err: -1,
        suc: 1
      }
    };
  },
  computed: {
    c_length() {
      return this.c_kjOne.length>8?3:this.c_kjOne.length>2
        ? 2
        : ~~this.c_planArr[0] == this.c_planArr[0]
        ? 1
        : this.c_planArr[0].length;
    },
    c_kjOne() {

        return this.planData.openCodeOne.replace(/&&/g, ",").replace(/\|\|/g, ",");
    },
    c_planArr() {
      return String(this.planData.planOne).split(",");
      // return this.planData.openCode.length>9?this.planData.planOne
      //   .split("")
      //   .join()
      //   .replace("0", "10")
      //   .split(","):this.planData.planOne
      //   .split("");
    },
    c_qi_hao() {
      const ar = (this.planData.periods + "").split("~");
      let a1, a2;
      const n = 3;
      if (ar.length > 1) {
        a1 = ar[0].substr(-n);
        a2 = ar[1].substr(-n);
      } else {
        a2 = ar[0].substr(-n);
        a1 = a2;
      }
      return a1 + "~" + a2;
    },
    c_qi_hao_1() {
      const ar = (this.planData.periods + "").split("~");
      let a1;
      const n = 3;
      a1 = ar[0].substr(-n);
      return a1;
    },
    c_qi_hao_2() {
      const ar = (this.planData.periods + "").split("~");
      let a2;
      const n = 3;
      if (ar.length > 1) {
        a2 = ar[1].substr(-n);
      } else {
        a2 = ar[0].substr(-n);
      }
      return a2;
    }

    //   planData() {
    //   let ar = this.kj.split("");
    //   let st = ar.join().replace("0", "10");
    //   let ar2 = st.split(",");
    //   return {
    //     str: st,
    //     arr: ar2
    //   };
    // }
  },
  created() {},
  components: {
    AnimatedInteger
  },
  methods: {
    fn_check(d) {
      if ("01020304050607080910".indexOf(d) == -1) {
        console.error(d);
        this.$emit("child-event-fn-prompt-show");
      }
    },
    fn_add0(n) {
      return n < 10 ? "0" + n : n;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@rem: 32/1rem;

p {
  font-size: 12 / @rem;
}

.plan-code {
  background: none;
  border: #333 1px solid;
  color: #000;
  margin: auto 1px;
  font-size: 14 / @rem;
  width: 16 / @rem;
  height: 16 / @rem;
  line-height: 16 / @rem;
}
.kjStatue.err {
  border-radius: 50%;
  background: none;
  background: #f00;
}
.kjStatue.suc {
  border-radius: 50%;
  background: none;
  background: #0f0;
}
</style>
