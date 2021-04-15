<template>
  <div class="navLeft reactivePc">
    <div class="sec1 mb70">
      <img src="../../assets/img/logo.png"/>
    </div>
    <div class="sec2 mb90">
      <div @click="tabChange(index)" :class="{d1: true, d1_1: $store.state.navLeft !== index}" :key="index.toString()"
           v-for="(item, index) in lang('a_leftmenu')">
        <div class="d2">{{item}}</div>
      </div>
    </div>
    <div class="sec3">
      <!--        <div :class="{d1: true}" :key="index" v-for="(item, index) in exchangeRate">-->
      <!--          <div class="d2">{{item.value}}</div>-->
      <!--          <div class="d3">{{item.unit}}</div>-->
      <!--        </div>-->
      <div class="d1">
        <div class="d2">{{setUnit($store.state.systemInfo.currencyPrice.usdt)}}</div>
        <div class="d3">ETH / USDT</div>
      </div>
      <div class="d1">
        <div class="d2">{{setUnit($store.state.systemInfo.currencyPrice.usdt / $store.state.systemInfo.currencyPrice.nest)}}</div>
        <div class="d3">NEST / USDT</div>
      </div>
      <div class="d1">
        <div class="d2">{{setUnit(1 / $store.state.systemInfo.currencyPrice.nest)}}</div>
        <div class="d3">NEST / ETH</div>
      </div>
    </div>
    <div class="sec4">
      <div class="d1">
        <div class="d2">
          <img @click="onlanguagechange('en')" v-if="$store.state.languageType !== 'en'"
               src="../../assets/img/language_english22x.png"/>
          <img @click="onlanguagechange('en')" v-if="$store.state.languageType === 'en'"
               src="../../assets/img/language_english12x.png"/>
        </div>
        <div class="d2">
          <img @click="onlanguagechange('cn')" v-if="$store.state.languageType !== 'cn'"
               src="../../assets/img/language_chinese22x.png"/>
          <img @click="onlanguagechange('cn')" v-if="$store.state.languageType === 'cn'"
               src="../../assets/img/language_chinese12x.png"/>
        </div>
      </div>
      <div class="d3">
        <div class="d4">
          <img src="../../assets/img/link_github22x.png"/>
          <img src="../../assets/img/link_github12x.png"/>
        </div>
        <div class="d4">
          <img src="../../assets/img/link_twitter22x.png"/>
          <img src="../../assets/img/link_twitter12x.png"/>
        </div>
        <div class="d4">
          <img src="../../assets/img/link_telegram22x.png"/>
          <img src="../../assets/img/link_telegram12x.png"/>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import {lang} from "@/tools";
  import {mixin1} from "../../tools/mixins";
  export default {
    name: 'navLeft',
    mixins: [mixin1],
    data() {
      return {
        setTime: null,
        setTimeOnly: null,
        navArr: [
          "首 页",
          "铸 币",
          "保 险 池",
          "清 算",
        ],
        exchangeRate: {
          ethUsdt: {
            unit: "ETH / USDT",
            value: 0,
          },
          nestUsdt: {
            unit: "NEST / USDT",
            value: 0,
          },
          nestEth: {
            unit: "NEST / ETH",
            value: 0,
          }
        },
        chatArr: {
          github: [
            require
          ]
        },
        navLeft: 0,
        navLeftArr: [
          'home',
          'mintage',
          'insurance',
          'clearing',
        ],
      }
    },
    mounted() {
      for (let k in this.navLeftArr) {
        if (window.location.href.indexOf(this.navLeftArr[k]) !== -1) {
          this.$store.commit('setState', {
            navLeft: parseInt(k),
          })
        }
      }
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
          //清除定时器
          clearTimeout(this.setTime);
          clearTimeout(this.setTimeOnly);
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
      async yieldFun () {},
      async loop() {
        //15秒执行一次
        // console.log('left')
        if (this.$store.state.accounts.length > 0) {
          this.$store.dispatch('initData');
        }
        clearTimeout(this.setTime);
        this.setTime = setTimeout(() => {
            this.loop();
        }, 15 * 1000);
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
      },
      onlanguagechange(type) {
        // console.log(type)
        this.$store.commit('setState', {
          languageType: type
        })
      },
      lang(key) {
        return lang(key);
      }
    },
  }

</script>

<style lang="less">
  .navLeft {
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    width: 220px;
    padding: 21px 26px;
    background: #17191C;
    z-index: 99;
    .sec1 {
      > img {
        width: 127px;
        height: 58px;
      }
    }

    .sec2 {
      width: 100%;

      .d1 {
        background: url("../../assets/img/bg_red2x.png") no-repeat left center;
        background-size: 220px 13px;
        height: 18px;
        margin: 20px -26px;
        cursor: pointer;

        .d2 {
          font-size: 14px;
          color: #E4141C;
          text-align: right;
          padding-right: 30px;
          transition: all .35s;
        }

        .d3 {
          font-size: 12px;
          color: #4C525B;
          text-align: center;
        }

      }

      .d1_1 {
        background: url("../../assets/img/bg_gray2x.png") no-repeat left center;
        background-size: 220px 13px;

        .d2 {
          color: #fff;
        }
      }

    }

    .sec3 {
      width: 100%;

      .d1 {
        background: url("../../assets/img/img_roundline.png") no-repeat left 2px;
        padding-left: 22px;
        background-size: 7px 16px;
        margin: 20px 0;
        /*cursor: pointer;*/

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

    .sec4 {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      padding: 30px;

      .d1 {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        margin-bottom: 30px;
      }

      .d2 {
        margin-right: 20px;
        cursor: pointer;

        img {
          width: 30px;
          height: 30px;
        }
      }

      .d3 {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
      }

      .d4 {
        cursor: pointer;

        img {
          width: 40px;
          height: 40px;
        }

        img:nth-of-type(1) {
          display: block;
        }

        img:nth-of-type(2) {
          display: none;
        }
      }

      .d4:hover {
        img:nth-of-type(1) {
          display: none;
        }

        img:nth-of-type(2) {
          display: block;
        }
      }
    }
  }
</style>
