<template>
  <div class="home">
    <Nav/>
    <div class="content">
      <HomeContent />
    </div>
  </div>
</template>

<script>
  import { lang } from "../../tools";
  import Nav from '../../components/Nav/Index'
  import HomeContent from './HomeContent'
  export default {
    name: 'Home',
    components: {Nav,HomeContent},
    data() {
      return {
        userIndex: {}
      }
    },
    created() {
    },
    methods: {
      lang(key){
        return lang(key);
      }
    },
  }

</script>

<style scoped lang="less">
  .home {}
  .content{padding: 100px 20px 80px 240px;}
  @media (max-width: 768px){
    .content{padding:65px 10px 80px;}
  }
</style>
