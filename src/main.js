import Vue from "vue";
import App from "./App.vue";

import store from './store';

import axios from "axios";
import qs from "qs";

Vue.config.productionTip = false;

Vue.prototype.$axios = axios;
Vue.prototype.$store = store;
//axios请求计数，用于loading动画

let globalData = new Vue({
  data: { $loadMark: 0 }
});
Vue.mixin({
  computed: {
    $loadMark: {
      get: function () { return globalData.$data.$loadMark },
      set: function (newValue) { globalData.$data.$loadMark = newValue; }
    }
  }
})


// Vue.prototype.$loadMark = {
//   count: 0,
//   get(){
//     return this.count;
//   },
//   add() {
//     this.count++;
//   },
//   minus() {
//     this.count--;
//   }
// };
let pending = []; //声明一个数组用于存储每个ajax请求的取消函数和ajax标识
let cancelToken = axios.CancelToken;
let norepeatLinks = ['getWinRates.php'];
let noLoadingLinks = ['getFileName.php?di', 'mySql.txt'];
let removePending = (config) => {
  const __url = config.url;
  for (let p in pending) {
    if(pending[p].u === __url + '&' + config.method) { //当当前请求在数组中存在时执行函数体
      pending[p].f('执行取消操作'+__url); //执行取消操作
      pending.splice(p, 1); //把这条记录从数组中移
    }
  }
}
//添加请求拦截器
Vue.prototype.$axios.interceptors.request.use(config => {//在一个ajax发送前执行操作 config.url  config.method
  const __url = config.url;
  
  //检索取消令牌，并取消请求
  removePending(config);

  //检测是否需要添加取消令牌   开始
  norepeatLinks.forEach(norepeatLink => {
    if (__url.indexOf(norepeatLink) != -1) {
      config.cancelToken = new cancelToken((c) => {
        pending.push({ u: __url + '&' + config.method, f:c});
      });
    }
  });
  //检测是否需要添加取消令牌   结束


  //检测是否需要添加loading动画   开始
  let isLoading=true;
  noLoadingLinks.forEach(noLoadingLink => {
    if (__url.indexOf(noLoadingLink) !== -1) {isLoading=false;}
  });
  if(isLoading){globalData.$data.$loadMark++;}
  //检测是否需要添加loading动画   结束


  return config;
}, error => {
  return Promise.reject(error);
});
//添加响应拦截器
Vue.prototype.$axios.interceptors.response.use(response => {  //在一个ajax响应后再执操作
  const __url = response.config.url;

  //再执行一下取消操作，把已经完成的请求从pending中移除
  removePending(response.config);

  //检测是否无需添加loading动画   开始
  let isLoading=true;
  noLoadingLinks.forEach(noLoadingLink => {
    if (__url.indexOf(noLoadingLink) !== -1) {isLoading=false;}
  });
  if(isLoading){globalData.$data.$loadMark--;}
  //检测是否无需添加loading动画   结束

  return response;
}, error => {

  if(Vue.prototype.$axios.isCancel(error)){
      console.warn('isCancel->', error.message)
      globalData.$data.$loadMark--;
  }else{
      console.log('error', error)
  }

  return Promise.reject(error);
});



Vue.prototype.$qs = qs;

var os = fos();
var sbw = getScrollbarWidth();

Vue.prototype.$os = os;
Vue.prototype.$sbw = sbw;


Vue.prototype.$$ = {
  getSearch: function () {
    var url = location.search;
    var json = {};
    if (url.indexOf("?") != -1) {
      var str = url.substr(1);
      var strs = str.split("&");
      for (var i = 0; i < strs.length; i++) {
        let key_ = strs[i].split("=")[0];
        let value_ = unescape(strs[i].split("=")[1]);
        json[key_] = value_;
      }
    }
    return json;
  },
  isNumber: function (value) {
    return !Number.isNaN(Number(value))
  },
  getDomain: function () {
    return window.location.origin
      ? window.location.origin
      : window.location.protocol +
      "//" +
      window.location.hostname +
      (window.location.port ? ":" + window.location.port : "");
  },
  console: {
    black(str) {
      console.log('%c ' + str, 'background:black;color:white');
    }, black(str) {
      console.log('%c ' + str, 'background:black;color:white');
    }, red(str) {
      console.log('%c ' + str, 'background:red;color:white');
    }, blue(str) {
      console.log('%c ' + str, 'background:blue;color:white');
    }, green(str) {
      console.log('%c ' + str, 'background:green;color:white');
    }, yellow(str) {
      console.log('%c ' + str, 'background:yellow;color:black');
    }
  },
  copyText: function (text_, tips) {
    let range = document.createRange();
    let eleP = document.createElement("p");
    let ele = document.createTextNode(text_);
    eleP.appendChild(ele);
    document.body.appendChild(eleP);
    range.selectNode(ele);
    var selection = window.getSelection();
    if (selection.rangeCount > 0) selection.removeAllRanges();
    selection.addRange(range);
    console.log(selection);
    document.execCommand("copy");
    document.body.removeChild(eleP);
    if (tips) {
      alert(tips);
    }
  },
  isAPP(){
    return navigator.userAgent.indexOf("Html5Plus")!=-1
  },
  self2Url(url){

      if(navigator.userAgent.indexOf("Html5Plus")!=-1 && plus){
        plus.runtime.openURL(url);
        }else{
          location.href=url;
        }

    },
    blank2Url(url){
      if(navigator.userAgent.indexOf("Html5Plus")!=-1 && plus){
        plus.runtime.openURL(url);
        }else{
          window.open(url);
        }
 

  }

};
const pattJson = {};
pattJson['userName'] = /^[a-zA-Z]([a-zA-Z0-9_]{5,14})+$/;
pattJson['userPsw'] = /^[a-zA-Z0-9_]{6,15}$/;
pattJson['userWechat'] = /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/;
pattJson['userQQ'] = /^[1-9]\d{4,9}$/;
pattJson['userPhone'] = /^[1]([3-9])[0-9]{9}$/;////////------/^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/
pattJson['userEmail'] = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
Vue.prototype.$pattJson = pattJson;

const chinese = {};
chinese['webSetting'] = {};
chinese['webSetting']['formName'] = '网站设置'
chinese['webSetting']['id'] = '编码'
chinese['webSetting']['userID'] = '代理标识'
chinese['webSetting']['userName'] = '代理账号'
chinese['webSetting']['siteLink'] = '计划官网链接'
chinese['webSetting']['siteName'] = '计划官网名称'
chinese['webSetting']['publicAuthorization'] = '全局授权(0都可见1需授权，先填写下一个ip数要求再开启)'
chinese['webSetting']['shareRequiredIP'] = '分享IP数要求'
chinese['webSetting']['shareRequiredUser'] = '分享注册数要求'
chinese['webSetting']['shareLimiteTime'] = '分享授权持续的时间'	
chinese['webSetting']['apiSelect'] = '默认显示的彩种'
chinese['webSetting']['defaultPlanID'] = '默认显示当前胜率第几名计划'
chinese['webSetting']['historyLimit'] = '显示近N期的胜率'
chinese['webSetting']['leaderboardLimit'] = '排行榜，显示n条'
chinese['webSetting']['historyPlanShowLimit'] = '展示多少计划历史结果'
chinese['webSetting']['needAuthorize'] = '需要授权的条件（彩种|胜率排行第n-m名）'
chinese['webSetting']['stringUserTitle'] = '设置用户头衔'
chinese['webSetting']['registerQQ'] = '注册是否要填QQ'
chinese['webSetting']['registerWechat'] = '注册是否要填微信'
chinese['webSetting']['registerPhone'] = '注册是否要填手机'
chinese['webSetting']['registerEmail'] = '注册是否要填邮箱'
chinese['webSetting']['loginKeep'] = '用户登录的有效期'
chinese['webSetting']['csQQ'] = '网站客服QQ（||分割多个，随机展示）'
chinese['webSetting']['csQQGroup'] = '网站客服QQ群（||分割多个，随机展示）'
chinese['webSetting']['csWechat'] = '网站客服微信（||分割多个，随机展示）'
chinese['webSetting']['csEmail'] = '网站客服邮箱（||分割多个，随机展示）'
chinese['webSetting']['ezunLink'] = 'ezun官网注册链接'
chinese['webSetting']['autoEzunLink'] = '开启自动修改注册链接'
chinese['webSetting']['hk49plan1'] = '六合彩计划-标题'
chinese['webSetting']['hk49plan2'] = '六合彩计划-精品推荐'
chinese['webSetting']['hk49plan3'] = '六合彩计划-生肖投注'
chinese['webSetting']['hk49plan4'] = '六合彩计划-特码投注'
chinese['webSetting']['hk49plan5'] = '六合彩计划-特别投注'
chinese['webSetting']['hk49PlanPoet'] = '六合打油诗'
chinese['webSetting']['hk49PlanPicture'] = '六合图'
chinese['webSetting']['outLinkName'] = '一个外链名称'
chinese['webSetting']['outLinkUrl'] = '一个外链地址'
chinese['webSetting']['baiduStatistics'] = '百度统计的代码'
chinese['webSetting']['updateUserPsw'] = '会员可否修改自己的密码'
chinese['webSetting']['submitUpdateUserLevel'] = '会员可否提交次级代理申请'
chinese['webSetting']['updateUserQQ'] = '会员可否修改自己的QQ'
chinese['webSetting']['updateUserWechat'] = '会员可否修改自己的邮箱'
chinese['webSetting']['updateUserPhone'] = '会员可否修改自己的微信'
chinese['webSetting']['updateUserEmail'] = '会员可否修改自己的手机'
chinese['webSetting']['mark1'] = '滚动公告'
chinese['webSetting']['mark2'] = '顶部图片'
chinese['webSetting']['mark3'] = '顶部图片的点击链接'
chinese['webSetting']['mark4'] = '备注4'
chinese['webSetting']['mark5'] = '备注5'
chinese['user'] = {};
chinese['user']['formName'] = '会员资料'
chinese['user']['id'] = '编码'
chinese['user']['userName'] = '会员账号'
chinese['user']['userPsw'] = '会员密码'
chinese['user']['userQQ'] = '联系QQ'
chinese['user']['userWechat'] = '联系微信'
chinese['user']['userPhone'] = '联系电话'
chinese['user']['userEmail'] = '联系邮箱'
chinese['user']['verifyQQ'] = '验证QQ（0未1已）'
chinese['user']['verifyWechat'] = '验证邮箱（0未1已）'
chinese['user']['verifyPhone'] = '验证微信（0未1已）'
chinese['user']['verifyEmail'] = '验证手机（0未1已）'
chinese['user']['registerTime'] = '注册时间'
chinese['user']['registerIP'] = '注册IP'
chinese['user']['shareCode'] = '分享码'
chinese['user']['authorizationStatus'] = '授权状态（0未1已2待3特别）'
chinese['user']['authorizationTime'] = '授权时间'
chinese['user']['authorizationLimite'] = '授权时限（几天，0永久）'
chinese['user']['userLevel'] = '层级（总1次2会3）'
chinese['user']['agentStatus'] = '代理状态'
chinese['user']['agentAdmin'] = '归属管理'
chinese['user']['agentTop'] = '归属总代'
chinese['user']['agentDirect'] = '归属代理'
chinese['user']['userActive'] = '会员状态（0禁用1正常）'
chinese['user']['creater'] = '注册人'
chinese['user']['userTitle'] = '用户头衔（1、2、3...）'
chinese['user']['fromLink'] = '访问来源'
chinese['user']['loginTime'] = '最后登录时间'
chinese['user']['nextCanShow'] = '开启深度查询'
chinese['user']['mark1'] = '备注1'
chinese['user']['mark2'] = '备注2'
chinese['user']['mark3'] = '备注3'
chinese['user']['mark4'] = '备注4'
chinese['user']['mark5'] = '备注5'

chinese['adminLimit'] = {};
chinese['adminLimit']['formName'] = '权限分配'
chinese['adminLimit']['id'] = '编码'
chinese['adminLimit']['userID'] = '代理标识'
chinese['adminLimit']['userName'] = '代理账号'
chinese['adminLimit']['webSetting_siteLink'] = '可否修改本站的链接'
chinese['adminLimit']['webSetting_siteName'] = '可否修改本站的名称'
chinese['adminLimit']['webSetting_publicAuthorization'] = '可否开关自己网站的授权'
chinese['adminLimit']['webSetting_shareRequiredIP'] = '可否修改自己分享IP数要求'
chinese['adminLimit']['webSetting_shareRequiredUser'] = '可否修改自己注册数要求'
chinese['adminLimit']['webSetting_shareLimiteTime'] = '可否修改自己分享授权持续的时间'
chinese['adminLimit']['webSetting_apiSelect'] = '可否修改默认显示的彩种'
chinese['adminLimit']['webSetting_defaultPlanID'] = '可否修改自己默认显示的计划'
chinese['adminLimit']['webSetting_historyLimit'] = '可否修改显示近N期的胜率'
chinese['adminLimit']['webSetting_leaderboardLimit'] = '可否修改排行榜，显示n条'
chinese['adminLimit']['webSetting_historyPlanShowLimit'] = '可否修改自己展示多少计划历史结果'
chinese['adminLimit']['webSetting_needAuthorize'] = '可否修改自己需要授权的条件（彩种|胜率n-m期）'
chinese['adminLimit']['webSetting_stringUserTitle'] = '可否修改自己的网站的用户头衔'
chinese['adminLimit']['webSetting_registerQQ'] = '可否开关自己网站要注册要求QQ'
chinese['adminLimit']['webSetting_registerWechat'] = '可否开关自己网站要注册要求微信'
chinese['adminLimit']['webSetting_registerPhone'] = '可否开关自己网站要注册要求手机'
chinese['adminLimit']['webSetting_registerEmail'] = '可否开关自己网站要注册要求邮箱'
chinese['adminLimit']['webSetting_loginKeep'] = '可否修改本站登录的有效期'
chinese['adminLimit']['webSetting_csQQ'] = '可否修改本站客服QQ'
chinese['adminLimit']['webSetting_csQQGroup'] = '可否修改本站客服QQ群'
chinese['adminLimit']['webSetting_csWechat'] = '可否修改本站客服微信'
chinese['adminLimit']['webSetting_csEmail'] = '可否修改本站客服邮箱'
chinese['adminLimit']['webSetting_ezunLink'] = '可否提交ezun官网注册链接'
chinese['adminLimit']['webSetting_autoEzunLink'] = '可否自动通过提交ezun官网注册链接'
chinese['adminLimit']['webSetting_hk49plan1'] = '可否修改六合彩计划'
chinese['adminLimit']['webSetting_hk49plan2'] = '可否修改六合彩计划'
chinese['adminLimit']['webSetting_hk49plan3'] = '可否修改六合彩计划'
chinese['adminLimit']['webSetting_hk49plan4'] = '可否修改六合彩计划'
chinese['adminLimit']['webSetting_hk49plan5'] = '可否修改六合彩计划'
chinese['adminLimit']['webSetting_hk49PlanPoet'] = '可否修改打油诗'
chinese['adminLimit']['webSetting_hk49PlanPicture'] = '可否上传六合彩图片'
chinese['adminLimit']['webSetting_outLinkName'] = '可否修改外链名称（聊天室）'
chinese['adminLimit']['webSetting_outLinkUrl'] = '可否修改外链(聊天室链接？)'
chinese['adminLimit']['webSetting_baiduStatistics'] = '可否修改百度统计的代码'
chinese['adminLimit']['webSetting_updateUserPsw'] = '可否修改_会员可否修改自己的密码'
chinese['adminLimit']['webSetting_submitUpdateUserLevel'] = '可否修改_会员可否提交次级代理申请'
chinese['adminLimit']['webSetting_updateUserQQ'] = '可否修改_会员可否修改自己的QQ'
chinese['adminLimit']['webSetting_updateUserWechat'] = '可否修改_会员可否修改自己的邮箱'
chinese['adminLimit']['webSetting_updateUserPhone'] = '可否修改_会员可否修改自己的微信'
chinese['adminLimit']['webSetting_updateUserEmail'] = '可否修改_会员可否修改自己的手机'
chinese['adminLimit']['webSetting_mark1'] = '可否修改滚动公告'
chinese['adminLimit']['webSetting_mark2'] = '可否修改顶部图片'
chinese['adminLimit']['webSetting_mark3'] = '可否修改顶部图片的点击链接'
chinese['adminLimit']['webSetting_mark4'] = '可否修改备注4'
chinese['adminLimit']['webSetting_mark5'] = '可否修改备注5'
chinese['adminLimit']['user_userName'] = '修改下级账号userName'
chinese['adminLimit']['user_userPsw'] = '可否修改下级会员密码'
chinese['adminLimit']['user_userQQ'] = '可否修改会员资料中的联系方式qq'
chinese['adminLimit']['user_userWechat'] = '可否修改会员资料中的联系方式wechat'
chinese['adminLimit']['user_userPhone'] = '可否修改会员资料中的联系方式phone'
chinese['adminLimit']['user_userEmail'] = '可否修改会员资料中的联系方式email'
chinese['adminLimit']['user_verifyQQ'] = '可否手动验证会员的联系方式qq'
chinese['adminLimit']['user_verifyWechat'] = '可否手动验证会员的联系方式邮箱'
chinese['adminLimit']['user_verifyPhone'] = '可否手动验证会员的联系方式微信'
chinese['adminLimit']['user_verifyEmail'] = '可否手动验证会员的联系方式手机'
chinese['adminLimit']['create_user_3'] = '可否新增会员（归到直接下级）'
chinese['adminLimit']['create_user_2'] = '可否会员晋升代理（归到直接下级）'
chinese['adminLimit']['create_user_1'] = '可否代理晋升总代（归到直接下级）'
chinese['adminLimit']['user_authorizationStatus'] = '可否修改会员授权状态'
chinese['adminLimit']['show_all_user'] = '可否逐级查询代理'
chinese['adminLimit']['user_authorizationLimite'] = '可否修改会员授权时限'
chinese['adminLimit']['user_agentStatus'] = '可否修改下级代理密码'
chinese['adminLimit']['user_agentAdmin'] = '可否修改会员的归属管理'
chinese['adminLimit']['user_agentTop'] = '可否修改会员的归属总代'
chinese['adminLimit']['user_agentDirect'] = '可否修改会员的归属代理'
chinese['adminLimit']['user_userActive'] = '可否禁用下级会员'
chinese['adminLimit']['user_userTitle'] = '可否修改会员头衔'
chinese['adminLimit']['mark1'] = '备注1'
chinese['adminLimit']['mark2'] = '备注2'
chinese['adminLimit']['mark3'] = '备注3'
chinese['adminLimit']['mark4'] = '备注4'
chinese['adminLimit']['mark5'] = '备注5'
chinese['authorizationWBStatus'] = {}
chinese['authorizationWBStatus']['formName'] = '授权管理'
chinese['authorizationWBStatus']['userName'] = '会员账号'
chinese['authorizationWBStatus']['id'] = '唯一标识'
chinese['authorizationWBStatus']['userID'] = '会员标识'
chinese['authorizationWBStatus']['wbStatus'] = '会员授权状态'
chinese['authorizationWBStatus']['updateTime'] = '添加时间'
chinese['authorizationWBStatus']['updateIP'] = '添加ip'
chinese['authorizationWBStatus']['updater'] = '操作人'
chinese['api'] = {}
chinese['api']['formName'] = '计划配置'
chinese['api']['id'] = '编码'
chinese['api']['switch'] = '是否开启'
chinese['api']['lotteryID'] = '彩种代号'
chinese['api']['lotteryname'] = '彩种名称'
chinese['api']['link'] = '彩种api链接'
chinese['api']['dir'] = '数据存储文件夹'
chinese['api']['code'] = '开奖号码个数'
chinese['api']['strPlanName'] = '计划名称'
chinese['api']['strPosition'] = '玩法'
chinese['api']['strQis'] = '期数'
chinese['api']['strNumbers'] = '几码'
chinese['api']['str_numbers_show'] = '是否可选择几码'
chinese['api']['maxPeriod'] = '一天的期数'
chinese['api']['intervalPeriod'] = '每期间隔'
chinese['api']['delayPeriod'] = '封盘时间'
chinese['api']['defaultPlanQi'] = '默认几期'
chinese['api']['defaultPlanPosition'] = '默认玩法'
chinese['api']['defaultNumbers'] = '默认几码'
chinese['api']['mark1'] = '备注1'
chinese['api']['mark2'] = '备注2'
chinese['api']['mark3'] = '备注1'
chinese['api']['mark4'] = '备注1'
chinese['api']['mark5'] = '备注1'
chinese['shareIP'] = {}
chinese['shareIP']['formName'] = '分享IP管理'
chinese['shareIP']['id'] = '编码'
chinese['shareIP']['shareCode'] = '分享码'
chinese['shareIP']['createIP'] = 'ip'
chinese['shareIP']['createTime'] = '时间'
chinese['shareIP']['shareCount'] = '访问次数'
chinese['shareRegister'] = {}
chinese['shareRegister']['shareCode'] = '分享码'
chinese['shareRegister']['createIP'] = 'ip'
chinese['shareRegister']['createTime'] = '时间'
chinese['shareRegister']['userID'] = '时间'
chinese['logLogin'] = {}
chinese['logLogin']['formName'] = '登录日志'
chinese['logLogin']['id'] = '编码'
chinese['logLogin']['userID'] = '会员标识'
chinese['logLogin']['userName'] = '会员账号'
chinese['logLogin']['loginTime'] = '时间'
chinese['logLogin']['loginIP'] = 'IP'
chinese['logLogin']['loginLink'] = '登录的网址'
chinese['logLogin']['fromLink'] = '来源网址'
chinese['logLogin']['loginToken'] = '会话状态'
chinese['logLogin']['loginTokenTime'] = ''
chinese['logSubmit'] = {}
chinese['logSubmit']['formName'] = '提交日志'
chinese['logSubmit']['id'] = '编码'
chinese['logSubmit']['creater'] = '提交ID'
chinese['logSubmit']['createName'] = '提交账号'
chinese['logSubmit']['actor'] = '更改ID'
chinese['logSubmit']['actorName'] = '更改账号'
chinese['logSubmit']['form'] = '表名'
chinese['logSubmit']['formKey'] = '字段名'
chinese['logSubmit']['formValue'] = '变更值'
chinese['logSubmit']['submitTime'] = '提交时间'
chinese['logSubmit']['doneTime'] = '操作时间'
chinese['logSubmit']['result'] = '操作结果'
Vue.prototype.$chinese = chinese;

var dpr, rem;
var docEl = document.documentElement;
var fontEl = document.createElement("style");
var metaEl = document.querySelector('meta[name="viewport"]');
dpr = window.devicePixelRatio || 1;
//rem = docEl.clientWidth * dpr / 10;
var docEl_clientWidth = (docEl.clientWidth > 600) ? 600 : os.isPc ? (docEl.clientWidth - sbw) : docEl.clientWidth;
rem = docEl_clientWidth / 10;
//scale = 1 / dpr;
// 设置viewport,进行缩放,达到高清效果
//metaEl.setAttribute("content", "width=" + dpr * docEl.clientWidth + ",initial-scale=" + scale + ",maximum-scale=" + scale + ", minimum-scale=" + scale + ",user-scalable=no");
metaEl.setAttribute(
  "content",
  "width=" +
  docEl.clientWidth +
  ",initial-scale=1,maximum-scale=1, minimum-scale=1,user-scalable=no"
);
// 设置data-dpr属性,留作的css hack之用
docEl.setAttribute("data-dpr", dpr);
// 动态写入样式
docEl.firstElementChild.appendChild(fontEl);
fontEl.innerHTML = "html{font-size:" + rem + "px!important;}";
window.dpr = dpr;
window.rem = rem;

console.log("document.body.offsetWidth:" + document.body.offsetWidth);
console.log("docEl_clientWidth:" + docEl_clientWidth);
console.log("docEl.clientWidth:" + docEl.clientWidth);
console.log("window.rem*10:" + window.rem * 10);


new Vue({
  render: h => h(App)
}).$mount("#app");



function fos() {
  var ua = navigator.userAgent,
    isWindowsPhone = /(?:Windows Phone)/.test(ua),
    isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
    isAndroid = /(?:Android)/.test(ua),
    isFireFox = /(?:Firefox)/.test(ua),
    isChrome = /(?:Chrome|CriOS)/.test(ua),
    isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua)),
    isPhone = /(?:iPhone)/.test(ua) && !isTablet,
    isPc = !isPhone && !isAndroid && !isSymbian;
  return {
    isTablet: isTablet,
    isPhone: isPhone,
    isAndroid: isAndroid,
    isPc: isPc
  };
}
function getScrollbarWidth() {

  var scrollDiv = document.createElement("div");
  scrollDiv.style.cssText = 'width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;';
  document.body.appendChild(scrollDiv);
  var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  document.body.removeChild(scrollDiv);

  console.log("scrollbarWidth=" + scrollbarWidth);
  return scrollbarWidth;

}


