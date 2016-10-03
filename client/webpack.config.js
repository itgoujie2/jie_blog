const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
	devtool: 'source-map', 
	entry: [
		'webpack-hot-middleware/client', 
		path.resolve(__dirname, 'src/index.js')
	], 
	output: {
		path: path.resolve(__dirname, 'dist'), 
		filename: 'bundle.js', 
		publicPath: '/dist/'
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
		    }, 
		    {
		    	test: /\.css$/, 
		    	loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
		    }, 
		    {
		    	test: /\.scss$/, 
		    	loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
		    }
		]
	}, 
	plugins: [
		new ExtractTextPlugin('bundle.css'),
		new webpack.HotModuleReplacementPlugin()
	]
}