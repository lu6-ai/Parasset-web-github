// todo wyf
const host = 'http://dapp.cxec.link/api/';
const domainName = 'http://dapp.cxec.link/';


// 资金池兑换手续费比例
const insurancePoolFee = 0.002;
let debug = true;
/* 正式环境 */
//合约地址
let pTokenFactoryAddress = '';//P资产工厂合约
let mortgagePoolAddress = '';//抵押池合约
let insurancePoolAddress = '';//保险池合约
let nestQueryAddress = '';//NEST 价格查询合约
let priceControllerAddress = '';//价格调用合约
//代币地址
let ethToken = '0x0000000000000000000000000000000000000000';
let nestToken = '';//NEST Token
let usdtToken = '';//USDT Token
let pusdtToken = '';//PUSDT Token
let pethToken = '';//PETH Token
let infuraId = 'fc64f828e2054f30b145122e34dff479';//connectWallet 需要用到
let openUrlSLD = '';

// if (debug) {
//   /* 测试环境 */
// //合约地址
//   pTokenFactoryAddress = '0xe635F9d3e3EFE67Ad42898F38d2E373270CD58c3';//P资产工厂合约
//   mortgagePoolAddress = '0x3048bC3cd8dbCE68c7b4E6D5E0c117bD2885322D';//抵押池合约
//   insurancePoolAddress = '0xe0bc8c4f65f08ab71437bdA1f261d9E6A96A6F66';//保险池合约
//   nestQueryAddress = '0xbF6dBeF11649fa1b55f850fd003ff4c3B4E5C025';//NEST 价格合约
//   priceControllerAddress = '0x32ED66917687131f3852Fc64A638b8e8D9f3b5aa';//价格调用合约
// //代币地址
//   ethToken = '0x0000000000000000000000000000000000000000';
//   nestToken = '0xd791228a2eeb931739A5faC4a41af55fA194E08E';//NEST Token
//   usdtToken = '0x955702776C7624f3EF4B49d6900946ED4f403d9A';//USDT Token
//   pusdtToken = '0xffaa58c0bc5069E19FcCa94aDb70EA63578F9860';//PUSDT Token
//   pethToken = '0x64B100bDA18c2A5AF4A370547adaB2712Dcf41dD';//PETH Token
//   infuraId = "fc64f828e2054f30b145122e34dff479";
//   openUrlSLD = 'ropsten.';
// }

if (debug) {
  /* 测试环境 */
//合约地址
  pTokenFactoryAddress = '0xF35Fda2a25C955c0362ee28b52261C91bc2D516d';//P资产工厂合约
  mortgagePoolAddress = '0x2b64031944149dF84ba8110A176DdE0F769B465c';//抵押池合约
  insurancePoolAddress = '0x2FF1A766C231E878b1c20ed91Ca57a29D0A91Cb6';//保险池合约
  nestQueryAddress = '0x50C3c947Fc7A1ce4F51c514501B98D23232e416C';//NEST 价格合约
  priceControllerAddress = '0x272627AF55856c3aC9d4015146a57411Cdcf5f61';//价格调用合约
//代币地址
  ethToken = '0x0000000000000000000000000000000000000000';
  nestToken = '0x5f24106d9768E2D124e16aF8713907c9F7Cf73F4';//NEST Token
  usdtToken = '0x3d329E93491867B8B448862dC0A031D7b2046aC4';//USDT Token
  pusdtToken = '0x4db49cef7494960D65d838d4b4ea19b87919D225';//PUSDT Token
  pethToken = '0x57eE2A4Ee1454A9825c5664085bf402E5f574c80';//PETH Token
  infuraId = "fc64f828e2054f30b145122e34dff479";
  openUrlSLD = 'rinkeby.';
}

// 资金对
const tokenList = {
  eth: {
    symbol: 'ETH',
    pSymbol: 'PETH',
    icon: require('./assets/img/icon_eth.png'),
    pIcon: require('./assets/img/icon_peth.png')
  },
  usdt: {
    symbol: 'USDT',
    pSymbol: 'PUSDT',
    icon: require('./assets/img/icon_usdt.png'),
    pIcon: require('./assets/img/icon_pusdt.png')
  }
}

export {
  host,
  domainName,
  pTokenFactoryAddress,
  mortgagePoolAddress,
  insurancePoolAddress,
  nestQueryAddress,
  priceControllerAddress,
  ethToken,
  nestToken,
  usdtToken,
  pusdtToken,
  pethToken,
  infuraId,
  insurancePoolFee,
  tokenList,
  openUrlSLD,
}
