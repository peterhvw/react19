const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (env) => ({
  entry: './src/client.tsx',
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  mode: env.production ? 'production' : 'development',
  output: {
    filename: 'main.[hash].bundle.js',
    path: path.resolve(__dirname, 'public'),
    clean: true,
  },
  devtool: 'inline-source-map',
  devServer: {
    static: './public',
    hot: true,
    static: { 
      directory: path.resolve(__dirname, './src/assets'), 
      publicPath: '/assets'
    }
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/i,
        use: [
          env.production ? MiniCssExtractPlugin.loader:  "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[path][name].[ext]",
            },
          },
          {
            loader: "image-webpack-loader",
            options: {
              bypassOnDebug: true, // webpack@1.x
              disable: true, // webpack@2.x and newer
            },
          },
        ],
      },
    ],
  },
  output: {
    path: path.join(__dirname, 'dist/client'),
    filename: 'client.js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'React 19',
      template: "src/index.html"
    }),
    new MiniCssExtractPlugin({
      filename: env.production ? "[name].[hash].css" : "[name].css",
      chunkFilename: env.production ?  "[id].[hash].css" : "[id].css",
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: env.production ? 'static' : 'server',
      openAnalyzer: env.production ? false : true,
      reportFilename: 'bundle-report.html'
    }),
    // new CopyPlugin({
    //   patterns: [
    //     {
    //       from: "src/api",
    //       to: "api/",
    //       transform(content, path) {
    //         return content;
    //       },
    //     },
    //   ],
    // }),
  ],
});