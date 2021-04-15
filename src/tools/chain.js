import Web3 from 'web3';
import 'vant/lib/toast/style';
import Toast from "vant/lib/toast";
import store from "../store";

import abiERC20 from './abiERC20';
import abiPTokenFactory from './abiPTokenFactory';
import abiPToken from './abiPToken';
import abiMortgagePool from './abiMortgagePool';
import abiInsurancePool from './abiInsurancePool';
import abiNestQuery from './abiNestQuery';
import abiPriceController from './abiPriceController';
import {connectWallet, connectMetaMask} from './walletConnectTools'
import {
  BigNumber,
  BigNumberStr,
  BigNumberMul,
  BigNumberDiv,
  BigNumberAdd,
  BigNumberSub,
  setUnit
} from './index.js'
import {
  pTokenFactoryAddress,
  mortgagePoolAddress,
  insurancePoolAddress,
  nestQueryAddress,
  priceControllerAddress,
  ethToken,
  nestToken,
  usdtToken,
  pusdtToken,
  pethToken, default as config,
} from "../config"

const initWeb3hooks = async (type) => {
  if (type === 0) {
    await connectMetaMask();
    await initParams();
    store.dispatch("initData");
  } else {
    await connectWallet();
  }
};

const initWeb3 = async (type) => {
  try {
    await initWeb3hooks(type);
    // localStorage.setItem('accountsType',type);
  } catch (e) {
    Toast.fail(e)
  }
}
let account = localStorage.getItem('accounts');
if (account) {
  console.log('refresh')
  initWeb3(0)
}
const initParams = async () => {
  const ethereum = window.ethereum;
  window.globalWeb3 = new Web3(ethereum);
  // console.log('连接成功')
  // window.pledgeContract1 = await new window.globalWeb3.eth.Contract(abiPledge1, pledgeAddress1);
  // window.miningBeeInfoAddressContract = await new window.globalWeb3.eth.Contract(abiMiningBeeInfoAddress, miningBeeInfoAddress);//蜜蜂信息合约 查询BEE流通总量
  window.pTokenFactoryContract = await new window.globalWeb3.eth.Contract(abiPTokenFactory, pTokenFactoryAddress);//P资产工厂合约
  window.pTokenContract = await new window.globalWeb3.eth.Contract(abiPToken, pTokenFactoryAddress);//P资产工厂合约
  window.mortgagePoolContract = await new window.globalWeb3.eth.Contract(abiMortgagePool, mortgagePoolAddress);//抵押池合约
  window.insurancePoolContract = await new window.globalWeb3.eth.Contract(abiInsurancePool, insurancePoolAddress);//保险池合约
  window.nestQueryContract = await new window.globalWeb3.eth.Contract(abiNestQuery, nestQueryAddress);//NEST 价格合约
  window.priceControllerContract = await new window.globalWeb3.eth.Contract(abiPriceController, priceControllerAddress);//NEST 价格合约
  window.nestTokenContract = await new window.globalWeb3.eth.Contract(abiERC20, nestToken);//nest 代币 抵押资产
  window.usdtTokenContract = await new window.globalWeb3.eth.Contract(abiERC20, usdtToken);//usdt 代币 标的资产
  window.pusdtTokenContract = await new window.globalWeb3.eth.Contract(abiPToken, pusdtToken);//pusdt 代币 平行资产
  window.pethTokenContract = await new window.globalWeb3.eth.Contract(abiPToken, pethToken);//peth 代币 平行资产
};

//债仓页  新增铸币
// mortgageToken:抵押资产地址
// pToken:p资产地址
// amount:新增铸币数量
// 注意：mortgageToken为0X0时，抵押资产为ETH
const increaseCoinageDebt = (account, mortgageTokenType, pTokenType, amount, costFee) => {
  return new Promise(async (resolve, reject) => {
    try {
      Toast.loading({
        duration: 0,
      });
      let amount1 = BigNumberMul(amount, Math.pow(10, 18));
      let value = BigNumberMul(costFee, Math.pow(10, 18));
      // console.log(amount);
      let pToken = '';
      let mortgageToken = '';
      if (mortgageTokenType == 'eth') {
        mortgageToken = ethToken;
        // value = BigNumberMul(amount*1+costFee*1,Math.pow(10,18));
      } else if (mortgageTokenType == 'nest') {
        mortgageToken = nestToken;
      }
      if (pTokenType == 'peth') {
        pToken = pethToken;
      } else if (pTokenType == 'pusdt') {
        pToken = pusdtToken;
      }
      console.log(mortgageToken, pToken, amount1, value, mortgageTokenType, pTokenType);
      const rs = await window.mortgagePoolContract.methods.increaseCoinage(mortgageToken, pToken, amount1).send({
        from: account,
        value: value
      });
      console.log(rs);
      Toast.clear();
      resolve(rs);
    } catch (e) {
      Toast.clear();
      reject(e);
    }
  });
};
//债仓页  减少铸币
// mortgageToken:抵押资产地址
// pToken:p资产地址
// amount:减少铸币数量
// 注意：mortgageToken为0X0时，抵押资产为ETH
const reducedCoinageDebt = (account, mortgageTokenType, pTokenType, amount, costFee) => {
  return new Promise(async (resolve, reject) => {
    try {
      Toast.loading({
        duration: 0,
      });
      let amount1 = BigNumberMul(amount, Math.pow(10, 18));
      let value = BigNumberMul(costFee, Math.pow(10, 18));
      // console.log(amount);
      let pToken = '';
      let mortgageToken = '';
      if (mortgageTokenType == 'eth') {
        mortgageToken = ethToken;
        // value = BigNumberMul(amount*1+costFee*1,Math.pow(10,18));
      } else if (mortgageTokenType == 'nest') {
        mortgageToken = nestToken;
      }
      if (pTokenType == 'peth') {
        pToken = pethToken;
      } else if (pTokenType == 'pusdt') {
        pToken = pusdtToken;
      }
      console.log(mortgageToken, pToken, amount1, value, mortgageTokenType, pTokenType);
      const rs = await window.mortgagePoolContract.methods.reducedCoinage(mortgageToken, pToken, amount1).send({
        from: account,
        value: value
      });
      console.log(rs);
      Toast.clear();
      resolve(rs);
    } catch (e) {
      Toast.clear();
      reject(e);
    }
  });
};
//债仓页  新增抵押
// mortgageToken:抵押资产地址
// pToken:p资产地址
// amount:抵押资产数量
// 注意：mortgageToken为0X0时，抵押资产为ETH
const supplementDebt = (account, mortgageTokenType, pTokenType, amount, costFee) => {
  return new Promise(async (resolve, reject) => {
    try {
      Toast.loading({
        duration: 0,
      });
      let amount1 = BigNumberMul(amount, Math.pow(10, 18));
      let value = BigNumberMul(costFee, Math.pow(10, 18));
      // console.log(amount);
      let pToken = '';
      let mortgageToken = '';
      if (mortgageTokenType == 'eth') {
        mortgageToken = ethToken;
        value = BigNumberMul(amount * 1 + costFee * 1, Math.pow(10, 18));
      } else if (mortgageTokenType == 'nest') {
        mortgageToken = nestToken;
      }
      if (pTokenType == 'peth') {
        pToken = pethToken;
      } else if (pTokenType == 'pusdt') {
        pToken = pusdtToken;
      }
      console.log(mortgageToken, pToken, amount1, value, mortgageTokenType, pTokenType);
      const rs = await window.mortgagePoolContract.methods.supplement(mortgageToken, pToken, amount1).send({
        from: account,
        value: value
      });
      console.log(rs);
      Toast.clear();
      resolve(rs);
    } catch (e) {
      Toast.clear();
      reject(e);
    }
  });
};
//债仓页  提取资产
// mortgageToken:抵押资产地址
// pToken:p资产地址
// amount:抵押资产数量
// 注意：mortgageToken为0X0时，抵押资产为ETH
const decreaseDebt = (account, mortgageTokenType, pTokenType, amount, costFee) => {
  return new Promise(async (resolve, reject) => {
    try {
      Toast.loading({
        duration: 0,
      });
      let amount1 = BigNumberMul(amount, Math.pow(10, 18));
      let value = BigNumberMul(costFee, Math.pow(10, 18));
      // console.log(amount);
      let pToken = '';
      let mortgageToken = '';
      if (mortgageTokenType == 'eth') {
        mortgageToken = ethToken;
        // value = BigNumberMul(amount*1+costFee*1,Math.pow(10,18));
      } else if (mortgageTokenType == 'nest') {
        mortgageToken = nestToken;
      }
      if (pTokenType == 'peth') {
        pToken = pethToken;
      } else if (pTokenType == 'pusdt') {
        pToken = pusdtToken;
      }
      console.log(mortgageToken, pToken, amount1, value, mortgageTokenType, pTokenType);
      const rs = await window.mortgagePoolContract.methods.decrease(mortgageToken, pToken, amount1).send({
        from: account,
        value: value
      });
      console.log(rs);
      Toast.clear();
      resolve(rs);
    } catch (e) {
      Toast.clear();
      reject(e);
    }
  });
};
// 债仓页 计算稳定费
// parassetAssets:债务资产数量
// blockHeight:上次操作区块
// rate:抵押率
const getFeeDebt = (account, parassetAssets, blockHeight, rate) => {
  return new Promise(async (resolve, reject) => {
    try {
      parassetAssets = BigNumberMul(parassetAssets, Math.pow(10, 18));
      // rate = BigNumberMul(rate, Math.pow(10, 18));
      // console.log('计算稳定费',parassetAssets, blockHeight, rate)
      let rs1 = await window.mortgagePoolContract.methods.getFee(parassetAssets, blockHeight, rate).call({from: account});
      resolve(rs1);
    } catch (e) {
      reject(e);
    }
  });
};
// 债仓页 计算K线
// mortgageAssets:抵押资产数量
// parassetAssets:债务资产数量
// tokenPrice:抵押资产价格数量
// pTokenPrice:标的资产价格数量
const getKLineDebt = (account, mortgageAssets, parassetAssets, tokenPrice, pTokenPrice) => {
  return new Promise(async (resolve, reject) => {
    try {
      mortgageAssets = BigNumberMul(mortgageAssets, Math.pow(10, 18));
      parassetAssets = BigNumberMul(parassetAssets, Math.pow(10, 18));
      tokenPrice = BigNumberMul(tokenPrice, Math.pow(10, 18));
      pTokenPrice = BigNumberMul(pTokenPrice, Math.pow(10, 18));
      let rs1 = await window.mortgagePoolContract.methods.getKLine(mortgageAssets, parassetAssets, tokenPrice, pTokenPrice).call({from: account});
      resolve(rs1);
    } catch (e) {
      reject(e);
    }
  });
};
// 债仓页 计算抵押率
// mortgageAssets:抵押资产数量
// parassetAssets:债务资产数量
// tokenPrice:抵押资产价格数量
// pTokenPrice:p资产价格数量
const getMortgageRateDebt = (account, mortgageAssets, parassetAssets, tokenPrice, pTokenPrice) => {
  return new Promise(async (resolve, reject) => {
    try {
      // console.log('计算抵押率', account, mortgageAssets, parassetAssets, tokenPrice, pTokenPrice);
      mortgageAssets = BigNumberMul(mortgageAssets, Math.pow(10, 18));
      parassetAssets = BigNumberMul(parassetAssets, Math.pow(10, 18));
      tokenPrice = BigNumberMul(tokenPrice, Math.pow(10, 18));
      pTokenPrice = BigNumberMul(pTokenPrice, Math.pow(10, 18));
      let rs1 = await window.mortgagePoolContract.methods.getMortgageRate(mortgageAssets, parassetAssets, pTokenPrice,tokenPrice).call({from: account});
      resolve(rs1);
    } catch (e) {
      reject(e);
    }
  });
};
// 债仓页 获取当前债仓实时数据
// mortgageToken:抵押资产地址
// pToken:平行资产地址
// tokenPrice:抵押资产价格数量
// uTokenPrice:标的资产价格数量
// maxRateNum:计算参照的最大抵押率
// owner:查询用户地址
// 返回：稳定费、抵押率、最大可减少抵押资产数量、最大可新增铸币数量
const getInfoRealTime = (account, mortgageTokenType, pTokenType, priceObj, maxRateNum) => {
  return new Promise(async (resolve, reject) => {
    try {
      // console.log(mortgageTokenType, pTokenType, priceObj, maxRateNum,account);
      // console.log(amount);
      let tokenPrice = 0;
      let uTokenPrice = 0;
      let pToken = '';
      let mortgageToken = '';
      if (mortgageTokenType == 'eth') {
        mortgageToken = ethToken;
        tokenPrice = BigNumberMul(priceObj.eth_eth_price, Math.pow(10, 18),0);
      } else if (mortgageTokenType == 'nest') {
        mortgageToken = nestToken;
        tokenPrice = BigNumberMul(priceObj.eth_nest_price, Math.pow(10, 18),0);
      }
      if (pTokenType == 'peth') {
        pToken = pethToken;
        uTokenPrice = BigNumberMul(priceObj.eth_eth_price, Math.pow(10, 18),0);
      } else if (pTokenType == 'pusdt') {
        pToken = pusdtToken;
        uTokenPrice = BigNumberMul(priceObj.eth_price, Math.pow(10, 6),0);
      }
      // console.log(mortgageToken, pToken, uTokenPrice, tokenPrice, maxRateNum,account);
      let rs1 = await window.mortgagePoolContract.methods.getInfoRealTime(mortgageToken, pToken, tokenPrice, uTokenPrice, maxRateNum,account).call({from: account});
      resolve(rs1);
    } catch (e) {
      reject(e);
    }
  });
};
/*债仓  查看债仓数据 */
const getLedger = (account, pToken, mortgageToken) => {
  return new Promise(async (resolve, reject) => {
    try {
      let eth_pusdt = await window.mortgagePoolContract.methods.getLedger(pusdtToken, ethToken,account).call({from: account});
      let nest_pusdt = await window.mortgagePoolContract.methods.getLedger(pusdtToken, nestToken,account).call({from: account});
      let nest_peth = await window.mortgagePoolContract.methods.getLedger(pethToken, nestToken,account).call({from: account});
      let obj = {};
      obj.eth_pusdt = eth_pusdt;
      obj.nest_pusdt = nest_pusdt;
      obj.nest_peth = nest_peth;
      resolve(obj);
    } catch (e) {
      reject(e);
    }
  });
};
/*铸币 查看最高抵押率 */
const getMaxRate = (account, mortgageTokenType) => {
  return new Promise(async (resolve, reject) => {
    try {
      let mortgageToken = '';
      if (mortgageTokenType == 'eth') {
        mortgageToken = ethToken;
      } else if (mortgageTokenType == 'nest') {
        mortgageToken = nestToken;
      }
      let rs1 = await window.mortgagePoolContract.methods.getMaxRate(mortgageToken).call({from: account});
      rs1 = BigNumberStr(rs1,18)*100;
      resolve(rs1);
    } catch (e) {
      reject(e);
    }
  });
};
/*铸币 预言机调用费 */
// mortgageToken:抵押资产地址
// underlyingToken:标的资产地址
const getPriceFee = (account) => {
  return new Promise(async (resolve, reject) => {
    try {
      let eth_pusdt = await window.priceControllerContract.methods.getPriceFee(ethToken, usdtToken).call({from: account});
      let nest_pusdt = await window.priceControllerContract.methods.getPriceFee(nestToken, usdtToken).call({from: account});
      let nest_peth = await window.priceControllerContract.methods.getPriceFee(nestToken, ethToken).call({from: account});
      var obj = {};
      obj.eth_pusdt = BigNumberStr(eth_pusdt, 18, 2);
      obj.nest_pusdt = BigNumberStr(nest_pusdt, 18, 2);
      obj.nest_peth = BigNumberStr(nest_peth, 18, 2);
      resolve(obj);
    } catch (e) {
      reject(e);
    }
  });
};
/*铸币 预言机调用费 单个 */
const getPriceFeeSingle = (account, type) => {
  return new Promise(async (resolve, reject) => {
    try {
      // console.log('type', type)
      let rs1 = 0.01;
      if (type == 'eth_pusdt') {
        rs1 = await window.priceControllerContract.methods.getPriceFee(ethToken, usdtToken).call({from: account});
        rs1 = BigNumberStr(rs1, 18, 2);
      } else if (type == 'nest_pusdt') {
        rs1 = await window.priceControllerContract.methods.getPriceFee(nestToken, usdtToken).call({from: account});
        rs1 = BigNumberStr(rs1, 18, 2);
      } else if (type == 'nest_peth') {
        rs1 = await window.priceControllerContract.methods.getPriceFee(nestToken, ethToken).call({from: account});
        rs1 = BigNumberStr(rs1, 18, 2);
      }
      resolve(rs1);
    } catch (e) {
      reject(e);
    }
  });
};
/*铸币 价格换算查询合约 */
const getLatestPrice = (account) => {
  return new Promise(async (resolve, reject) => {
    try {
      let eth_price = await window.nestQueryContract.methods.latestPrice(usdtToken).call({from: account});
      let eth_nest_price = await window.nestQueryContract.methods.latestPrice(nestToken).call({from: account});
      var obj = {};
      // console.log('price',eth_price,eth_nest_price)
      obj.eth_price = BigNumberStr(eth_price.avgPrice,6);
      obj.eth_nest_price = BigNumberStr(eth_nest_price.avgPrice,18);

      // obj.eth_price = 2;
      // obj.eth_nest_price = 3;
      obj.eth_eth_price = 1;
      obj.nest_eth_price = 1/obj.eth_nest_price;
      //对u的价格
      obj.usdt_price = 1;
      obj.nest_price = obj.eth_price/obj.eth_nest_price;
      obj.pusdt_price = 1;
      obj.peth_price = obj.eth_price;
      //store.js使用 eth本位计算
      obj.usdt = obj.eth_price;
      obj.nest = obj.eth_nest_price;
      // console.log('price',obj)
      resolve(obj);
    } catch (e) {
      reject(e);
    }
  });
};
/* 首页数据 抵押资产总价值 平行资产总价值 保险池流动性总价值 */
const getHomeTotal = (account) => {
  return new Promise(async (resolve, reject) => {
    try {
      let rs1 = await window.pusdtTokenContract.methods.balanceOf(store.state.accounts[0]).call({from: account});
      let obj = {};
      obj.pledgeTotal = rs1;
      obj.parallelTotal = rs1;
      obj.poolTotal = rs1;
      resolve(obj);
    } catch (e) {
      reject(e);
    }
  });
};
/* 首页数据 平行资产总供应 */
const getHomeTotalSupply = (account) => {
  return new Promise(async (resolve, reject) => {
    try {
      let pusdt = await window.pusdtTokenContract.methods.totalSupply().call({from: account});
      let peth = await window.pethTokenContract.methods.totalSupply().call({from: account});
      let obj = {};
      obj.pusdt = BigNumberStr(pusdt,18,6);
      obj.peth = BigNumberStr(peth,18,6);
      resolve(obj);
    } catch (e) {
      reject(e);
    }
  });
};

/* blanceOfMintage 铸币页 标的资产余额 */
const blanceOfMintage = (account) => {
  return new Promise(async (resolve, reject) => {
    try {
      let eth = await window.globalWeb3.eth.getBalance(account);
      let nest = await window.nestTokenContract.methods.balanceOf(account).call({from: account});
      let peth = await window.pethTokenContract.methods.balanceOf(account).call({from: account});
      let pusdt = await window.pusdtTokenContract.methods.balanceOf(account).call({from: account});
      let obj = {};
      obj.eth = BigNumberStr(eth, 18);
      obj.nest = BigNumberStr(nest, 18);
      obj.peth = BigNumberStr(peth, 18);
      obj.pusdt = BigNumberStr(pusdt, 18);
      // obj.parallelTotal = BigNumberStr(rs2,8);
      // obj.poolTotal = BigNumberStr(rs3,18);
      resolve(obj);
    } catch (e) {
      reject(e);
    }
  });
};
//铸币页  eth铸币
const coinMintage = (account, mortgageTokenType, pTokenType, amount, rate, costFee) => {
  return new Promise(async (resolve, reject) => {
    try {
      Toast.loading({
        duration: 0,
      });
      let amount1 = BigNumberMul(amount, Math.pow(10, 18));
      let value = BigNumberMul(costFee, Math.pow(10, 18));
      // console.log(amount);
      let pToken = '';
      let mortgageToken = '';
      if (mortgageTokenType == 'eth') {
        mortgageToken = ethToken;
        value = BigNumberMul(amount * 1 + costFee * 1, Math.pow(10, 18));
      } else if (mortgageTokenType == 'nest') {
        mortgageToken = nestToken;
      }
      if (pTokenType == 'peth') {
        pToken = pethToken;
      } else if (pTokenType == 'pusdt') {
        pToken = pusdtToken;
      }
      // console.log(mortgageToken, pToken, amount1, rate, value, mortgageTokenType, pTokenType);
      const rs = await window.mortgagePoolContract.methods.coin(mortgageToken, pToken, amount1, rate).send({
        from: account,
        value: value
      });
      console.log(rs);
      Toast.clear();
      resolve(rs);
    } catch (e) {
      Toast.clear();
      reject(e);
    }
  });
};
/* 铸币页  nest 查询授权额度 */
const coinAllowanceNest = (account) => {
  return new Promise(async (resolve, reject) => {
    try {
      let rs1 = 1;
      let rs2 = await window.nestTokenContract.methods.allowance(account, mortgagePoolAddress).call();
      let rs3 = await window.pusdtTokenContract.methods.allowance(account, mortgagePoolAddress).call();
      let rs4 = await window.pethTokenContract.methods.allowance(account, mortgagePoolAddress).call();
      let obj = {};
      obj.eth = rs1;
      obj.nest = rs2;
      obj.pusdt = rs3;
      obj.peth = rs4;
      // obj.parallelTotal = BigNumberStr(rs2,8);
      // obj.poolTotal = BigNumberStr(rs3,18);
      resolve(obj);
    } catch (e) {
      reject(e);
    }
  });
};
//铸币页  nest 授权
const coinApproveNest = (account) => {
  return new Promise(async (resolve, reject) => {
    try {
      Toast.loading({
        duration: 0,
      });
      const rs = await window.nestTokenContract.methods.approve(mortgagePoolAddress, "21000000000000000000000000").send({from: account});
      // console.log('授权usdt',rs);
      Toast.clear();
      resolve(rs);
    } catch (e) {
      Toast.clear();
      reject(e);
    }
  });
};
//铸币页  nest 授权
const coinApproveNestPusdt = (account) => {
  return new Promise(async (resolve, reject) => {
    try {
      Toast.loading({
        duration: 0,
      });
      const rs = await window.pusdtTokenContract.methods.approve(mortgagePoolAddress, "21000000000000000000000000").send({from: account});
      // console.log('授权usdt',rs);
      Toast.clear();
      resolve(rs);
    } catch (e) {
      Toast.clear();
      reject(e);
    }
  });
};
//铸币页  nest 授权
const coinApproveNestPeth = (account) => {
  return new Promise(async (resolve, reject) => {
    try {
      Toast.loading({
        duration: 0,
      });
      const rs = await window.pethTokenContract.methods.approve(mortgagePoolAddress, "21000000000000000000000000").send({from: account});
      // console.log('授权usdt',rs);
      Toast.clear();
      resolve(rs);
    } catch (e) {
      Toast.clear();
      reject(e);
    }
  });
};

/*
* 标的资产换p资产
* */
const exchangeUnderlyingToPToken = (token, amount) => {
  return new Promise(async (resolve, reject) => {
    try {
      amount = await getUnIdentifiableAmount(token, amount)
      const params = {
        from: store.state.accounts[0],
      };
      if (token === ethToken) {
        params.value = amount;
      }
      const rs = await window.insurancePoolContract.methods.exchangeUnderlyingToPToken(token, amount).send(params);
      store.commit('setState', {
        transactionHash: rs.transactionHash,
      })
      resolve(rs);
    } catch (e) {
      store.commit('setState', {
        transactionHash: '',
      })
      reject(e);
    }
  });
};

/*
* p资产换标的资产
* */
const exchangePTokenToUnderlying = (token, amount) => {
  return new Promise(async (resolve, reject) => {
    try {
      const decimal = await getERC20TokenDecimal(token);
      amount = BigNumberMul(amount, Math.pow(10, decimal));
      const rs = await window.insurancePoolContract.methods.exchangePTokenToUnderlying(token, amount).send({
        from: store.state.accounts[0]
      });
      store.commit('setState', {
        transactionHash: rs.transactionHash,
      })
      resolve(rs);
    } catch (e) {
      store.commit('setState', {
        transactionHash: '',
      })
      reject(e);
    }
  });
};

const getEthBalance = async (account = store.state.accounts[0]) => {
  const decimal = 18;
  let balance = await window.globalWeb3.eth.getBalance(account);
  // console.log('balance balance',balance);
  return BigNumberStr(balance,decimal);
}

/*
* 获取符合erc20标准的代币余额
* */
const getERC20TokenBalance = async (tokenAddress, account = store.state.accounts[0]) => {
  const contract = await new window.globalWeb3.eth.Contract(abiERC20, tokenAddress);//usdt 代币
  const decimal = await contract.methods.decimals().call();
  let balance = await contract.methods.balanceOf(account).call();
  return BigNumberStr(balance,decimal);
}

/*
* 获取符合erc20代币的精度
* */
const getERC20TokenDecimal = async (tokenAddress) => {
  if (tokenAddress === '0x0000000000000000000000000000000000000000'){
    return 18;
  }
  const contract = await new window.globalWeb3.eth.Contract(abiERC20, tokenAddress);//usdt 代币
  return await contract.methods.decimals().call();
}


/*
* 授权token erc20
* */
const contractAbiApprove = async (contractAddress, tokenAddress, account = store.state.accounts[0]) => {
  return new Promise(async (resolve, reject) => {
    try {
      const contract = await new window.globalWeb3.eth.Contract(abiERC20, tokenAddress);//usdt 代币
      const rs = await contract.methods.approve(contractAddress, "21000000000000000000000000").send({from: account});
      resolve(rs);
    } catch (e) {
      reject(e);
    }
  });
};

/*
* 获取授权额度 erc20
* */
const contractAbiAllowance = async (contractAddress, tokenAddress, account = store.state.accounts[0]) => {
  return new Promise(async (resolve, reject) => {
    try {
      const contract = await new window.globalWeb3.eth.Contract(abiERC20, tokenAddress);//usdt 代币
      const rs = await contract.methods.allowance(account, contractAddress).call();
      resolve(parseFloat(rs));
    } catch (e) {
      reject(e);
    }
  });
};

/*
* 检测并授权
* @param tokenAddress 授权的token地址
* @param allowedAddress 授权token给哪个合约
* */
const checkIsAuthAndApprove = async (tokenAddress, allowedAddress) => {
  if (tokenAddress !== '0x0000000000000000000000000000000000000000') {
    const allowance = await contractAbiAllowance(allowedAddress, tokenAddress);
    if (allowance === 0) {
      try {
        Toast.loading({
          duration: 0,
        });
        await contractAbiApprove(allowedAddress, tokenAddress)
        Toast.clear();
      }catch {
        Toast.clear();
      }
      return false;
    }
  }
  return true;
}


/*
* 获取LP数据(个人)
* */
const getLpBalance = async (tokenAddress, account = store.state.accounts[0]) => {
  try {
    const rs = await window.insurancePoolContract.methods.getBalances(tokenAddress, account).call();
    // usdt产生的标的资产都是18位的
    let decimal = false;
    if (tokenAddress === usdtToken) {
      decimal = 18;
    }
    return await getIdentifiableAmount(tokenAddress, rs, decimal);
  } catch (e) {
    console.log(e)
  }
}

/*
* 传入一个带精度的余额，获得人类识别的数字
* */
const getIdentifiableAmount = async(tokenAddress, amount, defaultDecimal = false) => {
  let decimal = 18;
  if (defaultDecimal) {
    decimal = defaultDecimal;
  } else if (tokenAddress !== ethToken) {
    const contract = await new window.globalWeb3.eth.Contract(abiERC20, tokenAddress);
    decimal = await contract.methods.decimals().call();
  }
  return setUnit(parseFloat(amount) / parseFloat(Math.pow(10, decimal)));
}

/*
* 传入一个人类识别的数字，获得带精度的余额
* */
const getUnIdentifiableAmount = async(tokenAddress, amount, defaultDecimal = false) => {
  let decimal = 18
  if (defaultDecimal) {
    decimal = defaultDecimal;
  }else if (tokenAddress !== '0x0000000000000000000000000000000000000000') {
    const contract = await new window.globalWeb3.eth.Contract(abiERC20, tokenAddress);
    decimal = await contract.methods.decimals().call();
  }
  // 在保留了18位精度的情况下，也不可能有小数了，所以需要去掉多余的小数位
  return BigNumberMul(amount, Math.pow(10, decimal), 0)
}



/*
* 获取LP数据(总的)
* */
const getLpTotalSupply = async (tokenAddress) => {
  try {
    const rs = await window.insurancePoolContract.methods.getTotalSupply(tokenAddress).call();
  // usdt产生的标的资产都是18位的
    let decimal = false;
    if (tokenAddress === usdtToken) {
      decimal = 18;
    }
    return await getIdentifiableAmount(tokenAddress, rs, decimal);
  } catch (e) {
    console.log(e)
  }
}

/*
* 获取负资产
* */
const getInsNegative = async (tokenAddress) => {
  try {
    const rs = await window.insurancePoolContract.methods.getInsNegative(tokenAddress).call();
    // usdt产生的标的资产都是18位的
    let decimal = false;
    if (tokenAddress === usdtToken) {
      decimal = 18;
    }
    return await getIdentifiableAmount(tokenAddress, rs, decimal);
  } catch (e) {
    console.log(e)
  }
}

/*
* 获取可赎回份额
* */
const getRedemptionAmount = async (tokenAddress, account = store.state.accounts[0]) => {
  try {
    const rs = await window.insurancePoolContract.methods.getRedemptionAmount(tokenAddress, account).call();
    // usdt产生的标的资产都是18位的
    // console.log('tokenAddress',tokenAddress,rs)
    let decimal = false;
    if (tokenAddress === usdtToken) {
      decimal = 18;
    }
    return await getIdentifiableAmount(tokenAddress, rs, decimal);
  } catch (e) {
    console.log(e)
  }
}

/*
* 获取冻结信息
* */
const getFrozenIns = async (tokenAddress, account = store.state.accounts[0]) => {
  try {
    const rs = await window.insurancePoolContract.methods.getFrozenIns(tokenAddress, account).call();
    return await getIdentifiableAmount(tokenAddress, rs);
  } catch (e) {
    console.log(e)
  }
}

/*
* 获取赎回时间
* */
const getLatestTime = async (tokenAddress) => {
  try {
    const rs = await window.insurancePoolContract.methods.getLatestTime(tokenAddress).call();
    return rs;
  } catch (e) {
    console.log(e)
  }
}

/*
* 获取赎回时间段(本次)
* */
const getRedemptionTimeFront = async (tokenAddress) => {
  try {
    const rs = await window.insurancePoolContract.methods.getRedemptionTimeFront(tokenAddress).call();
    return rs;
  } catch (e) {
    console.log(e)
  }
}

/*
* 获取赎回时间段（下次）
* */
const getRedemptionTime = async (tokenAddress) => {
  try {
    const rs = await window.insurancePoolContract.methods.getRedemptionTime(tokenAddress).call();
    return rs;
  } catch (e) {
    console.log(e)
  }
}

/*
* 赎回
* */
const redemptionIns = async (tokenAddress, amount, account = store.state.accounts[0]) => {
  try {
    // 赎回的是份额，所以精度统一为18
    amount = await getUnIdentifiableAmount(tokenAddress, parseFloat(amount), 18)
    console.log('___1', tokenAddress, amount)
    const rs = await window.insurancePoolContract.methods.redemptionIns(tokenAddress, amount).send({
      from: account
    });
    store.commit('setState', {
      transactionHash: rs.transactionHash,
    })
    return rs;
  } catch (e) {
    console.log('___2', e)
    store.commit('setState', {
      transactionHash: '',
    })
    console.log(e)
    throw new Error(e);
  }
}

/*
* 注入
* */
const subscribeIns = async (tokenAddress, amount, account = store.state.accounts[0]) => {
  try {
    // 注入的usdt精度不变
    const decimal = await getERC20TokenDecimal(tokenAddress);
    amount = BigNumberMul(amount, Math.pow(10, decimal))
    let rs;
    if (tokenAddress === ethToken) {
      rs = await window.insurancePoolContract.methods.subscribeIns(tokenAddress, amount).send({
        from: account,
        value: amount
      });
    } else {
      rs = await window.insurancePoolContract.methods.subscribeIns(tokenAddress, amount).send({
        from: account,
      });
    }
    store.commit('setState', {
      transactionHash: rs.transactionHash,
    })
    return rs;
  } catch (e) {
    store.commit('setState', {
      transactionHash: '',
    })
    console.log(e)
    throw new Error(e);
  }
}

/*
* 个人赎回信息计算
* type 0总的（包括冻结的） 1可赎回的
* return 可赎回的平行资产  可赎回的p资产
* */
const getCanWithdrawTokenAmountInfo = (type = 0) => {
  // 可赎回总价值
  let canWithdrawTotalAmount = 0;
  if (type === 0) {
    canWithdrawTotalAmount = store.state.accountInfo.lpBalance['p' + store.state.insuranceTabIndex] * getNetValue();
  } else {
    canWithdrawTotalAmount = store.state.accountInfo.canRedemptionLpBalanceAmount['p' + store.state.insuranceTabIndex] * getNetValue();
  }
  return getWithdrawAmount(store.state.systemInfo.amount[store.state.insuranceTabIndex], canWithdrawTotalAmount)
}

/*
* 计算当前可以提取多少原资产和平行资产，原资产不够平行资产代替，都不够只系统全部的
* @param systemAmount 系统代币余额
* @param canWithdrawTotalAmount 可以提取的总量
* */
const getWithdrawAmount = (systemAmount, canWithdrawTotalAmount) => {
  // 可赎回的原资产
  let canWithdrawBasicAmount = 0;
  // 可赎回的P资产
  let canWithdrawParallelAmount = 0;
  if (systemAmount - canWithdrawTotalAmount < 0) {
    // 保险池token不够，尝试取pToken的价值
    canWithdrawBasicAmount = systemAmount;
    const pTokenSpread = canWithdrawTotalAmount - canWithdrawBasicAmount;
    if (store.state.systemInfo.amount['p' + store.state.insuranceTabIndex] - pTokenSpread < 0) {
      canWithdrawParallelAmount = store.state.systemInfo.amount['p' + store.state.insuranceTabIndex];
    } else {
      canWithdrawParallelAmount = pTokenSpread;
    }
  } else {
    canWithdrawBasicAmount = canWithdrawTotalAmount;
  }
  canWithdrawBasicAmount = setUnit(canWithdrawBasicAmount);
  canWithdrawParallelAmount = setUnit(canWithdrawParallelAmount);
  return {
    canWithdrawBasicAmount,
    canWithdrawParallelAmount,
  }
}

/*
*净值 = 总资产 / 总LP（份额）
* */
const getNetValue = () => {
  // console.log('净值',getTotalShare(),store.state.systemInfo.lpBalance['p' + store.state.insuranceTabIndex]);
  // if (store.state.systemInfo.lpBalance['p' + store.state.insuranceTabIndex] === 0 ){
  //   return  1;
  // }
  // if ((getTotalShare()*1 / store.state.systemInfo.lpBalance['p' + store.state.insuranceTabIndex]*1) < 0) {
  //   return  1;
  // }
  return setUnit(getTotalShare()*1 / store.state.systemInfo.lpBalance['p' + store.state.insuranceTabIndex]*1);
}
/*
* 总资产 = 原资产 + 总P资产
* */
const getTotalShare = () => {
  // console.log('总资产',store.state.systemInfo.amount[store.state.insuranceTabIndex],getPTokenTotalShare());
  return setUnit(store.state.systemInfo.amount[store.state.insuranceTabIndex]*1 + getPTokenTotalShare()*1);
}

/*
* 总P资产 = P资产 - 负资产
* */
const getPTokenTotalShare = () => {
  return setUnit(store.state.systemInfo.amount['p' + store.state.insuranceTabIndex]*1 - store.state.systemInfo.insNegative['p' + store.state.insuranceTabIndex]*1);
}





export {
  initParams,
  initWeb3hooks,
  initWeb3,
  BigNumber,
  BigNumberStr,
  BigNumberMul,
  BigNumberDiv,
  BigNumberAdd,
  BigNumberSub,
  //home
  getHomeTotal,
  getHomeTotalSupply,
  //mintage 铸币页
  blanceOfMintage,
  coinMintage,
  exchangeUnderlyingToPToken,
  getEthBalance,
  getERC20TokenBalance,
  coinAllowanceNest,
  coinApproveNest,
  coinApproveNestPusdt,
  coinApproveNestPeth,
  getLatestPrice,
  getPriceFee,
  getPriceFeeSingle,
  getMaxRate,
  getLedger,
  getInfoRealTime,
  getFeeDebt,
  getKLineDebt,
  getMortgageRateDebt,
  exchangePTokenToUnderlying,
  contractAbiApprove,
  contractAbiAllowance,
  getLpBalance,
  getLpTotalSupply,
  getInsNegative,
  getRedemptionAmount,
  getCanWithdrawTokenAmountInfo,
  getNetValue,
  getTotalShare,
  getPTokenTotalShare,
  getLatestTime,
  getRedemptionTimeFront,
  getRedemptionTime,
  redemptionIns,
  subscribeIns,
  decreaseDebt,
  supplementDebt,
  reducedCoinageDebt,
  increaseCoinageDebt,
  getFrozenIns,
  getWithdrawAmount,
  checkIsAuthAndApprove,
}
