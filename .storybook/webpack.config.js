module.exports = (config, env) => {
  config.module.rules.push({
    test: /\.tsx?/,
    exclude: /node_modules/,
    loader: "ts-loader",
  });
  config.resolve.extensions.push(".tsx", ".ts");

  return config;
};
