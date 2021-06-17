var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
	entry: './src/index.js',
	mode: "development", // none, development, production
	output: {
		filename: 'bundle.js'
	},
	devServer: {
		port: 5000,
		contentBase: "./dist/src",
	},
	plugins: [
		new HtmlWebpackPlugin({
			hash: true,
			filename: './index.html',
			title: "page title",
			template: './src/index.html',
		})
	],
	module: {
		rules: [
			// CSS Loader
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			// Image loader
			{
				test: /\.(png|jp(e*)g|svg)$/,
				use: [{
					loader: 'url-loader',
					options: {
						limit: 8000, // Convert images < 8kb to base64 strings
						name: 'images/[hash]-[name].[ext]'
					}
				}]
			},
			// MD2 loader
			{
				test: /\.(md2)$/i,
				type: 'asset/resource',
			},

		]
	},
};
