<template>
    <div class=live_ticker_wrapper>
        <div style="padding: 10px 0"><strong>Live</strong><div style="font-size:0.8em; font-style: italic">today</div></div>
        <div class="live_ticker">
            <div style="white-space: nowrap;">
                <div class="ticker_animation">
                    <div class="ticker_item registered_customers_width">
                        <i class="fa fa-user"></i> <strong>Registered Customers: </strong>50
                    </div>
                    <div class="ticker_item active_customers_width">
                        <i class="fa fa-child"></i> <strong>Active Customers: </strong>132
                    </div>
                    <div class="ticker_item transfers_width">
                        <i class="fa fa-exchange"></i> <strong>Transfers: </strong>{{liveTransfersAnimated}}
                    </div>
                    <div class="ticker_item amount_width">
                        <i class="fa fa-money"></i> <strong>Transfer Amount: </strong>${{liveTransferAmountAnimated}}
                    </div>
                    <div class="ticker_item registered_customers_width">
                        <i class="fa fa-user"></i> <strong>Registered Customers: </strong>50
                    </div>
                    <div class="ticker_item active_customers_width">
                        <i class="fa fa-child"></i> <strong>Active Customers: </strong>132
                    </div>
                    <div class="ticker_item transfers_width">
                        <i class="fa fa-exchange"></i> <strong>Transfers: </strong>{{liveTransfersAnimated}}
                    </div>
                    <div class="ticker_item amount_width">
                        <i class="fa fa-money"></i> <strong>Transfer Amount: </strong>${{liveTransferAmountAnimated}}
                    </div>
                </div>
            </div>
        </div> 
    </div>
    
</template>

<script>
    import TWEEN from '@tweenjs/tween.js'
    
    export default {
        //props: ['rating_data'],
        mounted(){
            this.liveData();  
        },
        data() {
            return {                
                liveTransfers: 2,
                liveTransfersAnimated: 2,
                liveTransferAmount: 50,
                liveTransferAmountAnimated: 50,
            }
        },
        watch: {
            liveTransferAmount: function(newValue, oldValue) {
                var vm = this
                var animationFrame
                
                function animate (time) {
                    TWEEN.update(time)
                    animationFrame = requestAnimationFrame(animate)
                }
                
                new TWEEN.Tween({ tweeningNumber: oldValue })
                .easing(TWEEN.Easing.Quadratic.Out)
                .to({ tweeningNumber: newValue }, 500)
                .onUpdate(function () {
                    vm.liveTransferAmountAnimated = this.tweeningNumber.toFixed(0)
                })
                .onComplete(function () {
                    cancelAnimationFrame(animationFrame)
                    vm.liveTransferAmountAnimated = vm.convertNumberToHaveCommas(newValue)
                })
                .start()
                
                animationFrame = requestAnimationFrame(animate)
                
            },
            liveTransfers: function(newValue, oldValue) {
                var vm = this
                var animationFrame
                
                function animate (time) {
                    TWEEN.update(time)
                    animationFrame = requestAnimationFrame(animate)
                }
                
                new TWEEN.Tween({ tweeningNumber: oldValue })
                .easing(TWEEN.Easing.Quadratic.Out)
                .to({ tweeningNumber: newValue }, 500)
                .onUpdate(function () {
                    vm.liveTransfersAnimated = this.tweeningNumber.toFixed(0)
                })
                .onComplete(function () {
                    cancelAnimationFrame(animationFrame)
                    vm.liveTransfersAnimated = vm.convertNumberToHaveCommas(newValue)
                })
                .start()
                
                animationFrame = requestAnimationFrame(animate)
            }
        },
        methods: {
            liveData(){
                //let rnd_time = 100;
                setInterval(()=>{
                    //let rnd_time = Math.floor(Math.random() * 5000) + 2000
                    this.liveTransfers += 13
                    this.liveTransferAmount += 532
                }, 5000);
            },
            convertNumberToHaveCommas(num){
                let new_num = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                return new_num
            }
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    
    .live_ticker_wrapper {
        width: 100%;
        text-align: center;
    }
    
    .live_ticker {
        margin: auto;
        width: 50%;
        overflow: hidden;
    }
    
    .ticker_item {
        display: inline-block;
        margin: 0;
        padding: 0;
        overflow: hidden;
    }
    
    .registered_customers_width {
        width: 250px;
    }
    
    .active_customers_width {
        width: 250px;
    }
    
    .transfers_width {
        width: 150px;
    }
    
    .amount_width {
        width: 250px;
    }
    
    @keyframes example {
        from {
            left: 0;
        }
        to {
            left: -916px;
        }
    }
    
    .ticker_animation {
        position: relative;
        animation-name: example;
        animation-duration: 19s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
    }
</style>
