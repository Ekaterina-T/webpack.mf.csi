const { merge } = require('webpack-merge');
const common = require('./webpack.base');

//Configure dev enviroment by combining common configuration and adding some more options
module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        static: './dist_webpack',
        open: false,
        hot: true
    }
})
