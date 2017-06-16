<template>
    <highcharts :options="options"></highcharts>
</template>

<script>
    
    export default {
        //name: 'donut-chart',
        props: ['chart_data'],
        data() {
            return {
                options: this.calculateOptions()
            }
        },
        methods:{
            calculateOptions(){
                let this_data = this.chart_data;
                
                return {
                    chart: {
                        type: 'line',
                        spacingRight: 2,
                        spacingLeft: 2
                    },
                    credits: {
                        enabled: false
                    },
                    title: {
                        text: ''
                    },
                    xAxis: {
                        categories: ['Yesterday', 'Y - 1', 'Y - 2', 'Y - 3', 'Y - 4', 'Y - 5']
                    },
                    yAxis: {
                        visible: false
                    },
                    tooltip: {
                        enabled: false
                    },
                    plotOptions: {
                        line: {
                            dataLabels: {
                                enabled: true
                            }
                        }
                    },
                    legend: {
                        enabled: false
                    },
                    series: [{
                        name: 'USA',
                        data: [4, 10, 3, 5, 2, 1]
                    }]
                }
            }
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    
</style>
