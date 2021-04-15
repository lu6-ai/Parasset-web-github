<template>
  <div class="exchange_content">
    <ul class="ul_info">
      <div class="d1">
        <li class="li1">
          <div class="dib left">{{lang('a_cong')}}</div>
          <div class="dib right fz0">
            <span class="dib">{{lang('a_yue')}}：</span>
            <strong class="dib">{{type === 0 ?
              BigNumberStr($store.state.accountInfo.amount[tokenList[tokenIndex].symbol.toLowerCase()],0,6) :
              BigNumberStr($store.state.accountInfo.amount[tokenList[tokenIndex].pSymbol.toLowerCase()],0,6)}}</strong>
          </div>
        </li>
        <li class="li2">
          <div class="dib left">
            <van-field
                v-model="addValue"
                type="number"
                center
                placeholder="0"
                class="pledge"
                :class="{colorFFF: addValue>=0}"
                @keyup="addValueChange"
            >
              <template #button>
                <van-button size="small" type="primary" class="pledgeBut"
                            @click="addValueChangeMax">
                  {{lang('a_zuida')}}
                </van-button>
              </template>
            </van-field>
          </div>
          <div class="dib right fz0">
            <div class="title fz0" v-for="(item,index) in tokenList"
                 @click="option1Show = !option1Show"
                 :key=index
            >
              <div v-if="index===tokenIndex">
                <img class="dib" :src="type === 0 ? item.icon : item.pIcon">
                <span class="dib">{{type === 0 ? item.symbol : item.pSymbol}}</span>
                <van-icon class="dib" name="arrow-down"/>
              </div>
            </div>
            <div class="info" v-if="option1Show">
              <ul>
                <li class="fz0" v-for="(item,index) in tokenList"
                    :key=index
                    @click="tokenIndex=index,option1Show=!option1Show"
                >
                  <img class="dib" :src="type === 0 ? item.icon : item.pIcon">
                  <span class="dib">{{type === 0 ? item.symbol : item.pSymbol}}</span>
                </li>
              </ul>
            </div>
          </div>
        </li>
      </div>
      <li class="li3 fz0">
        <img class="dib" @click="rolling" src="../../assets/img/btn_exchange.png">
      </li>
      <div class="d2">
        <li class="li1">
          <div class="dib left">{{lang('a_dao')}}</div>
          <div class="dib right fz0">
            <span class="dib">{{lang('a_yue')}}：</span>
            <strong class="dib">{{type === 1 ?
              BigNumberStr($store.state.accountInfo.amount[tokenList[tokenIndex].symbol.toLowerCase()],0,6) :
              BigNumberStr($store.state.accountInfo.amount[tokenList[tokenIndex].pSymbol.toLowerCase()],0,6)}}</strong>
          </div>
        </li>
        <li class="li2 li4">
          <div class="dib left">
            <van-field
                v-model="getValue"
                type="number"
                center
                placeholder="0"
                class="pledge"
                :class="{colorFFF: getValue>=0}"
                @keyup="getValueChange"
            >
            </van-field>
          </div>
          <div class="dib right fz0">
            <div class="title fz0" v-for="(item,index) in tokenList"
                 @click="option2Show = !option2Show"
                 :key=index
            >
              <div v-if="index===tokenIndex">
                <img class="dib" :src="type === 1 ? item.icon : item.pIcon">
                <span class="dib">{{type === 1 ? item.symbol : item.pSymbol}}</span>
                <van-icon class="dib" name="arrow-down"/>
              </div>
            </div>
            <div class="info" v-if="option2Show">
              <ul>
                <li class="fz0" v-for="(item,index) in tokenList"
                    :key=index
                    @click="tokenIndex=index,option2Show=!option2Show"
                >
                  <img class="dib" :src="type === 1 ? item.icon : item.pIcon">
                  <span class="dib">{{type === 1 ? item.symbol : item.pSymbol}}</span>
                </li>
              </ul>
            </div>
          </div>
        </li>
      </div>
      <div class="d3">
        <li class="li5 fz0">
          <div class="dib left">{{lang('a_jiage')}}</div>
          <div class="dib right"><span>1</span> {{tokenList[tokenIndex].symbol}} = <span>1</span>
            {{tokenList[tokenIndex].pSymbol}}
          </div>
        </li>
        <li class="li5 fz0">
          <div class="dib left">{{lang('a_shouxvfei')}}</div>
          <div class="dib right"><span>{{setUnit(fee, 18)}}</span> {{type === 0 ? tokenList[tokenIndex].pSymbol :
            tokenList[tokenIndex].symbol}}
          </div>
        </li>
      </div>
      <li class="li6">
        <div class="but" >
          <button v-if="!addValue || addValue<=0" style="opacity: 0.5">{{lang('a_duihuan')}}</button>
          <button v-else @click="exchange">{{lang('a_duihuan')}}</button>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  import {
    lang,
    BigNumber,
    BigNumberStr,
    BigNumberMul,
    BigNumberDiv,
    BigNumberAdd,
    BigNumberSub,
    setUnit,
    Toast
  } from "../../tools";
  import {
    exchangeUnderlyingToPToken,
    exchangePTokenToUnderlying,
    contractAbiAllowance,
    contractAbiApprove,
    subscribeIns
  } from '../../tools/chain'
  import * as config from '../../config'
  import {checkLogin} from "../../tools";

  export default {
    name: 'Exchange',
    data() {
      return {
        tokenIndex: "eth",
        type: 0,
        addValue: null,
        getValue: null,
        fee: 0,
        tokenList: config.tokenList,
        option1Show: false,
        option2Show: false,
      }
    },
    methods: {
      lang(key) {
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
      addValueChange() {
        const val = parseFloat(this.addValue) || '';
        this.fee = setUnit(val * config.insurancePoolFee);
        this.getValue = this.setUnit((val - this.fee), 18);
      },
      addValueChangeMax(){
        this.addValue = BigNumberStr(this.type === 0 ? this.$store.state.accountInfo.amount[this.tokenList[this.tokenIndex].symbol.toLowerCase()] : this.$store.state.accountInfo.amount[this.tokenList[this.tokenIndex].pSymbol.toLowerCase()],0);
        this.addValueChange();
      },
      getValueChange() {
        const val = parseFloat(this.getValue) || '';
        this.addValue = this.setUnit((val / (1 - config.insurancePoolFee)), 18);
        this.fee = this.setUnit(this.addValue - val, 18);
      },
      async exchange() {
        if (!checkLogin()) return;
        if (!(this.tokenIndex === 'eth' && this.type === 0)) {
          const allowance = await contractAbiAllowance(config.insurancePoolAddress, config[(this.type === 0 ? '' : 'p') + this.tokenIndex + 'Token']);
          if (allowance === 0) {
            contractAbiApprove(config.insurancePoolAddress, config[(this.type === 0 ? '' : 'p') + this.tokenIndex + 'Token'])
            return;
          }
        }
        if (this.type === 0) {
          if (parseFloat(this.addValue) > this.$store.state.accountInfo.amount[this.tokenIndex]) {
            Toast(lang('a_qianbaoyuebuzu'));
            return;
          }
        } else if (this.type === 1) {
          if (parseFloat(this.addValue) > this.$store.state.accountInfo.amount['p' + this.tokenIndex]) {
            Toast(lang('a_qianbaoyuebuzu'));
            return;
          }
          // 检测资金池
          if (parseFloat(this.getValue) > this.$store.state.systemInfo.amount[this.tokenIndex]) {
            Toast(lang('a_baoxianchizichanbuzu'));
            return;
          }
        }
        try {
          this.$store.commit('setState', {
            toastShow: true,
            toastShowType: 1,
          })
          if (this.type === 0) {
            await this.exchangeUnderlyingToPToken();
          } else {
            await this.exchangePTokenToUnderlying();
          }
          this.$store.dispatch('initData');
          this.$store.commit('setState', {
            toastShow: true,
            toastShowType: 2,
          })
        } catch (e) {
          this.$store.commit('setState', {
            toastShow: true,
            toastShowType: 3,
          })
        }
      },
      async exchangeUnderlyingToPToken() {
        await exchangeUnderlyingToPToken(config[this.tokenIndex + 'Token'], this.addValue);
      },
      async exchangePTokenToUnderlying() {
        await exchangePTokenToUnderlying(config['p' + this.tokenIndex + 'Token'], this.addValue);
      },
      rolling() {
        this.type = this.type === 0 ? 1 : 0;
      },
    },
  }

</script>

<style lang="less">
  .exchange_content {
    color: #4C525B;
    font-size: 12px;
    font-weight: 400;
    padding: 40px 0 20px;

    .ul_info {
      max-width: 400px;
      margin: 0 auto;
    }

    .li1 {
      margin-bottom: 15px;

      .left {
        width: 50%;
        font-size: 12px;
      }

      .right {
        width: 50%;
        font-size: 12px;
        text-align: right;
      }

      .right strong {
        font-weight: bold;
        color: #fff;
      }
    }

    .colorFFF .van-field__control {
      color: #fff;
    }

    .van-cell {
      padding: 0 16px;
    }

    .li2 {
      margin-bottom: 25px;
      padding: 10px 0;
      border: 1px solid #25282D;
      border-radius: 6px;

      .van-field__button{
        position: relative;
        left: 30px;
      }

      .left {
        width: 60%;

        .pledge {
          font-size: 24px;
          background: unset;
          overflow: visible;
        }

        .pledgeBut {
          background: rgba(228, 20, 28, 0.2);
          border: 1px solid #E4141C;
          border-radius: 2px;
          color: #E4141C;
        }
      }

      .right {
        width: 40%;
        text-align: right;
        position: relative;

        .title {
          span {
            padding: 0 10px 0 10px;
            font-size: 14px;
            font-weight: bold;
            color: #fff;
          }

          i {
            font-size: 14px;
            font-weight: bold;
          }

          padding-right: 10px;
        }

        .info {
          position: absolute;
          top: 60px;
          right: 0;
          color: #fff;
          text-align: left;
          background: #17191C;
          z-index: 99;

          ul {
          }

          li {
            padding: 5px 20px;

            img {
              margin-right: 10px;
            }
          }
        }
      }
    }

    .li3 {
      margin-bottom: 25px;
      text-align: center;
    }

    .li4 {
      margin-bottom: 25px;
    }

    .d3 {
      margin-bottom: 25px;
    }

    .li5 {
      .left {
        width: 50%;
        font-size: 12px;
      }

      .right {
        width: 50%;
        text-align: right;
      }

      .right span {
        color: #fff;
      }

      margin-bottom: 10px;
    }

    .li6 {
      margin-bottom: 25px;

      .but {
        button {
          max-width: 398px;
          width: 100%;
          height: 58px;
          background: #E4141C;
          border: 1px solid #E4141C;
          border-radius: 6px;
          font-size: 14px;
          color: #fff;
        }
        button:disabled{
          background: rgba(228, 20, 28, 0.2);
        }
      }
    }
  }
</style>
