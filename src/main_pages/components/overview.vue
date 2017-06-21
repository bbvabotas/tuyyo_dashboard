<template>
    <div class="landing">
        <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/bootstrap.daterangepicker/2/daterangepicker.css" />
            <div class="row">
                <div class="col-sm-12">

                    <div class="row">
                        <div class="col-sm-12">
                            <h3>Overview</h3>
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
                            <overview-live-data></overview-live-data>
                        </div>
                    </div>
                    <hr>
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
                        <div class="col-sm-3"><info-box :info_data="info_box_data.repeatCustomersData"></info-box></div>
                        <div class="col-sm-3"><info-box :info_data="info_box_data.transfersData"></info-box></div>
                        <div class="col-sm-3"><info-box :info_data="info_box_data.amountTransferedData"></info-box></div>
                    </div>
                    <div class="row">
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
    
    export default {
        mounted() {
            this.dateRange();
        },
        data() {
            return {
                icon: {
                    android: 'iconAndroid',
                    ios: 'iconIOS'
                },
                info_box_data: {
                    registeredCustomersData: {
                        name: 'Registered Customers',
                        val: Math.floor(Math.random() * 1000),
                        icon: 'user'
                    },
                    repeatCustomersData: {
                        name: 'Active Customers',
                        val: Math.floor(Math.random() * 1000),
                        icon: 'repeat'
                    },
                    transfersData: {
                        name: 'Transfers',
                        val: Math.floor(Math.random() * 1000),
                        icon: 'exchange'
                    },
                    amountTransferedData: {
                        name: 'Transfer Amount',
                        val: '$' + Math.floor(Math.random() * 1000),
                        mxn: Math.floor(Math.random() * 10000),
                        icon: 'money'
                    }
                },
                donut_chart_data: {
                    registeredCustomersData: {
                        name: 'Registered Customers',
                        data: [{
                            name: 'United States',
                            y: 245
                        }, {
                            name: 'Mexico',
                            y: 913
                        }]
                    },
                    repeatCustomersData: {
                        name: 'Active Customers',
                        data: [{
                            name: 'United States',
                            y: 245
                        }, {
                            name: 'Mexico',
                            y: 913
                        }]
                    },
                    transfersData: {
                        name: 'Transfers',
                        data: [{
                            name: 'ATM Pickup',
                            y: 245
                        }, {
                            name: 'Cash Pickup',
                            y: 913
                        }, {
                            name: 'Bank Transfer',
                            y: 913
                        }]
                    },
                    amountTransferedData: {
                        name: 'Transfer Amount',
                        data: [{
                            name: 'ATM Pickup',
                            y: 245
                        }, {
                            name: 'Cash Pickup',
                            y: 913
                        }, {
                            name: 'Bank Transfer',
                            y: 913
                        }]
                    }
                }
            }
        },
        methods: {
            dateRange(){
                let start = moment().subtract(8, 'days'),
                    end = moment().subtract(1, 'days');

                function displayDate(start, end){                    
                    jquery("#date_range").html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY') + ' <span><i class="fa fa-chevron-down" style="float:right"></i></span>');
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
                }, displayDate);

                displayDate(start, end);
            }
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
