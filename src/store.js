import Vue from 'vue'
import Vuex from 'vuex'
import {axios, Toast} from "./tools";
import {host, insurancePoolAddress, nestToken, usdtToken} from "./config";
/*语言包*/
import lang_zh from './tools/lang_zh.js'
import lang_en from './tools/lang_en.js'
import * as metamaskTools from './tools/chain'
import * as config from './config'

Vue.use(Vuex);

const initState = {
  //登录信息，必须初始化
  lang: {cn: lang_zh, en: lang_en},
  languageType: 'cn',
  accounts: [],
  connectWalletShow: false,
  accountInfoShow: false,
  mintageShow: false,
  //债仓弹窗 start
  debtExtractShow: false,
  debtAddShow: false,
  debtRepayShow: false,
  debtCoinShow: false,
  debtlistCheck: {},
  priceObj: {},
  //债仓弹窗 end
  insurancePoolDepositShow: false,
  insurancePoolRedeemShow: false,
  toastShow: false,
  // 0确认中... 1交易广播中... 2交易成功 3交易失败 4交易取消
  toastShowType: 4,
  clearShow: false,
  navLeft: 0,
  mobileMenuShow: false,
  //连接类型 0 metamask 1 connectWallet
  connectType: 0,
  // 交易成功后刷新hash，用来打开查看交易结果
  transactionHash: '',
  accountInfo: {
    // token余额
    amount: {
      eth: 0,
      usdt: 0,
      peth: 0,
      pusdt: 0
    },
    // 个人Lp余额
    lpBalance: {
      peth: 0,
      pusdt: 0
    },
    // 可赎回份额
    canRedemptionLpBalanceAmount: {
      peth: 0,
      pusdt: 0,
    },
  },
  systemInfo: {
    // 保险池余额
    amount: {
      eth: 0,
      usdt: 0,
      peth: 0,
      pusdt: 0
    },
    // 总流通lp
    lpBalance: {
      peth: 0,
      pusdt: 0
    },
    // 负资产
    insNegative: {
      peth: 0,
      pusdt: 0
    },
    // 汇率(eth本位)
    currencyPrice: {
      usdt: 0,
      nest: 0,
    },
    // 铸币池余额
    amountMortgagePool: {
      eth: 0,
      nest: 0,
    },
    // p资产流通量
    totalSupply: {
      peth: 0,
      pusdt: 0,
    },
  },
  // 保险池tab的index
  insuranceTabIndex: 'eth',
  // 最新赎回时间
  latestRedeemTime: 0,
  // 最新赎回时间段（当前）
  latestRedeemOptionTime: {
    eth: {
      startTime: 0,
      endTime: 0,
    },
    usdt: {
      startTime: 0,
      endTime: 0,
    }
  },
  // 最新赎回时间段（下次）
  nextRedeemOptionTime: {
    eth: {
      startTime: 0,
      endTime: 0,
    },
    usdt: {
      startTime: 0,
      endTime: 0,
    }
  },

};

let state = {
  ...initState
};

const mutations = {
  /*
  * 设置state
  * */
  setState(state, params) {
    for (let k in params) {
      state[k] = params[k]
    }
  }
};

/* 获取所有配置 */
const actions = {
  /*
  * 退出功能
  * */
  logOut() {
    for (let k in state) {
      if (k === 'connectWalletShow' || k=='navLeft') continue;
      state[k] = initState[k]
    }
    localStorage.setItem('accounts','');
  },
  async initData() {
    // console.log('账号', state.accounts)
    // console.log('___原资产', await metamaskTools.getERC20TokenBalance(config.usdtToken, config.insurancePoolAddress))
    // console.log('___p资产', await metamaskTools.getERC20TokenBalance(config.pusdtToken, config.insurancePoolAddress))
    // console.log('___p资产负资产', await metamaskTools.getInsNegative(config.usdtToken))
    // console.log('___总份额', await metamaskTools.getLpTotalSupply(config.usdtToken))
    state.systemInfo = {
      ...state.systemInfo,
      // todo wyf 预言机价格
      currencyPrice: await metamaskTools.getLatestPrice(state.accounts[0]),
      amountMortgagePool: {
        eth: await metamaskTools.getEthBalance(config.mortgagePoolAddress),
        nest: await metamaskTools.getERC20TokenBalance(config.nestToken, config.mortgagePoolAddress),
      },
      amount: {
        eth: await metamaskTools.getEthBalance(config.insurancePoolAddress),
        usdt: await metamaskTools.getERC20TokenBalance(config.usdtToken, config.insurancePoolAddress),
        peth: await metamaskTools.getERC20TokenBalance(config.pethToken, config.insurancePoolAddress),
        pusdt: await metamaskTools.getERC20TokenBalance(config.pusdtToken, config.insurancePoolAddress),
      },
      lpBalance: {
        peth: await metamaskTools.getLpTotalSupply(config.ethToken),
        pusdt: await metamaskTools.getLpTotalSupply(config.usdtToken),
      },
      insNegative: {
        peth: await metamaskTools.getInsNegative(config.ethToken),
        pusdt: await metamaskTools.getInsNegative(config.usdtToken),
      },
      totalSupply: await metamaskTools.getHomeTotalSupply(state.accounts[0]),
    }
    if (!state.accounts[0]) return;
    switch (state.navLeft) {
      case 2: {
        state.accountInfo = {
          ...state.accountInfo,
          // tab1 data
          amount: {
            eth: await metamaskTools.getEthBalance(),
            usdt: await metamaskTools.getERC20TokenBalance(config.usdtToken),
            peth: await metamaskTools.getERC20TokenBalance(config.pethToken),
            pusdt: await metamaskTools.getERC20TokenBalance(config.pusdtToken),
          },
          // tab2 data
          lpBalance: {
            peth: await metamaskTools.getLpBalance(config.ethToken),
            pusdt: await metamaskTools.getLpBalance(config.usdtToken),
          },
          // canRedemptionLpBalanceAmount: {
          //   peth: await metamaskTools.getRedemptionAmount(config.ethToken),
          //   pusdt: await metamaskTools.getRedemptionAmount(config.usdtToken),
          // }
        }
      }
        break;
    }
  },
  /*
  * token名字，非地址
  * */
  async getRedeemTime(store, token) {
    // state.latestRedeemTime = parseInt(await metamaskTools.getLatestTime(config.pethToken))*1000;
    const latestRedeemOptionTime = await metamaskTools.getRedemptionTimeFront(config[token + 'Token']);
    const nextRedeemOptionTime = await metamaskTools.getRedemptionTime(config[token + 'Token']);
    store.state.latestRedeemOptionTime[token] = {
      startTime: parseInt(latestRedeemOptionTime.startTime*1000),
      endTime: parseInt(latestRedeemOptionTime.endTime*1000),
    };
    store.state.nextRedeemOptionTime[token] = {
      startTime: parseInt(nextRedeemOptionTime.startTime*1000),
      endTime: parseInt(nextRedeemOptionTime.endTime*1000),
    };
    store.state.accountInfo.canRedemptionLpBalanceAmount['p' + token] = await metamaskTools.getRedemptionAmount(config[token + 'Token']);
  },
  setGlobalConfig() {
    axios({
      method: 'post',
      url: host + 'user/config',
      data: {
        uid: state.uid || window.localStorage.getItem('uid'),
      },
    }).then(function (response) {
      if (response.data && response.data.code === 0) {
        const list = response.data.data.list;
        for (let k in list) {
          state.globalConfig[list[k].configKey] = list[k].configValue;
        }
      }
    }).catch(() => {
      Toast('全局配置请求失败')
    });
  },
  getDownloadUrl() {
    axios({
      method: 'post',
      url: host + 'user/download',
    }).then(function (response) {
      if (response.data && response.data.code === 0) {
        state.downloadUrl = response.data.data;
      }
    }).catch(() => {
      Toast('全局配置请求失败')
    });
  },
  /*
  * 拿个人信息
  * */
  getUserInfo() {
    return axios({
      method: 'post',
      url: host + 'user/query_info',
      data: {
        uid: state.uid,
      },
    }).then(function (response) {
      if (response.data && response.data.code === 0) {
        state.nickname = response.data.data.nickname;
        window.localStorage.setItem('nickname', state.nickname);
      }
    });
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions
})
