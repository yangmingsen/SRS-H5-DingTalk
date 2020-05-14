<template>
    <div class="home">
        <div class="filterarea">
            <div class="filterarea-date" @click="dateChoose">
                <el-input
                        suffix-icon="el-icon-date"
                        :readonly=true
                        v-model="dateMsg"
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
                        <div class="grid-content bg-purple bg-purple1" style="font-size: 0.6rem">
                            可选
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple bg-purple2" style="font-size: 0.6rem" >
                            已选
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple bg-purple3" style="font-size: 0.6rem">
                            我的座位
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple bg-purple4"  style="font-size: 0.6rem">
                            已被预订
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div class="chooseseat">
                <div class="choosefloor choosearea-10B5" v-if="floorSelect == 1">
                    <!--                   第一层-->
                    <div class="user-seat rotate90" :class="getClass('041')"  style="top:1%;left:3%"></div>
                    <div class="user-seat rotate90" :class="getClass('042')"  style="top:6.6%;left:3%"></div>
                    <div class="user-seat rotate90" :class="getClass('043')"  style="top:12.2%;left:3%"></div>
                    <div class="user-seat rotate270" :class="getClass('035')"  style="top:1%;left:12%"></div>
                    <div class="user-seat rotate270" :class="getClass('036')"  style="top:6.6%;left:12%"></div>
                    <div class="user-seat rotate270" :class="getClass('037')"  style="top:12.2%;left:12%"></div>

                    <div class="user-seat rotate90" :class="getClass('029')"  style="top:1%;left:22%"></div>
                    <div class="user-seat rotate90" :class="getClass('030')"  style="top:6.6%;left:22%"></div>
                    <div class="user-seat rotate90" :class="getClass('031')"  style="top:12.2%;left:22%"></div>
                    <div class="user-seat rotate270" :class="getClass('023')"  style="top:1%;left: 30%"></div>
                    <div class="user-seat rotate270" :class="getClass('024')"  style="top:6.6%;left: 30%"></div>
                    <div class="user-seat rotate270" :class="getClass('025')"  style="top:12.2%;left: 30%"></div>

                    <div class="user-seat rotate90" :class="getClass('018')"  style="top:6.6%;left:40%"></div>
                    <div class="user-seat rotate90" :class="getClass('019')"  style="top:12.2%;left:40%"></div>
                    <div class="user-seat rotate270" :class="getClass('013')"  style="top:6.6%;left: 48.4%"></div>
                    <div class="user-seat rotate270" :class="getClass('014')"  style="top:12.2%;left: 48.4%"></div>


                    <div class="user-seat rotate90" :class="getClass('007')"  style="top:1%;left:58.5%"></div>
                    <div class="user-seat rotate90" :class="getClass('008')"  style="top:6.6%;left:58.5%"></div>
                    <div class="user-seat rotate90" :class="getClass('009')"  style="top:12.2%;left:58.5%"></div>
                    <div class="user-seat rotate270" :class="getClass('001')"  style="top:1%;left: 66.8%"></div>
                    <div class="user-seat rotate270" :class="getClass('002')"  style="top:6.6%;left: 66.8%"></div>
                    <div class="user-seat rotate270" :class="getClass('003')"  style="top:12.2%;left: 66.8%"></div>

                    <!--                   第二层-->
                    <div class="user-seat rotate90" :class="getClass('044')"  style="top:21.5%;left:3%"></div>
                    <div class="user-seat rotate90" :class="getClass('045')"  style="top:27.1%;left:3%"></div>
                    <div class="user-seat rotate90" :class="getClass('046')"  style="top:32.7%;left:3%"></div>
                    <div class="user-seat rotate270" :class="getClass('038')"  style="top:21.5%;left: 12%"></div>
                    <div class="user-seat rotate270" :class="getClass('039')"  style="top:27.1%;left: 12%"></div>
                    <div class="user-seat rotate270" :class="getClass('040')"  style="top:32.7%;left: 12%"></div>

                    <div class="user-seat rotate90" :class="getClass('032')"  style="top:21.5%;left:22%"></div>
                    <div class="user-seat rotate90" :class="getClass('033')"  style="top:27.1%;left:22%"></div>
                    <div class="user-seat rotate90" :class="getClass('034')"  style="top:32.7%;left:22%"></div>
                    <div class="user-seat rotate270" :class="getClass('026')"  style="top:21.5%;left: 30%"></div>
                    <div class="user-seat rotate270" :class="getClass('027')"  style="top:27.1%;left: 30%"></div>
                    <div class="user-seat rotate270" :class="getClass('028')"  style="top:32.7%;left: 30%"></div>


                    <div class="user-seat rotate90" :class="getClass('020')"  style="top:21.5%;left:40%"></div>
                    <div class="user-seat rotate90" :class="getClass('021')"  style="top:27.1%;;left:40%"></div>
                    <div class="user-seat rotate90" :class="getClass('022')"  style="top:32.7%;;left:40%"></div>
                    <div class="user-seat rotate270" :class="getClass('015')"  style="top:21.5%;left: 48.4%"></div>
                    <div class="user-seat rotate270" :class="getClass('016')"  style="top:27.1%;left: 48.4%"></div>
                    <div class="user-seat rotate270" :class="getClass('017')"  style="top:32.7%;left: 48.4%"></div>


                    <div class="user-seat rotate90" :class="getClass('010')"  style="top:21.5%;left:58.5%"></div>
                    <div class="user-seat rotate90" :class="getClass('011')"  style="top:27.1%;;left:58.5%"></div>
                    <div class="user-seat rotate90" :class="getClass('012')"  style="top:32.7%;;left:58.5%"></div>
                    <div class="user-seat rotate270" :class="getClass('004')"  style="top:21.5%;left: 66.8%"></div>
                    <div class="user-seat rotate270" :class="getClass('005')"  style="top:27.1%;left: 66.8%"></div>
                    <div class="user-seat rotate270" :class="getClass('006')"  style="top:32.7%;left: 66.8%"></div>


                    <!--                   第三层-->
                    <div class="user-seat rotate90" :class="getClass('049')"   style="top:41.2%;left:3%"></div>
                    <div class="user-seat rotate90" :class="getClass('050')"  style="top:46.2%;left:3%"></div>
                    <div class="user-seat rotate90" :class="getClass('047')"  style="top:41.2%;left:10%"></div>
                    <div class="user-seat rotate90" :class="getClass('048')"  style="top:46.2%;left:10%"></div>

                    <!--                   第四层-->
                    <div class="user-seat " :class="getClass('129')"  style="top:73.5%;left:3.5%"></div>
                    <div class="user-seat " :class="getClass('128')"  style="top:73.5%;left:11.5%"></div>

                    <div class="user-seat rotate180" :class="getClass('131')"  style="top:77.9%;left:3.5%"></div>
                    <div class="user-seat rotate180" :class="getClass('130')"  style="top:77.9%;left:11.5%"></div>
                    <div class="user-seat " :class="getClass('133')"  style="top:84.6%;left:3.5%"></div>
                    <div class="user-seat " :class="getClass('132')"  style="top:84.6%;left:11.5%"></div>

                    <div class="user-seat rotate180" :class="getClass('135')"  style="top:88.8%;left:3.5%"></div>
                    <div class="user-seat rotate180" :class="getClass('134')"  style="top:88.8%;left:11.5%"></div>


                    <!--                  第五层1-->
                    <div class="user-seat " :class="getClass('057')"  style="top:41%;left:23.3%"></div>
                    <div class="user-seat " :class="getClass('056')"  style="top:41%;left:30.3%"></div>
                    <div class="user-seat " :class="getClass('055')"  style="top:41%;left:37.3%"></div>
                    <div class="user-seat " :class="getClass('054')"  style="top:41%;left:44.3%"></div>
                    <div class="user-seat " :class="getClass('053')"  style="top:41%;left:51.3%"></div>
                    <div class="user-seat " :class="getClass('052')"  style="top:41%;left:58.3%"></div>
                    <div class="user-seat " :class="getClass('051')"  style="top:41%;left:65.3%"></div>


                    <!--                  第五层2-->
                    <div class="user-seat rotate180" :class="getClass('064')"  style="top:46.5%;left:23.3%"></div>
                    <div class="user-seat rotate180" :class="getClass('063')"  style="top:46.5%;left:30.3%"></div>
                    <div class="user-seat rotate180" :class="getClass('062')"  style="top:46.5%;left:37.3%"></div>
                    <div class="user-seat rotate180" :class="getClass('061')"  style="top:46.5%;left:44.3%"></div>
                    <div class="user-seat rotate180" :class="getClass('060')"  style="top:46.5%;left:51.3%"></div>
                    <div class="user-seat rotate180" :class="getClass('059')"  style="top:46.5%;left:58.3%"></div>
                    <div class="user-seat rotate180" :class="getClass('058')"  style="top:46.5%;left:65.3%"></div>

                    <div class="user-seat " :class="getClass('071')"  style="top:52.9%;left:23.3%"></div>
                    <div class="user-seat " :class="getClass('070')"  style="top:52.9%;left:30.3%"></div>
                    <div class="user-seat " :class="getClass('069')"  style="top:52.9%;left:37.3%"></div>
                    <div class="user-seat " :class="getClass('068')"  style="top:52.9%;left:44.3%"></div>
                    <div class="user-seat " :class="getClass('067')"  style="top:52.9%;left:51.3%"></div>
                    <div class="user-seat " :class="getClass('066')"  style="top:52.9%;left:58.3%"></div>
                    <div class="user-seat " :class="getClass('065')"  style="top:52.9%;left:65.3%"></div>


                    <!--                  第五层3-->
                    <div class="user-seat rotate180" :class="getClass('078')"  style="top:56.8%;left:23.3%"></div>
                    <div class="user-seat rotate180" :class="getClass('077')"  style="top:56.8%;left:30.3%"></div>
                    <div class="user-seat rotate180" :class="getClass('076')"  style="top:56.8%;left:37.3%"></div>
                    <div class="user-seat rotate180" :class="getClass('075')"  style="top:56.8%;left:44.3%"></div>
                    <div class="user-seat rotate180" :class="getClass('074')"  style="top:56.8%;left:51.3%"></div>
                    <div class="user-seat rotate180" :class="getClass('073')"  style="top:56.8%;left:58.3%"></div>
                    <div class="user-seat rotate180" :class="getClass('072')"  style="top:56.8%;left:65.3%"></div>

                    <div class="user-seat " :class="getClass('085')"  style="top:62.9%;left:23.3%"></div>
                    <div class="user-seat " :class="getClass('084')"  style="top:62.9%;left:30.3%"></div>
                    <div class="user-seat " :class="getClass('083')"  style="top:62.9%;left:37.3%"></div>
                    <div class="user-seat " :class="getClass('082')"  style="top:62.9%;left:44.3%"></div>
                    <div class="user-seat " :class="getClass('081')"  style="top:62.9%;left:51.3%"></div>
                    <div class="user-seat " :class="getClass('080')"  style="top:62.9%;left:58.3%"></div>
                    <div class="user-seat " :class="getClass('079')"  style="top:62.9%;left:65.3%"></div>


                    <!--                  第五层4-->
                    <div class="user-seat rotate180" :class="getClass('092')"  style="top:67%;left:23.3%"></div>
                    <div class="user-seat rotate180" :class="getClass('091')"  style="top:67%;left:30.3%"></div>
                    <div class="user-seat rotate180" :class="getClass('090')"  style="top:67%;left:37.3%"></div>
                    <div class="user-seat rotate180" :class="getClass('089')"  style="top:67%;left:44.3%"></div>
                    <div class="user-seat rotate180" :class="getClass('088')"  style="top:67%;left:51.3%"></div>
                    <div class="user-seat rotate180" :class="getClass('087')"  style="top:67%;left:58.3%"></div>
                    <div class="user-seat rotate180" :class="getClass('086')"  style="top:67%;left:65.3%"></div>

                    <div class="user-seat " :class="getClass('099')"  style="top:73.2%;left:23.3%"></div>
                    <div class="user-seat " :class="getClass('098')"  style="top:73.2%;left:30.3%"></div>
                    <div class="user-seat " :class="getClass('097')"  style="top:73.2%;left:37.3%"></div>
                    <div class="user-seat " :class="getClass('096')"  style="top:73.2%;left:44.3%"></div>
                    <div class="user-seat " :class="getClass('095')"  style="top:73.2%;left:51.3%"></div>
                    <div class="user-seat " :class="getClass('094')"  style="top:73.2%;left:58.3%"></div>
                    <div class="user-seat " :class="getClass('093')"  style="top:73.2%;left:65.3%"></div>


                    <!--                  第五层5-->
                    <div class="user-seat rotate180" :class="getClass('106')"  style="top:77.3%;left:23.3%"></div>
                    <div class="user-seat rotate180" :class="getClass('105')"  style="top:77.3%;left:30.3%"></div>
                    <div class="user-seat rotate180" :class="getClass('104')"  style="top:77.3%;left:37.3%"></div>
                    <div class="user-seat rotate180" :class="getClass('103')"  style="top:77.3%;left:44.3%"></div>
                    <div class="user-seat rotate180" :class="getClass('102')"  style="top:77.3%;left:51.3%"></div>
                    <div class="user-seat rotate180" :class="getClass('101')"  style="top:77.3%;left:58.3%"></div>
                    <div class="user-seat rotate180" :class="getClass('100')"  style="top:77.3%;left:65.3%"></div>

                    <div class="user-seat " :class="getClass('113')"  style="top:83.2%;left:23.3%"></div>
                    <div class="user-seat " :class="getClass('112')"  style="top:83.2%;left:30.3%"></div>
                    <div class="user-seat " :class="getClass('111')"  style="top:83.2%;left:37.3%"></div>
                    <div class="user-seat " :class="getClass('110')"  style="top:83.2%;left:44.3%"></div>
                    <div class="user-seat " :class="getClass('109')"  style="top:83.2%;left:51.3%"></div>
                    <div class="user-seat " :class="getClass('108')"  style="top:83.2%;left:58.3%"></div>
                    <div class="user-seat " :class="getClass('107')"  style="top:83.2%;left:65.3%"></div>


                    <!--                  第五层6-->
                    <div class="user-seat rotate180" :class="getClass('120')"  style="top:87.5%;left:23.3%"></div>
                    <div class="user-seat rotate180" :class="getClass('119')"  style="top:87.5%;left:30.3%"></div>
                    <div class="user-seat rotate180" :class="getClass('118')"  style="top:87.5%;left:37.3%"></div>
                    <div class="user-seat rotate180" :class="getClass('117')"  style="top:87.5%;left:44.3%"></div>
                    <div class="user-seat rotate180" :class="getClass('116')"  style="top:87.5%;left:51.3%"></div>
                    <div class="user-seat rotate180" :class="getClass('115')"  style="top:87.5%;left:58.3%"></div>
                    <div class="user-seat rotate180" :class="getClass('114')"  style="top:87.5%;left:65.3%"></div>

                    <div class="user-seat " :class="getClass('127')"  style="top:93.6%;left:23.3%"></div>
                    <div class="user-seat " :class="getClass('126')"  style="top:93.6%;left:30.3%"></div>
                    <div class="user-seat " :class="getClass('125')"  style="top:93.6%;left:37.3%"></div>
                    <div class="user-seat " :class="getClass('124')"  style="top:93.6%;left:44.3%"></div>
                    <div class="user-seat " :class="getClass('123')"  style="top:93.6%;left:51.3%"></div>
                    <div class="user-seat " :class="getClass('122')"  style="top:93.6%;left:58.3%"></div>
                    <div class="user-seat " :class="getClass('121')"  style="top:93.6%;left:65.3%"></div>

                </div>
                <div class="choosefloor choosearea-10B6" v-if="floorSelect == 2">10b6</div>
                <div class="choosefloor choosearea-10B7" v-if="floorSelect == 3">10b7</div>
                <div class="choosefloor choosearea-13B5" v-if="floorSelect == 4">13b5</div>
            </div>
        </div>
    </div>

</template>

<script>
    // @ is an alias to /src
    import * as dd from 'dingtalk-jsapi';
    import {ApiExample} from "../api/example"

    export default {
        name: "Home",
        components: {},
        data() {
            return {
                dateMsg: "2020-05-13",
                floorShowMsg: "座位所属楼层",
                floorSelectedKey:null,
                isShowData: true, // true=用户没有选择楼层(默认),   false 用户选择了楼层
                floorSelect: 1, //1=10b5, 2=10b6, 3=10b7, 4=13b5,
                seatData: {
                    "msg": "成功",
                    "code": "0",
                    "spenttime": 69,
                    "result": [
                        {
                            "code": "0001", //座位唯一编码
                            "no": "A001", //	座位编号(用于显示,可被改变)
                            "state": 0 //0-可选；1-不可选；2-已被预订；3-我的座位
                        },
                        {
                            "code": "0002",
                            "no": "A002",
                            "state": 1
                        } ,
                        {
                            "code": "0003",
                            "no": "A002",
                            "state": 2
                        } ,
                        {
                            "code": "0004",
                            "no": "A002",
                            "state": 3
                        },
                        {
                            "code": "0005",
                            "no": "A002",
                            "state": 1
                        },
                        {
                            "code": "0006",
                            "no": "A002",
                            "state": 1
                        }
                    ],
                    "level": 5
                },
                floorData: []
            }
        },
        methods: {
            getClass (code) {
                const that = this;
                let seatInfo = that.seatData.result;
                let status = ''

                let isHave = false;
                for(let i in seatInfo) {
                    let x = seatInfo[i]
                    if(x.code == code) {
                        status = x.state
                        isHave = true;
                        break
                    }
                }

                if (isHave) {
                    return {
                        'seat-status-zero': status == 0,
                        'seat-status-one': status == 1,
                        'seat-status-two': status == 2,
                        'seat-status-three': status == 3,
                        'seat-status-four': status == 4
                    }
                } else {
                    return {
                        'seat-status-one': false
                    }
                }


            },

            floorChoose2() {
                const that = this;
               let res = {
                   "msg": "成功",
                   "code": "0",
                   "spenttime": 69,
                   "result": [
                       {
                           "code": "0001",
                           "name": "10B 第五层"
                       },
                       {
                           "code": "0002",
                           "name": "10B 第六层"
                       },
                       {
                           "code": "0003",
                           "name": "10B 第七层"
                       },
                       {
                           "code": "0004",
                           "name": "13B 第5层"
                       }
                   ],
                   "level": 5
               };

                res.result.forEach(x => {
                    let tuple = {key: x.name, value: x.code}
                    that.floorData.push(tuple)
                });

                dd.ready(() => {
                    dd.biz.util.chosen({
                        source: that.floorData,
                        selectedKey: that.floorSelectedKey == null ? that.floorData[0].key : that.floorSelectedKey, // 默认选中的key
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

                            //从新计算高度
                            that.resizeEvent();
                        },
                        onFail: function (err) {
                            alert("floorChoose Error")
                        }
                    })
                })

            },

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
                            selectedKey: that.floorSelectedKey == null ? that.floorData[0].key : that.floorSelectedKey, // 默认选中的key
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


                                //获取座位布局图数据
                                ApiExample.seatList({code: that.floorSelect, selectDate: that.dateMsg}).then(res => {
                                    that.seatData = res;
                                })

                                //从新计算高度
                                that.resizeEvent();

                            },
                            onFail: function (err) {
                                alert("floorChoose Error")
                            }
                        })
                    })

                }).catch(err => {
                    // callback(err)
                    alert(err)
                })
            },

            dateChoose() {
                const that = this;
                dd.ready(() => {
                    dd.biz.util.datepicker({
                        format: 'yyyy-MM-dd',//注意：format只支持android系统规范，即2015-03-31格式为yyyy-MM-dd
                        value: that.dateMsg, //默认显示日期
                        onSuccess: function (result) {
                            //onSuccess将在点击完成之后回调
                            /*{
                                value: "2015-02-10"
                            }
                            */
                            that.dateMsg = result.value
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
                    for (var i=0; i<choosefloors.length; i++) {
                        choosefloors[i].style.height = ((1299 / 1126) * choosefloors[i].clientWidth) + 'px'
                    }
                })
            },

            init () {
                const that = this;
                let seatInfo = that.seatData.result;
                seatInfo.forEach(x => {
                    let id = x.code;
                    let ele = document.getElementById(id);
                    switch (x.state) {
                        case 0: ele.classList.add("seat-status-zero"); break;
                        case 1: ele.classList.add("seat-status-one"); break;
                        case 2: ele.classList.add("seat-status-two"); break;
                        case 3: ele.classList.add("seat-status-three"); break;
                        case 4: ele.classList.add("seat-status-four"); break;
                        default: break;
                    }
                })
            }
        },
        mounted() {
            // if($route) {
            //     //this.isShowData = true
            //     //从后端查询座位信息，然后显示座位图
            // }
            window.addEventListener('resize',this.resizeEvent,false);
            this.resizeEvent();
            // this.init()

        }
    };
</script>

<style lang="less" scoped>
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
    .seat-status-zero {//可选
        background-image: url('../assets/images/icon_1.png');
    }
    .seat-status-one {//不可选
        background-image: url('../assets/images/icon_10.png');
    }
    .seat-status-two {//已被预订
        background-image: url('../assets/images/icon_7.png');
    }
    .seat-status-three {//我的座位
        background-image: url('../assets/images/icon_6.png');
    }
    .seat-status-four {//当前选中
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
        color: #00afa5;
        border-radius: 10px;
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
    }

    //座位提示style
    .bg-purple {
        background-size: 1.8rem;
        background-repeat: no-repeat;
        text-align: left;
        padding-left: 2rem;
        /* background-position-y: 4px; */
        font-size: 0.8rem;
        /* line-height: 1rem; */
        height: 2rem;
        padding-top: 0.4rem;
        margin-left:0.4rem;
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
