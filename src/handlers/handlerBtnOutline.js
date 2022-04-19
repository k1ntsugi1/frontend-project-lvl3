const handlerBtnsTopics = (watcherValidationRSSUrl) => {
  Array.from(document.querySelectorAll('[data-bs-toggle="modal"]')).forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const currentLink = e.dataset.bsTarget;
      // eslint-disable-next-line max-len
      const currentTopic = watcherValidationRSSUrl.topics.filter((topic) => topic.link === currentLink);
      
    });
  });
};
