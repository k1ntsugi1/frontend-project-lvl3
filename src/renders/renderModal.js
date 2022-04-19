const renderModal = (topics) => {
  console.log(topics);
  const viewedTopic = topics[topics.length - 1];
  const {
    description, link, title, childrenId,
  } = viewedTopic;

  const modalFade = document.querySelector('.modal');
  modalFade.id = `i${childrenId}`;

  const modalTitle = document.querySelector('.modal-title');
  modalTitle.textContent = title;

  const modaBody = document.querySelector('.modal-body');
  modaBody.textContent = description;

  const btnCheck = document.querySelector('[data-check]');
  if (btnCheck.hasAttribute('[data-link^="ht"]')) btnCheck.removeAttribute('[data-link^="ht"]');
  btnCheck.setAttribute('data-link', link);
};

export default renderModal;
