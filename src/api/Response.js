import { Message } from "element-ui";

export default class Response {
  #response = {
    // `data` 由服务器提供的响应
    data: {},
    // `status` 来自服务器响应的 HTTP 状态码
    status: 0,
    // `statusText` 来自服务器响应的 HTTP 状态信息
    statusText: "",
    // `headers` 服务器响应的头
    headers: {},
    // `config` 是为请求提供的配置信息
    config: {}
  };
  constructor(res) {
    this.#response = res;
    this.code = res.data ? res.data.code : -1;
    this.result = res.data ? res.data.result : null;
    this.msg = res.data ? res.data.msg : "请求失败";
  }

  /**
   * 获取返回信息头
   */
  getResHeaders() {
    return this.#response.headers;
  }

  /**
   * 显示返回信息
   */
  showMessage() {
    const type = +this.code === 1 ? "success" : "error";
    Message[type](this.msg);
  }

  /**
   * 获取config配置里的某个配置信息
   * @param {Stirng} field 字段名
   */
  getConfig(field) {
    return this.#response.config[field];
  }
}
