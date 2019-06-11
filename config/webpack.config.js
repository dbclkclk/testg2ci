const path = require('path');
module.exports = {
  entry: {
    main: path.join(__dirname, '..', '/src/index.js'),
  },
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: '[name].[hash].bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
};