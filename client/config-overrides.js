// eslint-disable-next-line @typescript-eslint/no-var-requires
const hotLodaer = require('react-app-rewire-hot-loader');

module.exports = function override(config, env) {
  config = hotLodaer(config, env);

  config.resolve.alias = {
    ...config.resolve.alias,
    'react-dom': '@hot-loader/react-dom'
  };

  return config;
};
