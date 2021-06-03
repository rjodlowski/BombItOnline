var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
	entry: './src/index.js',
	mode: "development", // none, development, production
	output: {
		filename: 'bundle.js'
	},
	devServer: {
		port: 8080,
		contentBase: "./dist/src",
	},
	plugins: [
		new HtmlWebpackPlugin({
			hash: true,
			filename: './index.html',
			title: "page title",
			template: './src/index.html',
			h1: "h1",
			h2: "h2"
		})
	],
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			}
		]
	},
};
