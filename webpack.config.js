const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    module: {
        rules: [
            { test: /\.(js)$/, use: 'babel-loader' },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            //{ test: /\.css$/, use: [ 'style-loader', 'css-loader' ] },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
              },
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js'
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new CopyPlugin({
            patterns: [
                {from: './src/assets/', to: './assets'}
            ]
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        inline: true,
        port: 8080,
        hot: true,
        open: true
    }
}