<template>
  <div class="connectWallet">
    <van-dialog v-model="$store.state.connectWalletShow" show-cancel-button :showConfirmButton="false" :showCancelButton="false" title="">
      <div class="wrap">
        <div class="sec1">
          <div class="d1">
            {{lang('a_lianjieqianbao')}}
          </div>
          <div style="opacity: .1" class="line"></div>
          <div class="d2" @click="initWeb3(0)">
            <img src="../../assets/img/icon_metamask2x.png" />
            MetaMask
          </div>
          <div class="d2" @click="initWeb3(1)">
            <img src="../../assets/img/icon_walletconnect2x.png" />
            WalletConnet
          </div>
          <img @click="hide" class="img1" src="../../assets/img/btn_close2x.png" />
        </div>
      </div>
    </van-dialog>
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
    BigNumberAdd,
    BigNumberSub,
  } from "../../tools";
  import * as metaMaskTools from "../../tools/chain";

  export default {
    name: 'connectWallet',
    methods: {
      lang(key){
        return lang(key);
      },
      initWeb3(type){
        metaMaskTools.initWeb3(type).then(()=>{
          this.hide();
        });
      },
      hide(){
        this.$store.commit('setState', {
          connectWalletShow: false
        })
      }
    },
  }

</script>

<style lang="less">
  .connectWallet {
    .van-dialog{
      width: 380px;
    }
    .wrap{
      >.sec1 {
        height: 300px;
        background: #1B1D21;
        border-radius: 4px;
        padding: 0 30px;
        position: relative;
        >.img1{
          width: 12px;
          height: 12px;
          cursor: pointer;
          position: absolute;
          right: 25px;
          top: 20px;
        }
        .d1{
          font-size: 16px;
          color: #fff;
          height: 60px;
          line-height: 60px;
          text-align: center;
          background: url("../../assets/img/img_roundline.png") no-repeat 30px center;
          background-size: 7px 16px;
          margin-bottom: 30px;
        }
        .d2{
          height: 60px;
          border-radius: 30px;
          padding: 0 27px;
          font-size: 18px;
          color: #fff;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          cursor: pointer;
          margin-bottom: 20px;
          transition: all .7s;
          img{
            width: 40px;
            height: 40px;
            margin-right: 10px;
          }
        }
        .d2:hover{
          background: #25282D;
        }
      }
    }
  }
  @media (max-width: 768px) {
    .connectWallet{
      .van-dialog{
        width: 300px;
      }
      .wrap{
        > .sec1{
          width: 300px;
          height: auto;
          overflow: hidden;
          padding: 0 0 10px;
          .d1{
            text-align: left;
            padding-left: 55px;
            font-size: 13px;
            margin-bottom: 0;
          }
          .d2{
            font-size: 13px;
            margin-bottom: 0;
            img{
              width: 30px;
              height: 30px;
            }
          }
        }
      }
    }
  }
</style>
