/* eslint strict: 0 */
'use strict';

const path = require('path');
const webpack = require('webpack');


module.exports = env => {
    return {
        target: 'electron-renderer',
        entry: [
            path.resolve(__dirname, 'src/index.jsx'),
        ],
        output: {
            path: path.join(__dirname, 'build'),
            publicPath: path.join(__dirname, 'src'),
            filename: 'bundle.js',
        },
        resolve:{
            extensions:['.js','.jsx','.css']
        },
    
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader'
                    }
                },
                {
                    test: /\.css$/,
                    use: [
                        'style-loader',
                        'css-loader',
                        { 
                            loader: 'postcss-loader', 
                            options: {  
                                plugins: (loader) => 
                                    [require('autoprefixer') 
                                ]} 
                        }
                    ]
                },
                {
                    test: /\.less$/,
                    use: [
                        'style-loader',
                        'css-loader',
                        'less-loader',
                        { 
                            loader: 'postcss-loader', 
                            options: {  
                                plugins: (loader) => 
                                    [require('autoprefixer') 
                                ]} 
                        }
                    ]
                }
            ]
        },

        plugins: [
            new webpack.HotModuleReplacementPlugin(),
        ],
    }
   
};
