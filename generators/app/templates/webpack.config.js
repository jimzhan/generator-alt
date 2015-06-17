var path       = require('path');
var webpack    = require('webpack');
var HtmlPlugin = require('html-webpack-plugin');


// TODO production packing.
var isDev = (process.env.NODE_ENV) ? false : true;

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8000',
    'webpack/hot/dev-server',
    './scripts/bootstrap.jsx'
  ],

  externals: {
    '$': 'jQuery'
  },

  output: {
    filename: '[name].js',
    chunkFilename: '[chunkhash].js',
    path: 'build'
  },

  devServer: {
    info: false,
    hot: true,
    inline: false,
    port: 8000,
    host: 'localhost',
    colors: true,
    progress: true,
    contentBase: 'build',
    historyApiFallback: true,
    stats: {
      colors: true,
      progress: true
    }
  },

  resolve: {
    root: [
      path.join(__dirname, 'node_modules')
    ],
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: ['node_modules']
  },

  module: {
    loaders: [
      {
        test: /\.(svg|ico|eot|ttf|woff2?|pdf)$/,
        loader: 'file?name=[path][name].[ext]&context=assets'
      },
      {
        test: /\.css$/,
        loader: 'style!css!autoprefixer'
      },
      {
        test: <%= preprocessor.ext %>,
        loader: 'style!css!autoprefixer!<%= preprocessor.name %>'
      },
      {
        test: /\.jsx?$/,
        loader: 'react-hot!babel?stage=0',
        exclude: [/node_modules/]
      }
    ]
  },

  plugins: [
    new HtmlPlugin({
      pkg      : require('./package.json'),
      template : './index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};
