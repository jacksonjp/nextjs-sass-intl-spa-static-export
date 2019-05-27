import intl from 'react-intl-universal';

const I18n = {
  t(id, values) {
    return intl.get(id, values);
  },
  html(id, values) {
    return intl.getHTML(id, values);
  }
};

export default I18n;
