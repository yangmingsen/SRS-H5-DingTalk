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
                    <div v-for="item in seatBaseInfo10b5" :index="item.code" class="user-seat" :class="getClass(item)"
                         @click="whenClickSeat(item.code, $event)" :style="{top: item.top, left: item.left}"></div>
                </div>
                <div class="choosefloor choosearea-10B6" v-if="floorSelect == 2">
                    <div v-for="item in seatBaseInfo10b6" :index="item.code" class="user-seat" :class="getClass(item)"
                         @click="whenClickSeat(item.code, $event)" :style="{top: item.top, left: item.left}"></div>
                </div>
                <div class="choosefloor choosearea-10B7" v-if="floorSelect == 3">
                    <div v-for="item in seatBaseInfo10b7" :index="item.code" class="user-seat" :class="getClass(item)"
                         @click="whenClickSeat(item.code, $event)" :style="{top: item.top, left: item.left}"></div>
                </div>
                <div class="choosefloor choosearea-13B5" v-if="floorSelect == 4">
                    <div v-for="item in seatBaseInfo13b5" :index="item.code" class="user-seat" :class="getClass(item)"
                         @click="whenClickSeat(item.code, $event)" :style="{top: item.top, left: item.left}"></div>
                </div>

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
                        <div class="grid-content seat-reserving-top-right" :class="getHintButtonSty()" @click="submitUserChooseSeatData">
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
    import router from "../router";

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
                seatBaseInfo10b5: [
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

                //10b6楼座位样式数据 static
                seatBaseInfo10b6:[
                    //第一层
                    {code: '149', class: '', top: '24%', left: '2.0%'},
                    {code: '148', class: '', top: '24%', left: '10.3%'},
                    {code: '147', class: '', top: '24%', left: '18.6%'},
                    {code: '146', class: '', top: '24%', left: '26.9%'},
                    {code: '145', class: '', top: '24%', left: '35.1%'},
                    {code: '144', class: '', top: '24%', left: '43.4%'},
                    {code: '143', class: '', top: '24%', left: '51.7%'},


                    //第二层
                    {code: '160', class: 'rotate180', top: '30.2%', left: '2.0%'},
                    {code: '159', class: 'rotate180', top: '30.2%', left: '8.7%'},
                    {code: '158', class: 'rotate180', top: '30.2%', left: '15.5%'},
                    {code: '157', class: 'rotate180', top: '30.2%', left: '22.2%'},
                    {code: '156', class: 'rotate180', top: '30.2%', left: '28.9%'},
                    {code: '155', class: 'rotate180', top: '30.2%', left: '35.6%'},
                    {code: '154', class: 'rotate180', top: '30.2%', left: '42.4%'},
                    {code: '153', class: 'rotate180', top: '30.2%', left: '49.1%'},
                    {code: '152', class: 'rotate180', top: '30.2%', left: '55.8%'},
                    {code: '151', class: 'rotate180', top: '30.2%', left: '62.5%'},
                    {code: '150', class: 'rotate180', top: '30.2%', left: '69.3%'},
                    {code: '171', class: '', top: '36.7%', left: '2.0%'},
                    {code: '170', class: '', top: '36.7%', left: '8.7%'},
                    {code: '169', class: '', top: '36.7%', left: '15.5%'},
                    {code: '168', class: '', top: '36.7%', left: '22.2%'},
                    {code: '167', class: '', top: '36.7%', left: '28.9%'},
                    {code: '166', class: '', top: '36.7%', left: '35.6%'},
                    {code: '165', class: '', top: '36.7%', left: '42.4%'},
                    {code: '164', class: '', top: '36.7%', left: '49.1%'},
                    {code: '163', class: '', top: '36.7%', left: '55.8%'},
                    {code: '162', class: '', top: '36.7%', left: '62.5%'},
                    {code: '161', class: '', top: '36.7%', left: '69.3%'},


                    {code: '182', class: 'rotate180', top: '41%', left: '2.0%'},
                    {code: '181', class: 'rotate180', top: '41%', left: '8.7%'},
                    {code: '180', class: 'rotate180', top: '41%', left: '15.5%'},
                    {code: '179', class: 'rotate180', top: '41%', left: '22.2%'},
                    {code: '178', class: 'rotate180', top: '41%', left: '28.9%'},
                    {code: '177', class: 'rotate180', top: '41%', left: '35.6%'},
                    {code: '176', class: 'rotate180', top: '41%', left: '42.4%'},
                    {code: '175', class: 'rotate180', top: '41%', left: '49.1%'},
                    {code: '174', class: 'rotate180', top: '41%', left: '55.8%'},
                    {code: '173', class: 'rotate180', top: '41%', left: '62.5%'},
                    {code: '172', class: 'rotate180', top: '41%', left: '69.3%'},
                    {code: '193', class: '', top: '47.5%', left: '2.0%'},
                    {code: '192', class: '', top: '47.5%', left: '8.7%'},
                    {code: '191', class: '', top: '47.5%', left: '15.5%'},
                    {code: '190', class: '', top: '47.5%', left: '22.2%'},
                    {code: '189', class: '', top: '47.5%', left: '28.9%'},
                    {code: '188', class: '', top: '47.5%', left: '35.6%'},
                    {code: '187', class: '', top: '47.5%', left: '42.4%'},
                    {code: '186', class: '', top: '47.5%', left: '49.1%'},
                    {code: '185', class: '', top: '47.5%', left: '55.8%'},
                    {code: '184', class: '', top: '47.5%', left: '62.5%'},
                    {code: '183', class: '', top: '47.5%', left: '69.3%'},


                    {code: '204', class: 'rotate180', top: '52.1%', left: '2.0%'},
                    {code: '203', class: 'rotate180', top: '52.1%', left: '8.7%'},
                    {code: '202', class: 'rotate180', top: '52.1%', left: '15.5%'},
                    {code: '201', class: 'rotate180', top: '52.1%', left: '22.2%'},
                    {code: '200', class: 'rotate180', top: '52.1%', left: '28.9%'},
                    {code: '199', class: 'rotate180', top: '52.1%', left: '35.6%'},
                    {code: '198', class: 'rotate180', top: '52.1%', left: '42.4%'},
                    {code: '197', class: 'rotate180', top: '52.1%', left: '49.1%'},
                    {code: '196', class: 'rotate180', top: '52.1%', left: '55.8%'},
                    {code: '195', class: 'rotate180', top: '52.1%', left: '62.5%'},
                    {code: '194', class: 'rotate180', top: '52.1%', left: '69.3%'},
                    {code: '215', class: '', top: '58.5%', left: '2.0%'},
                    {code: '214', class: '', top: '58.5%', left: '8.7%'},
                    {code: '213', class: '', top: '58.5%', left: '15.5%'},
                    {code: '212', class: '', top: '58.5%', left: '22.2%'},
                    {code: '211', class: '', top: '58.5%', left: '28.9%'},
                    {code: '210', class: '', top: '58.5%', left: '35.6%'},
                    {code: '209', class: '', top: '58.5%', left: '42.4%'},
                    {code: '208', class: '', top: '58.5%', left: '49.1%'},
                    {code: '207', class: '', top: '58.5%', left: '55.8%'},
                    {code: '206', class: '', top: '58.5%', left: '62.5%'},
                    {code: '205', class: '', top: '58.5%', left: '69.3%'},



                    //第三层
                    {code: '222', class: 'rotate180', top: '64.6%', left: '25.7%'},
                    {code: '221', class: 'rotate180', top: '64.6%', left: '33.0%'},
                    {code: '220', class: 'rotate180', top: '64.6%', left: '40.3%'},
                    {code: '219', class: 'rotate180', top: '64.6%', left: '47.6%'},
                    {code: '218', class: 'rotate180', top: '64.6%', left: '54.8%'},
                    {code: '217', class: 'rotate180', top: '64.6%', left: '62.1%'},
                    {code: '216', class: 'rotate180', top: '64.6%', left: '69.4%'},
                    {code: '229', class: '', top: '71.2%', left: '25.7%'},
                    {code: '228', class: '', top: '71.2%', left: '33.0%'},
                    {code: '227', class: '', top: '71.2%', left: '40.3%'},
                    {code: '226', class: '', top: '71.2%', left: '47.6%'},
                    {code: '225', class: '', top: '71.2%', left: '54.8%'},
                    {code: '224', class: '', top: '71.2%', left: '62.1%'},
                    {code: '223', class: '', top: '71.2%', left: '69.4%'},
                    {code: '236', class: 'rotate180', top: '75%', left: '25.7%'},
                    {code: '235', class: 'rotate180', top: '75%', left: '33.0%'},
                    {code: '234', class: 'rotate180', top: '75%', left: '40.3%'},
                    {code: '233', class: 'rotate180', top: '75%', left: '47.6%'},
                    {code: '232', class: 'rotate180', top: '75%', left: '54.8%'},
                    {code: '231', class: 'rotate180', top: '75%', left: '62.1%'},
                    {code: '230', class: 'rotate180', top: '75%', left: '69.4%'},
                    {code: '243', class: '', top: '81.6%', left: '25.7%'},
                    {code: '242', class: '', top: '81.6%', left: '33.0%'},
                    {code: '241', class: '', top: '81.6%', left: '40.3%'},
                    {code: '240', class: '', top: '81.6%', left: '47.6%'},
                    {code: '239', class: '', top: '81.6%', left: '54.8%'},
                    {code: '238', class: '', top: '81.6%', left: '62.1%'},
                    {code: '237', class: '', top: '81.6%', left: '69.4%'},
                    {code: '250', class: 'rotate180', top: '86.1%', left: '25.7%'},
                    {code: '249', class: 'rotate180', top: '86.1%', left: '33.0%'},
                    {code: '248', class: 'rotate180', top: '86.1%', left: '40.3%'},
                    {code: '247', class: 'rotate180', top: '86.1%', left: '47.6%'},
                    {code: '246', class: 'rotate180', top: '86.1%', left: '54.8%'},
                    {code: '245', class: 'rotate180', top: '86.1%', left: '62.1%'},
                    {code: '244', class: 'rotate180', top: '86.1%', left: '69.4%'},
                    {code: '257', class: '', top: '92.6%', left: '25.7%'},
                    {code: '256', class: '', top: '92.6%', left: '33.0%'},
                    {code: '255', class: '', top: '92.6%', left: '40.3%'},
                    {code: '254', class: '', top: '92.6%', left: '47.6%'},
                    {code: '253', class: '', top: '92.6%', left: '54.8%'},
                    {code: '252', class: '', top: '92.6%', left: '62.1%'},
                    {code: '251', class: '', top: '92.6%', left: '69.4%'},



                    //第4层
                    {code: '260', class: 'rotate180', top: '62.5%', left: '2.0%'},
                    {code: '259', class: 'rotate180', top: '62.5%', left: '8.7%'},
                    {code: '258', class: 'rotate180', top: '62.5%', left: '15.3%'},
                    {code: '263', class: 'rotate180', top: '70.7%', left: '2.0%'},
                    {code: '262', class: 'rotate180', top: '70.7%', left: '8.7%'},
                    {code: '261', class: 'rotate180', top: '70.7%', left: '15.3%'},
                    {code: '266', class: '', top: '77.1%', left: '2.0%'},
                    {code: '265', class: '', top: '77.1%', left: '8.7%'},
                    {code: '264', class: '', top: '77.1%', left: '15.3%'},
                    {code: '269', class: 'rotate180', top: '82%', left: '2.0%'},
                    {code: '268', class: 'rotate180', top: '82%', left: '8.7%'},
                    {code: '267', class: 'rotate180', top: '82%', left: '15.3%'},
                    {code: '272', class: '', top: '88.2%', left: '2.0%'},
                    {code: '271', class: '', top: '88.2%', left: '8.7%'},
                    {code: '270', class: '', top: '88.2%', left: '15.3%'},


                    //第五层
                    {code: '140', class: 'rotate270', top: '31.2%', left: '83%'},
                    {code: '141', class: 'rotate270', top: '36.4%', left: '83%'},
                    {code: '142', class: 'rotate270', top: '41.5%', left: '83%'},

                    {code: '136', class: 'rotate90', top: '26.2%', left: '92%'},
                    {code: '137', class: 'rotate90', top: '31.2%', left: '92%'},
                    {code: '138', class: 'rotate90', top: '36.4%', left: '92%'},
                    {code: '139', class: 'rotate90', top: '41.5%', left: '92%'},


        ],

                //10b7楼座位样式数据 static
                seatBaseInfo10b7:[

                    //第一层
                    {code: '283', class: 'rotate90', top: '3.8%', left: '51.5%'},
                    {code: '284', class: 'rotate90', top: '9.4%', left: '51.5%'},
                    {code: '285', class: 'rotate90', top: '15.0%', left: '51.5%'},
                    {code: '286', class: 'rotate90', top: '20.6%', left: '51.5%'},
                    {code: '287', class: 'rotate90', top: '26.2%', left: '51.5%'},
                    {code: '278', class: 'rotate270', top: '3.8%', left: '60%'},
                    {code: '279', class: 'rotate270', top: '9.4%', left: '60%'},
                    {code: '280', class: 'rotate270', top: '15.0%', left: '60%'},
                    {code: '281', class: 'rotate270', top: '20.6%', left: '60%'},
                    {code: '282', class: 'rotate270', top: '26.2%', left: '60%'},
                    {code: '273', class: 'rotate90', top: '3.8%', left: '68.5%'},
                    {code: '274', class: 'rotate90', top: '9.4%', left: '68.5%'},
                    {code: '275', class: 'rotate90', top: '15.0%', left: '68.5%'},
                    {code: '276', class: 'rotate90', top: '20.6%', left: '68.5%'},
                    {code: '277', class: 'rotate90', top: '26.2%', left: '68.5%'},

                    //第二层
                    {code: '288', class: 'rotate270', top: '16.0%', left: '90.5%'},
                    {code: '289', class: 'rotate270', top: '21.2%', left: '90.5%'},
                    {code: '290', class: 'rotate270', top: '26.3%', left: '90.5%'},
                    {code: '291', class: 'rotate270', top: '31.5%', left: '90.5%'},
                    {code: '292', class: 'rotate270', top: '36.7%', left: '90.5%'},
                    {code: '293', class: 'rotate270', top: '41.8%', left: '90.5%'},


                    //第三层
                    {code: '310', class: 'rotate180', top: '38%', left: '22.4%'},
                    {code: '309', class: 'rotate180', top: '38%', left: '29.4%'},
                    {code: '308', class: 'rotate180', top: '38%', left: '36.4%'},
                    {code: '307', class: 'rotate180', top: '38%', left: '43.4%'},
                    {code: '306', class: 'rotate180', top: '38%', left: '50.4%'},
                    {code: '305', class: 'rotate180', top: '38%', left: '57.4%'},
                    {code: '304', class: 'rotate180', top: '38%', left: '64.4%'},
                    {code: '303', class: 'rotate180', top: '38%', left: '71.4%'},
                    {code: '302', class: 'rotate180', top: '38%', left: '78.4%'},
                    {code: '319', class: '', top: '44.8%', left: '22.4%'},
                    {code: '318', class: '', top: '44.8%', left: '29.4%'},
                    {code: '317', class: '', top: '44.8%', left: '36.4%'},
                    {code: '316', class: '', top: '44.8%', left: '43.4%'},
                    {code: '315', class: '', top: '44.8%', left: '50.4%'},
                    {code: '314', class: '', top: '44.8%', left: '57.4%'},
                    {code: '313', class: '', top: '44.8%', left: '64.4%'},
                    {code: '312', class: '', top: '44.8%', left: '71.4%'},
                    {code: '311', class: '', top: '44.8%', left: '78.4%'},


                    {code: '301', class: '', top: '34.5%', left: '26.4%'},
                    {code: '300', class: '', top: '34.5%', left: '33.8%'},
                    {code: '299', class: '', top: '34.5%', left: '41.2%'},
                    {code: '298', class: '', top: '34.5%', left: '48.5%'},
                    {code: '297', class: '', top: '34.5%', left: '55.9%'},
                    {code: '296', class: '', top: '34.5%', left: '63.3%'},
                    {code: '295', class: '', top: '34.5%', left: '70.7%'},
                    {code: '294', class: '', top: '34.5%', left: '78.0%'},

                    //第4层
                    {code: '326', class: 'rotate180', top: '50%', left: '22.4%'},
                    {code: '325', class: 'rotate180', top: '50%', left: '30.5%'},
                    {code: '324', class: 'rotate180', top: '50%', left: '38.7%'},
                    {code: '323', class: 'rotate180', top: '50%', left: '46.8%'},
                    {code: '322', class: 'rotate180', top: '50%', left: '55.0%'},
                    {code: '321', class: 'rotate180', top: '50%', left: '63.1%'},
                    {code: '320', class: 'rotate180', top: '50%', left: '71.3%'},
                    {code: '333', class: '', top: '56.6%', left: '22.4%'},
                    {code: '332', class: '', top: '56.6%', left: '30.5%'},
                    {code: '331', class: '', top: '56.6%', left: '38.7%'},
                    {code: '330', class: '', top: '56.6%', left: '46.8%'},
                    {code: '329', class: '', top: '56.6%', left: '55.0%'},
                    {code: '328', class: '', top: '56.6%', left: '63.1%'},
                    {code: '327', class: '', top: '56.6%', left: '71.3%'},
                    {code: '340', class: 'rotate180', top: '61.1%', left: '22.4%'},
                    {code: '339', class: 'rotate180', top: '61.1%', left: '30.5%'},
                    {code: '338', class: 'rotate180', top: '61.1%', left: '38.7%'},
                    {code: '337', class: 'rotate180', top: '61.1%', left: '46.8%'},
                    {code: '336', class: 'rotate180', top: '61.1%', left: '55.0%'},
                    {code: '335', class: 'rotate180', top: '61.1%', left: '63.1%'},
                    {code: '334', class: 'rotate180', top: '61.1%', left: '71.3%'},
                    {code: '347', class: '', top: '67.6%', left: '22.4%'},
                    {code: '346', class: '', top: '67.6%', left: '30.5%'},
                    {code: '345', class: '', top: '67.6%', left: '38.7%'},
                    {code: '344', class: '', top: '67.6%', left: '46.8%'},
                    {code: '343', class: '', top: '67.6%', left: '55.0%'},
                    {code: '342', class: '', top: '67.6%', left: '63.1%'},
                    {code: '341', class: '', top: '67.6%', left: '71.3%'},
                    {code: '354', class: 'rotate180', top: '72.1%', left: '22.4%'},
                    {code: '353', class: 'rotate180', top: '72.1%', left: '30.5%'},
                    {code: '352', class: 'rotate180', top: '72.1%', left: '38.7%'},
                    {code: '351', class: 'rotate180', top: '72.1%', left: '46.8%'},
                    {code: '350', class: 'rotate180', top: '72.1%', left: '55.0%'},
                    {code: '349', class: 'rotate180', top: '72.1%', left: '63.1%'},
                    {code: '348', class: 'rotate180', top: '72.1%', left: '71.3%'},
                    {code: '361', class: '', top: '78.5%', left: '22.4%'},
                    {code: '360', class: '', top: '78.5%', left: '30.5%'},
                    {code: '359', class: '', top: '78.5%', left: '38.7%'},
                    {code: '358', class: '', top: '78.5%', left: '46.8%'},
                    {code: '357', class: '', top: '78.5%', left: '55.0%'},
                    {code: '356', class: '', top: '78.5%', left: '63.1%'},
                    {code: '355', class: '', top: '78.5%', left: '71.3%'},
                    {code: '368', class: 'rotate180', top: '82.9%', left: '22.4%'},
                    {code: '367', class: 'rotate180', top: '82.9%', left: '30.5%'},
                    {code: '366', class: 'rotate180', top: '82.9%', left: '38.7%'},
                    {code: '365', class: 'rotate180', top: '82.9%', left: '46.8%'},
                    {code: '364', class: 'rotate180', top: '82.9%', left: '55.0%'},
                    {code: '363', class: 'rotate180', top: '82.9%', left: '63.1%'},
                    {code: '362', class: 'rotate180', top: '82.9%', left: '71.3%'},
                    {code: '375', class: '', top: '89.3%', left: '22.4%'},
                    {code: '374', class: '', top: '89.3%', left: '30.5%'},
                    {code: '373', class: '', top: '89.3%', left: '38.7%'},
                    {code: '372', class: '', top: '89.3%', left: '46.8%'},
                    {code: '371', class: '', top: '89.3%', left: '55.0%'},
                    {code: '370', class: '', top: '89.3%', left: '63.1%'},
                    {code: '369', class: '', top: '89.3%', left: '71.3%'},

                    //第五层
                    {code: '377', class: 'rotate180', top: '66.6%', left: '3.4%'},
                    {code: '376', class: 'rotate180', top: '66.6%', left: '10.9%'},
                    {code: '379', class: '', top: '73%', left: '3.4%'},
                    {code: '378', class: '', top: '73%', left: '10.9%'},
                    {code: '381', class: 'rotate180', top: '77.1%', left: '3.4%'},
                    {code: '380', class: 'rotate180', top: '77.1%', left: '10.9%'},
                    {code: '383', class: '', top: '83.2%', left: '3.4%'},
                    {code: '382', class: '', top: '83.2%', left: '10.9%'},
                    {code: '385', class: 'rotate180', top: '89.1%', left: '3.4%'},
                    {code: '384', class: 'rotate180', top: '89.1%', left: '10.9%'},


        ],

                //10b7楼座位样式数据 static
                seatBaseInfo13b5:[
                    {code: '386', class: 'rotate180', top: '15.7%', left: '20.2%'},
                    {code: '387', class: 'rotate180', top: '15.7%', left: '28.2%'},
                    {code: '388', class: 'rotate180', top: '15.7%', left: '36.2%'},
                    {code: '389', class: 'rotate180', top: '15.7%', left: '44.2%'},
                    {code: '390', class: 'rotate180', top: '15.7%', left: '52.2%'},
                    {code: '391', class: 'rotate180', top: '15.7%', left: '60.2%'},
                    {code: '392', class: 'rotate180', top: '15.7%', left: '68.2%'},
                    {code: '393', class: 'rotate180', top: '15.7%', left: '76.2%'},
                    {code: '394', class: 'rotate180', top: '15.7%', left: '84.2%'},
                    {code: '395', class: 'rotate180', top: '15.7%', left: '92.2%'},
                    {code: '396', class: '', top: '21.7%', left: '20.2%'},
                    {code: '397', class: '', top: '21.7%', left: '28.2%'},
                    {code: '398', class: '', top: '21.7%', left: '36.2%'},
                    {code: '399', class: '', top: '21.7%', left: '44.2%'},
                    {code: '400', class: '', top: '21.7%', left: '52.2%'},
                    {code: '401', class: '', top: '21.7%', left: '60.2%'},
                    {code: '402', class: '', top: '21.7%', left: '68.2%'},
                    {code: '403', class: '', top: '21.7%', left: '76.2%'},
                    {code: '404', class: '', top: '21.7%', left: '84.2%'},
                    {code: '405', class: '', top: '21.7%', left: '92.2%'},
                    {code: '406', class: 'rotate180', top: '27.6%', left: '20.2%'},
                    {code: '407', class: 'rotate180', top: '27.6%', left: '28.2%'},
                    {code: '408', class: 'rotate180', top: '27.6%', left: '36.2%'},
                    {code: '409', class: 'rotate180', top: '27.6%', left: '44.2%'},
                    {code: '410', class: 'rotate180', top: '27.6%', left: '52.2%'},
                    {code: '411', class: 'rotate180', top: '27.6%', left: '60.2%'},
                    {code: '412', class: 'rotate180', top: '27.6%', left: '68.2%'},
                    {code: '413', class: 'rotate180', top: '27.6%', left: '76.2%'},
                    {code: '414', class: 'rotate180', top: '27.6%', left: '84.2%'},
                    {code: '415', class: 'rotate180', top: '27.6%', left: '92.2%'},
                    {code: '416', class: '', top: '33.6%', left: '20.2%'},
                    {code: '417', class: '', top: '33.6%', left: '28.2%'},
                    {code: '418', class: '', top: '33.6%', left: '36.2%'},
                    {code: '419', class: '', top: '33.6%', left: '44.2%'},
                    {code: '420', class: '', top: '33.6%', left: '52.2%'},
                    {code: '421', class: '', top: '33.6%', left: '60.2%'},
                    {code: '422', class: '', top: '33.6%', left: '68.2%'},
                    {code: '423', class: '', top: '33.6%', left: '76.2%'},
                    {code: '424', class: '', top: '33.6%', left: '84.2%'},
                    {code: '425', class: '', top: '33.6%', left: '92.2%'},
                    {code: '426', class: 'rotate180', top: '39.6%', left: '20.2%'},
                    {code: '427', class: 'rotate180', top: '39.6%', left: '28.2%'},
                    {code: '428', class: 'rotate180', top: '39.6%', left: '36.2%'},
                    {code: '429', class: 'rotate180', top: '39.6%', left: '44.2%'},
                    {code: '430', class: 'rotate180', top: '39.6%', left: '52.2%'},
                    {code: '431', class: 'rotate180', top: '39.6%', left: '60.2%'},
                    {code: '432', class: 'rotate180', top: '39.6%', left: '68.2%'},
                    {code: '433', class: 'rotate180', top: '39.6%', left: '76.2%'},
                    {code: '434', class: 'rotate180', top: '39.6%', left: '84.2%'},
                    {code: '435', class: 'rotate180', top: '39.6%', left: '92.2%'},
                    {code: '436', class: '', top: '45.6%', left: '20.2%'},
                    {code: '437', class: '', top: '45.6%', left: '28.2%'},
                    {code: '438', class: '', top: '45.6%', left: '36.2%'},
                    {code: '439', class: '', top: '45.6%', left: '44.2%'},
                    {code: '440', class: '', top: '45.6%', left: '52.2%'},
                    {code: '441', class: '', top: '45.6%', left: '60.2%'},
                    {code: '442', class: '', top: '45.6%', left: '68.2%'},
                    {code: '443', class: '', top: '45.6%', left: '76.2%'},
                    {code: '444', class: '', top: '45.6%', left: '84.2%'},
                    {code: '445', class: '', top: '45.6%', left: '92.2%'},
                    {code: '446', class: 'rotate180', top: '51.6%', left: '20.2%'},
                    {code: '447', class: 'rotate180', top: '51.6%', left: '28.2%'},
                    {code: '448', class: 'rotate180', top: '51.6%', left: '36.2%'},
                    {code: '449', class: 'rotate180', top: '51.6%', left: '44.2%'},
                    {code: '450', class: 'rotate180', top: '51.6%', left: '52.2%'},
                    {code: '451', class: 'rotate180', top: '51.6%', left: '60.2%'},
                    {code: '452', class: 'rotate180', top: '51.6%', left: '68.2%'},
                    {code: '453', class: 'rotate180', top: '51.6%', left: '76.2%'},
                    {code: '454', class: 'rotate180', top: '51.6%', left: '84.2%'},
                    {code: '455', class: 'rotate180', top: '51.6%', left: '92.2%'},
                    {code: '456', class: '', top: '57.6%', left: '20.2%'},
                    {code: '457', class: '', top: '57.6%', left: '28.2%'},
                    {code: '458', class: '', top: '57.6%', left: '36.2%'},
                    {code: '459', class: '', top: '57.6%', left: '44.2%'},
                    {code: '460', class: '', top: '57.6%', left: '52.2%'},
                    {code: '461', class: '', top: '57.6%', left: '60.2%'},
                    {code: '462', class: '', top: '57.6%', left: '68.2%'},
                    {code: '463', class: '', top: '57.6%', left: '76.2%'},
                    {code: '464', class: '', top: '57.6%', left: '84.2%'},
                    {code: '465', class: '', top: '57.6%', left: '92.2%'},
                    {code: '466', class: 'rotate180', top: '63.6%', left: '20.2%'},
                    {code: '467', class: 'rotate180', top: '63.6%', left: '28.2%'},
                    {code: '468', class: 'rotate180', top: '63.6%', left: '36.2%'},
                    {code: '469', class: 'rotate180', top: '63.6%', left: '44.2%'},
                    {code: '470', class: 'rotate180', top: '63.6%', left: '52.2%'},
                    {code: '471', class: 'rotate180', top: '63.6%', left: '60.2%'},
                    {code: '472', class: 'rotate180', top: '63.6%', left: '68.2%'},
                    {code: '473', class: 'rotate180', top: '63.6%', left: '76.2%'},
                    {code: '474', class: 'rotate180', top: '63.6%', left: '84.2%'},
                    {code: '475', class: 'rotate180', top: '63.6%', left: '92.2%'},
                    {code: '476', class: '', top: '69.6%', left: '20.2%'},
                    {code: '477', class: '', top: '69.6%', left: '28.2%'},
                    {code: '478', class: '', top: '69.6%', left: '36.2%'},
                    {code: '479', class: '', top: '69.6%', left: '44.2%'},
                    {code: '480', class: '', top: '69.6%', left: '52.2%'},
                    {code: '481', class: '', top: '69.6%', left: '60.2%'},
                    {code: '482', class: '', top: '69.6%', left: '68.2%'},
                    {code: '483', class: '', top: '69.6%', left: '76.2%'},
                    {code: '484', class: '', top: '69.6%', left: '84.2%'},
                    {code: '485', class: '', top: '69.6%', left: '92.2%'},
                    {code: '486', class: 'rotate180', top: '75.3%', left: '20.2%'},
                    {code: '487', class: 'rotate180', top: '75.3%', left: '28.2%'},
                    {code: '488', class: 'rotate180', top: '75.3%', left: '36.2%'},
                    {code: '489', class: 'rotate180', top: '75.3%', left: '44.2%'},
                    {code: '490', class: 'rotate180', top: '75.3%', left: '52.2%'},
                    {code: '491', class: 'rotate180', top: '75.3%', left: '60.2%'},
                    {code: '492', class: 'rotate180', top: '75.3%', left: '68.2%'},
                    {code: '493', class: 'rotate180', top: '75.3%', left: '76.2%'},
                    {code: '494', class: 'rotate180', top: '75.3%', left: '84.2%'},
                    {code: '495', class: 'rotate180', top: '75.3%', left: '92.2%'},
                    {code: '496', class: '', top: '81.3%', left: '20.2%'},
                    {code: '497', class: '', top: '81.3%', left: '28.2%'},
                    {code: '498', class: '', top: '81.3%', left: '36.2%'},
                    {code: '499', class: '', top: '81.3%', left: '44.2%'},
                    {code: '500', class: '', top: '81.3%', left: '52.2%'},
                    {code: '501', class: '', top: '81.3%', left: '60.2%'},
                    {code: '502', class: '', top: '81.3%', left: '68.2%'},
                    {code: '503', class: '', top: '81.3%', left: '76.2%'},
                    {code: '504', class: '', top: '81.3%', left: '84.2%'},
                    {code: '505', class: '', top: '81.3%', left: '92.2%'},

        ],
                //end of 基础数据

                //弹窗类数据
                seatReservedHint: false, //弹窗：已被预定人信息 false 表示关闭
                seatReservedHintData: {
                    no: "A001",
                    userName: "杨铭森",
                    departmentName: "流程IT中心"
                },
                seatReserving: false, //弹窗：用户点击可选座位 false 表示关闭
                //：0-可选；1-已被预订；2-当前用户已预定
                //服务器返回数据
                seatReservingData: [

                ],
                //用户当前选择数据
                seatReservingUserChooseData: {
                    reservationDates: [],
                    code: ""
                }
                //end of 弹窗类数据

            }
        },
        methods: {
            //预定按钮颜色样式
            getHintButtonSty() {
              return {
                  'hint-submit-button-enable': this.seatReservingUserChooseData.reservationDates.length > 0,
                  'hint-submit-button-disable': this.seatReservingUserChooseData.reservationDates.length < 1
              }
            },
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
                    // ddAPI.ddAlert("提示", "亲 您还没有选择座位哦", "确定")
                } else {
                    //提交数据到服务API
                    ddAPI.showPreloader("正在为您拼命占座中...");
                    ApiExample.saveStaffReservation(that.seatReservingUserChooseData).then(res => {
                        ddAPI.hidePreloader();
                        if (res.result.value == 0) {
                            dd.ready(() => {
                                dd.device.notification.alert({
                                    message: "预定成功",
                                    title: "提示",//可传空
                                    buttonName: "确定",
                                    onSuccess : function() {
                                        //onSuccess将在点击button之后回调
                                        /*回调*/

                                        //flush
                                        //关闭座位日期挑选弹框
                                        that.seatReserving = false;
                                        that.clearSeatReservingUserChooseData();
                                        that.loadFloorData();
                                    },
                                    onFail : function(err) {}
                                });
                            })

                        } else if (res.result.value == 1) {
                            ddAPI.ddAlert("提示", "预定失败,请重试!", "确定")
                            that.seatReservingUserChooseData.reservationDates = [];
                        } else if (res.result.value == 2) {
                            //
                            let tt = res.result.reservationDates;
                            let ansStr = "您在";
                            for(let i=0; i<tt.length; i++) {
                                if (i+1 == tt.length) {
                                    ansStr+= ymsUtil.fmtDate2(ymsUtil.fmtDate3(tt[i]));
                                } else {
                                    ansStr+= ymsUtil.fmtDate2(ymsUtil.fmtDate3(tt[i]))+",";
                                }
                            }
                            ansStr+="已预订过座位";
                            dd.ready(() => {
                                dd.device.notification.alert({
                                    message: ansStr,
                                    title: "预定失败",//可传空
                                    buttonName: "确定",
                                    onSuccess : function() {
                                        //onSuccess将在点击button之后回调
                                        /*回调*/
                                        that.seatReservingUserChooseData.reservationDates = [];
                                    },
                                    onFail : function(err) {}
                                });
                            })
                        } else if(  res.result.value == 3) {
                            dd.ready(() => {
                                dd.device.notification.alert({
                                    message: "座位已经被预定",
                                    title: "预定失败",//可传空
                                    buttonName: "确定",
                                    onSuccess : function() {
                                        //onSuccess将在点击button之后回调
                                        /*回调*/
                                        that.loadSeatReservingData();
                                        // this.seatReservingUserChooseData.reservationDates = []; //清空当前选中的日期
                                        that.seatReservingUserChooseData.reservationDates = [];
                                    },
                                    onFail : function(err) {}
                                });
                            })
                        } else if(res.result.value == 4) {
                            dd.ready(() => {
                                dd.device.notification.alert({
                                    message: "管理员已修改座位类型或部门",
                                    title: "预定失败",//可传空
                                    buttonName: "确定",
                                    onSuccess : function() {
                                        //onSuccess将在点击button之后回调
                                        /*回调*/

                                        that.loadFloorData();

                                        //隐藏座位预定弹窗
                                        that.seatReserving = false;

                                    },
                                    onFail : function(err) {}
                                });
                            })
                        }


                    }).catch(err => {
                        ddAPI.hidePreloader();
                        ddAPI.ddAlert("提示", "网络请求失败,请重试一下...", "确定")
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
                ddAPI.showPreloader("加载楼层中...")
                ApiExample.storeyList().then(res => {
                    ddAPI.hidePreloader();
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
                            },
                            onFail: function (err) {
                                //alert("floorChoose Error")
                            }
                        })
                    })

                }).catch(err => {
                    ddAPI.hidePreloader();
                    ddAPI.ddAlert("提示", "网络请求失败,请重试一下...", "确定")
                })
            },

            //加载楼层布局图数据
            loadFloorData() {
                const that = this;
                ddAPI.showPreloader("加载楼层数据中...");
                //获取座位布局图数据
                ApiExample.seatList({code: that.floorSelect, selectDate: that.selectDate}).then(res => {
                    ddAPI.hidePreloader();

                    that.seatData = res.result;
                    that.seatCanSelect = true; //从新加载时为true
                    for (let i = 0; i < that.seatData.length; i++) {
                        let st = that.seatData[i];
                        if (st.state == 3) {
                            that.seatCanSelect = false;
                            break;
                        }
                    }

                    //从新计算高度
                    that.resizeEvent();
                }).catch(err => {
                    ddAPI.hidePreloader();
                    ddAPI.ddAlert("提示", "网络请求失败,请重试一下...", "确定")
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

                            let selectDate = result.value;
                            let curDate =ymsUtil.fmtDate(new Date());

                            if (ymsUtil.theSpecificDateIsInRange(curDate, selectDate)) {
                                that.selectDate = result.value;
                                if (that.floorShowMsg != "座位所属楼层") {
                                    that.loadFloorData();
                                }
                            } else {
                                let message = "只能在"+ymsUtil.fmtDate(ymsUtil.getStartDate(curDate))+"至"+ymsUtil.fmtDate(ymsUtil.getEndDate(curDate))+"期间预订座位哦!";
                                ddAPI.ddAlert("提示", message,"确定")
                            }
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
            resizeDateWidth(idx) {
                this.$nextTick(() => {
                    document.getElementsByClassName("seat-reserving-choose")[0].style.minWidth =
                        (document.getElementsByClassName("seat-reserving-choose-date").length * 7.4 + 0.6) + 'rem'

                    this.$nextTick(() => {
                        document.getElementsByClassName("reserving-scroll")[0].scrollLeft = (idx * 112);
                    })

                })
            },


            loadSeatReservingData() {
                const that = this;
                ddAPI.showPreloader("拼命加载中...");
                ApiExample.listSeatDateReservation({selectDate: that.selectDate, code: that.selectItem}).then(res => {
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

                    //find the current date idx
                    let idx = -1;
                    for (let i = 0; i <rs.length; i++) {
                        if (that.selectDate == rs[i].seatDate) {
                            idx = i;
                            break;
                        }
                    }
                    if (idx == -1) {

                    }

                    this.resizeDateWidth(idx);

                }).catch(err => {
                    ddAPI.hidePreloader();
                    ddAPI.ddAlert("提示","网络请求出错,请再试一下...","确定")
                });
            },

            //当点击座位时
            whenClickSeat(code, ev) {
                //ev.stopPropagation() 阻止冒泡  //1.阻止默认事件?
                const that = this;
                let seat = this.getSomeSeatInfo(code);

                //if 当前座位可选
                if (seat.state == 0 || seat.state==3) {
                    if (that.seatCanSelect == true || seat.state==3) {
                        that.clearSeatReservingUserChooseData();


                        ev.stopPropagation();
                        that.selectItem = code; //更新选中图标
                        that.seatReservingUserChooseData.code = seat.no; //设置当前选中座位的座位号

                        that.loadSeatReservingData();

                        // ddAPI.showPreloader("拼命加载中...");
                        // ApiExample.listSeatDateReservation({selectDate: that.selectDate, code: code}).then(res => {
                        //     // that.seatReservingData = res.result;
                        //     ddAPI.hidePreloader();
                        //     let rs = res.result;
                        //     for (let i = 0; i < rs.length; i++) {
                        //         rs[i].seatDate = ymsUtil.fmtDate3(rs[i].seatDate);
                        //     }
                        //     that.seatReservingData = rs;
                        //
                        //     //处理同时为true的情况：如当前用户正在查看某个已经被预定的座位，而之后又点击一个可选的座位时
                        //     if (that.seatReservedHint == true) {
                        //         that.seatReservedHint = false;
                        //     }
                        //     that.seatReserving = true; // 打开选择座位日期的弹框
                        //
                        //     //find the current date idx
                        //     let idx = -1;
                        //     for (let i = 0; i <rs.length; i++) {
                        //         if (that.selectDate == rs[i].seatDate) {
                        //             idx = i;
                        //             break;
                        //         }
                        //     }
                        //     if (idx == -1) {
                        //
                        //     }
                        //
                        //     this.resizeDateWidth(idx);
                        //
                        // }).catch(err => {
                        //
                        // });
                    } else {
                        ddAPI.ddAlert("提示", "你今天已经预定了座位哦", "确定")
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
                        if (res.result.no == undefined || res.result.no == null) {
                            that.seatReservedHint = false;
                            that.loadFloorData();
                        } else {
                            if (that.seatReserving == true) {
                                that.seatReserving = false;
                            }
                            that.seatReservedHint = true; //打开弹窗
                        }


                    }).catch(err => {
                        ddAPI.hidePreloader();
                        ddAPI.ddAlert("提示", "网络请求失败哦,请再试一下", "确定")
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
            },

            handleOtherPageToHele() {
                let params = this.$route.query;
                if (params.storeyCode != undefined) {
                    const that = this;
                    that.selectDate = params.reservationDate;
                    that.floorSelect = params.storeyCode;

                    that.floorSelectedKey = params.storeyName; //更新用户当前选择
                    that.floorShowMsg = that.floorSelectedKey; //更新楼层选择提示


                    that.isShowData = false; //取消默认空白页

                    that.loadFloorData();
                }
            }

        },
        created () {
          // localStorage.setItem("isLogin", '0'); //是否登录 0=未登录，1=登录
          //localStorage.setItem("loginNum",0); //0表示第一次尝试登录，最大尝试登陆次数为2, 超多2退出app

          let isLogin = localStorage.getItem("isLogin");
          if (!isLogin || +isLogin === 0) {
            // router.push({ name: 'login', query: { returnurl: router.history.current.fullPath }})
            this.$router.push({ name: 'login'})
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

            this.handleOtherPageToHele();

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
                /*background-color: #fff;*/
                /*color: #E36386;*/
                border-radius: 7px;
                margin-top: 3%;
                margin-bottom: 3%;
                margin-right: 3%;
                width: 90px;
            }
        }
    }

    .hint-submit-button-enable {
        background-color: #fff;
        color: #E36386;
    }

    .hint-submit-button-disable {
        background-color: #c4c4c4;
        color: #ffffff;
    }


    //
    .seat-reserving .reserving-scroll {
        width: 100%;
        overflow-x: scroll;
        background-color: #ffffff;
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
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        -webkit-tap-highlight-color:transparent;
        position: relative;
        width: 100%;
        overflow-x: scroll;
        overflow-y: scroll;
        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Chrome/Safari/Opera */
        -khtml-user-select: none; /* Konqueror */
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
        user-select: none;
        .choosefloor {
            position: absolute;
            background-repeat: no-repeat;
            background-size: 100%;
            width: 120%;
            margin-bottom: 5.5rem;
            /*left: 50%;*/
            /*right: 50%;*/
            /*transform: translate(-60%);*/
        }
    }

    //------------------------------------------------10B-5---start---------------------------------------------------
    .choosearea-10B5 {
        background-image: url('../assets/images/bg-10B-5.png');
    }

    .choosearea-10B6 {
        background-image: url('../assets/images/bg-10B-6.png');
    }

    .choosearea-10B7 {
        background-image: url('../assets/images/bg-10B-7.png');
    }

    .choosearea-13B5 {
        background-image: url('../assets/images/bg-13B-5.png');
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
