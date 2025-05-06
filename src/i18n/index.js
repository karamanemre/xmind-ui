import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import trTranslations from './locales/tr';
import enTranslations from './locales/en';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      tr: { translation: trTranslations },
      en: { translation: enTranslations }
    },
    lng: 'tr',
    fallbackLng: 'tr'
  });

export default i18n; 