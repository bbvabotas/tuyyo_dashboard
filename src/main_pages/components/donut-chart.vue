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
                
                let chart_height = 200 + (this_data.data.length * 16);
                
                return {
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: 0,
                        plotShadow: false,
                        height: chart_height + 'px'
                    },
                    //colors: chart_colors,
                    title: {
                        text: ''
                    },
                    subtitle: {
                        text: this_data.name
                    }, credits: {enabled:false},
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                    },
                    plotOptions: {
                        pie: {
                            dataLabels: {
                                enabled: true,
                                distance: 0,
                                formatter: function(){
                                    if(this_data.name == 'Transfer Amount'){
                                        return '$' + this.y;
                                    } else {
                                        return this.y;
                                    }

                                },
                                style: {
                                    fontWeight: 'bold'
                                }
                            },
//                            startAngle: -90,
//                            endAngle: 90,
//                            center: ['50%', '100%'],
//                            size: '150%',
                            showInLegend: true
                        }
                    },
                    legend: {
                        align: 'left',
                        layout: 'vertical',
                        verticalAlign: 'middle'
                    },
                    series: [{
                        type: 'pie',
//                        innerSize: '50%',
                        data: this_data.data
                    }]
                }
            }
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    
</style>
