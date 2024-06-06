const path = require('path');
const mfConfig = require('./webpack.mf');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { VueLoaderPlugin } = require('vue-loader');
const { ModuleFederationPlugin } = require('@module-federation/enhanced/webpack');

module.exports = {
    devServer: {
        port: 2000,
    },
    output: {
        publicPath: 'http://localhost:2000/',
        path: path.resolve(__dirname, 'dist_webpack'),
        clean: true
    },
    resolve: {
        alias: {
            '@assets': path.resolve(__dirname, './src/assets/'),
            '@components': path.resolve(__dirname, './src/components/'),
            '@models': path.resolve(__dirname, './src/models/'),
            '@modules': path.resolve(__dirname, './src/modules/'),
            '@localization': path.resolve(__dirname, './src/localization/'),
            '@infrastructure': path.resolve(__dirname, './src/infrastructure/')
        },
        extensions: ['.vue', '.ts', '.json', '.js'],
        symlinks: false
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)$/,
                exclude: /node_modules/,
                loader: 'ts-loader',
                options: { appendTsSuffixTo: [/\.vue$/] }
            },
            {
                test: /\.vue$/,
                loader: "vue-loader",
                options: {
                    loaders: {
                        ts: 'ts-loader',
                        css: [ MiniCssExtractPlugin.loader, "css-loader", "sass-loader" ]
                    }
                }
            },
            {
                test: /\.(sass|css|scss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: 'sass-loader',
                        options: {
                            additionalData: `@import "./src/assets/styles/_constants.scss";`,
                        },
                    }
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                use: 'url-loader?limit=80000'
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource'
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            title: 'shell',
            templateContent: '<article id="shell-app"></article>'
        }),
        new MiniCssExtractPlugin(),
        new ModuleFederationPlugin(mfConfig)
    ]
}
