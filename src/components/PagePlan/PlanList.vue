
<template>
<div>
  <p class="plan-title">
    <span class="qihao">计划期间</span>
    <span class="n-qi">持续</span>
    <span class="n-qi">当前</span>
    <span class="long"  :class="'long-'+c_length()">计划预测</span>
    <span :class="'code-length-'+c_length()">开奖</span>
    <span>结果</span>
  </p>
  <template v-for="(d,i) in list">
    <p class="plan-item" v-if="i<max" :key="i">
      <span class="qihao">{{c_qi_hao(d.periods)}}</span>

      <AnimatedInteger class="n-qi" :value="d.markMark"/>
      <span class="n-qi">{{String(d.period).substr(-3)}}</span>
      <span class="long" :class="'long-'+c_length()">

        <template v-for="(dd,ii) in c_planArr(d.planOne)">
          <AnimatedInteger  
            class="code plan-code"
            :class="'code-length-'+(~~dd==dd?1:dd.length)"
            :key="ii"
            @click.native="fn_check(dd)"
            :value="dd"
          />
        </template>

      </span>
      <AnimatedInteger
        class="code"
        :class="'code-'+(~~c_kjOne(d.openCodeOne))+' code-length-'+c_length()+' code-color-'+c_kjOne(d.openCodeOne)"
        :value="c_kjOne(d.openCodeOne)=='err'?'不是':c_kjOne(d.openCodeOne)"
      />
      <span v-if="d.result==1" class="code kjStatue suc">中</span>
      <span v-else-if="d.result==-1" class="code kjStatue err">挂</span>
      <span v-else class="code kjStatue">等</span>
    </p>
  </template>
  </div>
</template>

<script>
import AnimatedInteger from "../common/AnimatedInteger";
export default {
  name: "PlanList",
  props: {
    list: Array,
    max: String
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
  },
  created() {},
  components: {
    AnimatedInteger
  },
  methods: {
        c_length() {
          let d;
          if(this.list.length>1){
              d=this.list[1];
          }else{
              d=this.list[0];
          }
        
      return this.c_kjOne(d.openCodeOne).length > 8
        ? 3
        : this.c_kjOne(d.openCodeOne).length > 2
        ? 2
        : ~~this.c_planArr(d.planOne)[0] == this.c_planArr(d.planOne)[0]
        ? 1
        : this.c_planArr(d.planOne)[0].length;
    },
        c_planArr(planOne) {
      return String(planOne).split(",");
    },
        c_kjOne(openCodeOne) {
      return openCodeOne
        .replace(/&&/g, ",")
        .replace(/\|\|/g, ",");
    },
     c_qi_hao(periods) {
      const ar = (periods + "").split("~");
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
