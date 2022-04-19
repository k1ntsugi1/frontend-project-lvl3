import onChange from 'on-change';
import renderFeedback from '../renders/renderValid.js';
import buttonActivityRender from '../renders/buttonActivityRender.js';
import renderRssContent from '../renders/renderRssPosts.js';
import handlerSetTimeout from '../handlers/handlerSetTimeout.js';
import switchToDefaultValue from '../handlers/switchToDefaultValue.js';
import handlerBtnsTopics from '../handlers/handlerBtnOutline.js';
import renderModal from '../renders/renderModal.js';
import handlerLink from '../handlers/handlerLink.js';

const watcherValidationRssURL = (state) => {
  const watcher = onChange(state.resultOfValidationRssUrl, (path, validationStatus) => {
    console.log(state.feedbackMessage);
    if (validationStatus === null) return;
    renderFeedback(validationStatus, state.feedbackMessage);
    switchToDefaultValue(watcher, path);
  });
  return watcher;
};

const watcherActivityButton = (state) => {
  const watcher = onChange(state.process, (path, process) => buttonActivityRender(process));
  return watcher;
};

const watcherLoadingRssContent = (state) => {
  const watcher = onChange(state.resultOfLoadingRssContent, (path, value) => {
    console.log(path, value);
    switch (path) {
      case ('errorLoading'):
        console.log(watcher);
        if (value === true) {
          renderFeedback(false, state.feedbackMessage);
          switchToDefaultValue(watcher, path);
        }
        if (value === false) {
          renderRssContent(watcher, state.i18n);
          renderFeedback(true, state.feedbackMessage);
          handlerBtnsTopics(watcher);
          switchToDefaultValue(watcher, path);
          // eslint-disable-next-line max-len
          if (watcher.updatingTopics.currentTimerID === null) handlerSetTimeout(watcher, state, true);
        }
        break;
      case ('updatingTopics.errorUpdating'):
        if (value === true) {
          renderFeedback(false, state.feedbackMessage);
          handlerSetTimeout(watcher, state, false);
          switchToDefaultValue(watcher, path);
        }
        break;
      case ('updatingTopics.currentTimerID'):
        handlerSetTimeout(watcher, state, true);
        break;
      case ('uiState.viewedTopics'):
        renderModal(watcher.uiState.viewedTopics);
        // handlerLink();
        break;
      default:
        break;
    }
  });
  return watcher;
};

export {
  watcherValidationRssURL, watcherActivityButton,
  watcherLoadingRssContent,
};
