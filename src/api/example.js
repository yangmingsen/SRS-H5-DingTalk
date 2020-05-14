import request from "./request";

export const ApiExample = {
  async login(params) {
    const res = await request.post("mobile/login", params, { requestType: 'form' })

    if (res.code != 0) {
      alert(JSON.stringify(res))
    }
    return res;
  },

//楼层表
 storeyList() {
    return  request.get("mobile/storey/list");
  },

  //座位布局表
 seatList(params) {
    return request.get("mobile/seat/list",params);
    // if (res.code != 0) {
    //   alert(JSON.stringify(res))
    // }
    //
    // return res;
  }

}
