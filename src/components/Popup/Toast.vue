<template>
  <!--铸币弹窗-->
  <div class="Toast">
    <van-dialog v-model="$store.state.toastShow" show-cancel-button :showConfirmButton="false"
                :showCancelButton="false" title="">
      <div class="sec1">
        <img @click="hide" class="imgClose" src="../../assets/img/btn_close2x.png"/>
        <div v-if="$store.state.toastShowType === 0">
          <div class="d1">
            <img src="../../assets/img/img_loading2x.png"/>
          </div>
          <div class="d2">
            {{lang('a_querenzhong')}}...
          </div>
          <div class="d3">
            <button @click="hide">
              {{lang('a_haode')}}
            </button>
          </div>
        </div>
        <div v-if="$store.state.toastShowType === 1">
          <div class="d1">
            <img class="img1" src="../../assets/img/icon_broadcast2x.png"/>
          </div>
          <div class="d2 mb50">
            {{lang('a_jiaoyiguangbozhong')}}...
          </div>
          <div class="d3" v-show="$store.state.transactionHash !== ''">
            <a :href="'https://'+ openUrlSLD +'etherscan.io/tx/' + $store.state.transactionHash" target="_blank">
              <button>
                {{lang('a_chakanjiaoyi')}}
              </button>
            </a>
          </div>
        </div>
        <div v-if="$store.state.toastShowType === 2">
          <div class="d1">
            <img class="img2" src="../../assets/img/icon_success2x.png"/>
          </div>
          <div class="d2 mb50">
            {{lang('a_jiaoyichenggong')}}
          </div>
          <div class="d3" v-show="$store.state.transactionHash !== ''">
            <a :href="'https://'+ openUrlSLD +'etherscan.io/tx/' + $store.state.transactionHash" target="_blank">
              <button>
                {{lang('a_chakanjiaoyi')}}
              </button>
            </a>
          </div>
        </div>
        <div v-if="$store.state.toastShowType === 3">
          <div class="d1">
            <img class="img2" src="../../assets/img/icon_fail2x.png"/>
          </div>
          <div class="d2 mb50">
            {{lang('a_jiaoyishibai')}}
          </div>
          <div class="d3" v-show="$store.state.transactionHash !== ''">
            <a :href="'https://'+ openUrlSLD +'etherscan.io/tx/' + $store.state.transactionHash" target="_blank">
              <button>
                {{lang('a_chakanjiaoyi')}}
              </button>
            </a>
          </div>
        </div>
        <div v-if="$store.state.toastShowType === 4">
          <div class="d1">
            <img class="img2" src="../../assets/img/icon_cancel2x.png"/>
          </div>
          <div class="d2 mb50">
            {{lang('a_jiaoyiquxiao')}}
          </div>
          <div class="d3">
            <button @click="hide">
              {{lang('a_haode')}}
            </button>
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
  } from "../../tools";
  import {openUrlSLD} from '../../config'

  export default {
    data(){
      return{
        openUrlSLD,
      }
    },
    name: 'Toast',
    methods: {
      lang(key){
        return lang(key);
      },
      hide() {
        this.$store.commit('setState', {
          toastShow: false
        })
      }
    },
  }

</script>

<style lang="less">
  .Toast {
    letter-spacing: 3px;

    .van-dialog {
      width: 380px;
    }

    .sec1 {
      width: 380px;
      background: #1B1D21;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      padding: 40px 0 20px;

      .imgClose {
        width: 12px;
        height: 12px;
        cursor: pointer;
        position: absolute;
        right: 25px;
        top: 20px;
      }

      .d1 {
        img {
          width: 90px;
          height: 90px;
        }

        .img1 {
          width: 120px;
          height: 84px;
        }

        .img2 {
          width: 120px;
          height: 100px;
        }

        margin-bottom: 20px;
      }

      .d2 {
        color: #4C525B;
        font-size: 14px;
        text-align: center;
        margin-bottom: 50px;
      }

      .d3 {
        button {
          width: 120px;
          height: 50px;
          border: solid 1px #E4141C;
          border-radius: 4px;
          color: #fff;
          background: #431b20;
          font-size: 14px;
          text-align: center;
          line-height: 50px;
          cursor: pointer;
          letter-spacing: 2px;
        }
      }
    }

  }

  @media (max-width: 768px) {
    .Toast {
      .van-dialog {
        width: 300px;
      }

      .sec1 {
        width: 300px;

        .d1 {
          display: flex;
          justify-content: center;
          align-items: center;

          img {
            width: 45px;
            height: 45px;
          }

          .img1 {
            width: 60px;
            height: 42px;
          }

          .img2 {
            width: 60px;
            height: 50px;
          }

          margin-bottom: 20px;
        }

        .d2 {
          margin-bottom: 25px;
        }

        .d3 {
          button {
            height: 40px;
            line-height: 40px;
            font-size: 13px;
          }
        }
      }
    }
  }
</style>
