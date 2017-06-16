<template>
    <div class="wrapper">
        <div class="row">
            <div class="col-sm-12">
                <h3>Metrics</h3>
                <div style="font-size:0.8em; font-style:italic">Click on a metric name to display it's graph</div>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-6">
                <div class="metrics_search">Search Metrics: <input style="width:200px;" type="text" name="query" v-model="query"></div>
            </div>
            <div class="col-sm-6">
                <div style="text-align:right"><i class="fa fa-download fa-2x export_button" title="Download to CSV" @click="exportDataToCSV()"></i></div>
            </div>
        </div>
        
        <table class="table table-bordered metrics_table">
            <thead>
                <tr>
                    <th>
                        <div>Metric</div>
                        <div>
                            <span class="header_option">Sort</span>
                        </div>
                    </th>
                    <th>
                        <div>Shift</div>
                        <div>
                            <span class="header_option">Sort</span>
                        </div>
                    </th>
                    <th>
                        <div>Yesterday</div>
                        <div>
                            <span class="header_option">Sort</span>
                        </div>
                    </th>
                    <th>
                        <div>Y - 1</div>
                        <div>
                            <span class="header_option">Sort</span>
                        </div>
                    </th>
                    <th>
                        <div>Y - 2</div>
                        <div>
                            <span class="header_option">Sort</span>
                        </div>
                    </th>
                    <th>
                        <div>Y - 3</div>
                        <div>
                            <span class="header_option">Sort</span>
                        </div>
                    </th>
                    <th>
                        <div>Y - 4</div>
                        <div>
                            <span class="header_option">Sort</span>
                        </div>
                    </th>
                    <th>
                        <div>Y - 5</div>
                        <div>
                            <span class="header_option">Sort</span>
                        </div>
                    </th>
                    <th>
                        <div>Avg</div>
                        <div>
                            <span class="header_option">Sort</span>
                        </div>
                    </th>
                </tr>
            </thead>
            
        </table>
        <div class="metrics_table_wrapper">
            <table class="table-striped" style="width:100%">
                <tbody>
                    <tr v-for="item in tableFilter" :key="item.id">
                        <table class="table table-bordered table-hover metrics_table">
                            <tbody>
                                <tr>
                                    <td @click="displayTrendGraph(item)" style="cursor:pointer">{{ item.name }}</td>
                                    <td>{{ item.shift }}</td>
                                    <td>{{ item.yesterday }}</td>
                                    <td>{{ item.y_1 }}</td>
                                    <td>{{ item.y_2 }}</td>
                                    <td>{{ item.y_3 }}</td>
                                    <td>{{ item.y_4 }}</td>
                                    <td>{{ item.y_5 }}</td>
                                    <td>{{ item.avg }}</td>
                                </tr>
                                
                                <tr v-if="item.showGraph" style="background-color:white">
                                    <td></td>
                                    <td colspan="8">

                                        <div style="width:75%; margin:auto;">
                                            <metrics-table-metric-graph style="height:200px;"></metrics-table-metric-graph>
                                        </div>

                                    </td>
                                </tr>
                                
                            </tbody>
                        </table>
                    </tr>
                </tbody>
                
            </table>
        </div>
    </div>
</template>

<script>
    import papaparse from 'papaparse'
    import MetricsTableMetricGraph from './metrics-table-metric-graph.vue'
    export default {
        //name: 'metrics-table',
        props: ['table_data'],
        data() {
            return {
                query: '',
                metrics: [
                    {id:1, name:'Total Logins', shift:0, yesterday:0, y_1:0, y_2:0, y_3:0, y_4:0, y_5:0, avg:0, showGraph:false},
                    {id:2, name:'Logins By Android', shift:0, yesterday:0, y_1:0, y_2:0, y_3:0, y_4:0, y_5:0, avg:0, showGraph:false},
                    {id:3, name:'Logins By iOS', shift:0, yesterday:0, y_1:0, y_2:0, y_3:0, y_4:0, y_5:0, avg:0, showGraph:false},
                    {id:4, name:'Total Money Transfered', shift:0, yesterday:0, y_1:0, y_2:0, y_3:0, y_4:0, y_5:0, avg:0, showGraph:false},
                    {id:5, name:'Money Transfered Via ATM', shift:0, yesterday:0, y_1:0, y_2:0, y_3:0, y_4:0, y_5:0, avg:0, showGraph:false},
                    {id:6, name:'Money Transfered Via Cash Pickup', shift:0, yesterday:0, y_1:0, y_2:0, y_3:0, y_4:0, y_5:0, avg:0, showGraph:false},
                    {id:7, name:'Money Transfered Via Bank Transfer', shift:0, yesterday:0, y_1:0, y_2:0, y_3:0, y_4:0, y_5:0, avg:0, showGraph:false},
                    {id:8, name:'Total Transfers', shift:0, yesterday:0, y_1:0, y_2:0, y_3:0, y_4:0, y_5:0, avg:0, showGraph:false},
                    {id:9, name:'Transfers Via ATM', shift:0, yesterday:0, y_1:0, y_2:0, y_3:0, y_4:0, y_5:0, avg:0, showGraph:false},
                    {id:10, name:'Transfers Via Cash Pickup', shift:0, yesterday:0, y_1:0, y_2:0, y_3:0, y_4:0, y_5:0, avg:0, showGraph:false},
                    {id:11, name:'Transfers Via Bank Transfer', shift:0, yesterday:0, y_1:0, y_2:0, y_3:0, y_4:0, y_5:0, avg:0, showGraph:false},
                    {id:12, name:'Launches', shift:0, yesterday:0, y_1:0, y_2:0, y_3:0, y_4:0, y_5:0, avg:0, showGraph:false},
                    {id:13, name:'Crashes', shift:0, yesterday:0, y_1:0, y_2:0, y_3:0, y_4:0, y_5:0, avg:0, showGraph:false},
                    {id:14, name:'New Registrations', shift:0, yesterday:0, y_1:0, y_2:0, y_3:0, y_4:0, y_5:0, avg:0, showGraph:false},
                    {id:15, name:'First Time Transfers', shift:0, yesterday:0, y_1:0, y_2:0, y_3:0, y_4:0, y_5:0, avg:0, showGraph:false},
                    {id:16, name:'Repeat Transfers', shift:0, yesterday:0, y_1:0, y_2:0, y_3:0, y_4:0, y_5:0, avg:0, showGraph:false},
                    {id:17, name:'New Recipients Added', shift:0, yesterday:0, y_1:0, y_2:0, y_3:0, y_4:0, y_5:0, avg:0, showGraph:false},
                    {id:18, name:'Payment Methods Added', shift:0, yesterday:0, y_1:0, y_2:0, y_3:0, y_4:0, y_5:0, avg:0, showGraph:false},
                    {id:19, name:'Delivery Methods Added', shift:0, yesterday:0, y_1:0, y_2:0, y_3:0, y_4:0, y_5:0, avg:0, showGraph:false},
                    {id:20, name:'Successful Transactions', shift:0, yesterday:0, y_1:0, y_2:0, y_3:0, y_4:0, y_5:0, avg:0, showGraph:false},
                    {id:21, name:'Failed Transactions', shift:0, yesterday:0, y_1:0, y_2:0, y_3:0, y_4:0, y_5:0, avg:0, showGraph:false},
                    {id:22, name:'Errors', shift:0, yesterday:0, y_1:0, y_2:0, y_3:0, y_4:0, y_5:0, avg:0, showGraph:false},
                    {id:23, name:'Downloads', shift:0, yesterday:0, y_1:0, y_2:0, y_3:0, y_4:0, y_5:0, avg:0, showGraph:false},
                ]
            }
        },
        computed: {
            tableFilter: function () {
                //this.commentCount++;
                return this.findBy(this.query)
            }
        },
        methods: {
            getData(){
                
            },
            displayTrendGraph(this_item){
                //console.log(this_item);
                this_item.showGraph = !this_item.showGraph
            },
            findBy(value){
                let search_regex = new RegExp(value, "i"),
                    list = this.metrics;

                return list.filter(function (item) {
                    return item.name.match(search_regex);                                                
                });
            },
            exportDataToCSV(){
                console.log("Exporting table...");
                let new_csv = papaparse.unparse(this.tableFilter);
                //console.log(new_csv);
                this.downloadCSV(new_csv);
            },
            downloadCSV(csv) {
                let blob = new Blob([csv]),
                    a = window.document.createElement("a");
                
                a.href = window.URL.createObjectURL(blob, {type: "text/plain"});
                a.download = "Tuyyo_Metrics.csv";
                
                document.body.appendChild(a);
                
                a.click();
                
                document.body.removeChild(a);
            }
        },
        components: {
            MetricsTableMetricGraph
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    
    .metrics_table {
        margin: 0;
    }
    
    .metrics_table th {
        padding: 5px 10px;
        text-align: center;
    }
    .metrics_table th:nth-child(n+2):nth-child(-n+9) {
        width: 8%;
        min-width: 100px;
    }
    
    .metrics_table td {
        text-align: left;
    }
    
    .metrics_table td:nth-child(n+2):nth-child(-n+9) {
        text-align: right;
        width: 8%;
        min-width: 100px;
    }
    
    .metrics_table tr {
        margin: 0;
        padding: 0;
    }
    
    .metrics_table_wrapper {
/*        height: 465px;*/
        height: 100%;
        overflow-y: scroll;
    }
    
    .header_option {
        text-decoration: underline;
        font-weight: normal;
        color: blue;
        font-size: 0.8em;
    }

    .header_option:hover {
        cursor: pointer;
    }
    
    .metrics_search {
        width: 100%;
        text-align: left;
        font-size: 0.8em;
        margin: 10px 0;
    }
    
    .metrics_search input {
        border: 1px solid gray;
    }
    
    .export_button {
        text-align: right;
        padding: 0 10px;
    }
    
    .export_button:hover {
        cursor: pointer;
    }
</style>
