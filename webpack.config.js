const { resolve } = require('path');

module.exports = {
    entry: ['./index'],
    context: resolve('app'),
    output: {
        filename: 'bundle.js',
        path: resolve('public')
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: ['babel-loader']
            }
        ]
    }
};
