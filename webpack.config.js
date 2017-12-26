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
            extensions:['.js','.jsx']
        },
    
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader'
                    }
                }
            ]
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
        ],
    }
   
};
