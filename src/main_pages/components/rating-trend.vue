<template>
    <div class="row">
        <div class="col-sm-12">
            <highcharts :options="options" style="height:200px; width:100%;"></highcharts>
        </div>
    </div>
    
</template>

<script>
    
    export default {
        data() {
            return {                
                options: this.calculateChart()
            }
        },
        methods:{
            convertNumberToHaveCommas(num){
                let new_num = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                return new_num
            },
            calculateChart(){
                let this_app = this,
                    bar_colors = {
                        star_1: '#ff8b5a', star_2: '#ffb234', star_3: '#ffd834', star_4: '#add633', star_5: '#9fc05a'
                    };
                
                return {
                    title: {
                        text: ''
                    },
                    credits: {
                        enabled: false
                    },
                    subtitle: {
                        text: 'Rating Trend'
                    },
                    yAxis: {
                        visible: false,
                        max: 5,
                        min: 0
                    },
                    xAxis: {
                        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                    },
                    legend: {
                        enabled: false
//                        layout: 'vertical',
//                        align: 'right',
//                        verticalAlign: 'middle'
                    },
                    plotOptions: {
                        line: {
                            dataLabels: {
                                enabled: true,
                                formatter(){
                                    console.log(this_app.bar_colors);
                                    return this_app.convertNumberToHaveCommas(this.y);
                                }
                            }
                        }
                    },
                    series: [{
                        name: 'Rating',
                        data: [3.2, 3.4, 4.3, 4.1, 3.9, 4.2, 3.4, 4.3, 4.1, 3.9, 4.5, 4.6]
                    }]
                }
            }
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .chart {
        height: 200px;
    }
</style>
