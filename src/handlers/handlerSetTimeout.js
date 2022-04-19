// eslint-disable-next-line import/no-cycle
import handlerCheckingNewPostInResources from './handlerCheckingNewPostInResources.js';

const handlerSetTimeout = (watcherLoadingRSSContent, status) => {
  console.log('settedTimeout');
  if (watcherLoadingRSSContent.currentTimerID) watcherLoadingRSSContent.currentTimerID = null;
  if (status) {
    const idCorrectTimer = setTimeout(() => {
      handlerCheckingNewPostInResources(watcherLoadingRSSContent);
    }, 5000);
    watcherLoadingRSSContent.currentTimerID = idCorrectTimer;
    return;
  }

  const idWrongTimer = setTimeout(() => {
    handlerCheckingNewPostInResources(watcherLoadingRSSContent);
  }, 30000);
  watcherLoadingRSSContent.currentTimerID = idWrongTimer;
};

export default handlerSetTimeout;
