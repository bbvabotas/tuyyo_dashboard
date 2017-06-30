<template>
    <div class="row">
        <div class="col-sm-12">
            <div class="rating_needle_wrapper">
                <div><img class="rating_gauge" :src="images.ratingGauge"></div>
                <div><img class="rating_needle_set" :src="images.ratingNeedleSet" :style="{transform: 'rotate(' + needleSetAngle + 'deg)'}"></div>
                <div><img class="rating_needle_new" :src="images.ratingNeedleNew" :style="{transform: 'rotate(' + needleNewAngle + 'deg)'}"></div>
                <div class="avg_rating_set">{{rating_data.averageRatingNum}}</div>
                <div class="avg_rating_new">modified:<br>{{rating_data.averageNumChange}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    
    //import 'highcharts-more'
    
    export default {
        //name: 'donut-chart',
        props: ['rating_data'],
        mounted(){
//            rating_data: {
//                averageRatingNum: 0,
//                averageNumChange: 0
//            },
            this.updateSetRatingsNeedle(this.rating_data.averageRatingNum)
                this.updateNewRatingsNeedle(this.rating_data.averageNumChange)
        },
        data() {
            return {
                needleSetAngle: 0,
                needleNewAngle: 0,
                images: {
                    ratingGauge: require("assets/img/rating_gauge.png"),
                    ratingNeedleSet: require("assets/img/rating_needle_set.png"),
                    ratingNeedleNew: require("assets/img/rating_needle_new.png")
                }
            }
        },
        methods: {
            calculateNeedleAngle(rating){
                return ((30 - (rating * 10)) * -1) * 7.5
            },
            updateSetRatingsNeedle(rating){
                
                this.needleSetAngle = this.calculateNeedleAngle(parseFloat(this.rating_data.averageRatingNum))
            },
            updateNewRatingsNeedle(rating){
                if(this.rating_data.averageNumChange == 0){
                    this.needleNewAngle = this.calculateNeedleAngle(parseFloat(this.rating_data.averageRatingNum))
                } else {
                    this.needleNewAngle = this.calculateNeedleAngle(parseFloat(this.rating_data.averageNumChange))
                }
                
            }
        },
        watch: {
            'rating_data.averageRatingNum'(){
                //console.log('change set needle')
                this.updateSetRatingsNeedle(this.rating_data.averageRatingNum)
                this.updateNewRatingsNeedle(this.rating_data.averageRatingNum)
            },
            'rating_data.averageNumChange'(){
                //console.log('change new needle')
                this.updateNewRatingsNeedle(this.rating_data.averageNumChange)
            }
        }
//        watch: {
//            rating_data(){
//                let chart = this.$refs.highcharts.chart;
//                chart.series[0].points[0].update(parseFloat(this.rating_data));
//            }  
//        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .rating_needle_wrapper {
        position: relative;
        height: 300px;
        width: 300px;
        margin: auto;
/*        border: 1px solid gray;*/
    }
    
    .rating_gauge {
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0; left: 0;
    }
    
    .rating_needle_set {
        height: 120px;
        position: absolute;
        top: 40px;
        left: 142px;
        z-index: 10;
/*        transform: rotate(15deg);*/
        transform-origin: center 92%;
    }
    
    .rating_needle_new {
        height: 120px;
        position: absolute;
        z-index: 5;
        top: 40px;
        left: 142px;
/*        transform: rotate(40deg);*/
        transform-origin: center 92%;
    }
    
    .avg_rating_set {
        position: absolute;
        font-size: 40px;
        font-weight: bold;
        left: 40%;
        top: 180px;
    }
    
    .avg_rating_new {
        position: absolute;
        top: 240px;
        font-size: 14px;
        color: #595959;
        left: 40%;
        top: 230px;
    }
</style>
