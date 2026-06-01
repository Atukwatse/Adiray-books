const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const loadEnvFile = (filePath) => {
  if (!fs.existsSync(filePath)) {
    return {};
  }

  return fs
    .readFileSync(filePath, 'utf8')
    .split(/\r?\n/)
    .reduce((env, line) => {
      const trimmedLine = line.trim();

      if (!trimmedLine || trimmedLine.startsWith('#')) {
        return env;
      }

      const equalsIndex = trimmedLine.indexOf('=');

      if (equalsIndex === -1) {
        return env;
      }

      const key = trimmedLine.slice(0, equalsIndex).trim();
      const rawValue = trimmedLine.slice(equalsIndex + 1).trim();
      env[key] = rawValue.replace(/^['"]|['"]$/g, '');

      return env;
    }, {});
};

const envFile = {
  ...loadEnvFile(path.resolve(__dirname, '.env')),
  ...loadEnvFile(path.resolve(__dirname, 'ev/.env')),
};
const googleClientId =
  process.env.ADIRAY_GOOGLE_CLIENT_ID ||
  process.env.GOOGLE_CLIENT_ID ||
  envFile.ADIRAY_GOOGLE_CLIENT_ID ||
  envFile.GOOGLE_CLIENT_ID ||
  envFile.google_client_id ||
  '';

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true,
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      __ADIRAY_GOOGLE_CLIENT_ID__: JSON.stringify(googleClientId),
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public/images', to: 'images', noErrorOnMissing: true }
      ],
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 3000,
    hot: true,
    open: true,
    historyApiFallback: true,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
