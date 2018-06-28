import App, { Container } from 'next/app';
import React from 'react';
import intl from 'react-intl-universal';
import i18n from '../utils/i18n';
import translation from '../translations/en.json';
import translation_ar from '../translations/ar.json';
import translation_es from '../translations/es.json';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
// locale data
const locales = {
  en: translation,
  ar: translation_ar,
  es: translation_es
};
class NextApp extends App {
  constructor(props) {
    super(props);
    intl.init({
      currentLocale:
        props.router.query.lang &&
        publicRuntimeConfig.locales.indexOf(props.router.query.lang !== -1)
          ? props.router.query.lang
          : 'en',
      locales: locales
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
