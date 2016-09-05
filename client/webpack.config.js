const webpack = require('webpack')
const path = require('path')

module.exports = {
	devtool: 'source-map', 
	entry: [
		'webpack-hot-middleware/client', 
		path.resolve(__dirname, 'src/index.js')
		// './src/index.js'
	], 
	output: {
		path: path.resolve(__dirname, 'dist'), 
		// path: './dist', 
		filename: 'bundle.js', 
		publicPath: '/static/'
	}, 
	resolve: {
    	extensions: ['', '.jsx', '.js', '.json', '.scss']
  	},
	module: {
		loaders: [
			{
		      test: /\.jsx?$/,
		      loader: 'babel-loader',
		      exclude: /node_modules/, 
		      query: {
		      	presets: ['es2015', 'react']
		      }
		    }
		]
	}, 
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	]
}