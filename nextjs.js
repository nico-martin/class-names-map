const getLocalIdent = require('./css-loader.js');

const withClassNamesMap = (nextConfig) => {
  const classNamesMapConfig = nextConfig.classNamesMap || {};
  delete nextConfig.classNamesMap;
  const applyInDev = classNamesMapConfig.applyInDev !== false;
  delete classNamesMapConfig.applyInDev;

  return Object.assign({}, nextConfig, {
    webpack(config, options) {
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
                        getLocalIdent: getLocalIdent(classNamesMapConfig),
                      }
                    : {}),
                },
              };
            }
          });
      });

      if (typeof nextConfig.webpack === 'function') {
        config = nextConfig.webpack(config, options);
      }

      return config;
    },
  });
};

module.exports = withClassNamesMap;
