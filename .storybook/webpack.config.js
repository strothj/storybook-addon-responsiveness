const genDefaultConfig = require("@storybook/react/dist/server/config/defaults/webpack.config.js");

module.exports = (config, env) => {
  config.module.rules.push({
    test: /\.tsx?/,
    exclude: /node_modules/,
    use: [
      {
        loader: "ts-loader",
        options: {
          configFile: "tsconfig.storybook.json",
        },
      },
    ],
  });
  config.resolve.extensions.push(".tsx", ".ts");

  return config;
};
