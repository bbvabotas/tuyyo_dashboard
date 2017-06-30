<template>
    <div class="landing">
        <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/bootstrap.daterangepicker/2/daterangepicker.css" />
           <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
            <div class="row">
                <div class="col-sm-12">
<!--
                    <div class="row">
                        <div class="col-sm-12">
                            <button class="btn btn-default" @click="getLogins">Get Logins</button>
                            <button class="btn btn-default" @click="getRegistrations">Get Registrations</button>
                            <button class="btn btn-default" @click="getActive">Get Active Customers</button>
                            <button class="btn btn-default" @click="getTransfers">Get Transfers</button>
                            <button class="btn btn-default" @click="getTransferAmount">Get Transfer Amount</button>
                        </div>
                    </div>
-->
                    <div class="row">
                        <div class="col-sm-12">
                            <h3>App Ratings</h3>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-6">
                            <overview-app-rating :rating_data="icon.android"></overview-app-rating>
                        </div>
                        <div class="col-sm-6">
                            <overview-app-rating :rating_data="icon.ios"></overview-app-rating>
                        </div>
                    </div>
                    <hr>
                    <div class="row">
                        <div class="col-sm-12">
                            <h3>Stats</h3>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12">
                            <overview-live-data></overview-live-data>
                        </div>
                    </div>
<!--                    <hr>-->
                    <div class="row">
                        <div class="col-sm-12">
                            <div><strong>Date Range:</strong></div>
                            <div id="date_range" class="date_range_wrapper"></div>
                                
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col-sm-12">
                            <div style="font-size:0.9em; font-style:italic;">The below data combines Android and iOS</div>
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col-sm-3"><info-box :info_data="info_box_data.registeredCustomersData"></info-box></div>
                        <div class="col-sm-3"><info-box :info_data="info_box_data.activeCustomersData"></info-box></div>
                        <div class="col-sm-3"><info-box :info_data="info_box_data.transfersData"></info-box></div>
                        <div class="col-sm-3"><info-box :info_data="info_box_data.amountTransferedData"></info-box></div>
                    </div>
                    <div class="row" style="height:250px">
<!--
                        <div class="col-sm-3">
                            <donut-chart :chart_data="donut_chart_data.registeredCustomersData" class="donut-chart"></donut-chart>
                        </div>
                        <div class="col-sm-3">
                            <donut-chart :chart_data="donut_chart_data.repeatCustomersData" class="donut-chart"></donut-chart>
                        </div>
-->
                        <div class="col-sm-6">
                            <donut-chart :chart_data="donut_chart_data.transfersData" class="donut-chart"></donut-chart>
                        </div>
                        <div class="col-sm-6">
                            <donut-chart :chart_data="donut_chart_data.amountTransferedData" class="donut-chart"></donut-chart>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-sm-5 countries">
                            <countries-us></countries-us>
                        </div>
                        <div class="col-sm-2 countries">
                            <div class="countries-transfers">
                                <div>Transfers: 312</div>
                                <div><i class="fa fa-long-arrow-right fa-5x"></i></div>
                                <div>Transfer Amount: $2,765</div>
                            </div>

                        </div>
                        <div class="col-sm-5 countries">
                            <countries-mx></countries-mx>
                        </div>
                    </div>
                    <hr>
                    <div class="row">
                        <div class="col-sm-12">
                            <metrics-table></metrics-table>
                        </div>
                    </div>
                    <hr>
                </div>
            </div>
        
        
    </div>
</template>

<script>
    import OverviewLiveData from './overview-live-data'
    import DonutChart from './donut-chart.vue'
    import InfoBox from './info-box.vue'
    import CountriesUs from './countries-us.vue'
    import CountriesMx from './countries-mx.vue'
    import OverviewAppRating from './overview-app-rating.vue'
    import MetricsTable from './metrics-table.vue'
    
    import moment from 'moment'
    import jquery from 'jquery'
    import daterangepicker from 'daterangepicker'
    
    import axios from 'axios'
    
    
    
    export default {
        mounted() {
            this.dateRange();
            this.appStore();
        },
        data() {
            return {
//                start_date: '',
//                end_date: '',
                icon: {
                    android: 'iconAndroid',
                    ios: 'iconIOS'
                },
                info_box_data: {
                    registeredCustomersData: {
                        name: 'Registered Customers',
                        val: '',
                        icon: 'user'
                    },
                    activeCustomersData: {
                        name: 'Active Customers',
                        val: '',
                        icon: 'repeat'
                    },
                    transfersData: {
                        name: 'Transfers',
                        val: '',
                        icon: 'exchange'
                    },
                    amountTransferedData: {
                        name: 'Transfer Amount',
                        val: '',
                        mxn: 0,
                        icon: 'money'
                    }
                },
                donut_chart_data: {
//                    registeredCustomersData: {
//                        name: 'Registered Customers',
//                        data: [{
//                            name: 'United States',
//                            y: 245
//                        }, {
//                            name: 'Mexico',
//                            y: 913
//                        }]
//                    },
//                    repeatCustomersData: {
//                        name: 'Active Customers',
//                        data: [{
//                            name: 'United States',
//                            y: 245
//                        }, {
//                            name: 'Mexico',
//                            y: 913
//                        }]
//                    },
                    transfersData: {
                        loading_data: true,
                        name: 'Transfers',
                        data: [{
                            name: 'ATM Pickup',
                            y: 0
                        }, {
                            name: 'Cash Pickup',
                            y: 0
                        }, {
                            name: 'Bank Transfer',
                            y: 0
                        }]
                    },
                    amountTransferedData: {
                        loading_data: true,
                        name: 'Transfer Amount',
                        data: [{
                            name: 'ATM Pickup',
                            y: 0
                        }, {
                            name: 'Cash Pickup',
                            y: 0
                        }, {
                            name: 'Bank Transfer',
                            y: 0
                        }]
                    }
                }
            }
        },
        methods: {
            appStore(){
//                axios.get(`http://jsonplaceholder.typicode.com/posts`)
//                .then(response => {
//                  // JSON responses are automatically parsed.
//                  this.posts = response.data
//                })
//                .catch(e => {
//                  this.errors.push(e)
//                })
            },
            getCustomerData(start, end){
                console.log('get data from ' + start + ' to ' + end)
                
                /*
                    Blank out the data so that the loading spinner will display           
                */
                this.info_box_data.registeredCustomersData.val = '';
                this.info_box_data.activeCustomersData.val = '';
                this.info_box_data.transfersData.val = '';
                this.info_box_data.amountTransferedData.val = '';

                this.donut_chart_data.transfersData.data[0].y = ''; //atm pickup
                this.donut_chart_data.transfersData.data[1].y = ''; //cash pickup
                this.donut_chart_data.transfersData.data[2].y = ''; //bank transfer

                this.donut_chart_data.amountTransferedData.data[0].y = ''; //atm pickup
                this.donut_chart_data.amountTransferedData.data[1].y = ''; //cash pickup
                this.donut_chart_data.amountTransferedData.data[2].y = ''; //bank transfer

                this.donut_chart_data.transfersData.loading_data = true;
                this.donut_chart_data.amountTransferedData.loading_data = true;
                
                //For testing purposes
//                setTimeout( () => {
//                    
//                    this.info_box_data.registeredCustomersData.val = 27;
//                    this.info_box_data.activeCustomersData.val = 39;
//                    this.info_box_data.transfersData.val = 9;
//                    this.info_box_data.amountTransferedData.val = '$' + 768.35;
//                    
//                    this.donut_chart_data.transfersData.data[0].y = 6; //atm pickup
//                    this.donut_chart_data.transfersData.data[1].y = 2; //cash pickup
//                    this.donut_chart_data.transfersData.data[2].y = 1; //bank transfer
//                    
//                    this.donut_chart_data.amountTransferedData.data[0].y = 61.03; //atm pickup
//                    this.donut_chart_data.amountTransferedData.data[1].y = 501.39999999999; //cash pickup
//                    this.donut_chart_data.amountTransferedData.data[2].y = 216.32; //bank transfer
//                    
//                    //Change the loading_data to false to display the new chart data
//                    this.donut_chart_data.transfersData.loading_data = false;
//                    this.donut_chart_data.amountTransferedData.loading_data = false;
//                    
//                    console.log(this.customer_data);
//                }, 4000)
                
                /*
                    Now get the actual data
                */
                
                let this_vm = this
                axios.get('/registrations?start=' + start + '&end=' + end) //Get registration data
                .then(response => {
                    if(response.data.length > 0){
                        this_vm.info_box_data.registeredCustomersData.val = response.data[0].count;
                        
                    } else {
                        this_vm.info_box_data.registeredCustomersData.val = 0;
                    }
                    
                    
                    axios.get('/active?start=' + start + '&end=' + end) //Get active customer data
                    .then(response => {
                        if(response.data.length > 0){
                            this_vm.info_box_data.activeCustomersData.val = response.data[0].count;
                        } else {
                            
                            this_vm.info_box_data.activeCustomersData.val = 0;
                        }
                        
                        axios.get('/transferCount?start=' + start + '&end=' + end) //Get transfer data
                        .then(response => {
                            
                            let atm_pickup = 0, cash_pickup = 0, bank_transfer = 0;
                            
                            console.log(response);
                            
                            if(response.data.length > 0){
                                atm_pickup = response.data[0].count
                                cash_pickup = response.data[1].count
                                bank_transfer = response.data[2].count
                            }
                            
//                            if(response.data[0].count != undefined){
//                                atm_pickup = response.data[0].count
//                            }
//                            if(response.data[1].count != undefined){
//                                cash_pickup = response.data[1].count
//                            }
//                            if(response.data[2].count != undefined){
//                                bank_transfer = response.data[2].count
//                            }
                            
                            this_vm.info_box_data.transfersData.val = atm_pickup + cash_pickup + bank_transfer;
                            this_vm.donut_chart_data.transfersData.data[0].y = atm_pickup; //atm pickup
                            this_vm.donut_chart_data.transfersData.data[1].y = cash_pickup; //cash pickup
                            this_vm.donut_chart_data.transfersData.data[2].y = bank_transfer; //bank transfer
                            
                            console.log(this_vm.info_box_data.transfersData);
                            
                            axios.get('/transferAmount?start=' + start + '&end=' + end) //Get transfer amount data
                            .then(response => {
                                let atm_pickup = 0, cash_pickup = 0, bank_transfer = 0;
                            
                                console.log(response);
                                
                                if(response.data.length > 0){
                                    atm_pickup = response.data[0].total_from_amount
                                    cash_pickup = response.data[1].total_from_amount
                                    bank_transfer = response.data[2].total_from_amount
                                }
//                                if(response.data[0].count != undefined){
//                                    atm_pickup = response.data[0].count
//                                }
//                                if(response.data[1].count != undefined){
//                                    cash_pickup = response.data[1].count
//                                }
//                                if(response.data[2].count != undefined){
//                                    bank_transfer = response.data[2].count
//                                }

                                this_vm.info_box_data.amountTransferedData.val = '$' + ((atm_pickup + cash_pickup + bank_transfer).toFixed(0));
                                this_vm.donut_chart_data.amountTransferedData.data[0].y = atm_pickup; //atm pickup
                                this_vm.donut_chart_data.amountTransferedData.data[1].y = cash_pickup; //cash pickup
                                this_vm.donut_chart_data.amountTransferedData.data[2].y = bank_transfer; //bank transfer
                                
                                console.log(this_vm.info_box_data.amountTransferedData);
                                
                                this_vm.donut_chart_data.transfersData.loading_data = false;
                                this_vm.donut_chart_data.amountTransferedData.loading_data = false;
                            })
                            .catch(e => {
                                console.log(e)
                            }) 
                        })
                        .catch(e => {
                            console.log(e)
                        }) 
                    })
                    .catch(e => {
                        console.log(e)
                    }) 
                })
                .catch(e => {
                    console.log(e)
                })
                
                
                
                
//                axios.get('/registrations?start=' + start + '&end=' + end) //Get registration data
//                .then(response => {
//                    if(response.data.length > 0){
//                        this_vm.info_box_data.registeredCustomersData.val = 0;
//                    } else {
//                        this_vm.info_box_data.registeredCustomersData.val = response.data[0].count;
//                    }
//                    
//                })
//                .catch(e => {
//                    console.log(e)
//                }) 
//                
//                axios.get('/active?start=' + start + '&end=' + end) //Get active customer data
//                .then(response => {
//                    if(response.data.length > 0){
//                        this_vm.info_box_data.activeCustomersData.val = 0;
//                    } else {
//                        this_vm.info_box_data.activeCustomersData.val = response.data[0].count;
//                    }
//
//
//                })
//                .catch(e => {
//                    console.log(e)
//                }) 
//                
//                axios.get('/transferCount?start=' + start + '&end=' + end) //Get transfer data
//                .then(response => {
//
//                    let atm_pickup = 0, cash_pickup = 0, bank_transfer = 0;
//
//                    console.log(response);
//
//                    if(response.data.length > 0){
//                        atm_pickup = response.data[0].count
//                        cash_pickup = response.data[1].count
//                        bank_transfer = response.data[2].count
//                    }
//
////                            if(response.data[0].count != undefined){
////                                atm_pickup = response.data[0].count
////                            }
////                            if(response.data[1].count != undefined){
////                                cash_pickup = response.data[1].count
////                            }
////                            if(response.data[2].count != undefined){
////                                bank_transfer = response.data[2].count
////                            }
//
//                    this_vm.info_box_data.transfersData.val = atm_pickup + cash_pickup + bank_transfer;
//                    this_vm.donut_chart_data.transfersData.data[0].y = atm_pickup; //atm pickup
//                    this_vm.donut_chart_data.transfersData.data[1].y = cash_pickup; //cash pickup
//                    this_vm.donut_chart_data.transfersData.data[2].y = bank_transfer; //bank transfer
//
//                    console.log(this_vm.info_box_data.transfersData);
//
//                    this_vm.donut_chart_data.transfersData.loading_data = false;
//
//                })
//                .catch(e => {
//                    console.log(e)
//                }) 
//                
//                axios.get('/transferAmount?start=' + start + '&end=' + end) //Get transfer amount data
//                .then(response => {
//                    let atm_pickup = 0, cash_pickup = 0, bank_transfer = 0;
//
//                    console.log(response);
//
//                    if(response.data.length > 0){
//                        atm_pickup = response.data[0].total_from_amount
//                        cash_pickup = response.data[1].total_from_amount
//                        bank_transfer = response.data[2].total_from_amount
//                    }
////                                if(response.data[0].count != undefined){
////                                    atm_pickup = response.data[0].count
////                                }
////                                if(response.data[1].count != undefined){
////                                    cash_pickup = response.data[1].count
////                                }
////                                if(response.data[2].count != undefined){
////                                    bank_transfer = response.data[2].count
////                                }
//
//                    this_vm.info_box_data.amountTransferedData.val = '$' + ((atm_pickup + cash_pickup + bank_transfer).toFixed(0));
//                    this_vm.donut_chart_data.amountTransferedData.data[0].y = atm_pickup; //atm pickup
//                    this_vm.donut_chart_data.amountTransferedData.data[1].y = cash_pickup; //cash pickup
//                    this_vm.donut_chart_data.amountTransferedData.data[2].y = bank_transfer; //bank transfer
//
//                    console.log(this_vm.info_box_data.amountTransferedData);
//
//
//                    this_vm.donut_chart_data.amountTransferedData.loading_data = false;
//                })
//                .catch(e => {
//                    console.log(e)
//                }) 
            },
            convertDateToEpoch(start, end){
                //return ((moment(date).valueOf()) / 1000).toFixed(0) + 's';
                let temp_start = moment(start).format('YYYY-MM-DD')
                let temp_end = moment(end).format('YYYY-MM-DD')
                
                let new_start = (moment(temp_start).startOf('day').valueOf() / 1000).toFixed(0) + 's'
                let new_end = (moment(temp_end).endOf('day').valueOf() / 1000).toFixed(0) + 's'
                
                
                console.log('new_start: ' + new_start + ' new_end: ' + new_end)
                
                this.getCustomerData(new_start, new_end)
            },
            dateRange(){
                let start = moment().subtract(8, 'days'),
                    end = moment().subtract(1, 'days')

                this.convertDateToEpoch(start, end)
                
                let this_vm = this;
                
                
                function updateDate(start, end){    
                    jquery("#date_range").html(
                        start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY') +
                        ' <span><i class="fa fa-chevron-down" style="float:right"></i></span>'
                    );   
                }

                jquery("#date_range").daterangepicker({
                    opens: 'center',
                    ranges: {
                       'Today': [moment(), moment()],
                       'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                       'Last 7 Days': [moment().subtract(8, 'days'), moment().subtract(1, 'days')],
                       'Last 30 Days': [moment().subtract(30, 'days'), moment().subtract(1, 'days')],
                       'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                    },
                    startDate: start,
                    endDate: end,
                    maxDate: moment(),
                    alwaysShowCalendars: true
                }, updateDate(start, end));
                
                //When the user clicks on Apply from the date range picker
                jquery('#date_range').on('apply.daterangepicker', function(ev, picker) {
                    
                    updateDate(picker.startDate, picker.endDate)
                    this_vm.convertDateToEpoch(picker.startDate, picker.endDate)
                });
            },
//            getLogins(){
//                //console.log('getting logins...')
//                var start = this.start_date
//                var end = this.end_date
//                
//                console.log(start + ' to ' + end);
//                axios.get('/logins?start=' + start + '&end=' + end)
//                .then(response => {
//                    console.log(response)
//                })
//                .catch(e => {
//                    console.log(e)
//                })                
//            },
//            getRegistrations(){
//                //console.log('getting logins...')
//                var start = this.start_date
//                var end = this.end_date
//                
//                //console.log(start + ' to ' + end);
//                axios.get('/registrations?start=' + start + '&end=' + end)
//                .then(response => {
//                    console.log(response)
//                })
//                .catch(e => {
//                    console.log(e)
//                })                
//            },
//            getActive(){
//                //console.log('getting logins...')
//                var start = this.start_date
//                var end = this.end_date
//                
//                //console.log(start + ' to ' + end);
//                axios.get('/active?start=' + start + '&end=' + end)
//                .then(response => {
//                    console.log(response)
//                })
//                .catch(e => {
//                    console.log(e)
//                })                
//            },
//            getTransfers(){
//                //console.log('getting logins...')
//                var start = this.start_date
//                var end = this.end_date
//                
//                //console.log(start + ' to ' + end);
//                axios.get('/transferCount?start=' + start + '&end=' + end)
//                .then(response => {
//                    console.log(response)
//                })
//                .catch(e => {
//                    console.log(e)
//                })                
//            },
//            getTransferAmount(){
//                //console.log('getting logins...')
//                var start = this.start_date
//                var end = this.end_date
//                
//                //console.log(start + ' to ' + end);
//                axios.get('/transferAmount?start=' + start + '&end=' + end)
//                .then(response => {
//                    console.log(response)
//                })
//                .catch(e => {
//                    console.log(e)
//                })                
//            }
        },
        components: {
            DonutChart,
            InfoBox,
            CountriesUs,
            CountriesMx,
            OverviewAppRating,
            OverviewLiveData,
            MetricsTable
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    
    .row {
        margin: 10px 0 20px 0;
    }
    
    .donut-chart {
/*        height: 200px;*/
    }
    
    .nav_sub {
        list-style-type: none;
        background-color: #b6bec8;
        text-align: left;
        margin: -10px 0;
        border-bottom-left-radius: 3px;
        border-bottom-right-radius: 3px;
    }
    
    .nav_sub li:hover {
        cursor: pointer;
    }
    
    .nav_sub li {
        display: inline-block;
        padding: 5px 20px;
/*        margin: 0 10px;*/
    }
    
    .nav_sub_active {
        background-color: #072146;
        color: white;
    }
    
    .countries {
/*        height: 400px;*/
    }
    
    .countries-transfers {
        padding: 150px 0;
    }
    
    .date_range_wrapper {
        background: #fff;
        cursor: pointer;
        padding: 5px 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        width: 300px;
        margin: auto;
        
    }
</style>
