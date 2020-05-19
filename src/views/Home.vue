<template>
    <div class="home" @click="whenClickHome()">
        <div class="filterarea">
            <div class="filterarea-date" @click="dateChoose">
                <el-input
                        suffix-icon="el-icon-date"
                        :readonly=true
                        v-model="selectDate"
                        class="filterarea-date-input">
                </el-input>
            </div>
            <div class="filterarea-floor" @click="floorChoose">
                <el-input
                        suffix-icon="el-icon-caret-right"
                        :readonly=true
                        v-model="floorShowMsg"
                        class="filterarea-floor-input">
                </el-input>
            </div>
        </div>
        <div class="blankarea" v-show="isShowData">
            <img class="blankarea-img" src="../assets/images/bg_noData_chf.png">
            <div class="txt-empty">
                <div class="nodata">暂无数据</div>
                <div class="hintchoosefloor">请先选择您工作的楼层</div>
            </div>
        </div>
        <div class="choosearea" v-show="!isShowData">
            <div class="choosearea-hint">
                <el-row>
                    <el-col :span="6">
                        <div class="grid-content bg-purple choosearea-hint-seat bg-purple1" style="font-size: 0.6rem">
                            可选
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple choosearea-hint-seat bg-purple2" style="font-size: 0.6rem">
                            已选
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple choosearea-hint-seat bg-purple3" style="font-size: 0.6rem">
                            我的座位
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple choosearea-hint-seat bg-purple4" style="font-size: 0.6rem">
                            已被预订
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div class="chooseseat">
                <div class="choosefloor choosearea-10B5" v-if="floorSelect == 1">
                    <!--                   第一层-->
                    <div v-for="item in seatBaseInfo" :index="item.code" class="user-seat" :class="getClass(item)"
                         @click="whenClickSeat(item.code, $event)" :style="{top: item.top, left: item.left}"></div>
                </div>
                <div class="choosefloor choosearea-10B6" v-if="floorSelect == 2">10b6</div>
                <div class="choosefloor choosearea-10B7" v-if="floorSelect == 3">10b7</div>
                <div class="choosefloor choosearea-13B5" v-if="floorSelect == 4">13b5</div>

            </div>

        </div>

        <!--                座位预定提示-->
        <div class="seat-reserved-hint" v-if="seatReservedHint">
            <el-row>
                <el-col :span="24">
                    <div class="grid-content bg-purple" style="font-size: 1.5rem; font-weight: bold">{{seatReservedHintData.no}}</div>
                </el-col>
            </el-row>
            <el-row class="seat-reserved-hint-dept">
                <el-col :span="12">
                    <div class="grid-content bg-purple bg-purple11">{{seatReservedHintData.userName}}</div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content bg-purple ">{{seatReservedHintData.departmentName}}</div>
                </el-col>
            </el-row>
        </div>
        <!--                座位预定中-->
        <div class="seat-reserving" v-if="seatReserving" @click.stop="">
            <div class="seat-reserving-top">
                <el-row>
                    <el-col :span="12">
                        <div class="grid-content seat-reserving-top-left">{{selectItem}}号座</div>
                    </el-col>
                    <el-col :span="12">
                        <div class="grid-content seat-reserving-top-right" @click="submitUserChooseSeatData">
                            我要预定
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div class="reserving-scroll">
                <div class="seat-reserving-choose">
                    <div v-for="item of seatReservingData" class="seat-reserving-choose-date" :class="getClass2(item)" @click="whenUserClickDate(item)">{{showSeatReservingDate(item.seatDate)}}</div>
                </div>
            </div>
        </div>

    </div>

</template>

<script>
    // @ is an alias to /src
    import * as dd from 'dingtalk-jsapi';
    import {ApiExample} from "../api/example"
    import {ddAPI} from "../api/ddAPI";
    import {ymsUtil} from "../api/yUtils";

    export default {
        name: "Home",
        components: {},
        data() {
            return {
                //基础类数据
                selectDate: "2020-05-13", //用户当前选择日期

                floorShowMsg: "座位所属楼层", //楼层选择显示信息, 默认为"座位所属楼层"

                floorSelectedKey: null, //表示用户选择的楼层，默认为Null

                isShowData: true, // true=用户没有选择楼层(默认),   false 用户选择了楼层

                floorSelect: 1, //1=10b5, 2=10b6, 3=10b7, 4=13b5,

                seatCanSelect: true,  //用户在当前日期是否可选 默认可选

                //当前座位布局图数据 [{"code":"001", "no":"A001", "state":0},  {"code":"002", "no":"A002", "state":1}]
                // 状态：0-可选；1-不可选；2-已被预订；3-我的座位
                seatData: [],

                floorData: [], //记录楼层数据 [1,2,3,4]

                selectItem: '', //标记用户当前选择的可选座位

                //10b5楼座位样式数据 static
                seatBaseInfo: [
                    //第一层
                    {code: '041', class: 'rotate90', top: '1%', left: '3%'},
                    {code: '042', class: 'rotate90', top: '6.6%', left: '3%'},
                    {code: '043', class: 'rotate90', top: '12.2%', left: '3%'},
                    {code: '035', class: 'rotate270', top: '1%', left: '12%'},
                    {code: '036', class: 'rotate270', top: '6.6%', left: '12%'},
                    {code: '037', class: 'rotate270', top: '12.2%', left: '12%'},

                    {code: '029', class: 'rotate90', top: '1%', left: '22%'},
                    {code: '030', class: 'rotate90', top: '6.6%', left: '22%'},
                    {code: '031', class: 'rotate90', top: '12.2%', left: '22%'},
                    {code: '023', class: 'rotate270', top: '1%', left: '30%'},
                    {code: '024', class: 'rotate270', top: '6.6%', left: '30%'},
                    {code: '025', class: 'rotate270', top: '12.2%', left: '30%'},

                    {code: '018', class: 'rotate90', top: '6.6%', left: '40%'},
                    {code: '019', class: 'rotate90', top: '12.2%', left: '40%'},
                    {code: '013', class: 'rotate270', top: '6.6%', left: '48.4%'},
                    {code: '014', class: 'rotate270', top: '12.2%', left: '48.4%'},

                    {code: '007', class: 'rotate90', top: '1%', left: '58.5%'},
                    {code: '008', class: 'rotate90', top: '6.6%', left: '58.5%'},
                    {code: '009', class: 'rotate90', top: '12.2%', left: '58.5%'},
                    {code: '001', class: 'rotate270', top: '1%', left: '66.8%'},
                    {code: '002', class: 'rotate270', top: '6.6%', left: '66.8%'},
                    {code: '003', class: 'rotate270', top: '12.2%', left: '66.8%'},


                    //第二层
                    {code: '044', class: 'rotate90', top: '21.5%', left: '3%'},
                    {code: '045', class: 'rotate90', top: '27.1%', left: '3%'},
                    {code: '046', class: 'rotate90', top: '32.7%', left: '3%'},
                    {code: '038', class: 'rotate270', top: '21.5%', left: '12%'},
                    {code: '039', class: 'rotate270', top: '27.1%', left: '12%'},
                    {code: '040', class: 'rotate270', top: '32.7%', left: '12%'},

                    {code: '032', class: 'rotate90', top: '21.5%', left: '22%'},
                    {code: '033', class: 'rotate90', top: '27.1%', left: '22%'},
                    {code: '034', class: 'rotate90', top: '32.7%', left: '22%'},
                    {code: '026', class: 'rotate270', top: '21.5%', left: '30%'},
                    {code: '027', class: 'rotate270', top: '27.1%', left: '30%'},
                    {code: '028', class: 'rotate270', top: '32.7%', left: '30%'},

                    {code: '020', class: 'rotate90', top: '21.5%', left: '40%'},
                    {code: '021', class: 'rotate90', top: '27.1%', left: '40%'},
                    {code: '022', class: 'rotate90', top: '32.7%', left: '40%'},
                    {code: '015', class: 'rotate270', top: '21.5%', left: '48.4%'},
                    {code: '016', class: 'rotate270', top: '27.1%', left: '48.4%'},
                    {code: '017', class: 'rotate270', top: '32.7%', left: '48.4%'},

                    {code: '010', class: 'rotate90', top: '21.5%', left: '58.5%'},
                    {code: '011', class: 'rotate90', top: '27.1%', left: '58.5%'},
                    {code: '012', class: 'rotate90', top: '32.7%', left: '58.5%'},
                    {code: '004', class: 'rotate270', top: '21.5%', left: '68.8%'},
                    {code: '005', class: 'rotate270', top: '27.1%', left: '68.8%'},
                    {code: '006', class: 'rotate270', top: '32.7%', left: '68.8%'},


                    //第三层
                    {code: '049', class: 'rotate90', top: '41.2%', left: '3%'},
                    {code: '050', class: 'rotate90', top: '46.2%', left: '3%'},
                    {code: '047', class: 'rotate90', top: '41.2%', left: '10%'},
                    {code: '048', class: 'rotate90', top: '46.2%', left: '10%'},


                    //第四层
                    {code: '129', class: '', top: '73.5%', left: '3.5%'},
                    {code: '128', class: '', top: '73.5%', left: '11.5%'},

                    {code: '131', class: 'rotate180', top: '77.9%', left: '3.5%'},
                    {code: '130', class: 'rotate180', top: '77.9%', left: '11.5%'},
                    {code: '133', class: '', top: '84.6%', left: '3.5%'},
                    {code: '132', class: '', top: '84.6%', left: '11.5%'},

                    {code: '135', class: 'rotate180', top: '88.8%', left: '3.5%'},
                    {code: '134', class: 'rotate180', top: '88.8%', left: '11.5%'},

                    //第五层1
                    {code: '057', class: '', top: '41%', left: '23.3%'},
                    {code: '056', class: '', top: '41%', left: '30.3%'},
                    {code: '055', class: '', top: '41%', left: '37.3%'},
                    {code: '054', class: '', top: '41%', left: '44.3%'},
                    {code: '053', class: '', top: '41%', left: '51.3%'},
                    {code: '052', class: '', top: '41%', left: '58.3%'},
                    {code: '051', class: '', top: '41%', left: '65.3%'},

                    //第五层2
                    {code: '064', class: 'rotate180', top: '46.5%', left: '23.3%'},
                    {code: '063', class: 'rotate180', top: '46.5%', left: '30.3%'},
                    {code: '062', class: 'rotate180', top: '46.5%', left: '37.3%'},
                    {code: '061', class: 'rotate180', top: '46.5%', left: '44.3%'},
                    {code: '060', class: 'rotate180', top: '46.5%', left: '51.3%'},
                    {code: '059', class: 'rotate180', top: '46.5%', left: '58.3%'},
                    {code: '058', class: 'rotate180', top: '46.5%', left: '65.3%'},

                    {code: '071', class: '', top: '52.9%', left: '23.3%'},
                    {code: '070', class: '', top: '52.9%', left: '30.3%'},
                    {code: '069', class: '', top: '52.9%', left: '37.3%'},
                    {code: '068', class: '', top: '52.9%', left: '44.3%'},
                    {code: '067', class: '', top: '52.9%', left: '51.3%'},
                    {code: '066', class: '', top: '52.9%', left: '58.3%'},
                    {code: '065', class: '', top: '52.9%', left: '65.3%'},

                    //第五层3
                    {code: '078', class: 'rotate180', top: '56.8%', left: '23.3%'},
                    {code: '077', class: 'rotate180', top: '56.8%', left: '30.3%'},
                    {code: '076', class: 'rotate180', top: '56.8%', left: '37.3%'},
                    {code: '075', class: 'rotate180', top: '56.8%', left: '44.3%'},
                    {code: '074', class: 'rotate180', top: '56.8%', left: '51.3%'},
                    {code: '073', class: 'rotate180', top: '56.8%', left: '58.3%'},
                    {code: '072', class: 'rotate180', top: '56.8%', left: '65.3%'},

                    {code: '085', class: '', top: '62.9%', left: '23.3%'},
                    {code: '084', class: '', top: '62.9%', left: '30.3%'},
                    {code: '083', class: '', top: '62.9%', left: '37.3%'},
                    {code: '082', class: '', top: '62.9%', left: '44.3%'},
                    {code: '081', class: '', top: '62.9%', left: '51.3%'},
                    {code: '080', class: '', top: '62.9%', left: '58.3%'},
                    {code: '079', class: '', top: '62.9%', left: '65.3%'},

                    //第五层4
                    {code: '092', class: 'rotate180', top: '67%', left: '23.3%'},
                    {code: '091', class: 'rotate180', top: '67%', left: '30.3%'},
                    {code: '090', class: 'rotate180', top: '67%', left: '37.3%'},
                    {code: '089', class: 'rotate180', top: '67%', left: '44.3%'},
                    {code: '088', class: 'rotate180', top: '67%', left: '51.3%'},
                    {code: '087', class: 'rotate180', top: '67%', left: '58.3%'},
                    {code: '086', class: 'rotate180', top: '67%', left: '65.3%'},

                    {code: '099', class: '', top: '73.2%', left: '23.3%'},
                    {code: '098', class: '', top: '73.2%', left: '30.3%'},
                    {code: '097', class: '', top: '73.2%', left: '37.3%'},
                    {code: '096', class: '', top: '73.2%', left: '44.3%'},
                    {code: '095', class: '', top: '73.2%', left: '51.3%'},
                    {code: '094', class: '', top: '73.2%', left: '58.3%'},
                    {code: '093', class: '', top: '73.2%', left: '65.3%'},

                    //第五层5
                    {code: '106', class: 'rotate180', top: '77.3%', left: '23.3%'},
                    {code: '105', class: 'rotate180', top: '77.3%', left: '30.3%'},
                    {code: '104', class: 'rotate180', top: '77.3%', left: '37.3%'},
                    {code: '103', class: 'rotate180', top: '77.3%', left: '44.3%'},
                    {code: '102', class: 'rotate180', top: '77.3%', left: '51.3%'},
                    {code: '101', class: 'rotate180', top: '77.3%', left: '58.3%'},
                    {code: '100', class: 'rotate180', top: '77.3%', left: '65.3%'},

                    {code: '113', class: '', top: '83.2%', left: '23.3%'},
                    {code: '112', class: '', top: '83.2%', left: '30.3%'},
                    {code: '111', class: '', top: '83.2%', left: '37.3%'},
                    {code: '110', class: '', top: '83.2%', left: '44.3%'},
                    {code: '109', class: '', top: '83.2%', left: '51.3%'},
                    {code: '108', class: '', top: '83.2%', left: '58.3%'},
                    {code: '107', class: '', top: '83.2%', left: '65.3%'},

                    //第五层6
                    {code: '120', class: 'rotate180', top: '87.5%', left: '23.3%'},
                    {code: '119', class: 'rotate180', top: '87.5%', left: '30.3%'},
                    {code: '118', class: 'rotate180', top: '87.5%', left: '37.3%'},
                    {code: '117', class: 'rotate180', top: '87.5%', left: '44.3%'},
                    {code: '116', class: 'rotate180', top: '87.5%', left: '51.3%'},
                    {code: '115', class: 'rotate180', top: '87.5%', left: '58.3%'},
                    {code: '114', class: 'rotate180', top: '87.5%', left: '65.3%'},

                    {code: '127', class: '', top: '93.6%', left: '23.3%'},
                    {code: '126', class: '', top: '93.6%', left: '30.3%'},
                    {code: '125', class: '', top: '93.6%', left: '37.3%'},
                    {code: '124', class: '', top: '93.6%', left: '44.3%'},
                    {code: '123', class: '', top: '93.6%', left: '51.3%'},
                    {code: '122', class: '', top: '93.6%', left: '58.3%'},
                    {code: '121', class: '', top: '93.6%', left: '65.3%'},

                ],
                //end of 基础数据


                //弹窗类数据
                seatReservedHint: false, //弹窗：已被预定人信息
                seatReservedHintData: {
                    no: "A001",
                    userName: "杨铭森",
                    departmentName: "流程IT中心"
                },
                seatReserving: false, //弹窗：用户点击可选座位
                //：0-可选；1-已被预订；2-当前用户已预定
                //服务器返回数据
                seatReservingData: [],
                //用户当前选择数据
                seatReservingUserChooseData: {
                    reservationDates: [],
                    code: ""
                }
                //end of 弹窗类数据

            }
        },
        methods: {
            //加载座位class
            getClass(item) {
                const that = this;
                let seatInfo = that.seatData;
                let status = ''

                let isHave = false;
                for (let i in seatInfo) {
                    let x = seatInfo[i]

                    if (x.code == item.code) {
                        status = x.state
                        isHave = true;
                        break
                    }
                }
                var classes = {}
                if (isHave) {
                    classes = {
                        'seat-status-zero': status == 0,
                        'seat-status-one': status == 1,
                        'seat-status-two': status == 2,
                        'seat-status-three': status == 3,
                        'seat-status-four': status == 4,
                        'selected': this.selectItem == item.code
                    }
                } else {
                    classes = {
                        'seat-status-one': false
                    }
                }

                classes[item.class] = true;
                return classes

            },

            //加载可选座位弹窗class
            getClass2(item) {
                return {
                    'seat-icon-choosable': item.state == 0,
                    'seat-icon-dischoosable': item.state == 1,
                    'seat-icon-reserved': item.state == 2,
                    'seat-icon-checking': item.state == 3
                }
            },

            showSeatReservingDate(str) {
                return ymsUtil.fmtDate2(str);
            },

            //当用户点击我要预定时
            submitUserChooseSeatData() {
                const that = this;

                if (that.seatReservingUserChooseData.reservationDates.length < 1) {
                    alert("亲 您还没有选择座位哦");
                } else {
                    //提交数据到服务API
                    ddAPI.showPreloader("提交数据中...");
                    ApiExample.saveStaffReservation(that.seatReservingUserChooseData).then(res => {
                        ddAPI.hidePreloader();

                        if (!res.result.value) {
                            alert("预定成功");
                            //关闭座位日期挑选弹框
                            that.seatReserving = false;
                            that.clearSeatReservingUserChooseData();
                        } else {
                            alert("预定失败,请重试!");
                        }

                    }).catch(err => {
                        ddAPI.hidePreloader();
                        alert("请求失败, 请重试");
                    });
                }

            },

            //当用户可选座位弹窗上点击可选日期时
            whenUserClickDate(item) {
                let state = item.state;
                const that = this;
                if (state == 0) {
                    item.state = 3;
                    that.seatReservingUserChooseData.reservationDates.push(item.seatDate);
                } else if (state == 3) {
                    item.state = 0;
                    let dates = that.seatReservingUserChooseData.reservationDates;
                    let idx = -1;
                    for (let i = 0; i < dates.length; i++) {
                        if (dates[i] == item.seatDate) {
                            idx = i;
                            break;
                        }
                    }

                    if (idx > -1) {
                        dates.splice(idx, 1);
                    }
                }
            },

            //清空 当前座位标记 用户当前的reservationDates 和 code
            clearSeatReservingUserChooseData() {
                this.selectItem = ''; //清空当前选择标记
                this.seatReservingUserChooseData.reservationDates = [];
                this.seatReservingUserChooseData.code = '';
            },

            //当用户点击选择楼层时
            floorChoose() {
                const that = this
                ApiExample.storeyList().then(res => {
                    that.floorData = [];
                    res.result.forEach(x => {
                        let tuple = {key: x.name, value: x.code}
                        that.floorData.push(tuple)
                    });
                    dd.ready(() => {
                        dd.biz.util.chosen({
                            source: that.floorData,
                            selectedKey: that.floorSelectedKey == null ? null : that.floorSelectedKey, // 默认选中的key
                            onSuccess: function (result) {
                                //onSuccess将在点击完成之后回调
                                /*
                                {
                                    key: '选项2',
                                    value: '234'
                                }
                                */
                                that.isShowData = false; //取消默认空白页

                                that.floorShowMsg = result.key; //更新楼层选择提示
                                that.floorSelectedKey = result.key; //更新用户当前选择
                                that.floorSelect = result.value //记录用户选择的Code


                                that.loadFloorData();

                                // ddAPI.showPreloader("加载楼层数据中...");
                                // //获取座位布局图数据
                                // ApiExample.seatList({code: that.floorSelect, selectDate: that.selectDate}).then(res => {
                                //      that.seatData = res;
                                //     ddAPI.hidePreloader();
                                //     //从新计算高度
                                //     that.resizeEvent();
                                // });
                            },
                            onFail: function (err) {
                                //alert("floorChoose Error")
                            }
                        })
                    })

                }).catch(err => {
                    // callback(err)
                })
            },

            //加载楼层数据
            loadFloorData() {
                const that = this;
                ddAPI.showPreloader("加载楼层数据中...");
                //获取座位布局图数据
                ApiExample.seatList({code: that.floorSelect, selectDate: that.selectDate}).then(res => {
                    that.seatData = res.result;

                    that.seatCanSelect = true; //从新加载时为true
                    for (let i = 0; i < that.seatData.length; i++) {
                        let st = that.seatData[i];
                        if (st.state == 3) {
                            that.seatCanSelect = false;
                            break;
                        }
                    }

                    ddAPI.hidePreloader();
                    //从新计算高度
                    that.resizeEvent();
                });
            },


            //当用户选择日期时
            dateChoose() {
                const that = this;
                dd.ready(() => {
                    dd.biz.util.datepicker({
                        format: 'yyyy-MM-dd',//注意：format只支持android系统规范，即2015-03-31格式为yyyy-MM-dd
                        value: that.selectDate, //默认显示日期
                        onSuccess: function (result) {
                            //onSuccess将在点击完成之后回调
                            /*{
                                value: "2015-02-10"
                            }
                            */
                            that.selectDate = result.value
                            that.loadFloorData();
                        },
                        onFail: function (err) {
                        }
                    })
                });
            },

            resizeEvent() {
                this.$nextTick(() => {
                    document.getElementsByClassName("chooseseat")[0].style.height = (document.documentElement.clientHeight -
                        document.getElementsByClassName("filterarea")[0].offsetHeight -
                        document.getElementsByClassName("choosearea-hint")[0].offsetHeight -
                        document.getElementsByClassName("footer")[0].offsetHeight -
                        10) + 'px'
                    var choosefloors = document.getElementsByClassName("choosefloor")
                    for (var i = 0; i < choosefloors.length; i++) {
                        choosefloors[i].style.height = ((1299 / 1126) * choosefloors[i].clientWidth) + 'px'
                    }
                })
            },
            resizeDateWidth() {
                this.$nextTick(() => {
                    document.getElementsByClassName("seat-reserving-choose")[0].style.minWidth =
                        (document.getElementsByClassName("seat-reserving-choose-date").length * 7.4 + 0.6) + 'rem'
                })
            },

            //当点击座位时
            whenClickSeat(code, ev) {
                //ev.stopPropagation() 阻止冒泡  //1.阻止默认事件?
                const that = this;
                let seat = this.getSomeSeatInfo(code);

                //if 当前座位可选
                if (seat.state == 0) {
                    if (that.seatCanSelect == true) {
                        that.clearSeatReservingUserChooseData();
                        ddAPI.showPreloader("拼命加载中...");

                        ev.stopPropagation();
                        that.selectItem = code; //更新选中图标
                        that.seatReservingUserChooseData.code = seat.no; //设置当前选中座位的座位号

                        ApiExample.listSeatDateReservation({selectDate: that.selectDate, code: code}).then(res => {
                            // that.seatReservingData = res.result;
                            ddAPI.hidePreloader();
                            let rs = res.result;
                            for (let i = 0; i < rs.length; i++) {
                                rs[i].seatDate = ymsUtil.fmtDate3(rs[i].seatDate);
                            }
                            that.seatReservingData = rs;

                            //处理同时为true的情况：如当前用户正在查看某个已经被预定的座位，而之后又点击一个可选的座位时
                            if (that.seatReservedHint == true) {
                                that.seatReservedHint = false;
                            }
                            that.seatReserving = true; // 打开选择座位日期的弹框

                            this.resizeDateWidth();

                        }).catch(err => {

                        });
                    } else {
                        alert("你今天已经预定了座位哦");
                    }
                } else if (seat.state == 2) { //if 已被预定
                    ddAPI.showPreloader("拼命加载中...");
                    ev.stopPropagation();
                    // //show seat hint
                    // //1. get seat data from server
                    ApiExample.getReservationStaff({selectDate: that.selectDate, code: code}).then(res => {
                        //2. show this seat data
                        ddAPI.hidePreloader();
                        that.seatReservedHintData = res.result;
                        if (that.seatReserving == true) {
                            that.seatReserving = false;
                        }
                        that.seatReservedHint = true; //打开弹窗
                    }).catch(err => {

                    })
                }

            },

            //获取某个座位的数据
            getSomeSeatInfo(code) {
                const that = this;
                let tmpData = that.seatData;
                for (let one of tmpData) {
                    if (one.code == code) {
                        return one;
                    }
                }
            },

            //当点击Home页时
            whenClickHome() { //当点击home页 取消所有弹窗
                this.seatReserving = false;
                this.seatReservedHint = false;
                this.clearSeatReservingUserChooseData();
            }
        },
        mounted() {
            // if($route) {
            //     //this.isShowData = true
            //     //从后端查询座位信息，然后显示座位图
            // }
            window.addEventListener('resize', this.resizeEvent, false);
            this.resizeEvent();
            // this.init()

            //获取今天日期
            let timestamp1 = Date.parse(new Date);
            this.selectDate = ymsUtil.fmtDate(timestamp1);
        }
    };
</script>

<style lang="less" scoped>
    //公共样式 全局样式 个性化样式

    //座位预定中 css
    .seat-reserving {
        position: absolute;
        width: 100%;
        bottom: 0px;
        margin-left: -2%;

        .seat-reserving-top {
            border-top: 1px solid #E36386;
            border-radius: 5px 5px 0 0;
            background-color: #E36386;
            /*height: 3rem;*/

            .seat-reserving-top-left {
                color: #fff;
                font-size: 1.2rem;
                text-align: left;
                padding-left: 4%;
                padding-top: 4%;
                padding-bottom: 4%;
            }
            .seat-reserving-top-right {
                float: right;
                padding-top: 2%;
                padding-bottom: 2%;
                background-color: #fff;
                color: #E36386;
                border-radius: 7px;
                margin-top: 3%;
                margin-bottom: 3%;
                margin-right: 3%;
                width: 90px;

                .seat-reserving-top-right-button {
                    font-size: 1rem;
                    border-radius: 5px;
                    background-color: #fff;
                    color: #E36386;
                    width: 89px;
                    margin-right: 0.2rem;
                }
            }
        }
    }

    //
    .seat-reserving .reserving-scroll {
        width: 100%;
        overflow-x: scroll;
        .seat-reserving-choose {
            background-color: #FDE6EA;
            height: 3.8rem;
        }

        .seat-reserving-choose-date{
            display: inline-block;
            position: relative;
            height: 3rem;
            width: 7rem;
            background-color: #fff;
            background-repeat: no-repeat;
            background-size: 18%;
            top: 11%;
            border-radius: 5px;
            background-position-x: center;
            background-position-y: 10%;
            padding-top: 1.5rem;
            margin: 0 0.2rem;
            box-sizing: border-box;
        }
    }

    .seat-icon-checking {
        background-image: url('../assets/images/icon_checking.png');
    }
    .seat-icon-reserved {
        background-image: url('../assets/images/icon_reserved.png');
    }
    .seat-icon-choosable {
        background-image: url('../assets/images/icon_choosable.png');
    }
    .seat-icon-dischoosable {
        background-image: url('../assets/images/icon_dischoosable.png');
    }


   //已预订提示样式
   .seat-reserved-hint {
       position: absolute;
       width: 100%;
       bottom: 0px;
       background-color: #fff;
       border-top: 1px solid #cccccc;
       border-radius: 10px;
       color: #00aea9;

       margin-left: -2%;

   }
   .seat-reserved-hint-dept {
       background-color:#e6f6f4;
       width: 100%;
       border-top: 1px solid #c3eff4;
       border-bottom: 1px solid #c3eff4;
       font-size: 1.1rem;

       padding-top: 0.5rem;
   }

   .bg-purple11  {
       background-image: url('../assets/images/icon_13.png');
       background-repeat: no-repeat;
       background-size: 1.8rem;
       height: 2rem;
       background-position-y: -31%;

       text-align: left ;
       padding-left: 14%;
       margin-left: 27%;
   }



    .home {
        .filterarea {

        }
    }

    .chooseseat {
        position: relative;
        width: 100%;
        overflow-x: scroll;
        overflow-y: scroll;

        .choosefloor {
            position: absolute;
            background-repeat: no-repeat;
            background-size: 100%;
            width: 120%;
            /*left: 50%;*/
            /*right: 50%;*/
            /*transform: translate(-60%);*/
        }
    }

    //------------------------------------------------10B-5---start---------------------------------------------------
    .choosearea-10B5 {
        background-image: url('../assets/images/bg-10B-5.png');
    }


    //------------------------------------------------10B-5---end---------------------------------------------------

    @media screen and (min-width: 768px) {
        .chooseseat {
            .choosefloor {
                max-width: 768px;
                left: 50%;
                right: 50%;
                transform: translate(-50%);
            }
        }
    }

    .user-seat {
        background-image: url('../assets/images/icon_1.png');
        background-repeat: no-repeat;
        width: 5%;
        height: 5%;
        background-size: 100%;
        position: absolute;
    }

    //状态图
    .seat-status-zero { //可选
        background-image: url('../assets/images/icon_1.png');
    }

    //状态图
    .seat-status-zero.selected { //可选 => 当前选中
        background-image: url('../assets/images/icon_9.png');
    }

    .seat-status-one { //不可选
        background-image: url('../assets/images/icon_10.png');
    }

    .seat-status-two { //已被预订
        background-image: url('../assets/images/icon_8.png');
    }

    .seat-status-three { //我的座位
        background-image: url('../assets/images/icon_6.png');
    }

    .seat-status-four { //当前选中
        background-image: url('../assets/images/icon_9.png');
    }

    //旋转效果
    .user-seat.rotate90 {
        transform: rotate(90deg);
    }

    .user-seat.rotate270 {
        transform: rotate(270deg);
    }

    .user-seat.rotate180 {
        transform: rotate(180deg);
    }


    //日期选择div
    .filterarea-date-input {
        font-size: 1rem;
        margin-top: 0.8rem;
    }

    .filterarea-date-input /deep/ .el-input__inner {
        border: 1px solid #C3EFF4;
        border-radius: 10px;
        color: #00afa5;

    }

    //上图标
    .filterarea-date-input /deep/ .el-input__suffix {
        color: #00afa5;
        font-size: 1.2rem;
    }

    //楼层选择div
    .filterarea-floor-input {
        font-size: 1rem;
        margin-top: 0.8rem;
    }

    .filterarea-floor-input /deep/ .el-input__inner {
        background-color: #E1F7F9;
        color: #00afa5;
        border: 1px solid #E1F7F9;
        border-radius: 10px;
    }

    //下图标
    .filterarea-floor-input /deep/ .el-input__suffix {
        color: #00afa5;
        font-size: 1.2rem;
    }


    @media screen and (max-width: 992px) {
        .filterarea-date-input {
            margin-top: 0.6rem;
        }

        .filterarea-floor-input {
            margin-top: 0.6rem;
        }
    }


    //吉祥物style
    .blankarea-img {
        margin-top: 8rem;
        width: 10rem;
    }

    //hint style
    .nodata {
        font-weight: bold;
    }

    .hintchoosefloor {
        margin-top: 0.6rem;
        color: #9a9a9a;
    }


    //座位选择区域style
    .choosearea {
        margin-top: 0.6rem;
        position: relative;
    }

    //座位提示style
    .choosearea-hint-seat {
        background-size: 1.8rem;
        background-repeat: no-repeat;
        text-align: left;
        padding-left: 2rem;
        /* background-position-y: 4px; */
        font-size: 0.8rem;
        /* line-height: 1rem; */
        height: 2rem;
        padding-top: 0.4rem;
        margin-left: 0.4rem;
    }

    .bg-purple1 {
        background-image: url('../assets/images/icon_1.png');
    }

    .bg-purple2 {
        background-image: url('../assets/images/icon_9.png');
    }

    .bg-purple3 {
        background-image: url('../assets/images/icon_6.png');
    }

    .bg-purple4 {
        background-image: url('../assets/images/icon_7.png');
    }

</style>
