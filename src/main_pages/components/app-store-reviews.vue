<template>
<div class="row">
    <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/bootstrap.daterangepicker/2/daterangepicker.css" />
    <div class="col-sm-12">
<!--
        <div class="row">
            <div class="col-sm-12">
                <h4>Reviews</h4>
            </div>
        </div>
-->
        
        <div class="row">
            <div class="col-sm-12">
                
                <div class="row">
                    <div class="col-sm-4">
                        <div class="row">
                            <div class="col-sm-12">
                                
<!--                                Average Review Rating <br> <strong>{{ averageRatingNum }}</strong>-->
                            </div>
                        </div>
                        <br>
                        <div class="row">
                            <div class="col-sm-12">
                                <h3>Average Review Rating</h3>
                                <div class="info_subtitle">
                                    Disable any of the reviews to toggle their rating effectiveness. Doing so will remove the comment's rating from the Average Review Rating to see what the score would look like without the comment. The "modified" rating will automatically update.
                                    <br><br> Example: Disable comments with a 1 or 2 rating that mention technical issues. Then you can see what your score would be if those issues wern't there.
                                </div>
                                <div>
                                    
                                    <ratings-gauge :rating_data="ratingGauge"></ratings-gauge>
                                </div>
                                <div class="row" style="margin: 20px 0">
                                    <div class="col-sm-12">
                                        <div>Disabled Reviews <br> <strong>{{ disabledNum }} / {{ reviewData.length }}</strong></div>
                                    </div>
<!--
                                    <div class="col-sm-6">
                                        <div>New Average Review Rating <br> <strong>{{ averageNumChange }}</strong></div>
                                    </div>
-->
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-sm-8">
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="row">
                            <div class="col-sm-6">
                                <div class="table_search_box">Search Reviews: <input style="width:200px;" type="text" name="query" v-model="query"></div>
                            </div>
                            <div class="col-sm-6">
                                <div style="text-align:right"><i class="fa fa-download fa-2x export_button" title="Download to CSV" @click="exportDataToCSV()"></i></div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12">
                                <table class="table table-bordered comments_table">
                                    <thead>
                                        <tr>
                                            <th>
                                                <div>Disable</div>
                                                <div class="header_option" @click="enableAllComments">Enable All</div>
                                            </th>
                                            <th>
                                                <div>Date</div>
                                                <div class="header_option" @click="sortDate">Sort</div>
                                            </th>
                                            <th>
                                                <div>Reviews ( {{ tableFilter.length }} showing )</div>
                                                <div>
                                                    <span class="header_option" @click="changeLanguage('english')" v-bind:class="{ highlight_language_selection: language == 'english'}">English</span>
                                                    <span> - </span>
                                                    <span class="header_option" @click="changeLanguage('spanish')" v-bind:class="{ highlight_language_selection: language == 'spanish'}">Spanish</span>
                                                </div>

                                            </th>
                                            <th>
                                                <div>Rating</div>
                                                <div class="header_option" @click="sortRating">Sort</div>
                                            </th>
                                        </tr>
                                    </thead>


                                </table>
                                <div class="comments_table_wrapper">
                                    <table class="table table-striped table-bordered table-hover comments_table">
                                        <tbody>
                                            <tr v-for="item in tableFilter" v-bind:class="{disable_row: item.isDisabled}">

                                                <td><input type="checkbox" v-model="item.isDisabled" @click="updateNumberOfDisabledComments(item)"></td>
                                                <td>{{ item.date }}</td>
                                                <td style="text-align:left">
                                                    <div v-if="language == 'english'">
                                                        <div v-if="item.english_subject != ''">
                                                            <strong>{{ item.english_subject }}</strong> <br>
                                                        </div>
                                                        {{ item.english }}
                                                    </div>
                                                    <div v-else>
                                                        <div v-if="item.spanish_subject != ''">
                                                            <strong>{{ item.spanish_subject }}</strong> <br>
                                                        </div>
                                                        {{ item.spanish }}
                                                    </div>
                                                </td>
                                                <td>{{ item.rating }}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
    
    import moment from 'moment'
    import papaparse from 'papaparse'
    import jquery from 'jquery'
    import daterangepicker from 'daterangepicker'
    
    import RatingsGauge from './ratings-gauge.vue'
    
    export default {
        mounted: function () {
            this.getReviews();
            
            this.dateRange();
        },
        data(){
            return {
                icons: {
                    iconAndroid: require("assets/img/icon_android.png"),
                    iconIOS: require("assets/img/icon_ios.svg")
                },
                images: {
                    oneStar: require("assets/img/star_1.png"),
                    twoStar: require("assets/img/star_2.png")
                },
                query: '',
                language: 'english',
                reviewData: [],
                search_words: [
                    {isDisabled: false, word: 'update'}, {isDisabled: false, word: 'deposit'}, {isDisabled: false, word: 'error'}, {isDisabled: false, word: 'account'},
                    {isDisabled: false, word: 'transactions'}, {isDisabled: false, word: 'log'}, {isDisabled: false, word: 'slow'}, {isDisabled: false, word: 'notification'},
                    {isDisabled: false, word: 'secure'}, {isDisabled: false, word: 'crash'}, {isDisabled: false, word: 'password'}, {isDisabled: false, word: 'card'},
                    {isDisabled: false, word: 'support'}, {isDisabled: false, word: 'register'}, {isDisabled: false, word: 'data'}, {isDisabled: false, word: 'transfer'},
                    {isDisabled: false, word: 'enter'}, {isDisabled: false, word: 'access'}
                ],
                ratingGauge: {
                    averageRatingNum: 0,
                    averageNumChange: 0
                },
                averageRatingNum: 0,
                disabledNum: 0,
                averageNumChange: 0,
                addWord: '',
                showWordFrequencyList: false,
                NumberOfOneStarReviews: 8,
                NumberOfTwoStarReviews: 2
                
            }
        },
        computed: {
            tableFilter: function () {                
                return this.findBy(this.query)
            },
            wordFrequencyWordList: function(){
                return this.sortWordFrequencyWordList();
            }
        },
        methods: {
            getReviews(){                
                this.reviewData.push({
                    isDisabled: false,
                    date: '2017-06-03',
                    english_subject: "It's ok",
                    english: "Lately I can not have installed the application on the mobile, it detects me with virus, and advises me to uninstall, I thought it happened to my mobile, but a friend told me that it happens to her too, what can I do?",
                    spanish_subject: "Es bueno",
                    spanish: "Últimamente no puedo tener instala la aplicación en el móvil, me detecta con virus, y me aconseja desinstalar, pensaba que le pasaba a mi móvil, pero una amiga me dijo que a ella le pasa también, que puedo hacer?",
                    rating: 3
                },{
                    isDisabled: false,
                    date: '2017-06-03',
                    english_subject: "good",
                    english: "' very good. .",
                    spanish_subject: "buena",
                    spanish: "' muy buena. .",
                    rating: 4
                },{
                    isDisabled: false,
                    date: '2017-06-03',
                    english_subject: "access problem",
                    english: "I have a problem I do not know how to create the access key and I ask for my number and the password key to enter i entered i is told to create but it does not let me i in the end me a since it blocked the user i have to do?",
                    spanish_subject: "acceso problema",
                    spanish: "Tengo un problema nose como crear la clave de acceso y me la pide mi número targeta y la clave para poder entrar i entró i me dice crear pero no me deja i al final me a puesto que se me a bloqueado el a usuario que tengo que hacer?",
                    rating: 4
                },{
                    isDisabled: false,
                    date: '2017-06-03',
                    english_subject: "BAD!",
                    english: "Bad bad. How is it possible that you try to see a very exact receipt paid, and only leave the generic receipt without specifying who, who, and what do you pay ??? And neither print nor talk ..",
                    spanish_subject: "MALA!",
                    spanish: "Mala, mala. Cómo es posible que intentes ver un recibo muy exacto pagado, y solo salga el recibo genérico sin especificar que,a quien, y que es lo que pagas??? Y de imprimir ni hablamos..",
                    rating: 1
                },{
                    isDisabled: false,
                    date: '2017-06-02',
                    english: "Excellent",
                    spanish: "Excelente",
                    rating: 5
                },{
                    isDisabled: false,
                    date: '2017-06-02',
                    english: "Sorry, for months and months fails, it's a shame ...",
                    spanish: "Penosa, desde hace meses y meses falla, es una vergüenza...",
                    rating: 1
                },{
                    isDisabled: false,
                    date: '2017-06-01',
                    english: "For a couple of days it has stopped working, connection error",
                    spanish: "Desde hace un par de días ha dejado de funcionar, error de conexión",
                    rating: 1
                },{
                    isDisabled: false,
                    date: '2017-06-01',
                    english: "Until two months ago it was my most useful application. Then, I do not know why, the application is not opened sometimes and the operations I do are not going so fast. I would like to go back to the previous version.",
                    spanish: "Hasta hace dos meses era mi aplicación más útil. Luego, no se por qué, no se abre la aplicación a veces y no van tan rápidas las operaciones que hago. Me gustaría volver a la versión anterior.",
                    rating: 2
                },{
                    isDisabled: false,
                    date: '2017-06-01',
                    english: "It saves you time and is very reliable",
                    spanish: "Te ahorra tiempo y es muy confiable",
                    rating: 5
                },{
                    isDisabled: false,
                    date: '2017-06-01',
                    english: "He asks me if I give it to him and he tells me that I have gone from trying",
                    spanish: "Me pide clavé se la doy y me dice que me he pasado de intentos",
                    rating: 1
                },{
                    isDisabled: false,
                    date: '2017-06-01',
                    english: "The only thing missing from this application is a little hole to make money for everything else is great.",
                    spanish: "Lo único que le falta a esta aplicación es un agujerito para sacar dinero para todo lo demás es estupenda.",
                    rating: 5
                },{
                    isDisabled: false,
                    date: '2017-06-03',
                    english: "Lately I can not have installed the application on the mobile, it detects me with virus, and advises me to uninstall, I thought it happened to my mobile, but a friend told me that it happens to her too, what can I do?",
                    spanish: "Últimamente no puedo tener instala la aplicación en el móvil, me detecta con virus, y me aconseja desinstalar, pensaba que le pasaba a mi móvil, pero una amiga me dijo que a ella le pasa también, que puedo hacer?",
                    rating: 3
                },{
                    isDisabled: false,
                    date: '2017-06-03',
                    english: "' very good. .",
                    spanish: "' muy buena. .",
                    rating: 4
                },{
                    isDisabled: false,
                    date: '2017-06-03',
                    english: "I have a problem I do not know how to create the access key and I ask for my number and the password key to enter i entered i is told to create but it does not let me i in the end me a since it blocked the user i have to do?",
                    spanish: "Tengo un problema nose como crear la clave de acceso y me la pide mi número targeta y la clave para poder entrar i entró i me dice crear pero no me deja i al final me a puesto que se me a bloqueado el a usuario que tengo que hacer?",
                    rating: 4
                },{
                    isDisabled: false,
                    date: '2017-06-03',
                    english: "Bad bad. How is it possible that you try to see a very exact receipt paid, and only leave the generic receipt without specifying who, who, and what do you pay ??? And neither print nor talk ..",
                    spanish: "Mala, mala. Cómo es posible que intentes ver un recibo muy exacto pagado, y solo salga el recibo genérico sin especificar que,a quien, y que es lo que pagas??? Y de imprimir ni hablamos..",
                    rating: 1
                },{
                    isDisabled: false,
                    date: '2017-06-02',
                    english: "Excellent",
                    spanish: "Excelente",
                    rating: 5
                },{
                    isDisabled: false,
                    date: '2017-06-02',
                    english_subject: "fail",
                    english: "Sorry, for months and months fails, it's a shame ...",
                    spanish_subject: "falla",
                    spanish: "Penosa, desde hace meses y meses falla, es una vergüenza...",
                    rating: 1
                },{
                    isDisabled: false,
                    date: '2017-06-01',
                    english: "For a couple of days it has stopped working, connection error",
                    spanish: "Desde hace un par de días ha dejado de funcionar, error de conexión",
                    rating: 1
                },{
                    isDisabled: false,
                    date: '2017-06-01',
                    english: "Until two months ago it was my most useful application. Then, I do not know why, the application is not opened sometimes and the operations I do are not going so fast. I would like to go back to the previous version.",
                    spanish: "Hasta hace dos meses era mi aplicación más útil. Luego, no se por qué, no se abre la aplicación a veces y no van tan rápidas las operaciones que hago. Me gustaría volver a la versión anterior.",
                    rating: 2
                },{
                    isDisabled: false,
                    date: '2017-06-01',
                    english: "It saves you time and is very reliable",
                    spanish: "Te ahorra tiempo y es muy confiable",
                    rating: 5
                },{
                    isDisabled: false,
                    date: '2017-06-01',
                    english: "He asks me if I give it to him and he tells me that I have gone from trying",
                    spanish: "Me pide clavé se la doy y me dice que me he pasado de intentos",
                    rating: 1
                },{
                    isDisabled: false,
                    date: '2017-06-01',
                    english: "The only thing missing from this application is a little hole to make money for everything else is great.",
                    spanish: "Lo único que le falta a esta aplicación es un agujerito para sacar dinero para todo lo demás es estupenda.",
                    rating: 5
                });
                
                this.getAverageRating();
            },
            dateRange(){
                let start = moment().subtract(7, 'days'),
                    end = moment();

                function displayDate(start, end){                    
                    jquery("#date_range").html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY') + ' <span><i class="fa fa-chevron-down"></i></span>');
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
                a.download = "App_Reviews.csv";
                
                document.body.appendChild(a);
                
                a.click();
                
                document.body.removeChild(a);
            },
            sortWordFrequencyWordList: function () {
                let list = this.search_words;
                return list.sort(function(a,b){
                    if(a.word < b.word) return -1;
                    if(a.word > b.word) return 1;
                    return 0;
                });
            },
            addWordToWordFrequencyList: function(){
                this.search_words.push({isDisabled: false, word: this.addWord.toLowerCase()})  
            },
            getAverageRating: function () {
                let allData = this.reviewData,
                    temp_num = 0;

                for (let i = 0; i < allData.length; i++) {
                    temp_num += allData[i].rating;
                }

                this.averageRatingNum = (temp_num / allData.length).toFixed(1);
                this.ratingGauge.averageRatingNum = (temp_num / allData.length).toFixed(1);
            },
            updateNumberOfDisabledComments: function (item) {
                //Toggle the isDisabled for this item
                //item.isDisabled = !item.isDisabled;
                
                //Check to see how many items are disabled
                let allData = this.reviewData,
                    temp_disabled_num = 0;

                for (let i = 0; i < allData.length; i++) {
                    if (allData[i].isDisabled) {
                        temp_disabled_num++;
                    }
                }

                //Update the number of disabled items
                this.disabledNum = temp_disabled_num;

                this.updateAverageRatingChange();
            },
            updateAverageRatingChange: function () {

                let allData = this.reviewData,
                    temp_change_num = 0;

                temp_change_num = 0;
                
                for (let i = 0; i < allData.length; i++) {
                    if (!allData[i].isDisabled) {
                        temp_change_num += allData[i].rating;
                    }
                }
                
                if(this.disabledNum == 0){
                    this.averageNumChange = 0;
                    this.ratingGauge.averageNumChange = 0;
                } else {
                    
                    temp_change_num = (temp_change_num / (allData.length - this.disabledNum)).toFixed(1);

                    this.averageNumChange = temp_change_num;
                    this.ratingGauge.averageNumChange = temp_change_num;
                }
                
            },
            enableAllComments: function () {

                //Change all of the items to enabled
                let allData = this.reviewData;
                for (let i = 0; i < allData.length; i++) {
                    allData[i].isDisabled = false;
                }

                //Update the number of disabled items
                this.disabledNum = 0;

                this.averageNumChange = 0;
                this.ratingGauge.averageNumChange = 0;
            },
            sortRating: function(){
                let list = this.reviewData;
                return list.sort(function(a,b){
                    return a.rating - b.rating;
                });
            },
            sortDate: function(){
                let list = this.reviewData;
                return list.sort(function(a,b){
                    return new Date(a.date) - new Date(b.date); 
                });
            },
            findBy: function (value) {
                let search_regex = new RegExp(value, "i"),
                    search_language = this.language,
                    list = this.reviewData;

                return list.filter(function (item) {

                    //Update the table rows with the word that is being searched for in the search box
                    item.date = moment(item.date).format('MMM-DD-YYYY');
                    return item[search_language].match(search_regex);                                                
                });
            },
            changeLanguage: function(this_language){
                //console.log(this_language);
                if(this_language == 'english'){
                    this.language = 'english';
                } else {
                    this.language = 'spanish';
                }
            }
        },
        components: {
            RatingsGauge
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .comments_table_wrapper {
        height: 520px;
        overflow-y: scroll;
    }

    .comments_table {
        width: 100%;
        margin: 0;
    }

    .comments_table th {
        text-align: center;
    }

    .comments_table th:nth-child(1) {
        width: 70px;
    }

    .comments_table th:nth-child(2) {
        width: 70px;
    }

    .comments_table th:nth-child(4) {
        width: 65px;
    }

    .comments_table td:nth-child(1) {
        width: 70px;
    }

    .comments_table td:nth-child(2) {
        width: 70px;
    }

    .comments_table td:nth-child(4) {
        width: 65px;
    }

    .comment_table_info {
        width: 100%;
    }

    .comment_table_info th {
        width: 50%;
        text-align: center;
    }

    .comment_info {
        width: 33%;
    }
    
    .table_search_box {
        width: 100%;
        text-align: left;
        font-size: 0.8em;
        margin: 10px 0;
    }
    
    .table_search_box input {
        border: 1px solid gray;
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

    .disable_row {
        text-decoration: line-through;
        color: lightgray;
    }

    .info_subtitle {
        font-size: 0.8em;
    }

    .avg_score_header {
        font-size: 1.5em;
    }

    .highlight_language_selection {
        font-weight: bold;
        text-transform: uppercase;;
    }
    
    .export_button {
        text-align: right;
        padding: 0 10px;
    }
    
    .export_button:hover {
        cursor: pointer;
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
    
    .date_range_wrapper {
        background: #fff;
        cursor: pointer;
        padding: 5px 10px;
/*
        border: 1px solid #ccc;
        border-radius: 5px;
*/
        width: 300px;
        margin: auto;
        
    }
    
    
</style>
