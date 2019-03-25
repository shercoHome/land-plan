 <template>
      <div class="list">
        <p v-html="listItem.title"></p>
        <ul class="clearfloat">
          <li v-for="(img,i) in listItem.imgs" :key="i" @click="fn_show_page(i)">
            <img :src="img.src" :alt="img.alt">
            <span>{{img.alt}}</span>
          </li>
        </ul>
      </div>
</template>

<script>
export default {
  name: "Footer",
  props: {
    listItem: Object
  },
  methods: {
        fn_show_page(v) {
          if(v==0){
            v="PageHK";
          }else{
            v="PagePlan";
          }
      console.log("home-fn_show_page:" + v);
      this.$emit("child-event-fn-show-page", v);
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

.list {
  margin-top: 8px;
  cursor: pointer;
}
.list p {
  font-size: 16px;
  background: #dedede;
  padding-top: 8px;
  padding-bottom: 8px;
  display: block;
  max-width: 10rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: bold;
}
.list ul {
  display: block;
}
.list ul li {
  display: block;
  float: left;
  text-align: center;
  width: 25%;
  border-left: 1px #eee solid;
  border-bottom: 1px #eee solid;
  box-sizing: border-box;
  padding-top: 8px;
  padding-bottom: 8px;
}
.list ul img {
  width: 1.5rem;
  height: 1.5rem;
  margin: 0 auto;
  border-radius: 50%;
}
.list ul span {
  display: inline-block;
  width: 2.5rem;
  font-size: 16px;
  margin: 6px auto;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>

 