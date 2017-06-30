require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = process.env.NODE_ENV === 'testing'
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable




var Influx = require('influx')

var influx = new Influx.InfluxDB({
  host: '10.0.1.160',
  database: 'TUYO',
   port: 8086,
    username: 'influxapi',
    password: 'P5fsE9ftsgRfnGhN',
})

influx.getDatabaseNames()
  .then(names => {
    if (names.includes('TUYO')) {
      console.log('Connected to Influx DB') ;
    }
  })
  .catch(err => {
  console.log(err);
    console.log(`Error getting Influx database!`);
  })




var app = express()
var compiler = webpack(webpackConfig)

app.get('/testing')

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))


//API to get logins
app.get('/logins', function (req, res) {
  influx.query(`
    SELECT COUNT(userId) FROM OUT
    where serviceId='API' AND operation='/api/auth/authenticate' AND responseCode='TUYO-0000'
    AND time>=`+req.query.start+` AND `+`time<=`+req.query.end +
    ` GROUP BY os`
  ).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).send(err.stack)
  })
})

//API to get active users
app.get('/active', function (req, res) {
  influx.query(`
    SELECT COUNT(DISTINCT(userId)) FROM OUT
    where serviceId='API' AND (operation='/api/auth/authenticate' OR operation='/api/auth/createPassword') AND responseCode='TUYO-0000'
    AND time>=`+req.query.start+` AND `+`time<=`+req.query.end
  ).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).send(err.stack)
  })
})

//API to get registered users
app.get('/registrations', function (req, res) {
  influx.query(`
    SELECT COUNT(DISTINCT(userId)) FROM OUT
    where serviceId='API' AND operation='/api/auth/createPassword' AND responseCode='TUYO-0000'
    AND time>=`+req.query.start+` AND `+`time<=`+req.query.end
  ).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).send(err.stack)
  })
})

//API to get transferCount
app.get('/transferCount', function (req, res) {
  influx.query(`
    SELECT count(fromAmount) FROM MONEY_TRANSFER
    WHERE time>=`+req.query.start+` AND `+`time<=`+req.query.end +
    ` GROUP BY deliveryMethod`
  ).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).send(err.stack)
  })
})

//API to get transfer amount
app.get('/transferAmount', function (req, res) {
  influx.query(`
    SELECT sum(fromAmount) as totalFromAmount, sum(toAmount) as totalToAmount  FROM MONEY_TRANSFER
    WHERE time>=`+req.query.start+` AND `+`time<=`+req.query.end +
    `GROUP BY deliveryMethod`
  ).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).send(err.stack)
  })
})

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
//  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
//    opn(uri)
//  }
  _resolve()


})

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}


//console.log('test');
