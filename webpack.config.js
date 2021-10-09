const path = require('path');

module.exports = {
    entry: {
        main: ['./src/main.js']
    },
    output: {
        path: path.resolve(__dirname, './build'),
        filename: '[name].js',
        publicPath: '/'
    },
    module: {
        rules: [{
            test: /\.js$/,
            include: path.resolve(__dirname, './src'),
            loader: 'babel-loader'
        }]
    },
    plugins: [],
    devServer: {
        static: {
            directory: path.join(__dirname, './public'),
        },
        host: 'localhost',
        port: 8080,
        historyApiFallback: true,
    }
}