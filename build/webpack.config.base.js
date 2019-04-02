const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        index: [path.join(__dirname, '../src/index.ts')]
    },

    output: {
        path: path.join(__dirname, '../dist'),
        filename: 'a-dance-of-fire-and-ice.js',
        // filename: '[name].js',
        publicPath: '/dist/'
    },

    resolve: {
        extensions: ['.scss',  '.ts', '.js']
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: ['url-loader']
            },
            {
                test: /\.(js|ts)$/,
                exclude: /node_modules/,
                use: ['babel-loader', 'ts-loader']
            }
        ]
    }

};
