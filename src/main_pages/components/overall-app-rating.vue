<template>
   
<div class="row">
   <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <div class="col-sm-12">
        <div class="row">
            <div class="col-sm-12">
                <h3>App Store Rating</h3>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-6">
                <img class="icon_size" :src="icons.iconAndroid">
                <all-time-rating></all-time-rating>
                <rating-trend></rating-trend>
            </div>
            <div class="col-sm-6">
                <img class="icon_size" :src="icons.iconIOS">
                <all-time-rating></all-time-rating>
                <rating-trend></rating-trend>
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col-sm-12">
                <div class="row">
                    <div class="col-sm-12">
                        <h3>App Store Reviews</h3>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <span><img class="icon_size icon_active" :src="icons.iconAndroid"></span>
                        <div style="display:inline-block">
                            <div><strong>Date Range:</strong></div>
                            <div id="date_range" class="date_range_wrapper"></div>
                        </div>
                        <span><img class="icon_size" :src="icons.iconIOS"></span>
                    </div>
                </div>
                
<!--
                <div><strong>Date Range:</strong></div>
                <div id="date_range" class="date_range_wrapper"></div>
                <div>
                    <span><img class="icon_size icon_active" :src="icons.iconAndroid"></span>
                    <span><img class="icon_size" :src="icons.iconIOS"></span>
                </div>
-->
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12">
                <app-store-reviews></app-store-reviews>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12">
                <reviews-negative-comments></reviews-negative-comments>
            </div>
        </div>
        <hr>
    </div>
</div>
    
<!--
    <div class="row">
        <div class="col-sm-12">
            <rating-trend></rating-trend>
        </div>
    </div>
-->
</template>

<script>
    import moment from 'moment'
    import papaparse from 'papaparse'
    
    import jquery from 'jquery'
    import daterangepicker from 'daterangepicker'
    
    import AllTimeRating from './all-time-rating.vue'
    import RatingTrend from './rating-trend.vue'
    import AppStoreReviews from './app-store-reviews.vue'
    import ReviewsNegativeComments from './reviews-negative-comments.vue'
    
    export default {
        mounted() {
            this.dateRange();  
        },
        data() {
            return {                
                icons: {
                    iconAndroid: require("assets/img/icon_android.png"),
                    iconIOS: require("assets/img/icon_ios.svg")
                }
            }
        },
        methods:{
            dateRange(){
                let start = moment().subtract(7, 'days'),
                    end = moment();

                function displayDate(start, end){                    
                    jquery("#date_range").html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY') + ' <span><i class="fa fa-chevron-down" style="float:right"></i></span>');
                }

                jquery("#date_range").daterangepicker({
                    opens: 'center',
                    ranges: {
                       'Today': [moment(), moment()],
                       'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                       'Last 7 Days': [moment().subtract(7, 'days'), moment()],
                       'Last 30 Days': [moment().subtract(30, 'days'), moment()],
                       'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                    },
                    startDate: start,
                    endDate: end,
                    maxDate: moment(),
                    alwaysShowCalendars: true
                }, displayDate);

                displayDate(start, end);
            }
        },
        components: {
            AllTimeRating,
            RatingTrend,
            AppStoreReviews,
            ReviewsNegativeComments
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .row {
        margin: 20px 0;
    }
    
    .page_header {
        display: inline-block;
        margin: 0 20px;
        vertical-align: middle;
    }
    
    .icon_size {
        height: 60px;
        padding: 4px;
        margin: 0 10px;
    }
    
    .icon_size:hover {
        cursor: pointer;
    }
    
    .icon_active {
        border: 1px solid blue;
        border-radius: 5px;
    }
    
    .date_range_wrapper {
        background: #fff;
        cursor: pointer;
        padding: 5px 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        width: 300px;
        margin: 0 auto 20px auto;
    }
</style>
