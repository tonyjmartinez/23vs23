const path = require("path");
const autoprefixer = require("autoprefixer");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const workboxPlugin = require("workbox-webpack-plugin");
const webpackPwaManifest = require("webpack-pwa-manifest");
module.exports = {
  devtool: "cheap-module-source-map",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    chunkFilename: "[id].js",
    publicPath: ""
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: "[name]__[local]__[hash:base64:5]"
            }
          },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: () => [
                autoprefixer({
                  browsers: ["> 1%", "last 2 versions"]
                })
              ]
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gift)$/,
        loader: "url-loader?limit=8000&name=images/[name].[ext]"
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + "/src/index.html",
      filename: "index.html",
      inject: "body"
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new workboxPlugin.InjectManifest({
      swSrc: "./src/sw.js",
      swDest: "sw.js"
    }),
    new webpackPwaManifest({
      name: "23vs23",
      short_name: "23vs23",
      description: "23vs23 NBA Player Stats Comparator",
      background_color: "#000000",
      start_url: "/index.html",
      filename: "manifest.json",
      theme_color: "#000000"
    })
  ]
};
