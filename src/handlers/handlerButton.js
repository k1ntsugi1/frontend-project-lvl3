/* eslint-disable no-undef */
/* eslint-disable no-param-reassign */
import _ from 'lodash';

const handlerButton = (watcher, input) => {
  const form = document.querySelector('.rss-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    Promise.resolve(input.value)
      .then((content) => {
        if (watcher.feeds.includes(content)) throw new Error(watcher.i18n.t('urlInAddedResources'));
        watcher.feeds.push(content);
        const sheme = watcher.shemes.urlValidationScheme;
        console.log(watcher.shemes);
        return sheme.validate({ rssUrl: content }, { abortEarly: true });
      })
      .then((resultOfValidation) => {
        console.log(resultOfValidation, 'promise');
        watcher.resultOfValidation.message = watcher.i18n.t('isValid');
        watcher.resultOfValidation.status = true;
      })
      .catch((err) => {
        console.log(err);
        if (_.has(err, 'errors')) {
          const [error] = err.errors;
          watcher.resultOfValidation.message = error;
          watcher.resultOfValidation.status = false;
          return;
        }
        watcher.resultOfValidation.message = err;
        watcher.resultOfValidation.status = false;
      });
  });
};

export default handlerButton;
