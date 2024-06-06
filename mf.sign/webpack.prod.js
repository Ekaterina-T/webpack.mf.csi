const { merge } = require('webpack-merge');
const common = require('./webpack.base');
const webpack = require("webpack");

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    devServer: {
        open: false,
        hot: false,
    },
    optimization: {
        chunkIds: 'named',
        minimize: true,
    },
    plugins: [
      new webpack.DefinePlugin({
        __VUE_PROD_DEVTOOLS__: "false",
      }),
    ],
})
