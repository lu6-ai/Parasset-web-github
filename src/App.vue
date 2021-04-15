<template>
  <div id="app" @click.stop="hideAccountInfo">
    <router-view></router-view>
  </div>
</template>

<script>

  export default {
    name: "App",
    data() {
      return {};
    },
    created() {
      // this.initWeb3();
    },
    mounted() {
    },
    methods: {
      hideAccountInfo(e){
        if (e.target.className.indexOf('infoBtn') === -1){
          this.$store.commit('setState', {
            accountInfoShow: false,
          })
        }
      }
    }
  };
</script>
<style lang="less">
  @import "./assets/css/global";

  #app {
    font-size: 16px;
  }
</style>
