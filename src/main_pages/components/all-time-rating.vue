<template>
   
        <div class="row">
            <div class="col-sm-3" style="text-align:center;">
                <div style="font-size: 5em">
                    4.3
                </div>
                <div style="margin:10px 0;">start_img</div>
<!--                <div><i class="fa fa-user"></i><span style="margin-left:10px;">2,000</span></div>-->
            </div>
            <div class="col-sm-6">
                <highcharts :options="options" style="height:150px; width:100%;"></highcharts>
            </div>
            <div class="col-sm-3" style="text-align:left">
                <div class="row">
                    <div class="col-sm-12">
                        <div style="font-size:1em">Total ratings</div>                        
                        <div style="font-size:1.3em"><strong>156</strong></div>
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-sm-12">
                        <div style="font-size:1em">Ratings with reviews</div>
                        <div style="font-size:1.3em"><strong>22</strong></div>
                    </div>
                </div>
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
                    chart: {
                        type: 'bar'  
                    },
                    title: {
                        text: ''
                    },
                    credits: {
                        enabled: false  
                    },
                    tooltip: {
                        enabled: false
                    },
                    xAxis: {
                        categories: ['5 Stars', '4 Stars', '3 Stars', '2 Stars', '1 Star']
                    },
                    yAxis: {
                        title: '',
                        labels: {
                            enabled: false
                        },
                        gridLineWidth: 0
                    },
                    plotOptions: {
                        bar: {
                            dataLabels: {
                                enabled: true,
                                formatter(){
                                    console.log(this_app.bar_colors);
                                    return this_app.convertNumberToHaveCommas(this.y);
                                }
                            },
                            groupPadding: 0
                        }
                    },
                    legend: {
                        enabled: false  
                    },
                    series: [{
                        data: [{
                            name: '5 Stars',
                            y: 20,
                            color: bar_colors.star_5
                        },{
                            name: '4 Stars',
                            y: 8,
                            color: bar_colors.star_4
                        },{
                            name: '3 Stars',
                            y: 2,
                            color: bar_colors.star_3
                        },{
                            name: '2 Stars',
                            y: 2,
                            color: bar_colors.star_2
                        },{
                            name: '1 Stars',
                            y: 8,
                            color: bar_colors.star_1
                        }]
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
