<template>
  <div>
    <div class="reactivePc">
      <div class="navTopPc">
        <div class="sec1">
          <div :class="{d1: true}" :key="index" v-for="(item, index) in exchangeRateLanguage">
            <div class="d2">{{$store.state.systemInfo.totalSupply[item]}}</div>
            <div class="d3">{{lang('a_liutongliang')[index]}}</div>
          </div>
        </div>
        <div class="sec2 infoBtn">
          <div @click="showConnectWallet" v-if="$store.state.accounts.length === 0" class="d1">
            {{lang('a_lianjieqianbao')}}
          </div>
          <div v-if="$store.state.accounts.length > 0" class="d1 d1_1 infoBtn" @click="showAccountInfo">
            {{cutAccount($store.state.accounts[0])}}
          </div>
        </div>
      </div>
    </div>
    <div class="reactiveMob">
      <div class="navTopMob">
        <div class="sec1">
          <div class="d1">
            <img src="../../assets/img/logo.png" />
          </div>
          <div class="d2" @click="toggleMobileMenuShow">
            <img v-if="!$store.state.mobileMenuShow" src="../../assets/img/icon_menu2x.png" />
            <img v-if="$store.state.mobileMenuShow" src="../../assets/img/icon_menu_chosen2x.png" />
          </div>
        </div>
      </div>
    </div>
  </div>


</template>

<script>
  import { lang } from "@/tools";
  import {cutAccount} from '../../tools/index'


  export default {
    name: 'navTopPc',
    data() {
      return {
        exchangeRateLanguage: ['pusdt', 'peth'],
        exchangeRate: {
          pusdt: 0,
          peth: 0,
        },
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
      toggleMobileMenuShow(){
        this.$store.commit('setState', {
          mobileMenuShow: !this.$store.state.mobileMenuShow
        })
      },
      lang(key){
        return lang(key);
      }
    },
    mounted() {
    }
  }

</script>

<style lang="less">
  .navTopPc {
    position: fixed;
    z-index: 98;
    left: 0;
    top: 0;
    width: 100%;
    height: 80px;
    padding: 0 40px 0 220px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #17191C;
    >.sec1 {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding-left: 80px;

      .d1 {
        background: url("../../assets/img/img_roundline.png") no-repeat left 2px;
        background-size: 7px 16px;
        padding-left: 22px;
        margin-right: 47px;

        .d2 {
          font-size: 18px;
          color: #fff;
          text-align: left;
          padding-right: 30px;
          transition: all .35s;
          margin-bottom: 8px;
        }

        .d3 {
          font-size: 12px;
          color: #4C525B;
          text-align: left;
        }

      }

    }

    >.sec2{
      .d1{
        height: 40px;
        background: url("../../assets/img/btn_wallet12x.png") no-repeat left top;
        background-size: 100% 100%;
        color: #fff;
        font-size: 14px;
        color: #fff;
        text-align: center;
        line-height: 40px;
        cursor: pointer;
        padding: 0 31px 0 35px;
      }
      .d1:hover{
        background: url("../../assets/img/btn_wallet22x.png") no-repeat left top;
        background-size: 100% 100%;
      }
      .d1_1{
        background: url("../../assets/img/btn_wallet32x.png") no-repeat left top;
        background-size: 100% 100%;
      }
      .d1_1:hover{
        background: url("../../assets/img/btn_wallet42x.png") no-repeat left top;
        background-size: 100% 100%;
      }
    }
  }
  .navTopMob{
    .sec1{
      width: 100%;
      height: 45px;
      position: fixed;
      left: 0;
      top: 0;
      z-index: 999;
      background: #17191C;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding:  0 14px;
      .d1{
        img{
          width: 61px;
        }
      }
      .d2{
        img{
          width: 22px;
          height: 22px;
        }
      }
    }
  }
</style>
