/* eslint-disable no-undef */
import handlerOfBtnFormSection from './handlers/btnFormSectionHandler.js';
import { handlerOfLinkOpeningBtn } from './handlers/modalHandlers.js';
import {
  watcherValidationRssURL, watcherActivityButton,
  watcherLoadingRssContent,
} from './view/watchers';

const app = (state) => {
  const input = document.querySelector('#url-input');

  const watcherValidationRSSUrl = watcherValidationRssURL(state);
  const watcherLoadingRSSContent = watcherLoadingRssContent(state);
  const watcherActivityBtn = watcherActivityButton(state);

  // eslint-disable-next-line max-len
  handlerOfLinkOpeningBtn();
  // eslint-disable-next-line max-len
  handlerOfBtnFormSection(state, watcherValidationRSSUrl, watcherLoadingRSSContent, watcherActivityBtn, input);
};

export default app;
