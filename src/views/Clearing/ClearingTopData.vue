<template>
  <div class="top_data_content">
      <div class="data_info">
          <ul class="fz0">
              <li class="dib">
                  <h3>$141,507,056.023</h3>
                  <p>{{lang('a_daiqingsuanzichanjiazhi')}}</p>
              </li>
              <li class="dib">
                  <h3>$141,507,056.023</h3>
                  <p>{{lang('a_yiqingsuanzichanjiazhi')}}</p>
              </li>
              <li class="dib">
                  <h3>$141,507,056.023</h3>
                  <p>{{lang('a_leijiqingsuanfeiyongjiazhi')}}</p>
              </li>
              <li class="dib">
                  <h3>$141,507,056.023</h3>
                  <p>{{lang('a_leijiqingsuanshouyi')}}</p>
              </li>
          </ul>
      </div>
  </div>
</template>
<script>
    import { lang } from "../../tools";
  export default {
    name: 'ClearingTopData',
    components: {},
    data() {
      return {
        userIndex: {}
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
  .top_data_content {
      .data_info{
          white-space: normal;word-break: break-word;
          padding: 50px 0 30px;
          ul{text-align: center;}
          li{background: url("../../assets/img/logo_blur.png") no-repeat center center;padding: 40px 30px 30px;min-height: 149px;min-width: 260px;}
          li h3{font-size: 28px;font-weight: bold;color: #E4141C;margin-bottom: 10px;}
          li p{font-size: 14px;font-weight: 400;color: #fff;}
      }
  }
  @media (max-width: 768px){
      .top_data_content{
          .data_info{
              padding: 0 0 30px;
              li{padding: 40px 0 0;}
          }
      }
  }
</style>
