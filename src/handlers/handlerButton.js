/* eslint-disable no-undef */
/* eslint-disable no-param-reassign */
import _ from 'lodash';

const handlerButton = (watcher, input) => {
  const form = document.querySelector('.rss-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const content = input.value;
    const sheme = watcher.shemes.urlValidationScheme;
    sheme.validate({ rssUrl: content })
      .then((resultOfValidation) => {
        if (watcher.feeds.includes(resultOfValidation)) throw new Error(watcher.i18n.t('urlInAddedResources'));
        watcher.feeds.push(resultOfValidation);
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
