import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
			// translation file path
			loadPath: "/locales/{{ns}}/{{lng}}.json",
		},
    returnEmptyString: false,
    debug: true,
    fallbackLng: 'en',
    ns: ["navbar", "home", "promo"],
		interpolation: {
			espaceValue: false,
			formatSeparator: ",",
		},
		react: {
			wait: true,
		},
  });
// i18n.changeLanguage('cn');
// i18n.services.formatter.add('DATE_LONG', (value, lng, _options) => {
//   return DateTime.fromJSDate(value).setLocale(lng).toLocaleString(DateTime.DATE_HUGE)
// });

export default i18n;