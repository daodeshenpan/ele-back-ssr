<template>
    <div class="trend-chart" ref="div"></div>
</template>

<script>
    import echarts from 'echarts/lib/echarts'
    import 'echarts/lib/chart/bar'
    import 'echarts/lib/chart/bar';
    import 'echarts/lib/chart/line';
    import 'echarts/lib/component/title';
    import 'echarts/lib/component/legend';
    import 'echarts/lib/component/toolbox';
    import 'echarts/lib/component/markPoint';
    import 'echarts/lib/component/tooltip';

    import {
        getUserDayCount,
        getOrderDayCount,
        getAdminDayCount
    } from '@/api/index'

    export default {
        name: "TrendChart",
        option: {
            title: {
                text: '走势图'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            legend: {
                data: ['用户数量', '订单数量', '管理员数量']
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: []
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '用户数量',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {},
                    data: []
                },
                {
                    name: '订单数量',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {},
                    data: []
                },
                {
                    name: '管理员数量',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {},
                    data: []
                }
            ]
        },
        mounted() {
            Promise.all([
                Promise.all([
                    getUserDayCount(this.getFormattedDate(6)),
                    getUserDayCount(this.getFormattedDate(5)),
                    getUserDayCount(this.getFormattedDate(4)),
                    getUserDayCount(this.getFormattedDate(3)),
                    getUserDayCount(this.getFormattedDate(2)),
                    getUserDayCount(this.getFormattedDate(1)),
                    getUserDayCount(this.getFormattedDate(0))
                ]).then((value => {
                    this.$options.option.series[0].data[0] = value[0].data.count;
                    this.$options.option.series[0].data[1] = value[1].data.count;
                    this.$options.option.series[0].data[2] = value[2].data.count;
                    this.$options.option.series[0].data[3] = value[3].data.count;
                    this.$options.option.series[0].data[4] = value[4].data.count;
                    this.$options.option.series[0].data[5] = value[5].data.count;
                    this.$options.option.series[0].data[6] = value[6].data.count;
                })),
                Promise.all([
                    getOrderDayCount(this.getFormattedDate(6)),
                    getOrderDayCount(this.getFormattedDate(5)),
                    getOrderDayCount(this.getFormattedDate(4)),
                    getOrderDayCount(this.getFormattedDate(3)),
                    getOrderDayCount(this.getFormattedDate(2)),
                    getOrderDayCount(this.getFormattedDate(1)),
                    getOrderDayCount(this.getFormattedDate(0))
                ]).then((value => {
                    this.$options.option.series[1].data[0] = value[0].data.count;
                    this.$options.option.series[1].data[1] = value[1].data.count;
                    this.$options.option.series[1].data[2] = value[2].data.count;
                    this.$options.option.series[1].data[3] = value[3].data.count;
                    this.$options.option.series[1].data[4] = value[4].data.count;
                    this.$options.option.series[1].data[5] = value[5].data.count;
                    this.$options.option.series[1].data[6] = value[6].data.count;
                })),
                Promise.all([
                    getAdminDayCount(this.getFormattedDate(6)),
                    getAdminDayCount(this.getFormattedDate(5)),
                    getAdminDayCount(this.getFormattedDate(4)),
                    getAdminDayCount(this.getFormattedDate(3)),
                    getAdminDayCount(this.getFormattedDate(2)),
                    getAdminDayCount(this.getFormattedDate(1)),
                    getAdminDayCount(this.getFormattedDate(0))
                ]).then((value => {
                    this.$options.option.series[2].data[0] = value[0].data.count;
                    this.$options.option.series[2].data[1] = value[1].data.count;
                    this.$options.option.series[2].data[2] = value[2].data.count;
                    this.$options.option.series[2].data[3] = value[3].data.count;
                    this.$options.option.series[2].data[4] = value[4].data.count;
                    this.$options.option.series[2].data[5] = value[5].data.count;
                    this.$options.option.series[2].data[6] = value[6].data.count;
                }))]).then(() => {
                this.$options.option.xAxis[0].data[0] = this.getFormattedDate(6);
                this.$options.option.xAxis[0].data[1] = this.getFormattedDate(5);
                this.$options.option.xAxis[0].data[2] = this.getFormattedDate(4);
                this.$options.option.xAxis[0].data[3] = this.getFormattedDate(3);
                this.$options.option.xAxis[0].data[4] = this.getFormattedDate(2);
                this.$options.option.xAxis[0].data[5] = this.getFormattedDate(1);
                this.$options.option.xAxis[0].data[6] = this.getFormattedDate(0);
                echarts.init(this.$refs.div).setOption(this.$options.option);
            })
        },
        methods: {
            getFormattedDate(n) {
                let date = new Date(Date.now() - 86400000 * n);
                return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
            }
        }
    }
</script>

<style>
    .trend-chart {
        margin: 100px auto;
        width: 80%;
        height: 500px;
    }
</style>