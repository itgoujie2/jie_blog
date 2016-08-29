// const path = require('path')
// const merge = require('webpack-merge')

// const dev = require('./dev.config.js')
// const prod = require('./prod.config.js')

// const PATHS = {
// 	app: path.join(__dirname, '../src'), 
// 	build: path.join(__dirname, '../dist')
// }

// const TARGET = process.env.npm_lifecycle_evnet

// const common = {
// 	entry: [
// 		PATHS.app
// 	], 
// 	output: {
// 		path:PATHS.build, 
// 		filename: 'bundle.js' 
// 	}
// }

// if (TARGET == 'start' || !TARGET){
// 	module.exports = merge(dev, common)
// }

// if (TARGET == 'build' || !TARGET){
// 	module.exports = merge(prod, common)
// }

module.exports = {
	entry: [
		'src/'
	], 
	output: [
		path: 'dist/', 
		filename: 'bundle.js'
	]
}