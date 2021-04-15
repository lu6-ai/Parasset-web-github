<template>
  <div class="mintage_content">
      <ul class="ul_info">
          <li class="li1">
              <div class="dib left">{{lang('a_diyabiaodizichanshuliang')}}</div>
              <div class="dib right fz0">
                  <span class="dib">{{lang('a_yue')}}：</span>
                  <strong class="dib">{{BigNumberStr(blanceOf[value1],0,6)}}</strong>
              </div>
          </li>
          <li class="li2">
              <div class="dib left">
                  <van-field
                          v-if="!pledgeNumShow"
                          v-model="pledgeNum"
                          type="number"
                          center
                          placeholder="0"
                          class="pledge"
                          :class="{colorFFF: pledgeNum>=0}"
                          @focus="pledgeNumShow=true,castNumShow=false"
                  >
                      <template #button>
                          <van-button size="small" type="primary" class="pledgeBut" @click="pledgeNumChangeMax">{{lang('a_zuida')}}</van-button>
                      </template>
                  </van-field>
                  <van-field
                          v-else-if="pledgeNumShow"
                          v-model="pledgeNum"
                          type="number"
                          center
                          placeholder="0"
                          class="pledge"
                          :class="{colorFFF: pledgeNum>=0}"
                          @focus="pledgeNumShow=true,castNumShow=false"
                          @input="pledgeNumChange(1)"
                  >
                      <template #button>
                          <van-button size="small" type="primary" class="pledgeBut" @click="pledgeNumChangeMax">{{lang('a_zuida')}}</van-button>
                      </template>
                  </van-field>
              </div>
              <div class="dib right fz0">
                  <div class="title fz0" v-for="(item,index) in option1"
                    @click="option1Show = !option1Show"
                       :key = index
                  >
                      <div v-if="value1==item.key">
                          <img class="dib" :src="item.icon">
                          <span class="dib" >{{item.text}}</span>
                          <van-icon class="dib" name="arrow-down" />
                      </div>
                  </div>
                  <div class="info" v-if="option1Show">
                      <ul class="ul_son">
                          <li class="fz0" v-for="(item,index) in option1"
                              :key = index
                              @click="value1Click(item.key)"
                          >
                              <div class="l dib fz0">
                              <img class="dib" :src="item.icon">
                              <span class="dib" >{{item.text}}</span>
                              </div>
                              <div class="r dib">
                                  <span class="dib" >{{BigNumberStr(blanceOf[item.key],0,6)}}</span>
                              </div>
                          </li>
                      </ul>
                  </div>
              </div>
          </li>
          <li class="li3">
              <h3>{{lang('a_diyalv')}}：<span>{{sliderValue}}%</span></h3>
              <div class="slider_div">
                  <van-slider v-model="sliderValue" @change="priceCount" bar-height="4px" active-color="#ee0a24" :min="minSliderValue" :max="maxSliderValue"/>
              </div>
              <div class="status fz0">
                  <div class="left dib">1%</div>
                  <div class="right dib">{{maxSliderValue}}%</div>
              </div>
          </li>
          <li class="li2 li4">
              <div class="dib left">
                  <van-field
                          v-if="!castNumShow"
                          v-model="castNum"
                          type="number"
                          center
                          placeholder="0"
                          class="pledge"
                          :class="{colorFFF: castNum>=0}"
                          @focus="castNumShow=true,pledgeNumShow=false"
                  >
                  </van-field>
                  <van-field
                          v-else-if="castNumShow"
                          v-model="castNum"
                          type="number"
                          center
                          placeholder="0"
                          class="pledge"
                          :class="{colorFFF: castNum>=0}"
                          @focus="castNumShow=true,pledgeNumShow=false"
                          @input="pledgeNumChange(2)"
                  >
                  </van-field>
              </div>
              <div class="dib right fz0">
                  <div class="title fz0" v-for="(item,index) in option1[value1]['option2']"
                       @click="option2Show = !option2Show"
                       :key = index
                  >
                      <div v-if="value2==item.key">
                          <img class="dib" :src="item.icon">
                          <span class="dib" >{{item.text}}</span>
                          <van-icon class="dib" name="arrow-down" />
                      </div>
                  </div>
                  <div class="info" v-if="option2Show">
                      <ul class="ul_son">
                          <li class="fz0" v-for="(item,index) in option1[value1]['option2']"
                              :key = index
                              @click="value2Click(item.key)"

                          >
                                  <div class="l dib fz0">
                                      <img class="dib" :src="item.icon">
                                      <span class="dib" >{{item.text}}</span>
                                  </div>
                                  <div class="r dib">
                                      <span class="dib" >{{BigNumberStr(blanceOf[item.key],0,6)}}</span>
                                  </div>
                          </li>
                      </ul>
                  </div>
              </div>
          </li>
          <li class="li5 fz0">
              <div class="dib left">{{lang('a_yuyanjidiaoyongfei')}}</div>
              <div class="dib right">{{costFee[value1+'_'+value2]}} ETH</div>
          </li>
          <li class="li7 fz0">
              <div class="dib left">{{lang('a_wendingfei')}}</div>
              <div class="dib right">{{BigNumberStr(getFee,0,8)}} {{value2.toUpperCase()}}</div>
          </li>
          <li class="li6">
              <div class="but" v-if="value1 == 'eth'">
                  <button v-if="allowance['eth']*1<=0" @click="coinApproveNestEth">{{lang('a_shouquan')}}</button>
                  <button v-else-if="value2=='pusdt' && allowance['pusdt']*1<=0 && getFee*1>0" @click="coinApproveNestPusdt">{{lang('a_shouquan')}}</button>
                  <button v-else-if="pledgeNum*1<=0" style="opacity: 0.5" class="sub">{{lang('a_zhubi')}}</button>
                  <button v-else class="sub" @click="coinMintage">{{lang('a_zhubi')}}</button>
              </div>
              <div class="but" v-if="value1 == 'nest'">
                  <button v-if="allowance['nest']*1<=0" @click="coinApproveNest">{{lang('a_shouquan')}}</button>
                  <button v-else-if="value2=='pusdt' && allowance['pusdt']*1<=0  && getFee*1>0" @click="coinApproveNestPusdt">{{lang('a_shouquan')}}</button>
                  <button v-else-if="value2=='peth' && allowance['peth']*1<=0  && getFee*1>0" @click="coinApproveNestPeth">{{lang('a_shouquan')}}</button>
                  <button v-else-if="pledgeNum*1<=0" style="opacity: 0.5" class="sub">{{lang('a_zhubi')}}</button>
                  <button v-else class="sub" @click="coinMintage">{{lang('a_zhubi')}}</button>
              </div>
          </li>
      </ul>
  </div>
</template>
<script>
    import {
        lang,
        Toast,
        BigNumber,
        BigNumberStr,
        BigNumberMul,
        BigNumberDiv,
    } from "../../tools";
    import * as metaMaskTools from "../../tools/chain";
    import {mixin1} from "../../tools/mixins";
  export default {
    name: 'MintageMintage',
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
      },
      data() {
        return {
            setTime: null,
            setTimeOnly: null,
            option1Show: false,
            value1: 'eth',
            value2: 'pusdt',
            option1: {
                eth: { key: 'eth', text: 'ETH',icon: require('../../assets/img/icon_eth.png'),
                    option2: [
                        { key:'pusdt', text: 'PUSDT',icon: require('../../assets/img/icon_pusdt.png')},
                    ],
                },
                nest: { key: 'nest',text: 'NEST', icon: require('../../assets/img/icon_nest.png'),
                    option2: [
                        { key:'peth',text: 'PETH',icon: require('../../assets/img/icon_peth.png')},
                        { key:'pusdt', text: 'PUSDT',icon: require('../../assets/img/icon_pusdt.png')},
                    ],
                },
            },
            blanceOf: {
                eth: 0,
                nest: 0,
                peth: 0,
                pusdt: 0,
            },
            option2Show: false,
            pledgeNum: null,
            pledgeNumShow: false,
            castNum: null,
            castNumShow: false,
            sliderValue: 50,
            minSliderValue: 1,
            maxSliderValue: 70,
            allowance: {
                eth: 1,
                nest: 0,
                pusdt: 0,
                peth: 0,
            },
            costFee: {
                eth_pusdt: 0.01,
                nest_pusdt: 0.02,
                nest_peth: 0.01,
            },
            getFee: 0,
            priceObj: {},
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
                // console.log('退出登录')
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
                this.loop();
                return;
            }
            clearTimeout(this.setTimeOnly);
            this.setTimeOnly = setTimeout(()=>{
                this.loopOnly();
            },500)
        },
        async yieldFun () {
            //执行一次
            try{
                await metaMaskTools.coinAllowanceNest(this.$store.state.accounts[0]).then(async (data) => {
                    this.allowance = data;
                });
            } catch (e) {}
            //价格
            try{
            await metaMaskTools.getLatestPrice(this.$store.state.accounts[0]).then(async (data) => {
                // this.allowance = data;
                // console.log('预言机价格',data)
                this.priceObj = data;
                this.$store.commit('setState', {
                    priceObj: this.priceObj
                })
            });
            } catch (e) {}

            try{
            await metaMaskTools.blanceOfMintage(this.$store.state.accounts[0]).then(async (data) => {
                this.blanceOf = data;
            });
            } catch (e) {}

            try{
            await metaMaskTools.getPriceFee(this.$store.state.accounts[0]).then(async (data) => {
                // this.allowance = data;
                this.costFee = data;
            });
            } catch (e) {}

            //抵押率
            await metaMaskTools.getMaxRate(this.$store.state.accounts[0],this.value1).then(async (data) => {
                // console.log('抵押率', data);
                this.maxSliderValue = data;
            });

            //稳定费
            await metaMaskTools.getInfoRealTime(this.$store.state.accounts[0],this.value1,this.value2,this.priceObj,this.maxSliderValue*1).then(async (data) => {
                // console.log("稳定费", data);
                this.getFee = BigNumberStr(data.fee,18);
            });
        },
        async loop() {
            //15秒执行一次

            // clearTimeout(this.setTime);
            // this.setTime = setTimeout(() => {
            //     this.loop();
            // }, 15 * 1000);
        },
        lang(key){
            return lang(key);
        },
        BigNumberStr(num1,num2,col){
            return BigNumberStr(num1,num2,col);
        },
        BigNumberMul(num1,num2,col){
            return BigNumberMul(num1,num2,col);
        },
        BigNumberDiv(num1,num2,col){
            return BigNumberDiv(num1,num2,col);
        },
        async pledgeNumChange (key){
            // console.log(key)
            if (key==1) {
                this.priceCount();
            } else {
                this.priceCountCastNum();
            }

        },
        async pledgeNumChangeMax (){
            this.pledgeNum = BigNumberStr(this.blanceOf[this.value1],0);
            this.priceCount();
        },
        async value1Click (key){
            this.value1=key;
            this.option1Show=!this.option1Show;
            if (this.value1=='eth') {
                this.value2 = 'pusdt';
            }
            this.priceCount();
            //稳定费
            await metaMaskTools.getInfoRealTime(this.$store.state.accounts[0],this.value1,this.value2,this.priceObj,this.maxSliderValue*1).then(async (data) => {
                // console.log("稳定费", data);
                this.getFee = BigNumberStr(data.fee,18);
            });
        },
        async value2Click (key){
            this.value2=key;
            this.option2Show=!this.option2Show;
            this.priceCount();
            //稳定费
            await metaMaskTools.getInfoRealTime(this.$store.state.accounts[0],this.value1,this.value2,this.priceObj,this.maxSliderValue*1).then(async (data) => {
                // console.log("稳定费", data);
                this.getFee = BigNumberStr(data.fee,18);
            });
        },
        async priceCount(){
            //抵押率
            await metaMaskTools.getMaxRate(this.$store.state.accounts[0],this.value1).then(async (data) => {
                // console.log('抵押率', data);
                this.maxSliderValue = data;
            });
            if (this.pledgeNum*1 <= 0) {
                this.castNum = null;
                return;
            }

            let price = 1;
            if (this.value1=='eth' && this.value2=='pusdt') {
                price = this.priceObj.eth_price;
            } else if (this.value1=='nest' && this.value2=='pusdt') {
                price = this.priceObj.nest_price;
            } else if (this.value1=='nest' && this.value2=='peth') {
                price = this.priceObj.nest_eth_price;
            }

            this.castNum = BigNumberMul(BigNumberMul(this.pledgeNum,price),(this.sliderValue/100),6);
        },
        async priceCountCastNum(){
            //抵押率
            await metaMaskTools.getMaxRate(this.$store.state.accounts[0],this.value1).then(async (data) => {
                // console.log('抵押率', data);
                this.maxSliderValue = data;
            });
            if (this.castNum*1 <= 0) {
                this.pledgeNum = null;
                return;
            }

            let price = 1;
            if (this.value1=='eth' && this.value2=='pusdt') {
                price = this.priceObj.eth_price;
            } else if (this.value1=='nest' && this.value2=='pusdt') {
                price = this.priceObj.nest_price;
            } else if (this.value1=='nest' && this.value2=='peth') {
                price = this.priceObj.nest_eth_price;
            }
            this.pledgeNum = BigNumberDiv(BigNumberDiv(this.castNum,price),(this.sliderValue/100),6);
        },
        async coinMintage  () {
            if (this.pledgeNum*1 > this.blanceOf[this.value1]) {
                Toast(this.lang('a_qianbaokeyongyuebuzu'));
                return ;
            }
            if (this.getFee*1>0 &&  this.getFee*1 > this.blanceOf[this.value2]) {
                Toast(this.lang('a_qianbaokeyongyuebuzu'));
                return ;
            }
            //铸币
            await metaMaskTools.coinMintage(this.$store.state.accounts[0],this.value1,this.value2,this.pledgeNum,this.sliderValue,this.costFee[this.value1+'_'+this.value2]).then(async (data) => {
                Toast(this.lang('a_zhubichenggong'));
                this.loopOnly();
            });
        },
        async coinApproveNest(){
            //授权
            await metaMaskTools.coinApproveNest(this.$store.state.accounts[0]).then(async (data) => {
                Toast(this.lang('a_shouquanchenggong'));
                this.loopOnly();
            });
        },
        async coinApproveNestPusdt(){
            //授权
            await metaMaskTools.coinApproveNestPusdt(this.$store.state.accounts[0]).then(async (data) => {
                Toast(this.lang('a_shouquanchenggong'));
                this.loopOnly();
            });
        },
        async coinApproveNestPeth(){
            //授权
            await metaMaskTools.coinApproveNestPeth(this.$store.state.accounts[0]).then(async (data) => {
                Toast(this.lang('a_shouquanchenggong'));
                this.loopOnly();
            });
        },
    },
  }

</script>

<style  lang="less">
    .mintage_content{
        color: #4C525B;
        font-size: 12px;
        font-weight: 400;
        padding: 40px 0 20px;
        .ul_info{max-width: 400px;margin: 0 auto;}
        li{margin-bottom: 25px;}
        .ul_son li{margin-bottom: 0;}
        .li1{
            .left{width: 50%;font-size: 12px;}
            .right{width: 50%;font-size: 12px;text-align: right;}
            .right strong{font-weight: bold;color: #fff;}
        }
        .colorFFF .van-field__control{color: #fff;}
        .li2{
            min-height: 60px;
            border: 1px solid #25282D;
            border-radius: 6px;
            position: relative;
            .left{width: 60%;
                .pledge{font-size: 24px;background: unset;}

                .pledgeBut{background: rgba(228, 20, 28, 0.2);border: 1px solid #E4141C;border-radius: 2px;color: #E4141C;}
            }
            .right{width: 40%;text-align: right;
                .title{
                    span{padding: 0 10px 0 10px;font-size: 14px;font-weight: bold;color: #fff;}
                    i{font-size: 14px;font-weight: bold;}
                    padding-right: 10px;
                }
                .info{position: absolute;top: 60px;left: 0;width: 100%; color: #fff;text-align: left;background: #17191C;z-index: 99;
                    ul{}
                    li{padding: 5px 20px;
                        img{margin-right: 10px;}
                        .l,.r{width: 50%;}
                        .r{text-align: right;}
                    }
                }
            }
        }
        .li3{
            h3{
                font-size: 12px;color: #4C525B;
                span{color: #fff;}
            }
            .slider_div{padding: 12px 0;}
            .status{
                .left{width: 50%}
                .right{width: 50%;text-align: right;}
            }
        }
        .li4{padding: 5px 0;}
        .li5{
            .left{width: 50%;font-size: 12px;}
            .right{width: 50%;text-align: right;color: #fff;}
            margin-bottom: 10px;
        }
        .li7{
            .left{width: 50%;font-size: 12px;}
            .right{width: 50%;text-align: right;color: #fff;}
        }
        .li6{
            .but{
                button{
                    max-width: 398px;
                    width: 100%;
                    height: 58px;
                    background: rgba(228, 20, 28, 0.2);
                    border: 1px solid #E4141C;
                    border-radius: 6px;
                    font-size: 14px;
                    color: #fff;
                }
                button.sub{
                    background: #E4141C;
                }
            }
        }
    }
</style>
