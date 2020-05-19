export const ymsUtil = {
    /***
     * 传入时间戳 获取 yyyy-mm-dd格式时间
     * @param obj example: Date.parse(new Date())
     * @returns {string} example: 2020-02-20
     */
    fmtDate(obj){
        var date =  new Date(obj);
        var y = 1900+date.getYear();
        var m = "0"+(date.getMonth()+1);
        var d = "0"+date.getDate();
        return y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length);
    },

    /***
     *
     * @param str 2020-04-03
     * @returns {string} 04月03日
     */
    fmtDate2(str) {
        return str.substring(5,7)+"月"+str.substring(8,10)+"日";
    },

    /***
     *
     * @param str 20200203000000
     * return 2020-02-03
     */
    fmtDate3(str) {
        return str.substring(0,4)+"-"+str.substring(4,6)+"-"+str.substring(6,8);
    }

}
