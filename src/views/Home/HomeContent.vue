<template>
  <div class="home_content">
      <div class="data_info">
          <ul class="fz0">
              <li class="dib">
                  <h3>${{setUnit($store.state.systemInfo.amountMortgagePool.eth * $store.state.systemInfo.currencyPrice.usdt + $store.state.systemInfo.amountMortgagePool.nest * $store.state.systemInfo.currencyPrice.nest_price)}}</h3>
                  <p>{{lang('a_diyazichanzongjiazhi')}}</p>
              </li>
              <li class="dib">
                  <h3>${{setUnit($store.state.systemInfo.totalSupply.peth * $store.state.systemInfo.currencyPrice.usdt + 1 * $store.state.systemInfo.totalSupply.pusdt)}}</h3>
                  <p>{{lang('a_pinxingzichanzongjiazhi')}}</p>
              </li>
              <li class="dib">
                  <h3>${{setUnit(($store.state.systemInfo.amount.eth*1 + ($store.state.systemInfo.amount.peth - $store.state.systemInfo.insNegative.peth)*1) * $store.state.systemInfo.currencyPrice.usdt + ($store.state.systemInfo.amount.usdt*1 + ($store.state.systemInfo.amount.pusdt - $store.state.systemInfo.insNegative.pusdt)*1)*1 )}}</h3>
                  <p>{{lang('a_baoxianchiliudongxingzongjiazhi')}}</p>
              </li>
          </ul>
      </div>
      <div class="entrance">
          <ul class="fz0">
              <li class="dib" @click="tabChange(1)">
                  <img src="../../assets/img/bg_home1.png">
                  <div class="word">
                      <h3>{{lang('a_zhubi')}}</h3>
                      <p>{{lang('a_diyayuanshengzichan')}}</p>
                      <p>{{lang('a_zhuzaopingxingzichan')}}</p>
                  </div>
              </li>
              <li class="dib" @click="tabChange(2,1)">
                  <img src="../../assets/img/bg_home2.png">
                  <div class="word">
                      <h3>{{lang('a_baoxian')}}</h3>
                      <p>{{lang('a_zhurubiaodizichantoubao')}}</p>
                      <p>{{lang('a_zhuanqubaoxianshouyi')}}</p>
                  </div>
              </li>
              <li class="dib" @click="tabChange(2,0)">
                  <img src="../../assets/img/bg_home3.png">
                  <div class="word">
                      <h3>{{lang('a_duihuan')}}</h3>
                      <p>{{lang('a_biaodizichanyupingxingzichan')}}</p>
                      <p>{{lang('a_kuaisuduihuan')}}</p>
                  </div>
              </li>
<!--              <li class="dib">-->
<!--                  <img src="../../assets/img/bg_home4.png">-->
<!--                  <div class="word">-->
<!--                      <h3>{{lang('a_qingsuan')}}</h3>-->
<!--                      <p>{{lang('a_canyuzhubizhaicangqingsuanzhuanqu')}}</p>-->
<!--                      <p>{{lang('a_zhuanquqingsuanshouyi')}}</p>-->
<!--                  </div>-->
<!--              </li>-->
          </ul>
      </div>
  </div>
</template>
<script>
    import { lang } from "../../tools";
    import * as metaMaskTools from "../../tools/chain";
    import {mixin1} from "../../tools/mixins";
  export default {
    name: 'HomeContent',
    components: {},
      mixins: [mixin1],
    created() {
    },
    mounted() {
      setTimeout(() => {
          this.onAccountsChanged();
      }, 1000)
      this.loopOnly();
    },
    beforeDestroy() {
      //清除定时器
      clearTimeout(this.setTime);
      clearTimeout(this.setTimeOnly);
      console.log("beforeDestroy");
    },
      data() {
          return {
              setTime: null,
              setTimeOnly: null,
          }
      },
    methods: {
        onRefresh(accounts) {
            this.$store.commit('setState', {
                accounts
            });
            this.loopOnly()
        },
        onLogout(accounts){
            if (!accounts) {
                //退出登录
                console.log('退出登录')
                Object.assign(this.$data, this.$options.data.call(this));
            } else {
                // console.log('登录成功')
                setTimeout(() => {
                    this.loopOnly()
                }, 1000)
            }
        },
        loopOnly(){
            if (this.$store.state.accounts.length > 0) {
                clearTimeout(this.setTimeOnly);
                this.yieldFun();
                // this.loop();
                return;
            }
            clearTimeout(this.setTimeOnly);
            this.setTimeOnly = setTimeout(()=>{
                this.loopOnly();
            },500)
        },
        async yieldFun () {
            //执行一次
            // await metaMaskTools.getHomeTotalSupply(this.$store.state.accounts[0]).then(async (data) => {
            //     // console.log("平行资产总供应", data);
            //     this.totalSupply = data;
            // });
        },
        async loop() {
            //15秒执行一次
            // console.log(123);

            // clearTimeout(this.setTime);
            // this.setTime = setTimeout(() => {
            //     this.loop();
            // }, 15 * 1000);
        },
        lang(key){
            return lang(key);
        },
        tabChange(index,type) {
            if (index === this.$store.state.navLeft) return;
            this.$store.commit('setState', {
                navLeft: index
            })
            if (index == 0) {
                this.$router.push("/home");
            } else if (index == 1) {
                this.$router.push("/mintage");
            } else if (index == 2) {
                this.$router.push({name:"insurance",params: {type: type}});
            } else if (index == 3) {
                this.$router.push("/clearing");
            }
        },
    },
  }

</script>

<style scoped lang="less">
  .home_content {
      .data_info{
          padding: 50px 0 30px;
          ul{text-align: center;}
          li{background: url("../../assets/img/logo_blur.png") no-repeat center center;padding: 40px 30px 30px;min-height: 149px;min-width: 260px;}
          li h3{font-size: 28px;font-weight: bold;color: #E4141C;margin-bottom: 10px;}
          li p{font-size: 14px;font-weight: 400;color: #fff;}
      }
      .entrance{
          padding: 50px 0 30px;
          ul{text-align: center;}
          li{padding: 20px 0 0;position: relative;width: 280px;height: 320px;cursor: pointer;}
          li img{display: block;max-width: 100%;}
          .word{position: absolute;left: 40px; bottom: 40px;text-align: left;width: 70%;}
          .word h3{font-size: 32px;font-weight: bold;color: #17191C;margin-bottom: 10px;}
          .word p{font-size: 14px;font-weight: bold;color: #111214;}
      }
  }
  @media (max-width: 768px){
      .home_content{
          .data_info{
              padding: 0 0 30px;
              li{padding-bottom: 0;}
          }
          .entrance{padding-top: 0;
              li{width: 50%;height: auto;}
              .word{position: absolute;left: 26px; bottom: 40px;text-align: left;width: 70%;}
              .word h3{font-size: 20px;font-weight: bold;color: #17191C;margin-bottom: 10px;}
              .word p{font-size: 12px;font-weight: bold;color: #111214;}
          }
      }
  }
</style>
