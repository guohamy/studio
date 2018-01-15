const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const Webpack = require('webpack');

const ENTRY = './src/ttdz.js';

const OUTPUT = {
    path: path.resolve(__dirname, 'ttdz'),
    filename: 'main.js',
    publicPath: './',
    sourceMapFilename: '[name].map'
}

const PLUGINS = [
    new ExtractTextPlugin("style.css"),
    new Webpack.HotModuleReplacementPlugin(),
    /*new Webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery"
    }),*/
    new HtmlWebpackPlugin({
        template: './src/html/ttdz.html',
        inject: true,
        favicon: './src/icon.png',
        minify: false,
        hash: true
    })
]

module.exports = { ENTRY,OUTPUT,PLUGINS };