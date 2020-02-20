const baseConfig = require('./webpack.base');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = merge(baseConfig, {
    target: 'web',

    mode: 'development',

    entry: './src/entry-client',

    devtool: 'cheap-module-eval-source-map',

    devServer: {
        port: 8000,
        hot: true,
        proxy: {},
        historyApiFallback: true
    },

    module: {
        rules: [{
            test: /\.vue$/,
            use: ['vue-loader']
        },{
            test: /\.css$/,
            use: [
                'vue-style-loader',
                'css-loader'
            ]
        },
            {
                test: /\.(png|jpe?g|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false
                        }
                    }
                ]
            }]
    },

    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'public/index.html',
            favicon: 'public/favicon.ico',
            templateParameters: {
                title: 'ele-back-ssr'
            }
        })
    ]
});