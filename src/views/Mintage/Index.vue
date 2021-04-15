<template>
  <div class="home">
    <Nav/>
    <div class="content">
      <div class="content_info">
      <div class="mintage_tab">
        <ul class="fz0">
          <li @click="tabIndex=0" class="dib" :class="{active:tabIndex===0}">{{lang('a_zhubi')}}</li>
          <li @click="tabIndex=1" class="dib" :class="{active:tabIndex===1}">{{lang('a_zhaicang')}}</li>
        </ul>
      </div>
        <MintageMintage v-if="tabIndex===0"></MintageMintage>
        <MintageDebt v-if="tabIndex===1"></MintageDebt>
      </div>
    </div>
  </div>
</template>

<script>
  import { lang } from "@/tools";
  import Nav from '../../components/Nav/Index'
  import MintageMintage from './MintageMintage'
  import MintageDebt from './MintageDebt'
  export default {
    name: 'Mintage',
    components: {Nav,MintageMintage,MintageDebt},
    data() {
      return {
        tabIndex: 0,
      }
    },
    created() {
    },
    methods: {
      lang(key){
        return lang(key);
      },
    },
  }

</script>

<style scoped lang="less">
  .content{padding: 100px 20px 80px 240px;}
  .content_info{max-width: 1100px;margin: 0 auto;background: #17191C;margin-top: 60px;min-height: 500px;}
  .mintage_tab{
    ul{text-align: center;}
    li{font-size: 16px;font-weight: bold;color: #4C525B;padding: 20px 50px;}
    li.active{color: #fff;border-bottom: 1px solid #E4141C;}
  }
  @media (max-width: 768px){
    .content{padding:65px 10px 80px;}
    .content_info{margin-top: 0;}
  }
</style>
