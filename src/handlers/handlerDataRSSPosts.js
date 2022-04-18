import axios from 'axios';
import parserRSS from '../parsers/parserRss';

const handlerDataRSSPosts = (watcherFillingDataForRss, resultOfValidation) => {
  watcherFillingDataForRss.process = 'loadingRss';

  const id = watcherFillingDataForRss.resources.length;
  watcherFillingDataForRss.resources.push({ id, value: resultOfValidation });

  const proxy = 'https://allorigins.hexlet.app/get?';
  axios.get(`${proxy}disableCache=true&url=${encodeURIComponent(resultOfValidation)}/`)
    .then((response) => parserRSS(response, id))
    .then((parsedRss) => {
      const { feed, flow } = parsedRss;
      watcherFillingDataForRss.feeds.push(feed);
      watcherFillingDataForRss.feeds.push(flow);
      watcherFillingDataForRss.process = 'renderingRSS';
    })
    .catch((e) => console.log(e));
};

export default handlerDataRSSPosts;
