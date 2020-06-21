const { withExpoWebpack } = require("@expo/electron-adapter");

module.exports = (config) => {
  const expoConfig = withExpoWebpack(config);
  expoConfig.node = {
    ...expoConfig.node,
    __dirname: false,
    __filename: false,
  };
  //  console.log("expo config", expoConfig);
  return expoConfig;
};
