'use strict';

const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const IS_DEBUG = process.NODE_ENV !== 'production';

module.exports = {
	cache: true,
	entry: {
		'index': path.resolve(path.join(__dirname, './src/index.tsx'))
	},
	output: {
		path: path.resolve(path.join(__dirname, './build')),
		filename: '[name].js'
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx'],
		modules: [
			'./node_modules',
			'./src'
		]
	},
	devtool: process.env.NODE_ENV === 'production' ? '' : 'sourcemap',
	module: {
		rules: [{
			test: /\.tsx?$/,
			use: [{
				loader: 'awesome-typescript-loader'
			}],
			exclude: /node_modules/
		}, {
			test: /\.scss$/,
			use: [{
				loader: MiniCssExtractPlugin.loader
			}, {
				loader: 'typings-for-css-modules-loader',
				options: {
					modules: true,
					camelCase: true,
					namedExport: true,
					minimize: false,
					localIdentName: '[local]-[hash:base64:5]'
				}
			}, {
				loader: 'postcss-loader'
			}]
		}, {
			test: /\.(png|jpg|jpeg|gif|ico)$/,
			use: [{
				loader: 'file-loader',
				options: {
					name: '[name].[ext]'
				}
			}]
		}]
	},
	mode: IS_DEBUG ? 'development' : 'production',
	plugins: [
		new CopyWebpackPlugin([{
			from: './src/static/**/*',
			to: './',
			flatten: true
		}]),
		new MiniCssExtractPlugin({
			filename: "[name].css"
		})
	]
};
