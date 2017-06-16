<template>
<div class="row">
   <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/bootstrap.daterangepicker/2/daterangepicker.css" />
    <div class="col-sm-12">
        <div class="row">
            <div class="col-sm-12">
                <div class="page_header">
                    <h3>Negative App Reviews Analysis (rating of 1 - 2)</h3>
                </div>
                <div class="page_header">
                    <span><img class="icon_size icon_active" :src="icons.iconAndroid"></span>
                    <span><img class="icon_size" :src="icons.iconIOS"></span>
                </div>
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
            <div class="col-sm-6" style="text-align:center;">
                <div class="row">
                    <div class="col-sm-12">
                        <h3>
                            <span>{{ NumberOfOneStarReviews + NumberOfTwoStarReviews }}</span> out of
                            <span class="a_total_review_count">{{ reviewData.length }}</span> reviews are negative
                        </h3>
                        <div class="progress" style="margin:20px 0">
                            <div class="progress-bar progress-bar-danger progress-bar-striped active" role="progressbar" style="width:45%">
                                {{ (((NumberOfOneStarReviews + NumberOfTwoStarReviews) / reviewData.length) * 100).toFixed(0) }}%
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-6">
                        <div><img :src="images.oneStar" class="star_img"></div>
                        <br>
                        <div>
                            <div class="red neg_circle_sm">{{ ((NumberOfOneStarReviews / reviewData.length) * 100).toFixed(0) }}%</div>
                            <br><br>
                            <div>
                                <span style="font-weight:bold">{{ NumberOfOneStarReviews }}</span> out of a total of
                                <span style="font-weight:bold">{{ reviewData.length }}</span> reviews are one star
                            </div>
                        </div>
                        <br>
                        <div><i>word frequency with review count</i></div>
                        <div class="frequency_chart"></div>
                    </div>
                    <div class="col-sm-6">
                        <div><img :src="images.twoStar" class="star_img"></div>
                        <br>
                        <div>
                            <div class="orange neg_circle_sm">{{ ((NumberOfTwoStarReviews / reviewData.length) * 100).toFixed(0) }}%</div>
                            <br><br>
                            <div>
                                <span style="font-weight:bold">{{ NumberOfTwoStarReviews }}</span> out of a total of
                                <span style="font-weight:bold">{{ reviewData.length }}</span> reviews are two stars
                            </div>
                        </div>
                        <br>
                        <div><i>word frequency with review count</i></div>
                        <div class="frequency_chart"></div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <div class="word_frequency_table_wrapper">
                            <h3>Edit words to search for in the word frequency</h3>
                            <div class="info_subtitle">
                                Disable a word to remove it from the word frequency.
                                <br><br> Each word will include variations of the word and is case in-sensitive.
                                <br> Example: Searching for the word "log" will find a review with the word "log", "Log", "LoG", logs", "login", "logon", "logged", etc.
                            </div>
                            <hr>
                            <div class="row">
                                <div class="col-sm-6">
                                    <table class="table table-bordered word_frequency_table">
                                        <thead>
                                            <tr>
                                                <td>Disable</td>
                                                <td>Word</td>
                                            </tr>
                                        </thead>
                                    </table>
                                    <div class="word_frequency_word_wrapper">
                                        <table class="table table-bordered table-striped word_frequency_table">
                                            <tbody>
                                                <tr v-for="word in wordFrequencyWordList" v-bind:class="{ disable_row: word.isDisabled }">
                                                    <td><input type="checkbox" v-model="word.isDisabled"></td>
                                                    <td>{{ word.word }}</td>
                                                </tr>
                                            </tbody>

                                        </table>
                                    </div>
                                </div>
                                <div class="col-sm-6" style="position:relative; height:250px;">
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <div>Add a word:</div>
                                            <br>
                                            <input type="text" style="width:100px; border: 1px solid gray" v-model="addWord">
                                            <button class="btn btn-default" @click="addWordToWordFrequencyList">Add</button>
                                        </div>


                                    </div>

                                    <div class="row" style="position:absolute; bottom:0; width:100%;">
                                        <div class="col-sm-12">
                                            <button class="btn btn-default">Apply</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-sm-6">
                <h3>Negative Reviews</h3>
                <div class="row">
                    <div class="col-sm-6">
                        <div class="table_search_box">Search Reviews: <input style="width:200px;" type="text" name="query" v-model="query"></div>
                    </div>
                    <div class="col-sm-6">
                        <div style="text-align:right"><i class="fa fa-download fa-2x export_button" title="Download to CSV" @click="exportDataToCSV()"></i></div>
                    </div>
                </div>
                <table class="table table-bordered comments_table">
                    <thead>
                        <tr>
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
                            <tr v-for="item in tableFilter" v-bind:class="{ disable_row: item.isDisabled }">
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
</template>

<script>
    import moment from 'moment'
    import papaparse from 'papaparse'
    
    import jquery from 'jquery'
    import daterangepicker from 'daterangepicker'
    
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
                    {isDisabled: false, word: 'update', frequency_count: 0}, {isDisabled: false, word: 'deposit', frequency_count: 0},
                    {isDisabled: false, word: 'error', frequency_count: 0}, {isDisabled: false, word: 'account', frequency_count: 0},
                    {isDisabled: false, word: 'transactions', frequency_count: 0}, {isDisabled: false, word: 'log', frequency_count: 0},
                    {isDisabled: false, word: 'slow', frequency_count: 0}, {isDisabled: false, word: 'notification', frequency_count: 0},
                    {isDisabled: false, word: 'secure', frequency_count: 0}, {isDisabled: false, word: 'crash', frequency_count: 0},
                    {isDisabled: false, word: 'password', frequency_count: 0}, {isDisabled: false, word: 'card', frequency_count: 0},
                    {isDisabled: false, word: 'support', frequency_count: 0}, {isDisabled: false, word: 'register', frequency_count: 0},
                    {isDisabled: false, word: 'data', frequency_count: 0}, {isDisabled: false, word: 'transfer', frequency_count: 0},
                    {isDisabled: false, word: 'enter', frequency_count: 0}, {isDisabled: false, word: 'access', frequency_count: 0}
                ],
                addWord: '',
                showWordFrequencyList: false,
                NumberOfOneStarReviews: 8,
                NumberOfTwoStarReviews: 2
                
            }
        },
        computed: {
            wordFrequencyWordList: function(){
                return this.sortWordFrequencyWordList();
            },
            tableFilter: function () {                
                return this.findBy(this.query)
            }
        },
        methods: {
            getReviews(){                
                this.reviewData.push({
                    date: '2017-06-03',
                    english_subject: "It's ok",
                    english: "Lately I can not have installed the application on the mobile, it detects me with virus, and advises me to uninstall, I thought it happened to my mobile, but a friend told me that it happens to her too, what can I do?",
                    spanish_subject: "Es bueno",
                    spanish: "Últimamente no puedo tener instala la aplicación en el móvil, me detecta con virus, y me aconseja desinstalar, pensaba que le pasaba a mi móvil, pero una amiga me dijo que a ella le pasa también, que puedo hacer?",
                    rating: 3
                },{
                    
                    date: '2017-06-03',
                    english_subject: "good",
                    english: "' very good. .",
                    spanish_subject: "buena",
                    spanish: "' muy buena. .",
                    rating: 4
                },{
                    
                    date: '2017-06-03',
                    english_subject: "access problem",
                    english: "I have a problem I do not know how to create the access key and I ask for my number and the password key to enter i entered i is told to create but it does not let me i in the end me a since it blocked the user i have to do?",
                    spanish_subject: "acceso problema",
                    spanish: "Tengo un problema nose como crear la clave de acceso y me la pide mi número targeta y la clave para poder entrar i entró i me dice crear pero no me deja i al final me a puesto que se me a bloqueado el a usuario que tengo que hacer?",
                    rating: 4
                },{
                    
                    date: '2017-06-03',
                    english_subject: "BAD!",
                    english: "Bad bad. How is it possible that you try to see a very exact receipt paid, and only leave the generic receipt without specifying who, who, and what do you pay ??? And neither print nor talk ..",
                    spanish_subject: "MALA!",
                    spanish: "Mala, mala. Cómo es posible que intentes ver un recibo muy exacto pagado, y solo salga el recibo genérico sin especificar que,a quien, y que es lo que pagas??? Y de imprimir ni hablamos..",
                    rating: 1
                },{
                    
                    date: '2017-06-02',
                    english: "Excellent",
                    spanish: "Excelente",
                    rating: 5
                },{
                    
                    date: '2017-06-02',
                    english: "Sorry, for months and months fails, it's a shame ...",
                    spanish: "Penosa, desde hace meses y meses falla, es una vergüenza...",
                    rating: 1
                },{
                    
                    date: '2017-06-01',
                    english: "For a couple of days it has stopped working, connection error",
                    spanish: "Desde hace un par de días ha dejado de funcionar, error de conexión",
                    rating: 1
                },{
                    
                    date: '2017-06-01',
                    english: "Until two months ago it was my most useful application. Then, I do not know why, the application is not opened sometimes and the operations I do are not going so fast. I would like to go back to the previous version.",
                    spanish: "Hasta hace dos meses era mi aplicación más útil. Luego, no se por qué, no se abre la aplicación a veces y no van tan rápidas las operaciones que hago. Me gustaría volver a la versión anterior.",
                    rating: 2
                },{
                    
                    date: '2017-06-01',
                    english: "It saves you time and is very reliable",
                    spanish: "Te ahorra tiempo y es muy confiable",
                    rating: 5
                },{
                    
                    date: '2017-06-01',
                    english: "He asks me if I give it to him and he tells me that I have gone from trying",
                    spanish: "Me pide clavé se la doy y me dice que me he pasado de intentos",
                    rating: 1
                },{
                    
                    date: '2017-06-01',
                    english: "The only thing missing from this application is a little hole to make money for everything else is great.",
                    spanish: "Lo único que le falta a esta aplicación es un agujerito para sacar dinero para todo lo demás es estupenda.",
                    rating: 5
                },{
                    
                    date: '2017-06-03',
                    english: "Lately I can not have installed the application on the mobile, it detects me with virus, and advises me to uninstall, I thought it happened to my mobile, but a friend told me that it happens to her too, what can I do?",
                    spanish: "Últimamente no puedo tener instala la aplicación en el móvil, me detecta con virus, y me aconseja desinstalar, pensaba que le pasaba a mi móvil, pero una amiga me dijo que a ella le pasa también, que puedo hacer?",
                    rating: 3
                },{
                    
                    date: '2017-06-03',
                    english: "' very good. .",
                    spanish: "' muy buena. .",
                    rating: 4
                },{
                    
                    date: '2017-06-03',
                    english: "I have a problem I do not know how to create the access key and I ask for my number and the password key to enter i entered i is told to create but it does not let me i in the end me a since it blocked the user i have to do?",
                    spanish: "Tengo un problema nose como crear la clave de acceso y me la pide mi número targeta y la clave para poder entrar i entró i me dice crear pero no me deja i al final me a puesto que se me a bloqueado el a usuario que tengo que hacer?",
                    rating: 4
                },{
                    
                    date: '2017-06-03',
                    english: "Bad bad. How is it possible that you try to see a very exact receipt paid, and only leave the generic receipt without specifying who, who, and what do you pay ??? And neither print nor talk ..",
                    spanish: "Mala, mala. Cómo es posible que intentes ver un recibo muy exacto pagado, y solo salga el recibo genérico sin especificar que,a quien, y que es lo que pagas??? Y de imprimir ni hablamos..",
                    rating: 1
                },{
                    
                    date: '2017-06-02',
                    english: "Excellent",
                    spanish: "Excelente",
                    rating: 5
                },{
                    
                    date: '2017-06-02',
                    english_subject: "fail",
                    english: "Sorry, for months and months fails, it's a shame ...",
                    spanish_subject: "falla",
                    spanish: "Penosa, desde hace meses y meses falla, es una vergüenza...",
                    rating: 1
                },{
                    
                    date: '2017-06-01',
                    english: "For a couple of days it has stopped working, connection error",
                    spanish: "Desde hace un par de días ha dejado de funcionar, error de conexión",
                    rating: 1
                },{
                    
                    date: '2017-06-01',
                    english: "Until two months ago it was my most useful application. Then, I do not know why, the application is not opened sometimes and the operations I do are not going so fast. I would like to go back to the previous version.",
                    spanish: "Hasta hace dos meses era mi aplicación más útil. Luego, no se por qué, no se abre la aplicación a veces y no van tan rápidas las operaciones que hago. Me gustaría volver a la versión anterior.",
                    rating: 2
                },{
                    
                    date: '2017-06-01',
                    english: "It saves you time and is very reliable",
                    spanish: "Te ahorra tiempo y es muy confiable",
                    rating: 5
                },{
                    
                    date: '2017-06-01',
                    english: "He asks me if I give it to him and he tells me that I have gone from trying",
                    spanish: "Me pide clavé se la doy y me dice que me he pasado de intentos",
                    rating: 1
                },{
                    
                    date: '2017-06-01',
                    english: "The only thing missing from this application is a little hole to make money for everything else is great.",
                    spanish: "Lo único que le falta a esta aplicación es un agujerito para sacar dinero para todo lo demás es estupenda.",
                    rating: 5
                });                                
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
                    maxDate: moment()
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
                a.download = "App_Negative_Reviews.csv";
                
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
                    if(item.rating < 3){
                        item.date = moment(item.date).format('MMM-DD-YYYY');
                        return item[search_language].match(search_regex);
                    }
                                                                    
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
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    
    .word_frequency_table_wrapper {
        width: 90%;
        margin: 10px auto;
/*
        border: 1px solid gray;
        border-radius: 5px;
*/
        padding: 10px;
    }

    .word_frequency_table {
        margin: 0;
    }

    .word_frequency_table td:nth-child(1){
        width: 70px;
    }

    .word_frequency_word_wrapper {
        height: 208px;
        border-bottom: 1px solid #e6e6e6;
        overflow-y: scroll;
    }
    
    .word_frequency_add_word {
        padding: 30px 0;
/*
        border: 1px solid gray;
        border-radius: 5px;
*/
    }
    
    .word_frequency_apply {
        margin-top: 10px;
/*        text-align: right;*/
    }
    
    .avg_score_header {
        font-size: 1.5em;
    }

    .trend_btn {
        background-color: white;
        padding: 5px 10px;
        margin: 5px;
        border: 1px solid gray;
        border-radius: 5px;
    }

    .trend_btn_active {
        border: 2px solid blue;
    }

    .neg_circle_big {
        font-size: 3em;
        font-weight: bold;
        width: 120px;
        height: 120px;
        text-align: center;
        line-height: 114px;
        vertical-align: middle;
        border: 3px solid red;
        border-radius: 50%;
        margin: auto;
    }

    .neg_circle_sm {
        font-size: 1em;
        font-weight: bold;
        width: 50px;
        height: 50px;
        /*            padding: 10px 5px 10px 5px;*/
        text-align: center;
        border-radius: 50%;
        display: inline-block;
        line-height: 44px;
        vertical-align: middle;
    }

    .red {
        border: 3px solid #ff8b5a;
    }

    .orange {
        border: 3px solid #ffb234;
    }

    .star_img {
        height: 20px;
    }

    .frequency_chart {
        height: 150px;
        width: 100%;
    }

    .trend_chart {
        height: 300px;
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
    
    .comments_table_wrapper {
        height: 750px;
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

    .comments_table th:nth-child(3) {
        width: 65px;
    }

    .comments_table td:nth-child(1) {
        width: 70px;
    }


    .comments_table td:nth-child(3) {
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
    
    .comments_search {
        text-align: left;
        margin: 10px 0;
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
    
    .highlight_language_selection {
        font-weight: bold;
        text-transform: uppercase;;
    }
    
    .date_range_picker {
        margin: 20px 0;
    }
    
    .export_button {
        text-align: right;
        padding: 0 10px;
    }
    
    .export_button:hover {
        cursor: pointer;
    }
    
    .platform_selection {
        margin: 10px 0;
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
