/* eslint-disable no-param-reassign */
import axios from 'axios';
import parserRSS from '../parsers/parserRss';
import { getUniqId } from './additionalHandlers';

// eslint-disable-next-line max-len
const handlerOfLoadingRSSContent = (watcherLoadingRSSContent, watcherActivityBtn, rssUrl, state) => {
  const id = getUniqId();
  const proxy = 'https://allorigins.hexlet.app/get?';

  axios.get(`${proxy}disableCache=true&url=${encodeURIComponent(rssUrl)}/`)
    .catch(() => {
      throw new Error(state.i18n.t('loading.errrors.errorNetWork'));
    })
    .then((response) => parserRSS(response, id))
    .catch(() => {
      throw new Error(state.i18n.t('loading.errrors.errorResource'));
    })
    .then((parsedRss) => {
      const { feed, topics } = parsedRss;
      watcherLoadingRSSContent.resources.push({ id, value: rssUrl });
      topics.forEach((topic) => watcherLoadingRSSContent.topics.push(topic));
      watcherLoadingRSSContent.feeds.push(feed);

      state.feedbackMessage = state.i18n.t('loading.isLoaded');
      watcherLoadingRSSContent.errorLoading = false;
      watcherActivityBtn.currentProcess = 'fillingRssUrl';
    })
    .catch((error) => {
      state.feedbackMessage = error.message;
      watcherLoadingRSSContent.errorLoading = true;
      watcherActivityBtn.currentProcess = 'fillingRssUrl';
    });
};

export default handlerOfLoadingRSSContent;
