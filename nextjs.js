const getLocalIdent = require('./css-loader.js');

const withClassNamesMap = (nextConfig) => {
  const config = nextConfig.classNamesMap || {};
  delete nextConfig.classNamesMap;
  const applyInDev = config.applyInDev !== false;
  delete config.applyInDev;

  return {
    ...nextConfig,
    webpack: (config) => {
      config.module.rules[1].oneOf.forEach((moduleLoader, i) => {
        Array.isArray(moduleLoader.use) &&
          moduleLoader.use.forEach((l) => {
            if (
              l.loader.includes('\\css-loader') &&
              !l.loader.includes('postcss-loader')
            ) {
              const { getLocalIdent: oldGetLocalIdent, ...others } =
                l.options.modules;

              l.options = {
                ...l.options,
                modules: {
                  ...others,
                  localIdentName: '[name]_[local]-[hash:base64:5]',
                  ...(process.env.NODE_ENV !== 'development' || applyInDev
                    ? {
                        getLocalIdent: getLocalIdent(config),
                      }
                    : {}),
                },
              };
            }
          });
      });
      return config;
    },
  };
};

module.exports = withClassNamesMap;
