// @flow

import App, { Container } from 'next/app';
import React from 'react';
import intl from 'react-intl-universal';
import getConfig from 'next/config';
import translation from '../translations/en.json';
import translation_ar from '../translations/ar.json';
import translation_es from '../translations/es.json';

const { publicRuntimeConfig } = getConfig();
// locale data
const locales = {
  en: translation,
  ar: translation_ar,
  es: translation_es,
};
class NextApp extends App {
  constructor(props: Object) {
    super(props);
    const { router } = props;
    intl.init({
      currentLocale:
        router.query.lang && publicRuntimeConfig.locales.indexOf(router.query.lang !== -1) ? router.query.lang : 'en',
      locales,
    });
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <div id="main">
          <Component {...pageProps} />
        </div>
      </Container>
    );
  }
}

export default NextApp;
