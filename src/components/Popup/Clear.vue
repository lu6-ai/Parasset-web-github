<template>
  <!--铸币弹窗-->
  <div class="Clear">
    <van-dialog v-model="$store.state.clearShow" show-cancel-button :showConfirmButton="false"
                :showCancelButton="false" title="">
      <div class="sec1">
        <img @click="hide" class="img1" src="../../assets/img/btn_close2x.png"/>
        <div class="d2">
          确认清算
        </div>
        <div class="d1">
          <img src="../../assets/img/img_confirm2x.png"/>
        </div>
        <div class="d3">
          确认清算该债仓？
        </div>
        <div class="d4 mb10">
          <div class="d5">
            <div class="d7">清算支出</div>
            <div class="d8">-756 PUSDT</div>
          </div>
          <div class="d6">$756.00</div>
        </div>
        <div class="d4 mb10">
          <div class="d5">
            <div class="d7">预言机调用费</div>
            <div class="d8">-756 ETH</div>
          </div>
          <div class="d6">$756.00</div>
        </div>
        <div class="d4">
          <div class="d5">
            <div class="d7">清算收入</div>
            <div class="d8">-756 ETH</div>
          </div>
          <div class="d6">$756.00</div>
        </div>
        <div class="d9 mb25">
          <div class="d10">预计盈利价值</div>
          <div class="d11">$74.00</div>
        </div>
        <div class="d12">
          <button>取 消</button>
          <button class="active" disabled>确 认</button>
        </div>
      </div>
    </van-dialog>
  </div>
</template>

<script>

  export default {
    name: 'Clear',
    methods: {
      hide() {
        this.$store.commit('setState', {
          clearShow: false
        })
      }
    },
  }

</script>

<style lang="less">
  .Clear {
    letter-spacing: 3px;

    .van-dialog {
      width: 460px;
    }

    .sec1 {
      width: 460px;
      background: #1B1D21;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      padding: 0 0 20px;

      .img1 {
        width: 12px;
        height: 12px;
        cursor: pointer;
        position: absolute;
        right: 25px;
        top: 20px;
      }

      .d1 {
        img {
          width: 80px;
          height: 80px;
        }

        margin-bottom: 20px;
      }

      .d2 {
        font-size: 16px;
        color: #fff;
        width: 100%;
        height: 70px;
        line-height: 70px;
        text-align: left;
        background: url("../../assets/img/img_roundline.png") no-repeat 30px center;
        background-size: 7px 16px;
        margin-bottom: 20px;
        padding: 0 0 0 55px;
      }

      .d3 {
        font-size: 16px;
        color: #fff;
        margin-bottom: 35px;
      }

      .d4 {
        margin-bottom: 30px;
        display: flex;
        flex-direction: column;
        width: 100%;
        padding: 0 29px;
      }

      .d5 {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
      }

      .d6 {
        font-size: 12px;
        color: #fff;
        text-align: right;
      }

      .d7 {
        font-size: 12px;
        color: #4C525B;
      }

      .d8 {
        font-size: 12px;
        color: #E4141C;
      }

      .d9 {
        display: flex;
        justify-content: space-between;
        width: 100%;
        padding: 0 29px;
      }

      .d10 {
        .d7;
      }

      .d11 {
        font-size: 24px;
        color: #fff;
      }

      .d12{
        display: flex;
        justify-content: center;
        align-items: center;
        button{
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
        button.active{
          background: #431b20;
          border: solid 1px #ff3366;
        }
        button:disabled{
          background: #25282d;
          border: solid 1px #393e45;
          color: #363a41;
        }
      }

    }
  }
  @media (max-width: 768px) {
    .Clear{
      .van-dialog{
        width: 300px;
      }
      .sec1{
        width: 300px;
        .img1{
          right: 21px;
          top: 16px;
        }
        .d1{
          img{
            width: 40px;
            height: 40px;
          }
        }
        .d2{
          height: 45px;
          line-height: 45px;
          margin-bottom: 10px;
        }
        .d3{
          font-size: 11px;
          margin-bottom: 20px;
        }
        .d4{
          margin-bottom: 10px;
        }
        .d5{
          margin-bottom: 6px;
        }
        .d7,.d8,.d9,.d10{
          font-size: 10px;
        }
        .d11{
          font-size: 13px;
        }
        .d12{
          button{
            height: 40px;
            line-height: 40px;
          }
        }
      }
    }
  }
</style>
