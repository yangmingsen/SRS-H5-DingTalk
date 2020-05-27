import * as dd from "dingtalk-jsapi";
import { ApiExample } from "./example";
import router from "../router";

export const ddAPI = {
  loginAuth(returnUrl) {
    const that = this;
    that.showPreloader("玩命加载中...");
    dd.ready(() => {
      dd.runtime.permission.requestAuthCode({
        corpId: "ding93375f885bdf549635c2f4657eb6378f", // 企业id
        onSuccess: async function(info) {
          that.code = info.code; // 通过该免登授权码可以获取用户身份
          await ApiExample.login({ code: that.code })
            .then(res => {
              if (!res.result.value) {
                //成功
                that.hidePreloader();
                if (returnUrl) {
                  router.push({ path: returnUrl });
                } else {
                  router.push({ name: "home" });
                }
                localStorage.setItem("isLogin", 1);
              } else {
                dd.device.notification.alert({
                  message: "登录失败,请稍后重试",
                  title: "提示", //可传空
                  buttonName: "确定",
                  onSuccess: function() {
                    //onSuccess将在点击button之后回调
                    /*回调*/
                    that.appExit();
                  },
                  onFail: function(err) {}
                });
              }
            })
            .catch(err => {
              dd.device.notification.alert({
                message: "登录请求失败,请重试",
                title: "提示", //可传空
                buttonName: "确定",
                onSuccess: function() {
                  //onSuccess将在点击button之后回调
                  /*回调*/
                  that.appExit();
                },
                onFail: function(err) {}
              });
            });
        }
      });
    });
  },

  appExit() {
    dd.ready(() => {
      dd.biz.navigation.close({
        onSuccess: function(result) {
          /*result结构
                    {}
                    */
        },
        onFail: function(err) {}
      });
    });
  },

  showPreloader(text) {
    dd.ready(() => {
      dd.device.notification.showPreloader({
        text: text, //loading显示的字符，空表示不显示文字
        showIcon: true, //是否显示icon，默认true
        onSuccess: function(result) {
          /*{}*/
        },
        onFail: function(err) {}
      });
    });
  },

  hidePreloader() {
    dd.device.notification.hidePreloader({
      onSuccess: function(result) {
        /*{}*/
      },
      onFail: function(err) {}
    });
  },

  stopPullToRefresh() {
    dd.ui.pullToRefresh.stop();
  },

  disablePullToRefresh() {
    dd.ready(() => {
      dd.ui.pullToRefresh.disable();
    });
  },

  ddAlert(title, message, buttonName) {
    dd.ready(() => {
      dd.device.notification.alert({
        message: message,
        title: title, //可传空
        buttonName: buttonName,
        onSuccess: function() {
          //onSuccess将在点击button之后回调
          /*回调*/
        },
        onFail: function(err) {}
      });
    });
  }
};
