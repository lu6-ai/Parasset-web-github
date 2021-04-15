<template>
  <div>
    <div class="reactivePc">
      <div class="AccountInfo" v-show="$store.state.accountInfoShow">
        <div class="sec1">
          <div class="d1">
            <img v-if="$store.state.connectType === 0" class="img1" src="../../assets/img/icon_metamask2x.png"/>
            <img v-if="$store.state.connectType === 1" class="img1" src="../../assets/img/icon_walletconnect2x.png"/>
          </div>
          <div class="d2">
            {{cutAccount($store.state.accounts[0])}}
          </div>
          <div class="d3">
            <a :href="'https://'+ openUrlSLD +'etherscan.io/address/' + $store.state.accounts[0]" target="_blank">
              {{lang('a_liulanqichakan')}}
            </a>
          </div>
          <div class="d3" @click="hide();showConnectWallet();$store.dispatch('logOut')">
            {{lang('a_genghuanqianbao')}}
          </div>
          <div class="d3" @click="hide();$store.dispatch('logOut')">
            <img class="img1" src="../../assets/img/icon_quit2x.png"/>
            {{lang('a_duankailianjie')}}
          </div>
        </div>
      </div>
    </div>
    <div class="reactiveMob">
      <div class="AccountInfoMobWrap">
        <van-dialog v-model="$store.state.accountInfoShow" show-cancel-button :showConfirmButton="false" :showCancelButton="false" title="">
          <div class="AccountInfo AccountInfoMob" v-show="$store.state.accountInfoShow">
            <img @click="hide" class="img1" src="../../assets/img/btn_close2x.png"/>
            <div class="sec1">
              <div class="d1">
                <img v-if="$store.state.connectType === 0" class="img1" src="../../assets/img/icon_metamask2x.png"/>
                <img v-if="$store.state.connectType === 1" class="img1" src="../../assets/img/icon_walletconnect2x.png"/>
              </div>
              <div class="d2">
                {{cutAccount($store.state.accounts[0])}}
              </div>
              <div class="d3">
                <a :href="'https://'+ openUrlSLD +'etherscan.io/address/' + $store.state.accounts[0]" target="_blank">
                  {{lang('a_liulanqichakan')}}
                </a>
              </div>
              <div class="d3" @click="hide();showConnectWallet();$store.dispatch('logOut')">
                {{lang('a_genghuanqianbao')}}
              </div>
              <div class="d3" @click="hide();$store.dispatch('logOut')">
                <img class="img1" src="../../assets/img/icon_quit2x.png"/>
                {{lang('a_duankailianjie')}}
              </div>
            </div>
          </div>
        </van-dialog>
      </div>
    </div>
  </div>
</template>

<script>
  import { lang } from "@/tools";
  import {cutAccount} from "../../tools";
  import {openUrlSLD} from '../../config'

  export default {
    name: 'AccountInfo',
    data() {
      return {
        openUrlSLD,
      }
    },
    methods: {
      showConnectWallet(){
        this.$store.commit('setState', {
          connectWalletShow: true
        })
      },
      cutAccount(account){
        return cutAccount(account);
      },
      hide() {
        this.$store.commit('setState', {
          accountInfoShow: false
        })
      },
      lang(key){
        return lang(key);
      }
    },
  }

</script>

<style lang="less">
  .AccountInfo {
    position: fixed;
    right: 41px;
    top: 83px;
    color: #fff;
    font-size: 12px;
    z-index: 1000;
    .sec1 {
      width: 160px;
      height: auto;
      background: #1B1D21;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-direction: column;
      padding: 0 31px;

      .d1 {
        width: 100%;
        height: 31px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 10px auto 10px;

        .img1 {
          width: 34px;
          height: 31px;
        }
      }

      .d2 {
        width: 100%;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 15px;
      }

      .d3 {
        height: 60px;
        line-height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        margin: 0 -31px;
        padding: 0 31px;
        width: 160px;

        img {
          margin-right: 7px;
          width: 13px;
          height: 12px;
        }
      }

      .d3:hover{
        background: #000000;
        color: #E4141C;
      }
    }
  }
  .AccountInfoMobWrap{
    .van-dialog{
      width: 300px;
    }
  }
  .AccountInfoMob{
    position: relative;
    width: 100%;
    right: 0;
    top: 0;
    > .img1 {
      width: 12px;
      height: 12px;
      cursor: pointer;
      position: absolute;
      right: 25px;
      top: 20px;
    }
    .sec1{
      width: 100%;
      padding: 15px 31px 0;
    }
  }
</style>
