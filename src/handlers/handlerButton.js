/* eslint-disable no-param-reassign */
import _ from 'lodash';
import validateForm from '../validators/validatorForm';
import isUniqRSSUrlinResources from '../validators/validatorUniqUrlRSS';
import handlerLoadingRSSContent from './handlerDataRSSPosts.js';
import renderFeedback from '../renders/renderValid';

// eslint-disable-next-line max-len
const handlerButton = (state, watcherValidationRSSUrl, watcherLoadingRSSContent, watcherActivityBtn, input) => {
  const form = document.querySelector('.rss-form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const content = input.value;
    validateForm(state.i18n, content)
      .catch((err) => {
        const [error] = err.errors;
        state.feedbackMessage = error;
        watcherValidationRSSUrl.isValid = false;
      })
      .then(({ rssUrl }) => {
        if (!isUniqRSSUrlinResources(watcherLoadingRSSContent.resources, rssUrl)) throw new Error(state.i18n.t('isntUniqRSSUrl'));
        state.feedbackMessage = state.i18n.t('isValid');
        watcherValidationRSSUrl.isValid = true;
        return rssUrl;
      })
      .then((rssUrl) => {
        watcherActivityBtn.currentProcess = 'loadingRssContent';
        return rssUrl;
      })
      .then((rssUrl) => {
        console.log('start');
        handlerLoadingRSSContent(watcherLoadingRSSContent, watcherActivityBtn, rssUrl, state);
      })
      .then(() => {
        console.log('end');
        // watcherActivityBtn.currentProcess = 'fillingRssUrl';
      })
      .catch((err) => {
        state.feedbackMessage = err.message;
        watcherValidationRSSUrl.isValid = false;
      });
  });
};

export default handlerButton;
