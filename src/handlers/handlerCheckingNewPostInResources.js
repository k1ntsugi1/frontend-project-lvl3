/* eslint-disable no-param-reassign */
import axios from 'axios';
import parserRSS from '../parsers/parserRss';

const handlerCheckingNewPostInResources = (watcherLoadingRSSContent, state) => {
  const { topics: oldTopics, resources } = watcherLoadingRSSContent;
  const proxy = 'https://allorigins.hexlet.app/get?';

  const promises = resources.map((resource) => axios.get(`${proxy}disableCache=true&url=${encodeURIComponent(resource.value)}/`));

  Promise.all(promises)
    .catch(() => {
      state.feedbackMessage = state.i18n.t('updating.errors.errorNetWorkUpdating');
      watcherLoadingRSSContent.updatingTopics.errorUpdating = true;
    })
    .then((responses) => responses.map((response) => parserRSS(response, response.id)))
    .catch(() => {
      state.feedbackMessage = state.i18n.t('updating.errors.errorResourceUpdating');
      watcherLoadingRSSContent.updatingTopics.errorUpdating = true;
    })
    .then((parsedResources) => {
      parsedResources.forEach((parsedRss) => {
        const { topics, feed } = parsedRss;
        const { id: currentId } = feed;
        // eslint-disable-next-line max-len
        const oldTopicsWithCurrentId = oldTopics.filter(({ id }) => currentId === id).map(({ title }) => title);
        const newTopics = topics.filter(({ title }) => !oldTopicsWithCurrentId.includes(title));
        console.log(newTopics);
        if (newTopics.length === 0) return;
        newTopics.forEach((newTopic) => watcherLoadingRSSContent.topics.push(newTopic));
        console.log(watcherLoadingRSSContent.topics);
      });
    })
    .then(() => {
      watcherLoadingRSSContent.updatingTopics.errorUpdating = false;
    })
    .catch((e) => console.log('error', e));
};

export default handlerCheckingNewPostInResources;
