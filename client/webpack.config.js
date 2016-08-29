const webpack = require('webpack')
const path = require('path')

module.exports = {
	entry: [
		// 'webpack-hot-middleware/client', 
		// path.resolve(__dirname, 'src')
		'./src/index.js'
	], 
	output: {
		// path: path.resolve(__dirname, 'dist'), 
		path: './dist', 
		filename: 'bundle.js', 
		publicPath: '/static/'
	}, 
	resolve: {
    	extensions: ['', '.jsx', '.js', '.json', '.scss'],
    	modulesDirectories: ['node_modules', '../src'],
  	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(), 
		new webpack.NoErrorsPlugin()
	], 
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
	}
}