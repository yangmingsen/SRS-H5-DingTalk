import da from "element-ui/src/locale/lang/da";

export const ymsUtil = {
    /***
     * <p> 传入时间戳 获取 yyyy-mm-dd格式时间 </p>
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
     * <p> DateObj => yyyy-mm </p>
     * @param obj Date obj
     * @returns {string} 2020-07
     */
    fmtDate5(obj) {
        var date =  new Date(obj);
        var y = 1900+date.getYear();
        var m = "0"+(date.getMonth()+1);
        return y+"-"+m.substring(m.length-2,m.length);
    },

    /***
     * <p> yyyy-mm-dd => yy月dd日 </p>
     * @param str 2020-04-03
     * @returns {string} 04月03日
     */
    fmtDate2(str) {
        return str.substring(5,7)+"月"+str.substring(8,10)+"日";
    },

    /***
     * <p> esrDate: yyyymmdd000000 =>yyyy-mm-dd </p>
     * @param str 20200203000000
     * return 2020-02-03
     */
    fmtDate3(str) {
        return str.substring(0,4)+"-"+str.substring(4,6)+"-"+str.substring(6,8);
    },

    /**
     * <p> esrDate: yyyymmdd000000 =>yyyy.mm.dd </p>
     * @param str 20200203000000
     * return 2020.3.3
     */
    fmtDate33(str) {
        let str2 = this.fmtDate3(str);
        let dateSplits = str2.split("-");
        return dateSplits[0]+"."+parseInt(dateSplits[1])+"."+parseInt(dateSplits[2]);
    },

    /**
     * <p> yyyy.mm.dd  =>yyyy-mm-dd </p>
     * @param str 2020.5.12 2020.5.1 2020.12.12
     *  2020-05-12 2020-05-01 20202-12-12
     */
    fmtDate4(dateStr) {
        let dateSplits = dateStr.split(".");
        let month = parseInt(dateSplits[1]);
        if (month < 10) {
            month = "0"+month;
        }
        let day = parseInt(dateSplits[2]);
        if (day < 10) {
            day = "0"+day;
        }

        return dateSplits[0]+"-"+month+"-"+day;
    },

    /***
     * 判断指定日期是否在 某个日期范围内(now,+14)
     * <p>curDate: 当天日期</p>
     * <p>selDate: 制定要比较的Day</p>
     * <p> Ok = true</p>
     * @param obj
     */
    theSpecificDateIsInRange(curDate, selDate) {
        let startDate =this.getStartDate(curDate);

        let endDate = this.getEndDate(curDate);

        let currentDate = new Date(selDate);

        if (currentDate >= startDate && currentDate <= endDate) {
            return true;
        }
        return false;
    },

    getStartDate(curDate) {
        return new Date(curDate);
    },
    getEndDate(curDate) {
        let startDate = this.getStartDate(curDate);

        let nowIs = startDate.getDay();
        if (nowIs == 0) {
            nowIs = 7;
        }

        let addNum = 14-nowIs;
        let endDate = new Date(curDate);
        endDate.setDate(endDate.getDate()+addNum);

        return endDate;
    }


}
