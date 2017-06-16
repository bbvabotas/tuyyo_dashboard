<template>
   
<div class="row">
    <div class="col-sm-12">
        <div class="row">
            <div class="col-sm-12">
                <h3>App Store Rating</h3>
            </div>
        </div>
        <hr>
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
    
    import AllTimeRating from './all-time-rating.vue'
    import RatingTrend from './rating-trend.vue'
    
    export default {
        data() {
            return {                
                icons: {
                    iconAndroid: require("assets/img/icon_android.png"),
                    iconIOS: require("assets/img/icon_ios.svg")
                }
            }
        },
        methods:{
            
        },
        components: {
            AllTimeRating,
            RatingTrend
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
    }
    
    .icon_size:hover {
        cursor: pointer;
    }
    
    .icon_active {
        border: 1px solid blue;
        border-radius: 5px;
    }
</style>
