<template>
<div id="app">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"/>
<!--
    <div class="live_ticker">
        <div>Live (today)</div>
        <div style="white-space: nowrap;">
            <div class="ticker_animation">
                <div class="ticker_item"><strong>Transfers: </strong>{{liveTransfersString}}</div><div class="ticker_item"><strong>Transfer Amount: </strong>${{liveTransferAmountString}}</div>
                <div class="ticker_item"><strong>Transfers: </strong>{{liveTransfersString}}</div><div class="ticker_item"><strong>Transfer Amount: </strong>${{liveTransferAmountString}}</div>
            </div>
        </div>
    </div>
-->
    <div>
        <ul class="nav_main">
            <li>
                <div><img src="~@/assets/logo.png" /></div>
            </li>
            <li>
                <div>Tuyyo Dashboard</div>
            </li>
            <li>
                <div>
                <router-link active-class="active-page" to="/overview">
                    <div><i class="fa fa-tachometer fa-2x"></i><br>Dashboard</div>
                </router-link>
                </div>
            </li>
            <li>
                <router-link active-class="active-page" to="/customer-feedback">
                    <div><i class="fa fa-comments-o fa-2x"></i><br>Customer Feedback</div>
                </router-link>
            </li>
            <li>
                <router-link active-class="active-page" to="/errors">
                    <div><i class="fa fa-exclamation-circle fa-2x"></i><br>Errors</div>
                </router-link>
<!--                <div><i class="fa fa-exclamation-circle fa-2x"></i><br>Errors</div>-->
            </li>
        </ul>

    </div>
    <router-view></router-view>

</div>
</template>

<script>
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'



    export default {
        name: 'app',
        mounted(){
            //this.liveData();
        },
        data() {
            return {
       //         images: {
       //             logoSrc: require("./src/assets/img/logo.png")
       //         },
                liveTransfers: 2,
                liveTransfersString: '2',
                liveTransferAmount: 50,
                liveTransferAmountString: '50'
            }
        },
        methods: {
            liveData(){
                //let rnd_time = 100;
                setInterval(()=>{
                    //let rnd_time = Math.floor(Math.random() * 5000) + 2000
                    this.liveTransfers += 3
                    this.liveTransferAmount += 132
                    this.liveTransferAmountString = this.convertNumberToHaveCommas(this.liveTransferAmount)
                    this.liveTransfersString = this.convertNumberToHaveCommas(this.liveTransfers)
                }, 5000);
            },
            convertNumberToHaveCommas(num){
                let new_num = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                return new_num
            }
        }
    }

</script>

<style scoped>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        background-color: white;
    }

    img {
        height: 40px;
    }

    .nav_main a {
        text-decoration: none;
    }

    .nav_main a:hover {
/*        color: #b6bec8;*/
        color: white;
    }

    .nav_main {
        list-style-type: none;
        background-color: #072146;
        text-align: left;
    }

    .nav_main li {
        display: inline-block;
        color: white;
        text-align: center;
        vertical-align: middle;
        padding: 10px 15px;
    }

    .active-page {
        color: white;
    }

    .live_ticker {
        position: absolute;
        z-index: 10;
        right: 8%;
        top: 0;
        color: white;
        width: 200px;
        height: 50px;
        overflow: hidden;
        background-color: #072146;
/*        border: 1px solid white;*/
        padding: 10px 20px;
    }

    .ticker_item {
/*        margin-right: 20px;*/
        display: inline-block;
        width: 200px;
        overflow: hidden;
    }

    @keyframes example {
        from {
            left: 0;
        }
        to {
/*            left: -404px;*/
            left: -202%;
        }
    }

    .ticker_animation {
        position: absolute;
        animation-name: example;
        animation-duration: 9s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
    }

</style>
