import axios from 'axios';
import parserRSS from '../parsers/parserRss';

const handlerCheckingNewPostInResources = (watcherLoadingRSSContent) => {
  const { topics: oldTopics, resources } = watcherLoadingRSSContent;
  const proxy = 'https://allorigins.hexlet.app/get?';
  resources.forEach((resource) => {
    axios.get(`${proxy}disableCache=true&url=${encodeURIComponent(resource.value)}/`)
      .then((response) => parserRSS(response, resource.id))
      .then((parsedRss) => {
        const { feed, topic } = parsedRss; 
      })
  });

};

export default handlerCheckingNewPostInResources;