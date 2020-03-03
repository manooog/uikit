export const modules = {
  rules: [
    {
      test: /\.tsx?$/,
      exclude: /node_modules/,
      use: "ts-loader"
    },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: "babel-loader"
    },
    {
      test: /\.less$/,
      use: [
        {
          loader: "style-loader"
        },
        "css-loader",
        "less-loader"
      ]
    }
  ]
};
