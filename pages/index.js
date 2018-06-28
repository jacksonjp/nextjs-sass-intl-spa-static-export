import React from 'react';
import Head from 'next/head';
import intl from 'react-intl-universal';
import shortid from 'shortid';
import styles from './styles/index.scss';
import i18n from '../utils/i18n';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
class Index extends React.Component {
  toggleLang(lang) {
    const newLocale = lang === 'en' ? '' : lang;
    if (typeof window !== 'undefined') {
      if (publicRuntimeConfig.locales.indexOf(newLocale) !== -1) {
        window.location.href = newLocale ? `/${newLocale}` : '';
      } else {
        const replacePart = newLocale ? `/${newLocale}/` : '/';
        window.location.href = window.location.href.replace(
          new RegExp(/\/[\w-]+(\/|\?|$)/),
          newLocale
        );
      }
    }
  }
  render() {
    return (
      <div>
        <div className={styles.heading}>{i18n.t('link.about')}</div>
        <div>Languages</div>
        {publicRuntimeConfig.locales
          .filter(lang => lang !== intl.options.currentLocale)
          .map(lang => {
            return (
              <button
                key={shortid.generate()}
                onClick={() => this.toggleLang(lang)}>
                {i18n.t('header.lang.' + lang)}
              </button>
            );
          })}
      </div>
    );
  }
}

export default Index;
