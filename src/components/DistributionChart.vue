<template>
    <div class="distribution-chart" ref="div">

    </div>
</template>

<script>
    import echarts from 'echarts/lib/echarts'
    import 'echarts/lib/chart/bar'
    import 'echarts/lib/chart/bar';
    import 'echarts/lib/chart/line';
    import 'echarts/lib/chart/pie';
    import 'echarts/lib/component/title';
    import 'echarts/lib/component/legend';
    import 'echarts/lib/component/toolbox';
    import 'echarts/lib/component/markPoint';
    import 'echarts/lib/component/tooltip';

    import {getAdminDistribution} from '@/api/index';

    export default {
        name: "DistributionChart",
        option: {
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['北京','杭州','其他','上海','深圳']
            },
            series : [
                {
                    name: '用户分布',
                    type: 'pie',
                    radius : '55%',
                    center: ['50%', '60%'],
                    data:[
                        {value:335, name:'北京'},
                        {value:310, name:'杭州'},
                        {value:234, name:'其他'},
                        {value:135, name:'上海'},
                        {value:1548, name:'深圳'}
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        },
        mounted() {
            getAdminDistribution().then(response=>{
                this.$options.option.series[0].data[0].value = response.data.user_city['beijing'];
                this.$options.option.series[0].data[1].value = response.data.user_city['hangzhou'];
                this.$options.option.series[0].data[2].value = response.data.user_city['qita'];
                this.$options.option.series[0].data[3].value = response.data.user_city['shanghai'];
                this.$options.option.series[0].data[4].value = response.data.user_city['shenzhen'];

                echarts.init(this.$refs.div).setOption(this.$options.option);
            })
        }
    }
</script>

<style>
    .distribution-chart{
        margin: 100px auto;
        width: 80%;
        height: 500px;
    }
</style>