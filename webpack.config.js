const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.tsx',
    devtool: 'inline-source-map',
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Graph Theory Playground',
            template: 'src/index.html',
            baseUrl: process.env.NODE_ENV == 'development'?'/':'/graph_theory_site/'
        }),
    ],
    output: {
        clean: true,
        filename: 'bundle.js',
        sourceMapFilename: 'bundle.js.map',
    },
    devServer: {
        static:{
            directory:'./src'
        },
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                include: path.resolve(__dirname, './node_modules/bootstrap-icons/font/fonts'),
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'webfonts',
                        publicPath: 'webfonts',
                    },
                }
            },
            {
                test: /\.svg$|.cur$/,
                type: "asset/resource",
                generator: {
                    filename: 'img/[name][ext]',
                }
            },
            {
                test: /\.mp4$/,
                use: [
                  {
                    loader: 'file-loader',  // Handles the video files
                    options: {
                      name: '[name].[hash].[ext]',  // Output format (use file name and hash for cache-busting)
                      outputPath: 'videos/',  // Output folder for videos (optional)
                    },
                  },
                ],
              },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    }
};
