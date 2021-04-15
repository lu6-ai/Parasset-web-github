<template>
  <!--铸币弹窗-->
  <div class="InsurancePoolDeposit">
    <van-dialog v-model="$store.state.insurancePoolDepositShow" show-cancel-button :showConfirmButton="false"
                :showCancelButton="false" title="">
      <div class="wrap">
        <div class="sec1">
          <div class="d1">
            {{lang('a_zhurubaoxian')}}
          </div>
          <img @click="hide" class="img1" src="../../assets/img/btn_close2x.png"/>
          <div class="d2 mb15">
            <div class="d3">{{lang('a_zhurushuliang')}}</div>
            <div class="d3">
              {{lang('a_keyong')}}：
              <div class="d4">{{BigNumberStr($store.state.accountInfo.amount[$store.state.insuranceTabIndex],0,6)}}</div>
            </div>
          </div>
          <div class="d5">
            <input v-model="depositVal" placeholder="" />
            <div class="d6" @click="depositVal=$store.state.accountInfo.amount[$store.state.insuranceTabIndex]">{{lang('a_zuida')}}</div>
            <div class="d7">{{tokenList[this.$store.state.insuranceTabIndex].symbol}}</div>
          </div>
          <div class="d2 mb10">
            <div class="d3">{{lang('a_dangqianjingzhi')}}</div>
            <div class="d3">
              <div class="d4">{{getNetValue()}}</div>
            </div>
          </div>
          <div class="d2 d2_1">
            <div class="d3">{{lang('a_yujifene')}}</div>
            <div class="d3">
              <div class="d4">{{setUnit(depositVal/getNetValue())}}</div>
            </div>
          </div>
          <div class="d8">
            <button @click="hide">{{lang('a_quxiao')}}</button>
            <button @click="submit" class="active" v-if="depositVal*1 <= $store.state.accountInfo.amount[$store.state.insuranceTabIndex]*1">{{lang('a_queren')}}</button>
            <button class="active1" v-else>{{lang('a_queren')}}</button>
          </div>
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
    setUnit,
  } from "../../tools";
  import {getNetValue, redemptionIns, subscribeIns} from "../../tools/chain";
  import * as config from "../../config";

  export default {
    name: 'InsurancePoolDeposit',
    data(){
      return {
        depositVal: '',
        tabIndex: 0,
        tokenList: config.tokenList,
      }
    },
    methods: {
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
      BigNumberAdd(num1,num2,col){
        return BigNumberAdd(num1,num2,col);
      },
      BigNumberSub(num1,num2,col){
        return BigNumberSub(num1,num2,col);
      },
      /*
      *净值
      * */
      getNetValue() {
        if (getNetValue() <= 0) {
          return 1;
        }
        return getNetValue();
      },
      hide() {
        this.$store.commit('setState', {
          insurancePoolDepositShow: false
        })
      },
      async submit(){
        try {
          this.hide();
          this.$store.commit('setState', {
            toastShow: true,
            toastShowType: 1,
          })
          await subscribeIns(config[this.$store.state.insuranceTabIndex+'Token'], this.depositVal);
          this.$store.commit('setState', {
            toastShow: true,
            toastShowType: 2,
          })
          this.$store.dispatch('initData');
        }catch (e) {
          this.$store.commit('setState', {
            toastShow: true,
            toastShowType: 3,
          })
        }
      },
    },
  }

</script>

<style lang="less">
  .InsurancePoolDeposit {
    letter-spacing: 3px;

    .van-dialog {
      width: 460px;
    }

    .wrap {
      > .sec1 {
        background: #1B1D21;
        border-radius: 4px;
        padding: 0 30px 30px;
        position: relative;
        height: auto;
        overflow: hidden;

        > .img1 {
          width: 12px;
          height: 12px;
          cursor: pointer;
          position: absolute;
          right: 25px;
          top: 20px;
        }

        .d1 {
          font-size: 16px;
          color: #fff;
          height: 70px;
          line-height: 70px;
          text-align: left;
          background: url("../../assets/img/img_roundline.png") no-repeat 0px center;
          background-size: 7px 16px;
          margin-bottom: 20px;
          padding: 0 0 0 36px;
        }

        .d2 {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .d3 {
          font-size: 12px;
          color: #4C525B;
          display: flex;
          justify-content: flex-end;
          align-items: center;
        }

        .d4 {
          color: #fff;
        }

        .d4_1 {
          color: #E4141C;
        }

        .d5 {
          position: relative;
          background: #17191C;
          margin-bottom: 10px;

          input {
            width: 100%;
            height: 60px;
            line-height: 60px;
            font-size: 24px;
            color: #4C525B;
            padding: 0 20px;
            border: solid 1px #25282D;
            background: transparent;
          }
        }

        .d6 {
          color: #E4141C;
          font-size: 12px;
          border: solid 1px #E4141C;
          text-align: center;
          padding: 3px 6px;
          position: absolute;
          right: 73px;
          top: 18px;
          border-radius: 2px;
          cursor: pointer;
        }

        .d7 {
          font-size: 14px;
          color: #fff;
          position: absolute;
          right: 20px;
          top: 21px;
        }

        .d8 {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 30px;
          button {
            width: 120px;
            height: 50px;
            border: solid 1px #393e45;
            text-align: center;
            line-height: 50px;
            font-size: 14px;
            color: #fff;
            background: #25282d;
            border-radius: 4px;
            margin: 0 18px;
          }

          button.active {
            background: #431b20;
            border: solid 1px #ff3366;
          }

          button.active1 {
            background: #25282d;
            border: solid 1px #393e45;
            color: #363a41;
          }
        }
      }
    }
  }

  @media (max-width: 768px) {
    .InsurancePoolDeposit {
      .van-dialog {
        width: 300px;
      }

      .wrap {
        > .sec1 {
          padding: 0 20px 15px;

          .img1 {
            right: 21px;
            top: 16px;
          }

          .d1 {
            padding: 0 0 0 20px;
            height: 45px;
            line-height: 45px;
            font-size: 13px;
            margin-bottom: 10px;
          }

          .d2{
            margin-bottom: 10px;
          }

          .d2_1{
            margin-bottom: 25px;
          }

          .d5 {
            position: relative;
            background: #17191C;
            margin-bottom: 10px;

            input {
              height: 40px;
              line-height: 40px;
              padding: 0 10px;
            }
          }
          .d6 {
            top: 8px;
          }
          .d7 {
            top: 11px;
          }
          .d6,.d7,.d8,.d9,.d10{
            font-size: 10px;
          }
          .d8{
            button{
              height: 40px;
              line-height: 40px;
              font-size: 13px;
            }
          }
        }
      }
    }
  }
</style>
