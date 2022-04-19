const handlerBtnsTopics = (watcherLoadingRssContent) => {
  Array.from(document.querySelectorAll('[data-bs-toggle="modal"]')).forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      console.log(e.target);
      const currentId = e.target.dataset.bsTarget;
      console.log(currentId, 'iddddddddddd');
      // eslint-disable-next-line max-len
      const currentTopic = watcherLoadingRssContent.topics.filter(({ childrenId }) => `#i${childrenId}` === currentId);
      watcherLoadingRssContent.uiState.viewedTopics.push(...currentTopic);
    });
  });
};

export default handlerBtnsTopics;
