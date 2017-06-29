<template>
    <highcharts :options="options" ref="highcharts"></highcharts>
</template>

<script>
    
    //import 'highcharts-more'
    
    export default {
        //name: 'donut-chart',
        props: ['rating_data'],
        data() {
            return {
                new_rating: 3,
                options: this.calculateOptions()
            }
        },
        watch: {
            rating_data(){
                let chart = this.$refs.highcharts.chart;
                chart.series[0].points[0].update(parseFloat(this.rating_data));
            }  
        },
        methods:{
            calculateOptions(){
                return {
                    chart: {
                        type: 'gauge',
                        plotBackgroundColor: null,
                        plotBackgroundImage: null,
                        plotBorderWidth: 0,
                        plotShadow: false
                    },
                    credits: {
                        enabled: false
                    },
                    title: {
                        text: ''
                    },
                    subtitle: {
                        text: 'Average Review Rating'
                    },
                    tooltip: {
                        enabled: false
                    },
                    pane: {
                        startAngle: -150,
                        endAngle: 150,
                        background: [{
                            backgroundColor: {
                                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                                stops: [
                                    [0, '#FFF'],
                                    [1, '#333']
                                ]
                            },
                            borderWidth: 0,
                            outerRadius: '120%'
                        }, {
                            backgroundColor: {
                                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                                stops: [
                                    [0, '#333'],
                                    [1, '#FFF']
                                ]
                            },
                            borderWidth: 1,
                            outerRadius: '107%'
                        }, {
                            // default background
                        }, {
                            backgroundColor: '#DDD',
                            borderWidth: 0,
                            outerRadius: '105%',
                            innerRadius: '103%'
                        }]
                    },
                    yAxis: {
                        min: 1,
                        max: 5,

                        minorTickInterval: 'auto',
                        minorTickWidth: 1,
                        minorTickLength: 10,
                        minorTickPosition: 'inside',
                        minorTickColor: '#666',

                        tickPixelInterval: 50,
                        tickWidth: 2,
                        tickPosition: 'inside',
                        tickLength: 0.1,
                        tickColor: '#666',
                        labels: {
                            step: 2,
                            rotation: 'auto'
                        },
                        title: {
                            text: ''
                        },
                        plotBands: [{
                            from: 1,
                            to: 2,
                            color: 'red'
                        }, {
                            from: 2,
                            to: 3,
                            color: 'orange'
                        }, {
                            from: 3,
                            to: 4,
                            color: 'yellow'
                        }, {
                            from: 4,
                            to: 4.5,
                            color: 'yellowgreen'
                        }, {
                            from: 4.5,
                            to: 5,
                            color: 'green'
                        }]
                    },
                    series: [{
                        name: 'Rating',
                        data: [1],
                        dataLabels: {
                            borderWidth: 0,
                            y: 40,
                            format: '<span style="font-size:3em">{y}</span>'
                        }
                    }]
                }
            }
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    
</style>
