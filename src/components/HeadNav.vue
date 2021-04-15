<template>
  <div class="headNavSec1" :style="{background: $attrs.background
   ? $attrs.background : '#fff'}">
    <div class="headNavSec2" v-on:click="$attrs.backUrl ? $router.push($attrs.backUrl) : $router.go(-1)" v-show="!$attrs.hideBackBtn">
      <img class="headNavImg1" src="../assets/img/btn_back3x.png">
    </div>
    <span v-text="$route.meta.title"></span>
  </div>
</template>

<script>
  import {Toast} from "../tools";
  export default {
    name: 'headNav',
    methods: {
      showFail() {
        Toast.fail('暂未开放')
      }
    },
    mounted (){
      // let vm = this;
      // setInterval(function () {
      //   console.log(vm.$store.state.token1);
      // },2000)
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .headNavSec1{
    height: 50px;
    line-height: 50px;
    color: #fff;
    text-align: center;
    background: rgba(70,53,200,1);
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
    font-size: 16px;
    z-index: 10;
  }
  .headNavSec2{
    width: 40px;
    height: 50px;
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .headNavImg1{
    width: 10px;
  }
  .headNavImg2{
    width: 20px;
  }
</style>
