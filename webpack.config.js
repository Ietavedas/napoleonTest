const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

const production = {
  entry: { main: './src/index.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(css|sass|scss)$/,
        use:  [  'style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
      },
      {
        test: /\.(png|jp(e*)g|svg)$/,
        use: [{
            loader: 'url-loader',
            options: {
                limit: 8000, // Convert images < 8kb to base64 strings
                name: 'assets/images/[hash]-[name].[ext]'
            }
        }]
      }
    ]
    },
    devServer: {
        historyApiFallback: true
    },
    plugins: [
    new CleanWebpackPlugin('dist', {} ),
    new MiniCssExtractPlugin(
        {
            filename: 'style.[contenthash].css',
        }
    ),
    new HtmlWebpackPlugin(
        {
            inject: false,
            hash: true,
            template: './src/index.html',
            filename: 'index.html'
        }
    ),
    new WebpackMd5Hash()
  ]
};

const development = {
    entry: { app: './src/index.js' },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'index.js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.(css|sass|scss)$/,
          use:  [  'style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
        },
        {
          test: /\.(png|jp(e*)g|svg)$/,  
          use: [{
              loader: 'url-loader',
              options: { 
                  limit: 8000, // Convert images < 8kb to base64 strings
                  name: 'assets/images/[hash]-[name].[ext]'
              } 
          }]
        }
      ]
    },
    devServer: {
        inline: true,
        historyApiFallback: true,
        host: '127.0.0.1'
    },
    plugins: [ 
      new MiniCssExtractPlugin(
          {
              filename: 'style.css',
          }
      ),
      new HtmlWebpackPlugin(
          {
              inject: false,
              hash: true,
              template: './src/index_dev.html',
              filename: 'index.html'
          }
      ),
      new webpack.HotModuleReplacementPlugin(),
    ]
  };


module.exports = function(env) {
    if (env === 'production') {
        return production;
    }
    if (env === 'development') {
        return development;
    }
};
