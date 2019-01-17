const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: {
        App: './public/src/app.js',
        // SeatMapApp: './public/src/seat_map_main.js',
        // PurchaseFormApp: './public/src/purchase_form_main.js'
    },
    output: {
        filename: './public/build/[name].js'
    },
    resolve: {
        alias: {
            vue: './vue.js'
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            }, {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                    }
                    // other vue-loader options go here
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },
    plugins: [ new Dotenv()]
};