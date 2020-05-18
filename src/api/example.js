import request from "./request";

export const ApiExample = {
    //登录接口
    async login(params) {
        return await request.post("mobile/login", params, {requestType: 'form'})
    },

    //移动端查询预定员工信息
    async getReservationStaff(params) {
        return await request.get("mobile/reservation/getReservationStaff", params)
    },


    //移动端查询楼层信息
    storeyList() {
        return request.get("mobile/storey/list");
    },

    //移动端查询座位布局图
    seatList(params) {
        return request.get("mobile/seat/list", params);
    }

}
