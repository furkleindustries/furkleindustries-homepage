const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    prerender: './server/prerender.ts',
    server: './server/server.ts',
  },
  resolve: { extensions: ['.js', '.ts'] },
  target: 'node',
  mode: 'none',
  // this makes sure we include node_modules and other 3rd party libraries
  externals: [ /node_modules/, ],
  output: {
    path: path.resolve(__dirname, '..', 'dist', 'server'),
    filename: '[name].js'
  },
  module: {
    rules: [{ test: /\.ts$/, loader: 'ts-loader' }]
  },
  plugins: [
    // Temporary Fix for issue: https://github.com/angular/angular/issues/11580
    // for 'WARNING Critical dependency: the request of a dependency is an expression'
    new webpack.ContextReplacementPlugin(
      /(.+)?angular(\\|\/)core(.+)?/,
      path.resolve('..', __dirname, 'src'), // location of your src
      {},
    ),
    new webpack.ContextReplacementPlugin(
      /(.+)?express(\\|\/)(.+)?/,
      path.resolve('..', __dirname, 'src'),
      {},
    ),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.h2': JSON.stringify(process.env.h2)
    }),
  ],
};
