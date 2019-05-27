# Multilingual SPA with static export

Generate Dynamic list of pages for Multilingual Single Page Website. This use a custom Express server in development to configure custom routing and then generate a map of pages to export for production.

## How to use

Install it and run:

```bash
npm install
npm run dev
# or
yarn
yarn dev
```

When trying to run `npm start` it will build and export your pages into the `out` folder and serve them on `localhost:5000`.

The out folder can easily be served using a netlify instance to immediately deploy your website or any hosting platform.

## Features

* SCSS Support using @zeit/next-sass with cssModules enabled
* Support for RTL using [postcss-inline-rtl](https://github.com/jakob101/postcss-inline-rtl) plugin
* Global SCSS variables using [sass-resources-loader](https://github.com/shakacode/sass-resources-loader)
* Localization using [react-intl-universal](https://github.com/alibaba/react-intl-universal)
