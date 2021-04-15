<template>
  <div class="home">
    <Nav/>
    <div class="content">
      <div class="content_info">
      <div class="mintage_tab">
        <ul class="fz0">
          <li @click="tabIndex=0" class="dib" :class="{active:tabIndex===0}">{{lang('a_duihuan')}}</li>
          <li @click="tabIndex=1" class="dib" :class="{active:tabIndex===1}">{{lang('a_baoxianchi')}}</li>
        </ul>
      </div>
        <Exchange v-if="tabIndex===0"></Exchange>
        <Pool v-if="tabIndex===1"></Pool>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    lang
  } from "../../tools";
  import {axios} from "../../tools";
  import {host} from "../../config";
  import Nav from '../../components/Nav/Index'
  import Exchange from './Exchange'
  import Pool from './Pool'
  import {mixin1} from "../../tools/mixins";

  export default {
    name: 'Insurance',
    mixins: [mixin1],
    components: {Nav,Exchange,Pool},
    data() {
      return {
        tabIndex: 0,
        userIndex: {}
      }
    },
    mounted() {
      setTimeout(() => {
        this.onAccountsChanged();
      }, 1000)
    },
    methods: {
      onRefresh(accounts) {
        this.$store.commit('setState', {
          accounts
        });
        this.$store.dispatch('initData');
      },
      onLogout(accounts){
        if (!accounts) {
          //退出登录
          console.log('退出登录')
          Object.assign(this.$data, this.$options.data.call(this));
        } else {
          // console.log('登录成功')
          // setTimeout(() => {
          //   this.loopOnly()
          // }, 1000)
        }
      },
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
  .content_info{max-width: 1100px;margin: 0 auto;background: #17191C;margin-top: 60px;min-height: 500px;}
  .mintage_tab{
    ul{text-align: center;}
    li{font-size: 16px;font-weight: bold;color: #4C525B;padding: 20px 50px;cursor: pointer;}
    li.active{color: #fff;border-bottom: 1px solid #E4141C;}
  }
  @media (max-width: 768px){
    .content{padding:65px 10px 80px;}
    .content_info{margin-top: 0;}
  }
</style>
