import request from "./request";

export const ApiExample = {
  async login(params) {
    const res = await request.post("mobile/login", params, { requestType: 'form' })
      if (res.code != 0) {
      alert(JSON.stringify(res))
    }
    return res;
  },

}
