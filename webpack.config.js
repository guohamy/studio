const path = require('path');
const Loader = require('./webpack.loader.js');
const { ENTRY,OUTPUT,PLUGINS } = require('./webpack.file.js');

const Config = {
    devtool: 'cheap-module-eval-source-map',
    entry: ENTRY,
    output: OUTPUT,
    module: Loader,
    plugins: [...PLUGINS],
    resolve: {
        alias: {
            'jquery': path.resolve(__dirname, './src/static/jquery-1.10.2.min.js')
        }
    },
    devServer: {
        hot: true,
        stats: 'minimal',
        historyApiFallback: true,
        contentBase: path.join(__dirname, 'develop'),
        publicPath: '/',
        inline: true,
        port: 5566
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
