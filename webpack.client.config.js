const path = require('path');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

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
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
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
    new BundleAnalyzerPlugin({
      analyzerMode: env.production ? 'static' : 'server',
      openAnalyzer: env.production ? false : true,
      reportFilename: 'bundle-report.html'
    }),
    new WebpackManifestPlugin({
      fileName: 'manifest.json',
      publicPath: '/',
      writeToFileEmit: true,
    }),
  ],
});