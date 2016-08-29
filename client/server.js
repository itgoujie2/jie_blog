var http = require('http')
var express = require('express')
var httpProxy = require('http-proxy')
var fs = require('fs')

var babelrc = fs.readFileSync('./.babelrc')
var config = JSON.parse(babelrc)
require('babel-core/register')(config)

var proxy = httpProxy.createProxyServer({})

var app = express()

app.use(require('morgan')('short'))

// webpack
var webpack = require('webpack')
var config = require('./webpack.config')
var compiler = webpack(config)

app.use(require('webpack-dev-middleware')(compiler, {
	noInfo: true, 
	publicPath: config.output.publicPath
}))
app.use(require('webpack-hot-middleware')(compiler))




app.all(/^\/api\/(.*)/, function api(req, res){
	proxy.web(req, res, {
		target: 'http://localhost:5000'
	})
})

app.get(/.*/, function root(req, res){
	res.sendFile(__dirname + '/index.html')
})

const server = http.createServer(app)
server.listen(process.env.PORT || 3000, function(){
	const address = server.address()
	console.log('listening on %j', address)
})