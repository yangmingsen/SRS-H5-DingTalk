import request from "./request";

export const ApiExample = {
  async list(params) {
    const res = await request.get("example/list", params);
    if (res.code === -1) {
      res.showMessage();
    }
  }
};
