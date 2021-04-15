<template>
  <!--铸币弹窗-->
  <div class="InsurancePoolRedeem">
    <van-dialog v-model="insurancePoolRedeemShow" show-cancel-button :showConfirmButton="false"
                :showCancelButton="false" title="">
      <div class="wrap">
        <div class="sec1">
          <div class="d1">
            {{lang('a_shuhuibaoxian')}}
          </div>
          <img @click="hide" class="img1" src="../../assets/img/btn_close2x.png"/>
          <div class="d2 mb15">
            <div class="d3">{{lang('a_shuhuishuliang')}}</div>
            <div class="d3">
              {{lang('a_keshuhuifene')}}：
              <div class="d4">{{getCanWithdrawTokenAmountWithTime()}}
              </div>
            </div>
          </div>
          <div class="d5 mb20">
            <input v-model="redeemVal" placeholder=""/>
            <div class="d7">{{lang('a_fene')}}</div>
          </div>
          <div class="d9 mb20">
            <div @click="setRedeemVal(.25);tabIndex=0" :class="{d10: true, d10_1: tabIndex === 0}">25%</div>
            <div @click="setRedeemVal(.5);tabIndex=1" :class="{d10: true, d10_1: tabIndex === 1}">50%</div>
            <div @click="setRedeemVal(.75);tabIndex=2" :class="{d10: true, d10_1: tabIndex === 2}">75%</div>
            <div @click="setRedeemVal(1);tabIndex=3" :class="{d10: true, d10_1: tabIndex === 3}">100%</div>
          </div>
          <div class="d2 mb10" v-if="timeCheck==2">
            <div class="d3">{{lang('a_zuijinshuhuiri')}}</div>
            <div class="d3">
              <div class="d4">{{$store.state.nextRedeemOptionTime[$store.state.insuranceTabIndex].startTime === 0 ? '-' :
                fmtDate($store.state.nextRedeemOptionTime[$store.state.insuranceTabIndex].startTime)}} - {{$store.state.nextRedeemOptionTime[$store.state.insuranceTabIndex].endTime ===
                0 ? '-' : fmtDate($store.state.nextRedeemOptionTime[$store.state.insuranceTabIndex].endTime)}}
              </div>
            </div>
          </div>
          <div class="d2 mb10" v-else-if="timeCheck==1">
            <div class="d3">{{lang('a_zuijinshuhuiri')}}</div>
            <div class="d3">
              <div class="d4">{{$store.state.latestRedeemOptionTime[$store.state.insuranceTabIndex].startTime === 0 ? '-' :
                fmtDate($store.state.latestRedeemOptionTime[$store.state.insuranceTabIndex].startTime)}} - {{$store.state.latestRedeemOptionTime[$store.state.insuranceTabIndex].endTime
                === 0 ? '-' : fmtDate($store.state.latestRedeemOptionTime[$store.state.insuranceTabIndex].endTime)}}
              </div>
            </div>
          </div>
          <div class="d2 mb10">
            <div class="d3"> {{lang('a_yujishuhui')}}{{tokenList[this.$store.state.insuranceTabIndex].symbol}}</div>
            <div class="d3">
              <div class="d4">{{getInputChangeCanWithdrawTokenAmountInfo().canWithdrawBasicAmount < 0 ? 0 : getInputChangeCanWithdrawTokenAmountInfo().canWithdrawBasicAmount}}</div>
            </div>
          </div>
          <div class="d2 mb10">
            <div class="d3">{{lang('a_yujishuhui')}}{{tokenList[this.$store.state.insuranceTabIndex].pSymbol}}</div>
            <div class="d3">
              <div class="d4">{{getInputChangeCanWithdrawTokenAmountInfo().canWithdrawParallelAmount}}</div>
            </div>
          </div>
          <div class="d2 mb40">
            <div class="d3">{{lang('a_shengyufene')}}</div>
            <div class="d3">
              <div class="d4">{{setUnit($store.state.accountInfo.canRedemptionLpBalanceAmount['p' +
                this.$store.state.insuranceTabIndex] - redeemVal)}}
              </div>
            </div>
          </div>
          <div class="d8">
            <button @click="hide">{{lang('a_quxiao')}}</button>
            <button @click="submit" class="active" v-if="redeemVal*1 > 0 && redeemVal*1 <= getCanWithdrawTokenAmountWithTime()">{{lang('a_queren')}}</button>
              <button class="active1" v-else >{{lang('a_queren')}}</button>
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
  } from "../../tools";
  import {setUnit, fmtDate} from "../../tools";
  import {getCanWithdrawTokenAmountInfo, redemptionIns, getNetValue, getWithdrawAmount} from "../../tools/chain";
  import * as config from '../../config'
  import store from "../../store";

  // let t = null;
  export default {
    name: 'InsurancePoolRedeem',
    data() {
      return {
        t: null,
        redeemVal: null,
        tabIndex: 0,
        tokenList: config.tokenList,
        nowTimestamp: Date.parse(new Date()),
        checkTimeStatus: false,
        timeCheck: 1,
        insurancePoolRedeemShow: true,
      }
    },
    created() {
      this.t = setInterval(() => {
        this.nowTimestamp = Date.parse(new Date());
        this.checkTime();
      }, 1000);
    },
    destroyed() {
      clearInterval(this.t)
    },
    methods: {
      checkTime() {
        const {
          startTime,
          endTime
        } = this.$store.state.latestRedeemOptionTime[this.$store.state.insuranceTabIndex];
        const startTime1 = this.$store.state.nextRedeemOptionTime[this.$store.state.insuranceTabIndex].startTime;
        const endTime1 = this.$store.state.nextRedeemOptionTime[this.$store.state.insuranceTabIndex].endTime;
        // console.log(fmtDate(this.nowTimestamp),fmtDate(startTime),fmtDate(endTime),fmtDate(startTime1),fmtDate(endTime1));
        if (this.nowTimestamp >= startTime && this.nowTimestamp < endTime) {
           this.checkTimeStatus = true;
           this.timeCheck = 1;
        } else if (this.nowTimestamp>=endTime && this.nowTimestamp<startTime1) {
          this.checkTimeStatus = false;
          this.timeCheck = 2;
        } else if (this.nowTimestamp >= startTime1 && this.nowTimestamp < endTime1) {
          this.checkTimeStatus = true;
          this.timeCheck = 2;
        } else {
          this.checkTimeStatus = false;
        }
      },
      getCanWithdrawTokenAmountWithTime(){
        if (this.checkTimeStatus){
          // console.log('在时间内',this.$store.state.accountInfo.canRedemptionLpBalanceAmount);
          return this.$store.state.accountInfo.canRedemptionLpBalanceAmount['p' + this.$store.state.insuranceTabIndex]
        }
        return 0;
      },
      lang(key) {
        return lang(key);
      },
      hide() {
        clearInterval(this.t)
        this.$store.commit('setState', {
          insurancePoolRedeemShow: false
        })
      },
      setRedeemVal(param) {
        if (!this.checkTimeStatus){
          this.redeemVal = 0;
          return;
        }
        this.redeemVal = setUnit(this.$store.state.accountInfo.canRedemptionLpBalanceAmount['p' + this.$store.state.insuranceTabIndex] * param, 6)
      },
      fmtDate(param) {
        return fmtDate(param);
      },
      getNetValue() {
        return getNetValue();
      },
      getInputChangeCanWithdrawTokenAmountInfo() {
        const canWithdrawInfo = this.getCanWithdrawTokenAmountInfo();
        const netVal = getNetValue();
        // 本地提取多少代币
        const withdrawVal = setUnit(netVal * this.redeemVal);
        return getWithdrawAmount(store.state.systemInfo.amount[store.state.insuranceTabIndex], withdrawVal);
      },
      getCanWithdrawTokenAmountInfo(param) {
        return getCanWithdrawTokenAmountInfo(param);
      },
      async submit() {
        try {
          if (!this.checkTimeStatus){
            Toast(lang('a_weidaoshuhuishijian'));
            return;
          }
          // console.log(this.getInputChangeCanWithdrawTokenAmountInfo().canWithdrawBasicAmount)
          if (this.getInputChangeCanWithdrawTokenAmountInfo().canWithdrawBasicAmount <= 0){
            Toast(lang('a_meiyoukeshuhuidezichan'));
            return;
          }
          this.hide();
          this.$store.commit('setState', {
            toastShow: true,
            toastShowType: 1,
          })
          await redemptionIns(config[this.$store.state.insuranceTabIndex + 'Token'], this.redeemVal);
          this.$store.commit('setState', {
            toastShow: true,
            toastShowType: 2,
          })
          this.$store.dispatch('initData');
        } catch (e) {
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
  .InsurancePoolRedeem {
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

          input {
            width: 100%;
            height: 60px;
            line-height: 60px;
            font-size: 24px;
            color: #fff;
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
            cursor: pointer;
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

        .d9 {
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }

        .d10 {
          width: 90px;
          height: 36px;
          border-radius: 5px;
          color: #4C525B;
          background: rgba(76, 82, 91, 0.2);
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 12px;
          cursor: pointer;
          margin-right: 10px;
        }

        .d10:nth-last-of-type(1) {
          margin-right: 0;
        }

        .d10_1 {
          background: #4C525B;
          color: #fff;
        }
      }
    }
  }

  @media (max-width: 768px) {
    .InsurancePoolRedeem {
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

          .d2 {
            margin-bottom: 10px;
          }

          .d2_1 {
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

          .d6, .d7, .d8, .d9, .d10 {
            font-size: 10px;
          }

          .d8 {
            button {
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
