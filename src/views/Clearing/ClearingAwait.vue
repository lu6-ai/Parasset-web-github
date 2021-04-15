<template>
  <div class="await_content">
      <div class="data_title">
          <ul class="fz0">
              <li class="dib li1">{{lang('a_zhaicang')}}</li>
              <li class="dib li2">{{lang('a_diyabiaodizichanshuliang')}}</li>
              <li class="dib li3">{{lang('a_diyalv')}}</li>
              <li class="dib li4">{{lang('a_qingsuanjiadiyalv')}}</li>
              <li class="dib li5">{{lang('a_yujiqingsuanchanghuanzhaiwu')}}</li>
              <li class="dib li6" @mouseover="showPopover1=true" @mouseout="showPopover1=false">

                  <van-popover v-model="showPopover1" theme="dark">
                      <div class="pop_info" >{{lang('a_qingsuanqipaop1')}}</div>
                      <template #reference>
                          <span class="dotted">{{lang('a_yuyanjidiaoyongfei')}}</span>
                      </template>
                  </van-popover>

              </li>
              <li class="dib li7">{{lang('a_qingsuanshouru')}}</li>
              <li class="dib li8">{{lang('a_yujiyinglijiazhi')}}</li>
              <li class="dib li9">{{lang('a_zhuangtai')}}</li>
              <li class="dib li10">{{lang('a_caozuo')}}</li>
          </ul>
      </div>
      <div class="data_info">
          <ul class="fz0 ul_info">
              <li class="dib li1 fz0">
                  <div class="title">{{lang('a_zhaicang')}}</div>
                  <div class="info">
                      <div class="img dib fz0">
                      <img class="dib img1" src="../../assets/img/icon_eth.png">
                      <img class="dib img2" src="../../assets/img/icon_pusdt.png">
                      </div>
                      <h3 class="dib">ETH-PUSDT</h3>
                  </div>
              </li>
              <li class="dib li2">
                  <div class="title">{{lang('a_biaodizichandiyashu')}}</div>
                  <div class="info">
                      <h3>10000 NEST</h3>
                      <p>$420.00</p>
                  </div>
              </li>
              <li class="dib li3">
                  <div class="title">{{lang('a_diyalv')}}</div>
                  <div class="info">
                      <h3>71.42%</h3>
                  </div>
              </li>
              <li class="dib li4 ">
                  <div class="title">{{lang('a_qingsuanjiadiyalv')}}</div>
                  <div class="info color_purple">
                      <h3 class="color_blue">357.14 USDT | 84%</h3>
                  </div>
              </li>
              <li class="dib li5">
                  <div class="title">{{lang('a_yujiqingsuanchanghuanzhaiwu')}}</div>
                  <div class="info">
                      <h3 class="color_red">-756 NEST</h3>
                      <p>$420.00</p>
                  </div>
              </li>
              <li class="dib li6">
                  <div class="title">{{lang('a_yuyanjidiaoyongfei')}}</div>
                  <div class="info">
                      <h3 class="color_red">-0.01 ETH</h3>
                      <p>$10.00</p>
                  </div>
              </li>
              <li class="dib li7">
                  <div class="title">{{lang('a_qingsuanshouru')}}</div>
                  <div class="info">
                      <h3 class="color_blue">+1 ETH</h3>
                      <p>$756.00</p>
                  </div>
              </li>
              <li class="dib li8">
                  <div class="title">{{lang('a_yujiyinglijiazhi')}}</div>
                  <div class="info">
                      <h3>$74.00</h3>
                  </div>
              </li>
              <li class="dib li9">
                  <div class="title">{{lang('a_zhuangtai')}}</div>
                  <div class="info">
                    <h3 class="color_red">{{lang('a_daiqingsuan')}}</h3>
                  </div>
              </li>
              <li class="dib li10">
                  <div class="title">{{lang('a_caozuo')}}</div>
                  <div class="info fz0">
                      <div class="but dib">
                          <button>{{lang('a_qingsuan')}}</button>
                      </div>
                  </div>
              </li>
          </ul>
      </div>
  </div>
</template>
<script>
    import { lang } from "../../tools";
  export default {
    name: 'ClearingAwait',
    components: {},
    data() {
      return {
          showPopover1: false,
      }
    },
    created() {
    },
    methods: {
        lang(key){
            return lang(key);
        },
      getData() {

      },
    },
  }

</script>

<style lang="less">
  .await_content {
      line-height: 1.7;
      padding: 20px 0 80px;
      ul{text-align: center;}
      li{width: 7%;margin: 0 1%;}
      .li1{width: 17%;}
      .dotted{border-bottom: 1px dotted #4C525B;padding-bottom: 2px;}
      .data_title{
          font-size: 14px;
          color: #4C525B;
          padding: 20px 0;
          li{vertical-align: top;}
      }
      .data_info{
          font-size: 12px;
          color: #fff;
          font-weight: bold;
          h3,p,span{font-size: 12px;}
          ul{padding: 5px 0;}
          .title{display: none;font-size: 12px;color: #4C525B;}
          li{}
          .li1{position: relative;}
          .li1 .img{margin: 5px 5px 5px 0;}
          .li1 .img1{position: relative;z-index: 2;}
          .li1 .img2{position: relative;z-index: 1; margin-left: -10px;}
          .li10{text-align: center;}
          .but{margin: 5px 0;}
          .but button{
              width: 85px;
              height: 35px;
              color: #fff;
              background: rgba(228, 20, 28, 0.2);
              border: 1px solid #E4141C;
              border-radius: 6px;
              font-size: 12px;
          }
          .color_purple{color: #A95DFF;}
          .color_blue{color: #408CFF;}
          .color_red{color: #E4141C;}
      }
  }
  @media (max-width: 768px){
      .await_content{
          ul{text-align: left;}
          li{width: 33.33%;vertical-align: top;margin: 0;}
          li.li1{width: 100%;}
          li.li10{width: 100%;}
          li.li2,li.li5,li.li8{width: 40%;}
          li.li3,li.li6,li.li9{width: 40%;}
          li.li4,li.li7{width: 20%;}
          .data_title{display: none;}
          .data_info{
              .title{display: block;margin: 10px 0;}
              li.li1 .title,li.li10 .title{display: none;}
              li.li10{padding: 20px 0;}
              .but button{
                  width: 100px;
                  height: 40px;
                  color: #E4141C;
                  font-size: 14px;
              }
          }
      }
  }
</style>
