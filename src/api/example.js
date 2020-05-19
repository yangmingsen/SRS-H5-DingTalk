import request from "./request";

export const ApiExample = {
    //登录接口
    async login(params) {
        return await request.post("mobile/login", params, {requestType: 'form'})
    },

    //移动端查询预定员工信息 params={selectDate: '2014-04-23', code: '001'}
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
    },

    //移动端查询选中座位预定情况 params={selectDate: '2014-04-23', code: '001'}
    async listSeatDateReservation(params) {
        return await request.get("mobile/reservation/listSeatDateReservation", params);
    },


    /**
     * 移动端员工进行预定
     * @param params params={reservationDates: ['2014-04-23','2014-04-24'], code:'001'}
     * @returns {Promise<*>}
     */
    async saveStaffReservation(params) {
        return await request.post("mobile/reservation/saveStaffReservation", params, {requestType: 'form'});
    }

}
