<template>
<div class="loading">
    <img src="img/base/loading.gif" alt="loading" />
</div>
</template>
<script>
export default {
  name: "Loading"
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .loading {
      position: fixed;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,.25);
      z-index: 9999;
      top:0;
      left: 0;
    }

   .loading img {
      position: absolute;
      top: 50%;
      left: 50%;
      -webkit-transform: translateY(-50%) translateX(-50%);
      transform: translateY(-50%) translateX(-50%);
    }
</style>

 