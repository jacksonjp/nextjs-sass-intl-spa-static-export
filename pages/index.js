// @flow
import React from 'react';
import intl from 'react-intl-universal';
import shortid from 'shortid';
import getConfig from 'next/config';
import styles from './styles/index.scss';
import i18n from '../utils/i18n';

const { publicRuntimeConfig } = getConfig();
type Props = {};
class Index extends React.Component<Props> {
  toggleLang(lang: string) {
    const newLocale = lang === 'en' ? '' : lang;
    if (typeof window !== 'undefined') {
      if (publicRuntimeConfig.locales.indexOf(newLocale) !== -1) {
        window.location.href = newLocale ? `/${newLocale}` : '';
      } else {
        window.location.href = window.location.href.replace(new RegExp(/\/[\w-]+(\/|\?|$)/), newLocale);
      }
    }
  }

  render() {
    return (
      <div>
        <div className={styles.heading}>
          {i18n.t('link.about')}
        </div>
        <div>
          {'Languages'}
        </div>
        {publicRuntimeConfig.locales.filter(lang => lang !== intl.options.currentLocale).map(lang => (
          <button type="button" key={shortid.generate()} onClick={() => this.toggleLang(lang)}>
            {i18n.t(`header.lang.${lang}`)}
          </button>
        ))}
      </div>
    );
  }
}

export default Index;
