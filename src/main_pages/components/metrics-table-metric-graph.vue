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
                //console.log(this_data);
                
                let shift_color = '';
                
                if(this_data.shift >= 1.25){
                    shift_color = 'green'
                } else if (this_data.shift <= 0.75){
                    shift_color = 'red'
                } else {
                    shift_color = '#7cb5ec'
                }
                
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
                    subtitle: {
                        text: this_data.name  
                    },
                    xAxis: {
                        categories: ['Shift', 'Yesterday', 'Y - 1', 'Y - 2', 'Y - 3', 'Y - 4', 'Y - 5']
                    },
                    yAxis: [{
//                        plotLines:[{
//                            value: this_data.avg,
//                            color: 'black',
//                            width: 2
//                        }],
                        title: {
                            text: ''  
                        },
                        gridLineWidth: 0,
                        labels: {
                            enabled: false  
                        }

                    },{
                        visible: false,
                        opposite: true
                    }],
                    tooltip: {
                        enabled: false
                    },
//                    plotOptions: {
//                        line: {
//                            dataLabels: {
//                                enabled: true
//                            }
//                        }
//                    },
                    legend: {
                        verticalAlign: 'middle',
                        align: 'right',
                        layout: 'vertical',
                        labelFormat: '{name} ' + this_data.avg
                    },
                    series: [{
                        name: 'Shift',
                        yAxis: 1,
                        type: 'column',
                        color: shift_color,
                        data: [
                            this_data.shift
                        ],
                        showInLegend: false,
                        dataLabels: {
                            enabled: true
                        }
                    },{
                        name: 'Trend',
                        color: '#7cb5ec',
                        data: [
                            null,
                            this_data.yesterday,
                            this_data.y_1,
                            this_data.y_2,
                            this_data.y_3,
                            this_data.y_4,
                            this_data.y_5
                        ],
                        dataLabels: {
                            enabled: true
                        },
                        showInLegend: false
                    },{
                        name: 'avg',
                        dashStyle: 'ShortDash',
                        color: 'black',
                        data: [
                            null,
                            null,
                            this_data.avg,
                            this_data.avg,
                            this_data.avg,
                            this_data.avg,
                            this_data.avg
                        ],
                        datalabels: {
                            enabled: false
                        },
                        tooltip: {
                            enabled: false
                        },
                        marker: {
                            enabled: false
                        },
                        states: {
                            hover: {
                                enabled: false
                            }
                        }
                    }]
                }
            }
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .plot_line_width {
        padding: 20px;
    }
</style>
