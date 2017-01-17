const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const helpers = require('./webpack.helpers');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const config = {
    devtool: 'source-map',
    entry: {
        'polyfills': './app/polyfills.ts',
        'vendor': './app/vendor.ts',
        'app': './app/main.ts'
    },
    output: {
        path: helpers.root('dist/'),
        filename: '[name].js',
        publicPath: '/dist',
        chunkFilename: '[id].chunk.js'
    },
    resolve: {
        extensions: ['.ts', '.es6', '.js', '.json']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader'
            },
            {
                test: /\.html$/,
                loader: 'html-loader?minimize=false'
            },
            {
                test: /\.(png|jpe?g|gif)?$/,
                loader: 'file-loader?name=/assets/[name].[hash].[ext]'
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                exclude: /node_modules/,
                loader: 'file-loader?name=/assets/fonts/[name].[ext]'
            },
            {
                test: /\.(eot|woff|woff2|ttf|svg)(\?\S*)?$/,
                loader: 'url-loader?limit=100000&name=[name].[ext]'
            },
            {
                test: /\.css$/, loader: ExtractTextPlugin.extract({
                    fallbackLoader: "style-loader",
                    loader: "css-loader?sourceMap"
                })
            },
            {
                test: /\.less$/,
                loaders: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                loaders: ['raw-loader', 'sass-loader']
            }
        ]
    },
    plugins: [
     new webpack.SourceMapDevToolPlugin({
         columns: false
     }),
     new webpack.LoaderOptionsPlugin({
         debug: true
     }),
     new ExtractTextPlugin('[name].css'),
     // Fixes Angular 2 error
     new webpack.ContextReplacementPlugin(
       /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
       __dirname
     ),
     new webpack.optimize.CommonsChunkPlugin({
         name: ['app', 'vendor', 'polyfills']
     }),
    new HtmlWebpackPlugin({
        template: 'app/index.html',
        filename: 'index.html'
    }),
    new CopyWebpackPlugin([{
        from: helpers.root('app', 'i18n'),
        to: 'assets/i18n'
    }]),
    new CopyWebpackPlugin([{
        from: helpers.root('app', 'content', 'fonts'),
        to: 'assets/fonts'
    }])
    ]
};

module.exports = config;