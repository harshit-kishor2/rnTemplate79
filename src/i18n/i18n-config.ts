import i18n, {LanguageDetectorAsyncModule} from 'i18next';
import {initReactI18next} from 'react-i18next';
import {MMKV} from 'react-native-mmkv';
import {en, es, hi} from './resources';
import dayjs from 'dayjs';

// dayjs locales for i18n
// Keep this list in sync with the locales in src/i18n/resources
// See https://github.com/iamkun/dayjs/tree/dev/src/locale
import 'dayjs/locale/en-gb';
import 'dayjs/locale/es';
import 'dayjs/locale/hi';

export const APP_LANGUAGE_TYPE_KEY = '@app_language_type';
export const APP_LANGUAGE_KEY = '@app_language';

const APP_LANGUAGE_LOCAL_STORAGE_ID = 'app-langauge-local-storage-id';
const APP_LANGUAGE_LOCAL_STORAGE_ENCRYPTION_KEY =
  'my-random-key-for-encryption';
export const appLanguageLocalStorage: MMKV = new MMKV({
  id: APP_LANGUAGE_LOCAL_STORAGE_ID,
  encryptionKey: APP_LANGUAGE_LOCAL_STORAGE_ENCRYPTION_KEY,
});

export const seti18nLanguage = async (lang: string) => {
  try {
    await i18n.changeLanguage(lang);
  } catch (error) {
    console.error('Error changing language in i18n:', error);
  }

  try {
    dayjs.locale(lang);
  } catch (error) {
    console.error('Error setting dayjs locale:', error);
  }

  try {
    appLanguageLocalStorage.set(APP_LANGUAGE_KEY, lang);
  } catch (error) {
    console.error('Error saving language to local storage:', error);
  }
};

/**
 * The resources object contains the translations for each language.
 * The keys are the language codes and the values are objects containing the translations.
 * The translations are objects with the key being the translation key and the value being the translation value.
 * @see https://www.i18next.com/overview/configuration-options#resources
 */
const resources = {
  en: {translation: en},
  es: {translation: es},
  hi: {translation: hi},
  //! Add more languages here
};

/**
 * A language detector that stores the user's selected language in local storage.
 *
 * When the user selects a language, it is stored in local storage using the key specified in appLanguageLocalStorageKeys.app_language.
 * The detect method is called when the app starts, and it checks if a language is stored in local storage.
 * If a language is stored, it is returned as the user's selected language.
 * If no language is stored, the method returns null.
 *
 * When the user changes their language preference, the cacheUserLanguage method is called to store the new language in local storage.
 *
 * @type {LanguageDetectorAsyncModule}
 */
const useLanguageStorage: LanguageDetectorAsyncModule = {
  type: 'languageDetector',
  async: true,
  detect: callback => {
    const lang = appLanguageLocalStorage.getString(APP_LANGUAGE_KEY);
    if (lang) return callback(lang);
  },
  init: () => null,
  cacheUserLanguage: (language: string) => {
    appLanguageLocalStorage.set(APP_LANGUAGE_KEY, language);
  },
};

/**
 * Initialize the i18next instance with the necessary settings.
 *
 * @see https://www.i18next.com/overview/configuration-options
 */
i18n
  .use(useLanguageStorage) // Use the language storage detector
  .use(initReactI18next) // Use the react-i18next plugin
  .init({
    compatibilityJSON: 'v4', // Compatibility mode for the i18next JSON format.
    fallbackLng: 'en', // The default language to fall back to if a translation is not found.
    lng: 'en', // The default language to initialize the i18next instance with.
    resources: resources,
    react: {
      useSuspense: false, // Whether to use the Suspense feature of React.
    },
    interpolation: {
      escapeValue: false, // Whether to escape values when interpolating.
    },
  });

export default i18n;
