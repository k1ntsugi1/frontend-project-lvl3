/* eslint-disable no-param-reassign */
import axios from 'axios';
import parserRSS from '../parsers/parserRss';
import { getUniqId } from './additionalHandlers';

// eslint-disable-next-line max-len
const handlerOfLoadingRSSContent = (watcherLoadingRSSContent, watcherActivityBtn, rssUrl, state) => {
  const id = getUniqId();
  // const proxy = 'https://allorigins.hexlet.app/get';
  console.log(rssUrl, 'rssURL');
  const newUrl = new URL(`https://allorigins.hexlet.app/get?url=${rssUrl}`);
  newUrl.searchParams.set('disableCache', true);

  // axios.get(`${proxy}?disableCache=true&url=${encodeURIComponent(rssUrl)}/`)
  axios.get(newUrl.toString())
    .catch(() => {
      state.feedbackMessage = state.i18n.t('loading.errrors.errorNetWork');
      throw new Error();
    })
    .then((response) => parserRSS(response, id))
    .catch((error) => {
      const errorMessage = error.message;
      if (errorMessage === 'errorParsing') state.feedbackMessage = state.i18n.t('loading.errrors.errorResource');
      throw new Error();
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
    .catch(() => {
      watcherLoadingRSSContent.errorLoading = true;
      watcherActivityBtn.currentProcess = 'fillingRssUrl';
    });
};

export default handlerOfLoadingRSSContent;
