import Vue from 'vue';
import VueI18n from 'vue-i18n';
import Cookies from 'js-cookie';
import elementEnLocale from 'element-ui/lib/locale/lang/en'; // element-ui lang
import elementFrLocale from 'element-ui/lib/locale/lang/fr'; // element-ui lang
import enLocale from './en';
import frLocale from './fr';

Vue.use(VueI18n);

const messages = {
  en: {
    ...enLocale,
    ...elementEnLocale,
  },
  fr: {
    ...frLocale,
    ...elementFrLocale,
  },
};

export function getLanguage() {
  const chooseLanguage = Cookies.get('language');
  if (chooseLanguage) {
    return chooseLanguage;
  }

  // le français comme langue par défaut
  const language = (navigator.language || navigator.browserLanguage).toLowerCase();
  const locales = Object.keys(messages);
  for (const locale of locales) {
    if (language.indexOf(locale) > -1) {
      return locale;
    }
  }
  return 'fr';
}
const i18n = new VueI18n({
  // set locale
  // options: fr | en
  locale: getLanguage(),
  // set locale messages
  messages,
});

export default i18n;
