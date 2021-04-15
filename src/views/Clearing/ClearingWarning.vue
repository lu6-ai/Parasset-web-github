<template>
    <div class="warning_content">
        <div class="data_title">
            <ul class="fz0">
                <li class="dib li1">{{lang('a_zhaicang')}}</li>
                <li class="dib li2">{{lang('a_biaodizichandiyashu')}}</li>
                <li class="dib li3">{{lang('a_pingxingzichanzhubishu')}}</li>
                <li class="dib li4">{{lang('a_wendingfei')}}</li>
                <li class="dib li5">{{lang('a_diyalv')}}</li>
                <li class="dib li6">{{lang('a_qingsuanjiadiyalv')}}</li>
                <li class="dib li7">{{lang('a_zhuangtai')}}</li>
                <li class="dib li8">{{lang('a_caozuo')}}</li>
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
                    <div class="title">{{lang('a_pingxingzichanzhubishu')}}</div>
                    <div class="info">
                        <h3>294 PUSDT</h3>
                        <p>$294.00</p>
                    </div>
                </li>
                <li class="dib li4">
                    <div class="title">{{lang('a_wendingfei')}}</div>
                    <div class="info">
                        <h3>6 PUSDT</h3>
                    </div>
                </li>
                <li class="dib li5">
                    <div class="title">{{lang('a_diyalv')}}</div>
                    <div class="info">
                        <h3>71.42%</h3>
                    </div>
                </li>
                <li class="dib li6 ">
                    <div class="title">{{lang('a_qingsuanjiadiyalv')}}</div>
                    <div class="info color_red">
                        <h3>357.14 USDT | 84%</h3>
                    </div>
                </li>
                <li class="dib li7">
                    <div class="title">{{lang('a_zhuangtai')}}</div>
                    <div class="info ">
                        <h3 class="color_red">{{lang('a_jiankong')}}</h3>
                    </div>
                </li>
                <li class="dib li8">
                    <div class="title">{{lang('a_caozuo')}}</div>
                    <div class="info fz0">
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import { lang } from "../../tools";
    export default {
        name: 'ClearingWarning',
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
    .warning_content {
        line-height: 1.7;
        padding: 20px 0 80px;
        ul{text-align: center;}
        li{width: 10%;margin:0 1%}
        .li1{width: 14%;}
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
            .but{margin: 5px 0;}
            .but span{padding: 0 10px;}
            .color_purple{color: #A95DFF;}
            .color_blue{color: #408CFF;}
            .color_red{color: #E4141C;}
        }
    }
    @media (max-width: 768px){
        .warning_content{
            ul{text-align: left;}
            li{width: 33.33%;vertical-align: top;margin: 0;}
            li.li1{width: 100%;}
            li.li8{width: 100%;}
            li.li2,li.li5{width: 40%;}
            li.li3,li.li6{width: 40%;}
            li.li4,li.li7{width: 20%;}
            .data_title{display: none;}
            .data_info{
                .title{display: block;margin: 10px 0;}
                li.li1 .title,li.li8 .title{display: none;}
                li.li8{padding: 10px 0;}
                li.li8 .but{width: 50%;}
                .but_left{}
                .but_right{text-align: right;}
            }
        }
    }
</style>
