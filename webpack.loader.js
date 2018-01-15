const ExtractTextPlugin = require("extract-text-webpack-plugin");

const LOADER = {
    rules: [
        {
            test: /\.(js|jsx)$/,
            use: [
                {
                    loader: 'babel-loader'
                }
            ],
            exclude: '/mode_modules/'
        },
        {
            test: /\.(jpg|png)$/,
            use: [
                {
                    loader: 'url-loader?limit=1024&name=images/[hash:8].[name].[ext]'
                }
            ]
        },
        {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: ["css-loader", 'autoprefixer-loader']
            })
        },
        {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'autoprefixer-loader', 'sass-loader']
            })
        },
        {
            test: /\.html$/,
            use: {
                loader: 'raw-loader'
            }
        }
    ]
};

module.exports = LOADER;
