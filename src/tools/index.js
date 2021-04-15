import axios from 'axios';
import Toast from 'vant/lib/toast';
import 'vant/lib/toast/style';
import Dialog from 'vant/lib/dialog';
import 'vant/lib/dialog/style';
import store from '../store';
import router from '../router';
import {BigNumber} from 'bignumber.js';
/*
 * 隐藏loading toast
 * */
const hideToastArr = [
  'bubble/gain',
  'user/config',
  'user/index',
  'bubble/gain_quick',
];

const lang = (key) => {
  let langs = store.state.lang;
  let item = store.state.languageType;
  // console.log(langs[item])
  return langs[item][key];
};

function BigNumberStr(num1, num2, col) {
  return new BigNumber(num1).dividedBy(Math.pow(10, num2)).toFixed(col, 1);
}
function BigNumberMul(num1, num2, col) {//乘法
  return new BigNumber(num1).multipliedBy(num2).toFixed(col,1);
}
function BigNumberDiv(num1, num2, col) {//除法
  return new BigNumber(num1).dividedBy(num2).toFixed(col,1);
}
function BigNumberAdd(num1, num2, col) {//加法
  return new BigNumber(num1).plus(num2).toFixed(col,1);
}
function BigNumberSub(num1, num2, col) {//减法
  return new BigNumber(num1).minus(num2).toFixed(col,1);
}

/*
 * axios 拦截器
 * */
axios.interceptors.request.use(function (config) {
  // console.log('axios: ', config);
  // console.log('store', store);
  if (store.state.token && store.state.token !== '') {
    config.headers.token = store.state.token;
  }
  if (!config.data) config.data = {};
  // get 方法无data属性
  let showToast = true;
  for (let k in hideToastArr) {
    if (config.url.search(hideToastArr[k]) !== -1) {
      showToast = false
    }
  }
  if (showToast && config.method == 'post') {
    Toast({
      type: 'loading',
      closeOnClick: true,
      duration: 1000,
    })
    // config.data.uid = store.state.uid;
  }
  return config
}, function (error) {
  return Promise.reject(error)
});

axios.interceptors.response.use(function (response) {

  if (!checkResponse(response)) {
    if (response.data) {
      Toast(response.data.msg);
      if (response.data.code === 20013 || response.data.code === 20012) {
        logout();
        router.push('/login');
      }
    } else {
      // 返回消息格式错误
    }
  }
  return response
}, function () {

  // if (/401/.test(error)) {
  //   store.commit('setState', {
  //     noticeMsg: '身份过期，请重新登录',
  //     noticeType: 1
  //   })
  //   store.dispatch('maskShow');
  //   // window.localStorage.removeItem('token');
  //   // window.localStorage.removeItem('userId');
  // } else{
  //   store.commit('setState', {
  //     'noticeMsg': '网络繁忙，请稍后重试'
  //   })
  //   store.dispatch('maskShow')
  // }
});


const checkResponse = (response) => {
  if (!response || !response.data || response.data.code !== 0) {
    return false
  }
  return true
};

/*
 * 此处由于接口返回的信息有限，需要在登录的时候，将mobbile存入本地，在访问个人中心的时候，将nickname存入本地
 * */
const setUserLoginInfo = () => {
  const token = window.localStorage.getItem('token');
  if (token && token !== '') {
    store.commit('setState', {
      token: window.localStorage.getItem('token'),
      uid: window.localStorage.getItem('uid'),
      mobile: window.localStorage.getItem('mobile'),
      nickname: window.localStorage.getItem('nickname'),
    });
    return true
  }
  return false
};

const login = (response) => {
  store.commit('setState', {
    token: response.data.token,
    uid: response.data.uid,
  });
  window.localStorage.setItem('token', response.data.token);
  window.localStorage.setItem('uid', response.data.uid);
};

const logout = () => {
  store.commit('setState', {
    token: '',
    uid: '',
  });
  window.localStorage.removeItem('token');
  window.localStorage.removeItem('uid');
  window.localStorage.removeItem('mobile');
  window.localStorage.removeItem('nickname');
};


const GetRequestParam = (href) => {
  href = href ? href : window.location.href;
  var url = href.substr(href.indexOf("?")); //获取url中"?"符后的字串
  var theRequest = new Object();
  var strs = '';
  if (url.indexOf("?") != -1) {
    var str = url.substr(1);
    strs = str.split("&");
    for (var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
    }
  }
  return theRequest;
};


/*
 * 根据时间戳获得时间格式，时间转换
 * */
const fmtDate = (timestamp = Date.parse(new Date()), type = 1) => {
  let date = new Date(timestamp);
  let y = 1900 + date.getYear();
  let m = '0' + (date.getMonth() + 1);
  let d = '0' + date.getDate();
  let h = '0' + date.getHours();
  let i = '0' + date.getMinutes();
  let s = '0' + date.getSeconds();
  let rs;
  switch (type) {
    case 1:
      rs = y + '-' + m.substring(m.length - 2, m.length) + '-' + d.substring(d.length - 2, d.length) + ' ' + h.substring(h.length - 2, h.length) + ':' + i.substring(i.length - 2, i.length) + ':' + s.substring(s.length - 2, s.length);
      break;
    case 2:
      rs = y + '-' + m.substring(m.length - 2, m.length) + '-' + d.substring(d.length - 2, d.length);
      break;
    default:
      rs = y + '-' + m.substring(m.length - 2, m.length) + '-' + d.substring(d.length - 2, d.length) + ' ' + h.substring(h.length - 2, h.length) + ':' + i.substring(i.length - 2, i.length) + ':' + s.substring(s.length - 2, s.length);
      break;
  }
  return rs;
};

const checkPhoneNumberNew = (phone) => {
  // /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57]|19[0-9]|16[0-9])[0-9]{8}$/
  return /^1[3-9][0-9]\d{8}$/.test(phone);
};

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //不含最大值，含最小值
};

const cutAccount = (phone) => {
  if (!phone) return '';
  return phone.substr(0, 3) + '...' + phone.substr(37, phone.length);
};

const setUnit = (num = 0, decimal = 6) => {
  const multiple = Math.pow(10, decimal)
  let rs = parseFloat(Math.floor(num * multiple) / multiple) || 0;
  if (!(typeof rs === 'number' && isFinite(rs))){
    rs = 0;
  }
  return rs;
}


const checkLogin = () => {
  if (store.state.accounts[0]) {
    return true
  }
  store.commit('setState', {
    connectWalletShow: true
  });
  return false;
}

const rewirteLog = () => {
  console.log = (function (log) {
    return process.env.NODE_ENV == 'development'? log : function() {}
  }(console.log))
}




export {
  lang,
  axios,
  Toast,
  BigNumber,
  BigNumberStr,
  BigNumberMul,
  BigNumberDiv,
  BigNumberAdd,
  BigNumberSub,
  login,
  logout,
  setUserLoginInfo,
  GetRequestParam,
  fmtDate,
  checkPhoneNumberNew,
  getRandomInt,
  Dialog,
  cutAccount,
  setUnit,
  checkLogin,
  rewirteLog,
}
