/* global $ */
import axios from "axios";
import Response from "./Response";
import store from "../store";
import router from "../router"
import {ddAPI} from "./ddAPI";

const serverConfig = require("@galaplat/utils/src/server.conf.json");
const busiSysCode = (() => {
    var str = window.location.pathname;
    if (str == "" || str == "/" || str.split("/").length < 3) {
        return "";
    }
    return str.split("/")[2];
})();
/**
 * 获取服务配置
 * @param {String} env 指定环境
 */
export const getServerConfig = function getServerConfig(env) {
    if (env) {
        return serverConfig.find(function (o) {
            return o.env === env.toUpperCase();
        });
    }
    const host = window.location.host;
    const protocol = window.location.protocol;
    let config = serverConfig.find(function (o) {
        return (
            (o.protocol ? o.protocol === protocol : true) &&
            (o.host + ":" + o.port === host || "" + o.host === host)
        );
    });
    if (!config) {
        config = serverConfig.find(function (o) {
            return o.env === "DEV";
        });
    }
    return config;
};

// 获取环境配置
const config = getServerConfig();
// 获取服务地址
const serviceUrl = `${config.protocol || window.location.protocol}//${
    config.server
}`;

// 添加接口请求前缀
axios.defaults.baseURL = config.env === "DEV" ? "/api" : serviceUrl;

// 正在请求中的接口数量
let requestingNum = 0,
    timeoutInt = 0;
const checkRequesting = () => {
    clearTimeout(timeoutInt);
    timeoutInt = setTimeout(() => {
        if (requestingNum > 0 && !$(".gloadingbar").is(":visible")) {
            store.commit("SHOW_LOADING");
        } else if (requestingNum === 0) {
            store.commit("HIDE_LOADING");
        }
    });
};

// 添加请求对象拦截器
axios.interceptors.request.use(
    config => {

        // let isLogin = localStorage.getItem("isLogin");
        // if (isLogin != 1) {
        //     ddAPI.loginAuth();
        //
        // }
        if (config.showloading) {
            requestingNum++;
        }
        checkRequesting();
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// 添加返回对象拦截器
axios.interceptors.response.use(
    response => {
        const res = new Response(response);

        //如果登录超时
        let sStauts = res.getResHeaders('session-state');
        if (sStauts == "time-out") {
            router.push({ name: 'login', query: { returnurl: router.history.current.fullPath }})
        }

        const showloading = res.getConfig("showLoading");
        if (showloading && requestingNum > 0) {
            requestingNum--;
        }
        checkRequesting();
        return res;
    },
    error => {
        try {
            if (err.response == undefined) {
                err.response = {}
                err.response.msg = '服务请求异常，请稍后重试!'
                err.response.status = -1
            }
            if (err.response.status.length < 8) {
                switch (err.response.status) {
                    case 401:
                        //utils.redirect.login()
                        alert("401 请登录")
                        // router.push({name: 'passport.login'})
                       router.push({name: 'home'})
                        break
                    case 403:
                        console.log('权限不足,请联系管理员!')
                        break
                    case -1:
                        break
                    default:
                        console.log(err.response.status)
                        err.response.msg = '未知异常，请稍后重试!'
                        // resp.msg = i18n.t('prompt.n' + resp.data.code);
                        break
                }
            }
        } catch (e) {
        }

        Promise.reject(error);
        const res = new Response(error.response);
        const showloading = res.getConfig("showLoading");
        if (showloading && requestingNum > 0) {
            requestingNum--;
        }
        checkRequesting();
        return res;
    }
);

/**
 * 获取请求主体
 * @param {Object} questData 请求数据
 * @param {String|Null} requestType json
 */
function getReqBody(questData, requestType) {
    let hasfile = false;
    for (let key in questData) {
        if (questData[key] == null) questData[key] = "";
        else if (!hasfile && questData[key].toString() == "[object File]") {
            hasfile = true;
        }
    }
    let formData;
    if (hasfile) {
        // 有文件类型的参数时
        formData = new FormData();
        for (let key in questData) {
            formData.append(key, questData[key]);
        }
    } else {
        if (requestType === "form") {
            // 使用form格式提交body
            let qs = require("qs");
            formData = qs.stringify(questData, {arrayFormat: "repeat"});
        } else {
            // 使用json格式提交
            formData = questData;
        }
    }
    let ContentType = "";
    if (hasfile) {
        ContentType = "multipart/form-data";
    } else if (requestType === "form") {
        ContentType = "application/x-www-form-urlencoded";
    } else {
        ContentType = "application/json";
    }
    return {
        "Content-Type": ContentType,
        body: formData
    };
}

export default {
    /**
     * 基础请求
     * @param {String} type get/post/put/delete
     * @param {Object} options 基于axios的config
     */
    default(type, options) {
        const config = {
            method: type,
            timeout: 0,
            withCredentials: true,
            showLoading: true,
            ...options,
            headers: {
                lang: "ZH",
                sysCode: busiSysCode,
                ...options.headers
            }
        };
        return axios.request(config);
    },
    /**
     * GET请求
     * @param {String} url 请求地址（eg: /api）
     * @param {Object} params 请求参数
     * @param {Object} options config
     */
    get(url, params, options = {}) {
        let config = {
            url,
            params,
            responseType: options.isBlob ? "blob" : "json",
            ...options
        };
        return this.default("get", config);
    },
    /**
     * POST请求
     * @param {String} url 请求地址（eg: /api）
     * @param {Object} data 请求主体
     * @param {Object} options config
     */
    post(url, data, options = {}) {
        const requestBody = getReqBody(data, options.requestType);
        let config = {
            url,
            data: requestBody.body,
            responseType: options.isBlob ? "blob" : "json",
            ...options,
            headers: {
                "Content-Type": requestBody["Content-Type"],
                ...(options.headers || {})
            }
        };
        return this.default("post", config);
    },
    /**
     * PUT请求
     * @param {String} url 请求地址（eg: /api）
     * @param {Object} data 请求主体
     * @param {Object} options config
     */
    put(url, data, options = {}) {
        const requestBody = getReqBody(data, options.requestType);
        let config = {
            url,
            data: requestBody.body,
            ...options,
            headers: {
                "Content-Type": requestBody["Content-Type"],
                ...(options.headers || {})
            }
        };
        return this.default("put", config);
    },
    /**
     * DELETE请求
     * @param {String} url 请求地址（eg: /api）
     * @param {Object} params 请求参数
     * @param {Object} options config
     */
    delete(url, params, options = {}) {
        let config = {
            url,
            params,
            ...options
        };
        return this.default("delete", config);
    }
};
