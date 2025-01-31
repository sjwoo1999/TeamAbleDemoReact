module.exports = {
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /node_modules\/(?!chart.js)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"]
            }
          }
        }
      ]
    }
  };
  