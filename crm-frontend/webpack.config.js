/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (env) => ({
  entry: './src/main.js',
  output: {
    filename: 'main.[contenthash].js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          env.prod ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name].[contenthash][ext]',
        },
      },
      {
        test: /\.(woff|woff2)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name].[contenthash][ext]',
        },
      },
    ],
  },
  optimization: {
    minimizer: [
      '...',
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: ['imagemin-svgo'],
          },
        },
        loader: false,
      }),
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: env.prod ? 'index.[contenthash].html' : 'index.html',
      templateContent: `
                <!DOCTYPE html>
                <html lang="ru">
                  <head>
                  <meta charset="UTF-8">
                  <meta http-equiv="X-UA-Compatible" content="IE=edge">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <meta name="description" content="Skb - Система управления контактными
                  данными клиентов">
                  <title>Skb.</title>
                  <!-- favicon -->
                  <link rel="apple-touch-icon" sizes="180x180" href="img/favicon/apple-touch-icon.png">
                  <link rel="icon" type="image/png" sizes="32x32" href="img/favicon/favicon-32x32.png">
                  <link rel="icon" type="image/png" sizes="16x16" href="img/favicon/favicon-16x16.png">
                  <link rel="manifest" href="img/favicon/site.webmanifest">
                  <link rel="mask-icon" href="img/favicon/safari-pinned-tab.svg" color="#5bbad5">
                  <meta name="msapplication-TileColor" content="#2b5797">
                  <meta name="theme-color" content="#ffffff">
                  <!-- normalize -->
                  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w==" crossorigin="anonymous" referrerpolicy="no-referrer" />
                  </head>
                  <body></body>
                </html>
      `,
    }),
    new MiniCssExtractPlugin({
      filename: 'main.[contenthash].css',
    }),
    new CssMinimizerPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: './src/assets/favicon',
          to({ context, absoluteFilename }) {
            return 'img/favicon/[name][ext]';
          },
        },
      ],
    }),
  ],
  devServer: {
    hot: true,
    open: true,
  },
});
