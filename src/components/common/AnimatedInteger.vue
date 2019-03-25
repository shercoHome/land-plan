<template>
  <span>{{ tweeningValue }}</span>
</template>

<script>
var TWEEN = require("@tweenjs/tween.js");

export default {
  name: "AnimatedInteger",
  props: {
    value: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      tweeningValue: 0
    };
  },
  watch: {
    value: function(newValue, oldValue) {
      let NumberValue = Number(newValue);
      if (NumberValue == this.value) {
        this.tween(oldValue, NumberValue);
      } else {
        this.isString();
      }
    }
  },
  mounted() {
    let NumberValue = Number(this.value);
    if (NumberValue == this.value) {
      this.tween(0, NumberValue);
    } else {
      this.isString();
    }
  },
  created() {},
  methods: {
    tween(startValue, endValue) {
      var vm = this;
      function animate() {
        if (TWEEN.update()) {
          requestAnimationFrame(animate);
        }
      }

      new TWEEN.Tween({ tweeningValue: startValue })
        .to({ tweeningValue: endValue }, 500)
        .onUpdate(function(object) {
          vm.tweeningValue = object.tweeningValue.toFixed(0);
        })
        .start();

      animate();
    },
    isString() {
      this.tweeningValue = this.value;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
</style>

 