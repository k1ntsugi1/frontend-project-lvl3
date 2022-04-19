import axios from 'axios';
import parserRSS from '../parsers/parserRss';
// eslint-disable-next-line import/no-cycle
import handlerSetTimeout from './handlerSetTimeout.js';

const handlerCheckingNewPostInResources = (watcherLoadingRSSContent) => {
  const { topics: oldTopics, resources } = watcherLoadingRSSContent;
  const proxy = 'https://allorigins.hexlet.app/get?';
  const promises = resources.map((resource) => axios.get(`${proxy}disableCache=true&url=${encodeURIComponent(resource.value)}/`)
    .then((response) => parserRSS(response, resource.id)));

  Promise.all(promises)
    .then((parsedResources) => {
      console.log(parsedResources, 'parsedRSS');
      parsedResources.forEach((parsedRss) => {
        const { topics } = parsedRss;
        const { feed } = parsedRss;
        const { id: currentId } = feed;
        console.log(parsedRss, 'parsedRSS');
        // eslint-disable-next-line max-len
        const oldTobicsWithCurrentId = oldTopics.filter(({ id }) => currentId === id).map(({ title }) => title);
        const newTopics = topics.filter(({ title }) => !oldTobicsWithCurrentId.includes(title));

        if (newTopics.length === 0) return;
        newTopics.forEach((newTopic) => watcherLoadingRSSContent.topics.push(newTopic));
      });
    })
    .then(() => {
      watcherLoadingRSSContent.addingCounter += 1;
      handlerSetTimeout(watcherLoadingRSSContent, true);
    }).catch((e) => {
      console.log(e);
      watcherLoadingRSSContent.addingCounter = 0;
      handlerSetTimeout(watcherLoadingRSSContent, false);
    });
};

export default handlerCheckingNewPostInResources;
