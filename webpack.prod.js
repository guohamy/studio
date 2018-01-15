const path = require('path');
const Webpack = require('webpack');
const LOADER = require('./webpack.loader.js');
const { ENTRY,OUTPUT,PLUGINS } = require('./webpack.file.js');

const Config = {
    devtool: 'cheap-module-source-map',
    entry: ENTRY,
    output: OUTPUT,
    module: LOADER,
    plugins: [
        new Webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new Webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false
            },
            compress: {
                warnings: false
            }
        }),
        new Webpack.HotModuleReplacementPlugin(),
        ...PLUGINS
    ],
    devServer: {
        hot: true,
        stats: 'minimal',
        historyApiFallback: true,
        contentBase: path.join(__dirname, 'develop'),
        publicPath: '/',
        inline: true,
        port: 8888
    },
    externals: {
        jquery: 'jQuery'
    },
    performance: {
        hints: 'warning',
        maxEntrypointSize: 400000,
        maxAssetSize: 100000
    }
};

module.exports = Config;