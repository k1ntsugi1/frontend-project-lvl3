import axios from 'axios';
import parserRSS from '../parsers/parserRss';

const handlerLoadingRSSContent = (watcherLoadingRSSContent, rssUrl) => {
  const id = watcherLoadingRSSContent.resources.length;
  watcherLoadingRSSContent.resources.push({ id, value: rssUrl });

  const proxy = 'https://allorigins.hexlet.app/get?';
  axios.get(`${proxy}disableCache=true&url=${encodeURIComponent(rssUrl)}/`)
    .then((response) => parserRSS(response, id))
    .then((parsedRss) => {
      const { feed, topics } = parsedRss;
      console.log(topics);
      topics.forEach((topic) => watcherLoadingRSSContent.topics.push(topic));
      watcherLoadingRSSContent.feeds.push(feed);
      watcherLoadingRSSContent.addingCounter += 1;
    })
    .catch((e) => {
      console.log(e)
      watcherLoadingRSSContent.addingCounter = 0;
      throw new Error(e);
    });
};

export default handlerLoadingRSSContent;
