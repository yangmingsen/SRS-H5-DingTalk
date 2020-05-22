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
    },

    /***
     * 移动端查询员工未来预定 http://showdoc.esrcloud.com/index.php?s=/2&page_id=1430
     * @returns {Promise<*>}
     */
    async listFutureReservation() {
        return await request.get("mobile/reservation/listFutureReservation");
    },

    /***
     * 移动端员工取消预定 http://showdoc.esrcloud.com/index.php?s=/2&page_id=1431
     * @param params
     * @returns {Promise<*>}
     */
    async deleteStaffReservation(params) {
      return await request.delete("mobile/reservation/deleteStaffReservation", params);
    },

    /***
     * 移动端查询历史预定 http://showdoc.esrcloud.com/index.php?s=/2&page_id=1432
     * @param params
     * @returns {Promise<*>}
     */
    async listHistoryReservation(params) {
        return await request.get("mobile/reservation/listHistoryReservation", params);
    }


}
