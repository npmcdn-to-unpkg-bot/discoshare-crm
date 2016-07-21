var path              = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer      = require('autoprefixer');
var webpack           = require('webpack');

const OUTPUT_DIR = path.join(__dirname, 'client', 'build');

module.exports = {
	entry: {
		'main': path.join(__dirname, 'client', 'js', 'index.js'),
		'style': path.join(__dirname, 'client', 'css', 'style.scss')
	},
	output: {
		path: OUTPUT_DIR,
		filename: '[name].js'
	},
	module: {
		loaders: [
			{test: /\.js$/, loader: 'babel-loader', exclude: /(node_modules|bower_components)/, query: {presets: ['es2015'], plugins: ['transform-runtime']}},
			{test: /\.scss$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!sass-loader')},
			{test: /\.html$/, loader: 'html-loader'}
		]
	},
	preLoaders : [{
		test: /\.jsx?$/,
		loader: "eslint-loader",
		exclude: /node_modules/
	}],
	plugins: [
		new ExtractTextPlugin('[name].css'),
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery"
		})
	],
	postcss: function () {
		return [autoprefixer];
	}
};
