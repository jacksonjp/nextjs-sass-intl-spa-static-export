require('babel-register');
const withSass = require('@zeit/next-sass');
const commonsChunkConfig = require('@zeit/next-css/commons-chunk-config');
const compose = require('next-compose');
const locales = ['en', 'ar', 'es'];

const sassConfig = {
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: '[local]___[hash:base64:5]'
  }
};
module.exports = withSass({
  ...sassConfig,
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
  exportPathMap: async function(defaultPathMap) {
    const pages = locales.filter(lang => lang !== 'en').reduce(
      (pages, lang) =>
        Object.assign({}, pages, {
          [`/${lang}`]: {
            page: '/',
            query: { lang: lang }
          }
        }),
      {}
    );

    // combine the map of post pages with the home
    return Object.assign({}, pages, {
      '/': { page: '/' }
    });
  },
  publicRuntimeConfig: {
    locales: locales
  }
});
