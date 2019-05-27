const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');
const commonsChunkConfig = require('@zeit/next-css/commons-chunk-config');
const withPlugins = require('next-compose-plugins');

const locales = ['en', 'ar', 'es'];

const sassConfig = {
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: '[local]___[hash:base64:5]'
  }
};
const withCSSConfig = {};

module.exports = withPlugins(
  [[withCSS, withCSSConfig], [withSass, sassConfig]],
  {
    webpack: config => {
      config.module.rules.push(
        {
          test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 100000
            }
          }
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: 'sass-resources-loader',
              options: {
                // Provide path to the file with resources
                resources: './themes/_*.scss'
              }
            }
          ]
        }
      );
      const newConfig = commonsChunkConfig(config, /\.(sass|scss|css)$/);
      return newConfig;
    },
    exportPathMap: async function exportPathMap(defaultPathMap) {
      const dynamicPages = {
        '/design': { page: '/custom', query: { search: 'design' } }
      };
      const pages = locales
        .filter(lang => lang !== 'en')
        .reduce((page, lang) => {
          const skipIndexes = ['/404', '/index', '/custom'];
          let otherPagesIndex = Object.keys(defaultPathMap);
          // console.log(Object.keys(dynamicPages))
          otherPagesIndex = otherPagesIndex.concat(Object.keys(dynamicPages));
          const otherPages = otherPagesIndex.map(p => {
            const isDynamic = Object.keys(dynamicPages).indexOf(p) !== -1;
            const pageObj = isDynamic
              ? {
                  [`/${lang}${p}`]: {
                    page: dynamicPages[p].page,
                    query: Object.assign(
                      {},
                      { lang },
                      { ...dynamicPages[p].query }
                    )
                  }
                }
              : {
                  [`/${lang}${p}`]: {
                    page: p,
                    query: { lang }
                  }
                };
            return skipIndexes.indexOf(p) === -1 ? pageObj : {};
          });
          return Object.assign({}, page, ...otherPages);
        }, {});

      // combine the map of post pages with the home
      const allPages = Object.assign(dynamicPages, defaultPathMap, pages, {
        '/': { page: '/' }
      });
      return allPages;
    },
    publicRuntimeConfig: {
      locales
    }
  }
);
