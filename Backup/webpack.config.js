const path = require('path');
const webpack = require('webpack');
const Htmlwebpackplugin = require('html-webpack-plugin');


module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader','css-loader'] },
      { test: /\.less$/, use: ['style-loader','css-loader','less-loader'] },
      { test: /\.(png|jpg|gif|woff|woff2|eot|ttf|svg)$/, use:[{
          loader: 'url-loader',
          options:{
            limit:8192
            // ,name:'[name].[hash].[exxt]',
            // publicPath:'../',
            // outputPath:'dist/'
          }
      }]
     }
    ]
  },
  plugins:[
      new Htmlwebpackplugin({
          template:'./src/index.html'
      })
    ]
};