import { createI18n } from 'vue-i18n';
import EN from './translations/en.json';

const messages = {
  en: EN,
};

export function currentLang(): string {
  const header = document.querySelector('header');
  const headerLang = header ? header.lang : null;
  const lang = headerLang ?? 'en';
  return lang;
}

export function customPluralizationRules(countOfSelectedItems: number, numberForPluralization: number) {
  if (countOfSelectedItems === 0) {
    return 0;
  }
  const isTeen = countOfSelectedItems > 10 && countOfSelectedItems < 20;
  const endsWithOne = countOfSelectedItems % 10 === 1;
  if (!isTeen && endsWithOne) {
    return 1;
  }
  if (!isTeen && countOfSelectedItems % 10 >= 2 && countOfSelectedItems % 10 <= 4) {
    return 2;
  }
  return numberForPluralization < 4 ? 2 : 3;
}

export const localization = createI18n({
  legacy: false,
  locale: currentLang(),
  silentTranslationWarn: true,
  silentFallbackWarn: true,
  fallbackLocale: {
    default: ['en'],
  },
  messages,
  pluralRules: {
    en: customPluralizationRules,
  },
  warnHtmlInMessage: 'off',
});

export const i18n = localization.global;
