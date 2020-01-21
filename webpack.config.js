const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env, argv) => {
	return {
		mode: env && env.production ? 'production' : 'development',
		watch: true,

		// Enable sourcemaps for debugging webpack's output.
		devtool: env && env.production ? 'eval' : 'source-maps',

		resolve: {
			// Add '.ts' and '.tsx' as resolvable extensions.
			extensions: ['.ts', '.tsx', '.css', '.scss']
		},

		entry: './RaspNodeConfig/static/RaspNodeConfig/react-nodes',
		output: {
			filename: '[name].js',
			path: path.resolve(__dirname, 'static')
			//publicPath: "/static/"
		},

		module: {
			rules: [
				{
					test: /\.ts(x?)$/,
					exclude: /node_modules/,
					use: [
						{
							loader: 'ts-loader'
						}
					]
				},
				// All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
				{
					enforce: 'pre',
					test: /\.js$/,
					loader: 'source-map-loader'
				},
				{
					test: /\.s?[ac]ss$/,
					use: [
						MiniCssExtractPlugin.loader,
						{
							loader: 'css-loader',
							options: { url: false, sourceMap: true }
						},
						{ loader: 'sass-loader', options: { sourceMap: true } }
					]
				}
			]
		},
		plugins: [
			new CleanWebpackPlugin(),
			new MiniCssExtractPlugin({
				filename: 'style.css'
				//chunkFilename: '/static/[id].css',
				// ignoreOrder: false // Enable to remove warnings about conflicting order
			})
		],
		externals: {
			react: 'React',
			'react-dom': 'ReactDOM'
		}
	};
};
