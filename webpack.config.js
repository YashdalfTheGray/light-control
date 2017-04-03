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
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            compilerOptions: {
                                target: 'es5',
                                lib: ['dom', 'es2017']
                            }
                        }
                    }
                ]
            }
        ]
    }
};
