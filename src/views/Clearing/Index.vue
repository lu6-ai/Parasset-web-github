<template>
  <div class="home">
    <Nav/>
    <div class="content">
      <ClearingTopData></ClearingTopData>
      <div class="content_info">
        <div class="mintage_tab">
          <ul class="fz0">
            <li @click="tabIndex=0" class="dib" :class="{active:tabIndex===0}">{{lang('a_daiqingsuan')}}</li>
            <li @click="tabIndex=1" class="dib" :class="{active:tabIndex===1}">{{lang('a_qingsuanyujing')}}</li>
          </ul>
        </div>
        <ClearingAwait v-if="tabIndex===0"></ClearingAwait>
        <ClearingWarning v-if="tabIndex===1"></ClearingWarning>
      </div>
    </div>
  </div>
</template>

<script>
  import { lang } from "../../tools";
  import {axios} from "../../tools";
  import {host} from "../../config";
  import Nav from '../../components/Nav/Index'
  import ClearingAwait from './ClearingAwait'
  import ClearingWarning from './ClearingWarning'
  import ClearingTopData from './ClearingTopData'
  export default {
    name: 'Clearing',
    components: {Nav,ClearingAwait,ClearingWarning,ClearingTopData},
    data() {
      return {
        tabIndex: 0,
        userIndex: {}
      }
    },
    created() {
    },
    methods: {
      lang(key){
        return lang(key);
      },
      getData() {
        // 首页数据
        axios({
          method: 'post',
          url: host + 'user/index',
          data: {
            uid: this.$store.state.uid,
          },
        }).then( (response) => {
          if (response.data && response.data.code === 0) {
            this.userIndex = response.data.data;

          }
        }).catch(() => {
        });
      },
    },
  }

</script>

<style scoped lang="less">
  .content{padding: 100px 20px 80px 240px;}
  .content_info{max-width: 1100px;margin: 0 auto;background: #17191C;}
  .mintage_tab{
    ul{text-align: center;}
    li{font-size: 16px;font-weight: bold;color: #4C525B;padding: 20px 50px;}
    li.active{color: #fff;border-bottom: 1px solid #E4141C;}
  }
  @media (max-width: 768px){
    .content{padding:65px 10px 80px;}
  }
</style>
