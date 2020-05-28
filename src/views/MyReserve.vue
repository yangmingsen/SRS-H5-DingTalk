<template>
    <div class="my">
        <div class="my-top">
            <el-row>
                <el-col :span="12">
                    <div class="grid-content my-top-menu" @click="whenClickTopButton(1)" >
                        <div class="my-top-menu-one" :class="getTopButtonStyle(1)" >未来预定</div>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content my-top-menu" @click="whenClickTopButton(2)">
                        <div class="my-top-menu-two" :class="getTopButtonStyle(2)">历史预定</div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="my-body">
            <div v-if="selectButton == 1" class="my-body-reserved">

                <div class="show-div" v-if="switchPage == 1">
                    <div v-for="item in futureReservedData" :key="item.code" class="my-body-reserved-content" @click="whenUserClickTheFutureReservedData(item.storeyCode, item.reservationDate, item.storeyName)">
                        <el-row>
                            <el-col :span="4">
                                <div class="grid-content my-body-reserved-content-icon">

                                </div>
                            </el-col>
                            <el-col :span="20">
                                <div class="grid-content my-body-reserved-content-right">
                                    <el-row>
                                        <el-col :span="24">
                                            <div class="grid-content">
                                                <div class="my-body-reserved-content-right-floor">
                                                    {{item.storeyName}}
                                                </div>
                                            </div>
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="24">
                                            <div class="grid-content">
                                                <div class="my-body-reserved-content-right-SeatCode">
                                                    {{item.no}}号座
                                                </div>
                                            </div>
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="16">
                                            <div class="grid-content ">
                                                <div class="my-body-reserved-content-right-date">入座日期：{{showReservedDate(item.reservationDate)}}</div>
                                            </div>
                                        </el-col>
                                        <el-col :span="8">
                                            <div class="grid-content ">
                                                <div class="my-body-reserved-content-right-cancelButton"
                                                     :class="loadFutureReservedDataCancleButtonStyle(item.reservationDate)"
                                                     @click="whenUserClickTheFutureReservedAreaCancelButton(item.reservationDate, $event, item.code)">
                                                    取消选定
                                                </div>
                                            </div>
                                        </el-col>
                                    </el-row>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </div>

                <div v-if="switchPage == 0" class="my-body-blank">
                    <img class="my-body-blank-img" src="../assets/images/bg_noData_flush.png">
                    <div class="my-body-blank-hint">
                        <div class="nodata-hint">暂无数据</div>
                        <div class="suggestion-flush">建议您下拉刷新试试</div>
                    </div>
                </div>

            </div>
            <div v-if="selectButton == 2" class="my-body-history">

                <div class="my-body-history-filterdate">
                    <el-row>
                        <el-col :span="6">
                            <div class="grid-content my-body-history-filterdate-left">选择日期</div>
                        </el-col>
                        <el-col :span="18">
                            <div class="block">
                                <el-date-picker
                                        v-model="filterDateShow"
                                        type="month"
                                        placeholder="选择月"
                                        suffix-icon="el-icon-date"
                                        class="my-body-history-filterdate-right"
                                        :editable=false
                                        :clearable=false
                                >
                                </el-date-picker>
                            </div>

                        </el-col>
                    </el-row>
                </div>

                <div v-if="switchPage == 0" class="my-body-blank">
                    <img class="my-body-blank-img" src="../assets/images/bg_noData_flush.png">
                    <div class="my-body-blank-hint">
                        <div class="nodata-hint">暂无数据</div>
                        <div class="suggestion-flush">建议您下拉刷新试试</div>
                    </div>
                </div>

                <div class="my-body-history-content" v-if="switchPage == 2">
                    <div v-for="item in historyReservedData" class="my-body-history-record">
                        <el-row>
                            <el-col :span="1">
                                <div class="grid-content my-body-history-record-left">

                                </div>
                            </el-col>
                            <el-col :span="23">
                                <div class="grid-content">
                                    <el-row>
                                        <el-col :span="24">
                                            <div class="grid-content my-body-history-record-floor">
                                                {{item.storeyName}}
                                            </div>
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="10">
                                            <div class="grid-content my-body-history-record-SeatNo">
                                                <div class="">{{item.no}}号座</div>
                                            </div>
                                        </el-col>
                                        <el-col :span="14">
                                            <div class="grid-content my-body-history-record-SeatDate">
                                                <div class="">
                                                    入座日期：{{showReservedDate(item.reservationDate)}}
                                                </div>
                                            </div>
                                        </el-col>
                                    </el-row>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {ApiExample} from "../api/example";
    import {ddAPI} from "../api/ddAPI";
    import * as dd from "dingtalk-jsapi";
    import router from "../router";
    import {ymsUtil} from "../api/yUtils";

    export default {
        name: "MyReserve",
        data() {
            return {
                switchPage: 1, //0 未来预定(无数据)空白页, 1 未来预定(有数据)页, 2 历史预定页
                selectButton: 1, // 1.未来预定  2.历史预定
                filterDateShow: ymsUtil.fmtDate5(new Date),
                filterDate: ymsUtil.fmtDate5(new Date), //历史预定-当前日期
                futureReservedData: [

                ],
                historyReservedData: [
                    {
                        "no": "A001",
                        "storeyName": "10B第五层",
                        "reservationDate": "20200203000000"
                    },
                    {
                        "no": "A001",
                        "storeyName": "10B第五层",
                        "reservationDate": "20200203000000"
                    },
                    {
                        "no": "A001",
                        "storeyName": "10B第五层",
                        "reservationDate": "20200203000000"
                    },
                    {
                        "no": "A001",
                        "storeyName": "10B第五层",
                        "reservationDate": "20200203000000"
                    },
                    {
                        "no": "A001",
                        "storeyName": "10B第五层",
                        "reservationDate": "20200203000000"
                    },
                    {
                        "no": "A001",
                        "storeyName": "10B第五层",
                        "reservationDate": "20200203000000"
                    },
                    {
                        "no": "A001",
                        "storeyName": "10B第五层",
                        "reservationDate": "20200203000000"
                    },

                    {
                        "no": "A001",
                        "storeyName": "10B第五层",
                        "reservationDate": "20200203000000"
                    },
                    {
                        "no": "A001",
                        "storeyName": "10B第五层",
                        "reservationDate": "20200203000000"
                    },
                    {
                        "no": "A001",
                        "storeyName": "10B第五层",
                        "reservationDate": "20200203000000"
                    },
                ]
            }
        },
        methods: {

            loadFutureReservedDataCancleButtonStyle(dateStr) {
                let nowDate = ymsUtil.fmtDate(new Date);
                let str = ymsUtil.fmtDate4(ymsUtil.fmtDate33(dateStr));
                return {
                    //可选样式
                    'futurereserved-cancelbutton-disable' : nowDate == str,
                    'futurereserved-cancelbutton-enable' : nowDate != str
                    //不可选样式
                }

            },

            getTopButtonStyle(ic) {
                if (ic == 1) {
                    return {
                        'my-button-style-one': (this.selectButton==1 && ic==1),
                        'my-button-style-two': (this.selectButton==2 && ic==1)
                    }
                } else if (ic == 2) {
                    return {
                        'my-button-style-two': (this.selectButton==1 && ic==2),
                        'my-button-style-one': (this.selectButton==2 && ic==2)
                    }
                }
            },

            showReservedDate(str) {
              return ymsUtil.fmtDate33(str);
            },

            /***
             *
             * @param storeyCode floor Code
             * @param reservationDate  预定 date
             * @param storeyName floor Name
             */
            whenUserClickTheFutureReservedData(storeyCode, reservationDate, storeyName) {
                reservationDate = ymsUtil.fmtDate3(reservationDate);

                router.push({name: 'home', query: {storeyCode: storeyCode, reservationDate: reservationDate, storeyName: storeyName}})
            },

            /***
             *
             * @param dateStr ex：2020.4.2
             * @param ev ex：$event
             * @param code  ex：seatCode
             */
            whenUserClickTheFutureReservedAreaCancelButton(dateStr, ev, code) {
                ev.stopPropagation(); //prevent the bubbling envent

                let nowDate = ymsUtil.fmtDate(new Date);
                let str = ymsUtil.fmtDate3(dateStr);

                const that = this;

                if (nowDate != str) {
                    dd.ready(() => {
                        dd.device.notification.confirm({
                            message: "客官 真的要取消吗",
                            title: "提示",
                            buttonLabels: ['是', '否'],
                            onSuccess : function(result) {
                                //onSuccess将在点击button之后回调
                                /*
                                {
                                    buttonIndex: 0 //被点击按钮的索引值，Number类型，从0开始
                                }
                                */

                                if (result.buttonIndex == 0) {
                                    //handle the cancel reserved envent
                                    ddAPI.showPreloader("数据请求中...")
                                    ApiExample.deleteStaffReservation({code: code}).then(res => {
                                        ddAPI.hidePreloader();
                                        if (res.result.value == 0) {
                                            dd.device.notification.alert({
                                                message: "取消成功",
                                                title: "提示",//可传空
                                                buttonName: "确定",
                                                onSuccess : function() {
                                                    //onSuccess将在点击button之后回调
                                                    /*回调*/
                                                    //flush
                                                    that.loadFutureReservedData();
                                                },
                                                onFail : function(err) {}
                                            });
                                        }
                                    }).catch(err => {
                                        ddAPI.hidePreloader();
                                        ddAPI.ddAlert("提示", "网络请求失败,请重试哦", "确定")
                                    })
                                }

                            },
                            onFail : function(err) {}
                        });
                    })
                }

            },

            whenClickTopButton(id) {
                this.selectButton = id;


                //test for static data
                if (id == 1) {
                    //computed the height
                    this.loadFutureReservedData();
                    this.switchPage = 1;
                } else if (id == 2) {

                    this.filterDateShow= ymsUtil.fmtDate5(new Date),
                     this.filterDate=ymsUtil.fmtDate5(new Date), //历史预定-当前日期

                    //computed the history height
                    this.loadHistoryReservedData();
                    this.switchPage = 2;
                }

            },

            init() {
              //1. the reserved has data
                // 2.init the filter date

                const that = this;

                that.loadFutureReservedData();
            },

            loadFutureReservedData() {
                //1.request data from server
                //2.update page data
                //3.switch switchPage to 1

                const that = this;

                ddAPI.showPreloader("加载您的预定数据中...");
                ApiExample.listFutureReservation().then(res => {
                    ddAPI.hidePreloader();
                    that.futureReservedData = res.result;
                    if (res.result.length > 0) {
                        that.switchPage = 1;
                    } else {
                        that.switchPage = 0;
                    }

                }).catch(err => {
                    ddAPI.hidePreloader();
                    ddAPI.ddAlert("提示", "网络请求失败,请重新加载一下...", "确定")
                })

            },

            loadHistoryReservedData() {
                //1.request data from server
                //2.update page data
                //3.switch switchPage to 2

                const that = this;

                let dateStr = that.filterDate;
                let year = parseInt(dateStr.substring(0,4));
                let month = parseInt(dateStr.substring(5,7));
                ddAPI.showPreloader("加载您的历史预定数据中...");
                ApiExample.listHistoryReservation({year: year, month: month}).then(res => {
                    ddAPI.hidePreloader();
                    that.historyReservedData = res.result;
                    if (res.result.length > 0) {
                        that.switchPage = 2;
                    } else {
                        that.switchPage = 0;
                    }

                }).catch(err => {
                    ddAPI.hidePreloader();
                    ddAPI.ddAlert("提示", "网络请求失败,请重新加载一下...", "确定")
                })
            },

            enablePullToRefresh() {
                const that = this;
                dd.ready(() => {
                    dd.ui.pullToRefresh.enable({
                        onSuccess: function() {
                            ddAPI.stopPullToRefresh();
                            if (that.selectButton == 1) {
                                //加载未来预定数据
                                that.loadFutureReservedData();
                            } else if (that.selectButton == 2) {
                                //加载history 数据
                                that.loadHistoryReservedData();
                            }

                        },
                        onFail: function() {
                            ddAPI.stopPullToRefresh();
                        }
                    })
                })
            },

        },
        watch: {
            // add this reason: for enable or disable PullRefresh
            //note : all pullToRefresh opreation in hele or enablePullToRefresh mehtond
            switchPage: function () {
                const sp = this.switchPage;

                if (sp == 0) { //enable
                    this.enablePullToRefresh();
                } else { //disable
                    ddAPI.disablePullToRefresh();
                }
            },
            filterDateShow: function ( ) {
                //reload the history data after the filterDate update
                this.filterDate = ymsUtil.fmtDate5(this.filterDateShow);
                this.loadHistoryReservedData();
            }

        },
        mounted() {
            this.init()
        }
    }
</script>

<style lang="less" scoped>
    .my-body {
        margin-top: 4.2rem;
        margin-bottom: 4.4rem;
        .my-body-blank {
            .my-body-blank-img {
                margin-top: 8rem;
                width: 15rem;
            }
            //hint style
            .nodata-hint {
                font-weight: bold;
            }

            .suggestion-flush {
                margin-top: 0.6rem;
                color: #9a9a9a;
            }
        }
        .my-body-reserved {
            width: 100%;
            overflow-y: scroll;
            .my-body-reserved-content {
                border: 1px solid #C3EEF4;
                border-radius: 10px;
                margin: 8px 0;

                .my-body-reserved-content-icon {
                    background-image: url("../assets/images/icon_3 .png");
                    background-repeat: no-repeat;
                    background-size: 62%;
                    height: 5rem;
                    background-position-x: center;
                    background-position-y: 0.6rem;
                }

                .my-body-reserved-content-right {
                    text-align: left;
                    padding-left: 9px;


                    .my-body-reserved-content-right-floor {
                        margin-top: 3px;
                        font-size: 0.9rem;
                    }

                    .my-body-reserved-content-right-SeatCode {
                        font-size: 1.3rem;
                        font-weight: bold;
                    }

                    .my-body-reserved-content-right-date {
                        font-size: 0.8rem;
                        padding-top: 3px;
                        color: #4D4D4D;
                    }

                    .my-body-reserved-content-right-cancelButton {
                        /*border: 1px solid #37C9DA;*/
                        text-align: center;
                        margin-right: 5px;
                        margin-bottom: 5px;
                        border-radius: 6px;
                        font-size: 0.8rem;
                        /*background-color: #37C9DA;*/
                        /*color: #ffffff;*/
                        padding: 2px 0;
                    }

                }
            }
        }
        .my-body-history {
            /*position: relative;*/
            .my-body-history-filterdate {
                position: fixed;
                z-index: 1;
                top: 4.1rem;
                width: 100%;
                background-color: #fff;
                margin-left: -4%;
                .my-body-history-filterdate-left {
                    color: #00afa5;
                    font-size: 1rem;
                    padding-top: 0.8rem;
                    padding-left: 1rem;
                }
                .my-body-history-filterdate-right {
                    font-size: 1rem;
                    padding: 0.5rem 0;
                    width: 100%;
                }
                .my-body-history-filterdate-right /deep/ .el-input__inner {
                    border: 1px solid #C3EFF4;
                    border-radius: 10px;
                    color: #00afa5;
                    padding-left: 0.9rem;
                    height: 32px;
                }


                .my-body-history-filterdate-right /deep/ .el-input__prefix {
                    color: #00afa5;
                    font-size: 1rem;
                    left: 90%;
                }
            }
            .my-body-history-content {
                width: 100%;
                margin-top: 7.7rem;
                .my-body-history-record {
                    margin-top: 0.8rem;
                    border: 1px solid #D6EFEC;
                    border-radius: 8px;
                    .my-body-history-record-left {
                        background-color: #79D2CC;
                        height: 65px;
                        border-bottom-left-radius: 8px ;
                        border-top-left-radius: 8px ;
                    }
                    .my-body-history-record-floor {
                        text-align: left;
                        padding-left: 1rem;
                        font-size: 0.8rem;
                        color: #4D4D4D;
                        padding-top: 0.5rem;
                    }
                    .my-body-history-record-SeatNo {
                        text-align: left;
                        padding-left: 1rem;
                        font-size: 1.3rem;
                        padding-top: 0.3rem;
                        font-weight: bold;
                        color: #4D4D4D;
                    }
                    .my-body-history-record-SeatDate {
                        font-size: 0.8rem;
                        text-align: right;
                        padding-top: 0.9rem;
                        padding-right: 0.5rem;
                        color: #00afa5;
                    }
                }
            }
        }
    }

    .my-button-style-one {
        background-color: #00afa5;
        color: #ffffff;
    }
    .my-button-style-two {
        background-color: #E9F9FB;
        color: #00afa5;
    }

    .futurereserved-cancelbutton-enable {
        border: 1px solid #37C9DA;
        background-color: #37C9DA;
        color: #ffffff;
    }
    .futurereserved-cancelbutton-disable {
        color: #595959;
        background-color: #919191;
        border: 1px solid #919191;
    }

    .my-top {
        height: 4rem;
        margin-left: -2%;
        width: 104%;
        border-top: 1px solid #E6E6E6;
        border-bottom: 1px solid #E6E6E6;
        position: fixed;
        top: 0;
        z-index: 1;
        background-color: #fff;
        .my-top-menu {
            margin-top: 0.5rem;
            margin-bottom: 7%;
            height: 3rem;
            font-size: 1rem;

            .my-top-menu-one {
                /*background-color: #00afa5;*/
                margin-left: 45%;
                border-top-left-radius: 10px;
                border-bottom-left-radius: 10px;
                padding: 11px 0;
                /*color: #ffffff;*/
            }

            .my-top-menu-two {
                /*background-color: #E9F9FB;*/
                margin-right: 45%;
                border-top-right-radius: 10px;
                border-bottom-right-radius: 10px;
                padding: 11px 0;
                /*color: #00afa5;*/
            }

        }


    }
</style>
