const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, './src/index.js'),
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist'),
    assetModuleFilename: '[name][ext][query]',
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: false,
            },
          },
        ],
      },
      {
        test: /\.(c|sa|sc)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg?)$/i,
        include: [
          path.resolve(__dirname, "src/img/static")
        ],
        exclude: [
          path.resolve(__dirname, "src/img/static/sprites.svg")
        ],
        type: 'asset',
        generator: {
          filename: 'images/[name][ext][query]'
        }
      },
      {
        test: /sprites\.svg?$/i,
        include: [
          path.resolve(__dirname, "src/img/static")
        ],
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 0
          }
        },
        generator: {
          filename: 'images/[name][ext][query]'
        }
      },
      {
        test: /\.(jpe?g|png|gif|svg?)$/i,
        include: [
          path.resolve(__dirname, "src/img/portfolio")
        ],
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 0
          }
        },
        generator: {
          filename: 'images/portfolio/[hash][ext][query]'
        }
      },
      {
        test: /\.(jpe?g|png|gif|svg?)$/i,
        include: [
          path.resolve(__dirname, "src/img/scroller")
        ],
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 0
          }
        },
        generator: {
          filename: 'images/scroller/[hash][ext][query]'
        }
      },
      {
        test: /\.(eot|ttf|woff|woff2|svg?)$/i,
        include: [
          path.resolve(__dirname, "src/fonts")
        ],
        type: 'asset',
        generator: {
          filename: 'fonts/[name][ext][query]'
        }
      }
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      filename: 'index.html',
      minify: false,
    }),
    new MiniCssExtractPlugin(),
  ],
}