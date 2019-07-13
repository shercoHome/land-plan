<template>
  <div class="alert PromptTwoBig">
    <div class="alert-content clearfloat">
            <span class="icon icon_close" @click="fn_close"></span>
      <h3 v-html="set.title"></h3>

            <hr>

      <template  v-for="(inputItem,i) in set.input" >
     
      <label for="male" :key="'label'+i"><b :class="{active:inputItem.require=='1'}">* </b> {{inputItem.label}}</label>
      <input 
        :key="i"
        v-model="valueArr[i]" 
        :type="inputItem.type" 
        :required="inputItem.require=='1'"
        :placeholder="inputItem.placeholder" 
      />
      </template>
      <p v-html="set.tips"></p>
     
       <a class="btn" @click="fn_right" >{{set.btn[1]}}</a>


        <a class="btnword"  @click="fn_left">已有账号，<span>{{set.btn[0]}}</span></a>

    </div>
  </div>
</template>

<script>
export default {
  name: "PromptTwoBig",
  data(){
    return{
      valueArr:[]
    }
  },
  props: {
    set:Object,
      // 对象或数组默认值必须从一个工厂函数获取
      default: function () {
        return {
          title: "title",
          btn: ["btnleft", "btnright"],
          input: [
            {placeholder:"input1placeholder",label:"labelName",type:"text",require:'1'},
            {placeholder:"input2placeholder",label:"labelName",type:"password",require:'1'}
            ],
          tips: "" 
          }
      }
  },
  mounted() {

  },
  created() {
    this.valueArr=this.fn_get_empty_arr(this.c_count);
  },
  watch: {
        // 如果 `c_count` 发生改变，这个函数就会运行
    c_count(newOne, oldOne) {
     this.valueArr=this.fn_get_empty_arr(newOne);
    }

  },computed: {
    c_count(){
      return this.set.input.length;
    }
  },
  methods: {
    fn_get_empty_arr(n){
       let a=[];
       for(let i=0;i<n;i++){
         a[i]="";
       }
       return a
    },
    fn_is_empty_value(){
      let isEmpty=false;
       for(let i=0;i<this.c_count;i++){
         if(this.set.input[i].require=="1" && this.valueArr[i]==""){
           this.set.tips=this.set.input[i].placeholder+" 不能为空";
           isEmpty=true;
           break;
         }
       }
       return isEmpty;
    },
    fn_close(){
      this.$emit("child-event-fn-PromptTwoBig-hide");
    },
    fn_left(){
     this.$emit("child-event-fn-to-left",this.valueArr);
    },
    fn_right(){
       if(!this.fn_is_empty_value()){
        this.$emit("child-event-fn-to-right",this.valueArr);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@rem: 32/1rem;
.alert {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1001;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
}

.alert-content {
  position: relative;
  width: 9rem;

  margin: 0 auto;

        top: 50%;
        transform: translateY(-50%);
        
  background: #fff;
  text-align: center;
  padding: 0.5rem;
  box-sizing: border-box;
  border-radius: 4px;
    font-size:12/@rem; /* 字体大小 */
}
.alert-content img {
  width: 5rem;
  border: 1px #ddd solid;
  margin: 0 auto;
}
.alert-content p {
  font-size: 0.315rem;
  padding-top: 0.125rem;
  color: #777;
}
.icon_close{
  position: absolute;
  right: 0;
  top: 0;
}


.btn {
  /* 按钮美化 */

  display: block;
  width: 7rem; /* 宽度 */
  float: left;
  margin-left: 7%;



  height: 1.8em; /* 高度 */
  line-height: 1.8em;
  margin-top: 0.5rem;
  border-width: 0px; /* 边框宽度 */
  border-radius: 3px; /* 边框半径 */
  background: #1e90ff; /* 背景颜色 */
  cursor: pointer; /* 鼠标移入按钮范围时出现手势 */
  outline: none; /* 不显示轮廓线 */
  font-family: Microsoft YaHei; /* 设置字体 */
  color: white; /* 字体颜色 */
  font-size:14/@rem; /* 字体大小 */
}
.btn:hover {
  /* 鼠标移入按钮范围时改变颜色 */
  background: #5599ff;
}
.btnword{
    display: block;
    width: 7rem;
    float: left;
    margin-left: 7%;
    height: 1.5em;
    line-height: 1.5em;
    margin-top: 0.25rem;
    border-width: 0px;
    border-radius: 3px;
 
    cursor: pointer;
    outline: none;
    font-family: Microsoft YaHei;
    color: #8f8f94;
    font-size: 12/@rem;
}
.btnword span{
  color: #007aff;
}
p{
  margin: 4px 0;
}
label{
  display: inline-block;
    width:2rem;
  height: 0.5rem;
  
  font-weight: bold;
}
input{
    display: inline-block;
  max-width: 100%;
  width: 5rem;
  height: 0.8rem;
  line-height: 1.5em;
  text-align: center;
 margin-top: 0.5rem;
  padding: 4px 8px;
   border-radius: 3px; /* 边框半径 */
  border: 1px #777 solid;
  box-sizing: border-box;
  font-size: 12/@rem;

}
::placeholder {
  color: #8f8f94;
  font-size: 10/@rem;
  text-align: left;
}
b{
  visibility: hidden;

}
b.active{
    visibility:visible;
  color: red;
}
</style>

 