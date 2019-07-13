<template>
  <div id="page-home">
   <marquee scrollamount="3" v-if="bulletin!='' &&bulletin!='isNull'">{{bulletin}}</marquee>
    <List :listItem="list.cp" class="cp" @child-event-fn-show-page="fn_show_page"/>
    <List :listItem="list.qp" class="qp" @child-event-fn-show-page="fn_alert('qq')"/>
    <List :listItem="list.zr" class="zr" @child-event-fn-show-page="fn_alert('qq')"/>
  </div>
</template>

<script>
import List from "../components/PageHome/List.vue";
export default {
  name: "PageHome",
  props: {
    list: Object,
    bulletin:String
  },
  components: {
    List
  },
  created() {
  },
  methods: {
    fn_show_page(v) {
      console.log("home-fn_show_page:" + v);
      this.$emit("child-event-fn-show-page", v);
    },
    fn_alert(n){
      this.$emit("child-event-fn-show-qrcode", n);
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
</style>
