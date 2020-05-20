<template>
    <div class="my">
        <div class="my-top">
            <el-row>
                <el-col :span="12">
                    <div class="grid-content my-top-menu">
                        <div class="my-top-menu-one">未来预定</div>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content my-top-menu">
                        <div class="my-top-menu-two">历史预定</div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="my-body">
            <div v-if="switchPage == 0" class="my-body-blank"></div>
            <div v-if="switchPage == 1" class="my-body-reserved">
                <div class="my-body-reserved-content">
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
                                                10B 第五层
                                            </div>
                                        </div>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="24">
                                        <div class="grid-content">
                                            <div class="my-body-reserved-content-right-SeatCode">
                                                033号座
                                            </div>
                                        </div>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="16">
                                        <div class="grid-content ">
                                            <div class="my-body-reserved-content-right-date">入座日期：2020.04.25</div>
                                        </div>
                                    </el-col>
                                    <el-col :span="8">
                                        <div class="grid-content ">
                                            <div class="my-body-reserved-content-right-cancelButton">
                                                取消选定
                                            </div>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <div class="my-body-reserved-content">
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
                                                10B 第五层
                                            </div>
                                        </div>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="24">
                                        <div class="grid-content">
                                            <div class="my-body-reserved-content-right-SeatCode">
                                                033号座
                                            </div>
                                        </div>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="16">
                                        <div class="grid-content ">
                                            <div class="my-body-reserved-content-right-date">入座日期：2020.04.25</div>
                                        </div>
                                    </el-col>
                                    <el-col :span="8">
                                        <div class="grid-content ">
                                            <div class="my-body-reserved-content-right-cancelButton">
                                                取消选定
                                            </div>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <div class="my-body-reserved-content">
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
                                                10B 第五层
                                            </div>
                                        </div>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="24">
                                        <div class="grid-content">
                                            <div class="my-body-reserved-content-right-SeatCode">
                                                033号座
                                            </div>
                                        </div>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="16">
                                        <div class="grid-content ">
                                            <div class="my-body-reserved-content-right-date">入座日期：2020.04.25</div>
                                        </div>
                                    </el-col>
                                    <el-col :span="8">
                                        <div class="grid-content ">
                                            <div class="my-body-reserved-content-right-cancelButton">
                                                取消选定
                                            </div>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <div class="my-body-reserved-content">
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
                                                10B 第五层
                                            </div>
                                        </div>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="24">
                                        <div class="grid-content">
                                            <div class="my-body-reserved-content-right-SeatCode">
                                                033号座
                                            </div>
                                        </div>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="16">
                                        <div class="grid-content ">
                                            <div class="my-body-reserved-content-right-date">入座日期：2020.04.25</div>
                                        </div>
                                    </el-col>
                                    <el-col :span="8">
                                        <div class="grid-content ">
                                            <div class="my-body-reserved-content-right-cancelButton">
                                                取消选定
                                            </div>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <div class="my-body-reserved-content">
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
                                                10B 第五层
                                            </div>
                                        </div>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="24">
                                        <div class="grid-content">
                                            <div class="my-body-reserved-content-right-SeatCode">
                                                033号座
                                            </div>
                                        </div>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="16">
                                        <div class="grid-content ">
                                            <div class="my-body-reserved-content-right-date">入座日期：2020.04.25</div>
                                        </div>
                                    </el-col>
                                    <el-col :span="8">
                                        <div class="grid-content ">
                                            <div class="my-body-reserved-content-right-cancelButton">
                                                取消选定
                                            </div>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <div class="my-body-reserved-content">
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
                                                10B 第五层
                                            </div>
                                        </div>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="24">
                                        <div class="grid-content">
                                            <div class="my-body-reserved-content-right-SeatCode">
                                                033号座
                                            </div>
                                        </div>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="16">
                                        <div class="grid-content ">
                                            <div class="my-body-reserved-content-right-date">入座日期：2020.04.25</div>
                                        </div>
                                    </el-col>
                                    <el-col :span="8">
                                        <div class="grid-content ">
                                            <div class="my-body-reserved-content-right-cancelButton">
                                                取消选定
                                            </div>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <div class="my-body-reserved-content">
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
                                                10B 第五层
                                            </div>
                                        </div>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="24">
                                        <div class="grid-content">
                                            <div class="my-body-reserved-content-right-SeatCode">
                                                033号座
                                            </div>
                                        </div>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="16">
                                        <div class="grid-content ">
                                            <div class="my-body-reserved-content-right-date">入座日期：2020.04.25</div>
                                        </div>
                                    </el-col>
                                    <el-col :span="8">
                                        <div class="grid-content ">
                                            <div class="my-body-reserved-content-right-cancelButton">
                                                取消选定
                                            </div>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <div class="my-body-reserved-content">
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
                                                10B 第五层
                                            </div>
                                        </div>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="24">
                                        <div class="grid-content">
                                            <div class="my-body-reserved-content-right-SeatCode">
                                                033号座
                                            </div>
                                        </div>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="16">
                                        <div class="grid-content ">
                                            <div class="my-body-reserved-content-right-date">入座日期：2020.04.25</div>
                                        </div>
                                    </el-col>
                                    <el-col :span="8">
                                        <div class="grid-content ">
                                            <div class="my-body-reserved-content-right-cancelButton">
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
            <div v-if="switchPage == 2" class="my-body-history">
                <div class="my-body-history-filterdate">
                    <el-row>
                        <el-col :span="6">
                            <div class="grid-content my-body-history-filterdate-left">选择日期</div>
                        </el-col>
                        <el-col :span="18">
                            <div class="grid-content">
                                <el-input
                                        suffix-icon="el-icon-date"
                                        :readonly=true
                                        v-model="filterDate"
                                        class="my-body-history-filterdate-right">
                                </el-input>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <div class="my-body-history-content">
                    <div class="my-body-history-record">
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
                                                10B 第五层
                                            </div>
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="14">
                                            <div class="grid-content my-body-history-record-SeatNo">
                                                <div class="">033号座</div>
                                            </div>
                                        </el-col>
                                        <el-col :span="10">
                                            <div class="grid-content my-body-history-record-SeatDate">
                                                <div class="">
                                                    入座日期：2020.04.25
                                                </div>
                                            </div>
                                        </el-col>
                                    </el-row>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="my-body-history-record">
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
                                                10B 第五层
                                            </div>
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="14">
                                            <div class="grid-content my-body-history-record-SeatNo">
                                                <div class="">033号座</div>
                                            </div>
                                        </el-col>
                                        <el-col :span="10">
                                            <div class="grid-content my-body-history-record-SeatDate">
                                                <div class="">
                                                    入座日期：2020.04.25
                                                </div>
                                            </div>
                                        </el-col>
                                    </el-row>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="my-body-history-record">
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
                                                10B 第五层
                                            </div>
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="14">
                                            <div class="grid-content my-body-history-record-SeatNo">
                                                <div class="">033号座</div>
                                            </div>
                                        </el-col>
                                        <el-col :span="10">
                                            <div class="grid-content my-body-history-record-SeatDate">
                                                <div class="">
                                                    入座日期：2020.04.25
                                                </div>
                                            </div>
                                        </el-col>
                                    </el-row>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="my-body-history-record">
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
                                                10B 第五层
                                            </div>
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="14">
                                            <div class="grid-content my-body-history-record-SeatNo">
                                                <div class="">033号座</div>
                                            </div>
                                        </el-col>
                                        <el-col :span="10">
                                            <div class="grid-content my-body-history-record-SeatDate">
                                                <div class="">
                                                    入座日期：2020.04.25
                                                </div>
                                            </div>
                                        </el-col>
                                    </el-row>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="my-body-history-record">
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
                                                10B 第五层
                                            </div>
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="14">
                                            <div class="grid-content my-body-history-record-SeatNo">
                                                <div class="">033号座</div>
                                            </div>
                                        </el-col>
                                        <el-col :span="10">
                                            <div class="grid-content my-body-history-record-SeatDate">
                                                <div class="">
                                                    入座日期：2020.04.25
                                                </div>
                                            </div>
                                        </el-col>
                                    </el-row>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="my-body-history-record">
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
                                                10B 第五层
                                            </div>
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="14">
                                            <div class="grid-content my-body-history-record-SeatNo">
                                                <div class="">033号座</div>
                                            </div>
                                        </el-col>
                                        <el-col :span="10">
                                            <div class="grid-content my-body-history-record-SeatDate">
                                                <div class="">
                                                    入座日期：2020.04.25
                                                </div>
                                            </div>
                                        </el-col>
                                    </el-row>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="my-body-history-record">
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
                                                10B 第五层
                                            </div>
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="14">
                                            <div class="grid-content my-body-history-record-SeatNo">
                                                <div class="">033号座</div>
                                            </div>
                                        </el-col>
                                        <el-col :span="10">
                                            <div class="grid-content my-body-history-record-SeatDate">
                                                <div class="">
                                                    入座日期：2020.04.25
                                                </div>
                                            </div>
                                        </el-col>
                                    </el-row>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="my-body-history-record">
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
                                                10B 第五层
                                            </div>
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="14">
                                            <div class="grid-content my-body-history-record-SeatNo">
                                                <div class="">033号座</div>
                                            </div>
                                        </el-col>
                                        <el-col :span="10">
                                            <div class="grid-content my-body-history-record-SeatDate">
                                                <div class="">
                                                    入座日期：2020.04.25
                                                </div>
                                            </div>
                                        </el-col>
                                    </el-row>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="my-body-history-record">
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
                                                10B 第五层
                                            </div>
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="14">
                                            <div class="grid-content my-body-history-record-SeatNo">
                                                <div class="">033号座</div>
                                            </div>
                                        </el-col>
                                        <el-col :span="10">
                                            <div class="grid-content my-body-history-record-SeatDate">
                                                <div class="">
                                                    入座日期：2020.04.25
                                                </div>
                                            </div>
                                        </el-col>
                                    </el-row>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="my-body-history-record">
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
                                                10B 第五层
                                            </div>
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="14">
                                            <div class="grid-content my-body-history-record-SeatNo">
                                                <div class="">033号座</div>
                                            </div>
                                        </el-col>
                                        <el-col :span="10">
                                            <div class="grid-content my-body-history-record-SeatDate">
                                                <div class="">
                                                    入座日期：2020.04.25
                                                </div>
                                            </div>
                                        </el-col>
                                    </el-row>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="my-body-history-record">
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
                                                10B 第五层
                                            </div>
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="14">
                                            <div class="grid-content my-body-history-record-SeatNo">
                                                <div class="">033号座</div>
                                            </div>
                                        </el-col>
                                        <el-col :span="10">
                                            <div class="grid-content my-body-history-record-SeatDate">
                                                <div class="">
                                                    入座日期：2020.04.25
                                                </div>
                                            </div>
                                        </el-col>
                                    </el-row>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="my-body-history-record">
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
                                                10B 第五层
                                            </div>
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="14">
                                            <div class="grid-content my-body-history-record-SeatNo">
                                                <div class="">033号座</div>
                                            </div>
                                        </el-col>
                                        <el-col :span="10">
                                            <div class="grid-content my-body-history-record-SeatDate">
                                                <div class="">
                                                    入座日期：2020.04.25
                                                </div>
                                            </div>
                                        </el-col>
                                    </el-row>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="my-body-history-record">
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
                                                10B 第五层
                                            </div>
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="14">
                                            <div class="grid-content my-body-history-record-SeatNo">
                                                <div class="">033号座</div>
                                            </div>
                                        </el-col>
                                        <el-col :span="10">
                                            <div class="grid-content my-body-history-record-SeatDate">
                                                <div class="">
                                                    入座日期：2020.04.25
                                                </div>
                                            </div>
                                        </el-col>
                                    </el-row>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="my-body-history-record">
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
                                                10B 第五层
                                            </div>
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="14">
                                            <div class="grid-content my-body-history-record-SeatNo">
                                                <div class="">033号座</div>
                                            </div>
                                        </el-col>
                                        <el-col :span="10">
                                            <div class="grid-content my-body-history-record-SeatDate">
                                                <div class="">
                                                    入座日期：2020.04.25
                                                </div>
                                            </div>
                                        </el-col>
                                    </el-row>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="my-body-history-record">
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
                                                10B 第五层
                                            </div>
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="14">
                                            <div class="grid-content my-body-history-record-SeatNo">
                                                <div class="">033号座</div>
                                            </div>
                                        </el-col>
                                        <el-col :span="10">
                                            <div class="grid-content my-body-history-record-SeatDate">
                                                <div class="">
                                                    入座日期：2020.04.25
                                                </div>
                                            </div>
                                        </el-col>
                                    </el-row>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="my-body-history-record">
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
                                                10B 第五层
                                            </div>
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="14">
                                            <div class="grid-content my-body-history-record-SeatNo">
                                                <div class="">033号座</div>
                                            </div>
                                        </el-col>
                                        <el-col :span="10">
                                            <div class="grid-content my-body-history-record-SeatDate">
                                                <div class="">
                                                    入座日期：2020.04.25
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
    export default {
        name: "MyReserve",
        data() {
            return {
                switchPage: 2, //0 未来预定(无数据)空白页, 1 未来预定(有数据)页, 2 历史预定页
                filterDate: "2020-04" //历史预定-当前日期

            }
        },
        methods: {

            //Dynamic calculation of my-body-reserved style height
            dynamicComputeBodyReservedHeight() {
                this.$nextTick( () => {
                    document.getElementsByClassName("my-body-reserved")[0].style.height =
                        (document.documentElement.clientHeight -
                            document.getElementsByClassName("my-top")[0].offsetHeight -
                            document.getElementsByClassName("footer")[0].offsetHeight
                        ) + "px";
                })
            },
            //Dynamic calculation of my-body-history-content style height
            dynamicComputeBodyHistoryHeight() {
                this.$nextTick(() => {
                    document.getElementsByClassName("my-body-history-content")[0].style.height =
                        (document.documentElement.clientHeight -
                            document.getElementsByClassName("my-top")[0].offsetHeight -
                            document.getElementsByClassName("my-body-history-filterdate")[0].offsetHeight -
                            document.getElementsByClassName("footer")[0].offsetHeight
                        ) + "px";
                    console.log(document.getElementsByClassName("my-body-history-content")[0].style.height)
                })
            }
        },
        mounted() {
            this.dynamicComputeBodyReservedHeight();
            this.dynamicComputeBodyHistoryHeight();
        }
    }
</script>

<style lang="less" scoped>

    .my-body {

        .my-body-reserved {
            width: 100%;
            overflow-y: scroll;
            .my-body-reserved-content {
                border: 1px solid #C3EEF4;
                border-radius: 10px;
                margin: 3px 0;

                .my-body-reserved-content-icon {
                    background-image: url("../assets/images/icon_3 .png");
                    background-repeat: no-repeat;
                    background-size: 62%;
                    height: 5rem;
                    background-position-x: center;
                    background-position-y: 6px;
                }

                .my-body-reserved-content-right {
                    text-align: left;
                    padding-left: 9px;


                    .my-body-reserved-content-right-floor {
                        margin-top: 3px;
                        font-size: 1.2rem;
                    }

                    .my-body-reserved-content-right-SeatCode {
                        font-size: 1.8rem;
                        font-weight: bold;
                    }

                    .my-body-reserved-content-right-date {
                        font-size: 0.9rem;
                        padding-top: 3px;
                        color: #4D4D4D;
                    }

                    .my-body-reserved-content-right-cancelButton {
                        border: 1px solid #37C9DA;
                        text-align: center;
                        margin-right: 5px;
                        margin-bottom: 5px;
                        border-radius: 6px;
                        background-color: #37C9DA;
                        color: #ffffff;
                        padding: 2px 0;
                    }

                }
            }
        }
        .my-body-history {
            .my-body-history-filterdate {
                .my-body-history-filterdate-left {
                    color: #00afa5;
                    font-size: 1.3rem;
                    padding-top: 0.6rem;
                }
                .my-body-history-filterdate-right {
                    font-size: 1rem;
                }
                .my-body-history-filterdate-right /deep/ .el-input__inner {
                    border: 1px solid #C3EFF4;
                    border-radius: 10px;
                    color: #00afa5;
                }
                .my-body-history-filterdate-right /deep/ .el-input__suffix {
                    color: #00afa5;
                    font-size: 1.2rem;
                }
            }
            .my-body-history-content {
                width: 100%;
                overflow-y: scroll;
                .my-body-history-record {
                    margin-top: 0.8rem;
                    border: 1px solid #D6EFEC;
                    border-radius: 8px;
                    .my-body-history-record-left {
                        background-color: #79D2CC;
                        height: 4.1rem;
                        border-bottom-left-radius: 8px ;
                        border-top-left-radius: 8px ;
                    }
                    .my-body-history-record-floor {
                        text-align: left;
                        padding-left: 1rem;
                        font-size: 1rem;
                        color: #4D4D4D;
                    }
                    .my-body-history-record-SeatNo {
                        text-align: left;
                        padding-left: 1rem;
                        font-size: 1.66rem;
                        font-weight: bold;
                        color: #4D4D4D;
                    }
                    .my-body-history-record-SeatDate {
                        font-size: 1rem;
                        text-align: right;
                        padding-top: 1rem;
                        padding-right: 1rem;
                        padding-bottom: 0.5rem;
                        color: #00afa5;
                    }
                }
            }
        }
    }

    .my-top {
        height: 4rem;
        margin-left: -2%;
        width: 104%;
        border-top: 1px solid #E6E6E6;
        border-bottom: 1px solid #E6E6E6;

        .my-top-menu {
            margin-top: 0.5rem;
            margin-bottom: 7%;
            height: 3rem;
            font-size: 1.3rem;

            .my-top-menu-one {
                background-color: #00afa5;
                margin-left: 45%;
                border-top-left-radius: 10px;
                border-bottom-left-radius: 10px;
                padding: 11px 0;
                color: #ffffff;
            }

            .my-top-menu-two {
                background-color: #E9F9FB;
                margin-right: 45%;
                border-top-right-radius: 10px;
                border-bottom-right-radius: 10px;
                padding: 11px 0;
                color: #00afa5;
            }

        }


    }

</style>
