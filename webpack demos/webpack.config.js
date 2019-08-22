const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const webpack = require('webpack')
const config = {
	mode: 'production', //默认是production，默认压缩文件
	entry: {
		//等于  entry:'./src/index.js',
		main: './src/index.js',
	},
	devtool: 'cheap-module-eval-source-map',
	module: {
		rules: [
			{
				test: /\.(png|jpg|gif)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							name: '[path][name].[ext]?[hash]',
							limit: 20480,
						},
					},
				],
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
		],
	},
	plugins: [
		new webpack.ProgressPlugin(),
		new HtmlWebpackPlugin({
			template: './index.html',
		}),
		new CleanWebpackPlugin(),
	],
	output: {
		filename: 'dist.js', //打包生产的文件名称
		path: path.resolve(__dirname, 'dist'), //dirname代表node中webpack同级目录，dist是 文件夹名称
	},
}
module.exports = config
