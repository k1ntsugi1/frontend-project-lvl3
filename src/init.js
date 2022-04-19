import i18next from 'i18next';
import languages from './resources/languages.js';
import app from './app.js';

const runApp = () => {
  const promise = new Promise((resolve) => {
    const i18Instance = i18next.createInstance();
    i18Instance.init({
      lng: 'ru',
      debug: true,
      resources: languages.ru,
    });
    resolve(i18Instance);
  });
  promise.then((i18nInst) => {
    const state = {
      i18n: i18nInst,
      message: null,
      counterHavePromisedTopics: {
        sum: 0,
      },
      process: {
        currentProcess: null, // fillingRssUrl, loadingRssContent
      },
      resultOfLoadingRssContent: {
        currentTimerID: null,
        addingCounter: 0,
        resources: [],
        feeds: [],
        topics: [],
      },
      resultOfValidationRssUrl: {
        isValid: null,
      },
    };
    return state;
  })
    .then((state) => {
      console.log(state);
      app(state);
    })
    .catch((e) => {
      console.log(e, 'error in init');
    });
};

export default runApp;
