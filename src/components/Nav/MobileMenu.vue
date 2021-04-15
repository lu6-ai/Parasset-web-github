<template>
  <div class="reactiveMob MobileMenu" v-show="$store.state.mobileMenuShow">
    <img class="img1" src="../../assets/img/triangle2x.png" />
    <div class="sec1">
      <div class="d1" :class="{d1_1: $store.state.navLeft === 0}" @click="tabChange(0)">
        {{lang('a_leftmenu')[0]}}
      </div>
      <div class="d1" :class="{d1_1: $store.state.navLeft === 1}" @click="tabChange(1)">
        {{lang('a_leftmenu')[1]}}
      </div>
      <div class="d1" :class="{d1_1: $store.state.navLeft === 2}" @click="tabChange(2)">
        {{lang('a_leftmenu')[2]}}
      </div>
<!--      <div class="d1 mb10" :class="{d1_1: $store.state.navLeft === 3}" @click="tabChange(3)">-->
<!--        {{lang('a_leftmenu')[3]}}-->
<!--      </div>-->
      <div class="line mb15" style="opacity: .1;"></div>
      <div :key="index" v-for="(item, index) in exchangeRateLanguage">
        <div class="d2 mb5">
          {{$store.state.systemInfo.totalSupply[item]}}
        </div>
        <div class="d3 mb8">
          {{lang('a_liutongliang')[index]}}
        </div>
      </div>
      <div class="line mb15" style="opacity: .1;"></div>
      <div class="d2 mb5">
        {{setUnit($store.state.systemInfo.currencyPrice.usdt)}}
      </div>
      <div class="d3 mb8">
        ETH / USDT
      </div>
      <div class="d2 mb5">
        {{setUnit($store.state.systemInfo.currencyPrice.usdt / $store.state.systemInfo.currencyPrice.nest)}}
      </div>
      <div class="d3 mb5">
        NEST / USDT
      </div>
      <div class="d2 mb5">
        {{setUnit(1 / $store.state.systemInfo.currencyPrice.nest)}}
      </div>
      <div class="d3 mb8">
        NEST / ETH
      </div>
      <div class="line mb15" style="opacity: .1;"></div>
      <div :class="{d4: true, d4_1: $store.state.languageType === 'en'}" @click="onlanguagechange('en')" >
        <img v-if="$store.state.languageType !== 'en'" src="../../assets/img/language_english22x.png" />
        <img v-if="$store.state.languageType === 'en'" src="../../assets/img/language_english12x.png" />
        English
      </div>
      <div :class="{d4: true, d4_1: $store.state.languageType === 'cn'}" @click="onlanguagechange('cn')" >
        <img v-if="$store.state.languageType !== 'cn'" src="../../assets/img/language_chinese22x.png" />
        <img v-if="$store.state.languageType === 'cn'" src="../../assets/img/language_chinese12x.png" />
        简体中文
      </div>
      <div class="line mb15" style="opacity: .1;"></div>
      <div class="d5 mb15">
        <div class="d6">
          <img src="../../assets/img/link_github22x.png" />
          <img src="../../assets/img/link_github12x.png" />
        </div>
        <div class="d6">
          <img src="../../assets/img/link_twitter22x.png" />
          <img src="../../assets/img/link_twitter12x.png" />
        </div>
        <div class="d6">
          <img src="../../assets/img/link_telegram22x.png" />
          <img src="../../assets/img/link_telegram12x.png" />
        </div>
      </div>
      <div class="line mb15" style="opacity: .1;"></div>
      <div class="sec2">
        <div class="d1" @click="showConnectWallet" v-if="$store.state.accounts.length === 0">
          {{lang('a_lianjieqianbao')}}
        </div>
        <div class="d1 d1_1 infoBtn" v-if="$store.state.accounts.length > 0" @click="showAccountInfo">
          {{cutAccount($store.state.accounts[0])}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { lang } from "@/tools";
  import {cutAccount} from "../../tools";
  export default {
    name: 'MobileMenu',
    data(){
      return {
        exchangeRateLanguage: ['pusdt', 'peth'],
      }
    },
    methods: {
      cutAccount(account){
        return cutAccount(account);
      },
      showConnectWallet(){
        this.$store.commit('setState', {
          connectWalletShow: true
        })
      },
      showAccountInfo(){
        this.$store.commit('setState', {
          accountInfoShow: !this.$store.state.accountInfoShow
        })
      },
      onlanguagechange (type) {
        this.$store.commit('setState', {
          languageType: type
        })
        this.$store.commit('setState', {
          mobileMenuShow: false
        })
      },
      tabChange(index) {
        if (index === this.$store.state.navLeft) return;
        this.$store.commit('setState', {
          navLeft: index
        })
        this.$store.dispatch('initData');
        if (index == 0) {
          this.$router.push("/home");
        } else if (index == 1) {
          this.$router.push("/mintage");
        } else if (index == 2) {
          this.$router.push("/insurance");
        } else if (index == 3) {
          this.$router.push("/clearing");
        }
        this.$store.commit('setState', {
          mobileMenuShow: false
        })
      },
      lang(key){
        return lang(key);
      }
    },
  }

</script>

<style lang="less">
  .MobileMenu {
    position: fixed;
    right: 10px;
    top: 45px;
    color: #fff;
    font-size: 12px;
    z-index: 999;
    .img1{
      position: absolute;
      right: 4px;
      top: -6px;
    }
    .sec1 {
      border-radius: 7px;
      width: 150px;
      height: auto;
      background: #1B1D21;
      padding: 10px 0 15px;

      .d1{
        font-size: 13px;
        color: #4c525b;
        text-align: center;
        padding: 10px 0;
      }

      .d1_1{
        color: #E4141C;
      }

      .d2{
        width: 100%;
        padding: 0 30px;
        background: url("../../assets/img/img_roundline.png") no-repeat 15px center;
        background-size: 5px 13px;
      }

      .d3{
        width: 100%;
        padding: 0 30px;
        color: #4C525B;
      }

      .d4{
        img{
          margin-right: 7px;
          width: 15px;
          height: 15px;
        }
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: 11px;
        color: #4C525B;
        padding: 0 15px;
        margin-bottom: 10px;
      }
      .d4_1{
        color: #E4141C;
      }

      .d5{
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        padding: 0 15px;
      }
      .d6{
        cursor: pointer;
        img{
          width: 30px;
          height: 30px;
        }
        img:nth-of-type(1){
          display: block;
        }
        img:nth-of-type(2){
          display: none;
        }
      }
      .d6:hover{
        img:nth-of-type(1){
          display: none;
        }
        img:nth-of-type(2){
          display: block;
        }
      }

    }
    .sec2{
      width: 120px;
      margin: 0 auto;
      .d1{
        height: 40px;
        background: url("../../assets/img/btn_wallet1_phone2x.png") no-repeat left top;
        background-size: 100% 100%;
        color: #fff;
        font-size: 11px;
        color: #fff;
        text-align: center;
        line-height: 40px;
        cursor: pointer;
        padding: 0 21px 0 25px;
      }
      .d1:hover{
        background: url("../../assets/img/btn_wallet2_phone2x.png") no-repeat left top;
        background-size: 100% 100%;
      }
      .d1_1{
        background: url("../../assets/img/btn_wallet3_phone2x.png") no-repeat left top;
        background-size: 100% 100%;
      }
      .d1_1:hover{
        background: url("../../assets/img/btn_wallet4_phone2x.png") no-repeat left top;
        background-size: 100% 100%;
      }
    }
  }
</style>
