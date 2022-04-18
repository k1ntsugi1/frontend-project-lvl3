/* eslint-disable no-undef */
import { watcherValidationRssURL, watcherActivityButton, watcherLoadingRssContent } from './view/watchers';
import handlerButton from './handlers/handlerButton.js';
import handlerInput from './handlers/handlerInput.js';

const app = (state) => {
  const input = document.querySelector('#url-input');

  const watcherValidationRSSUrl = watcherValidationRssURL(state);
  const watcherLoadingRSSContent = watcherLoadingRssContent(state);
  const watcherActivityBtn = watcherActivityButton(state);

  handlerInput(watcherValidationRSSUrl, input);
  // eslint-disable-next-line max-len
  handlerButton(state, watcherValidationRSSUrl, watcherLoadingRSSContent, watcherActivityBtn, input);
};

export default app;
