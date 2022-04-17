/* eslint-disable no-undef */
import onChange from 'on-change';
import view from './view.js';
import handlerButton from './handlers/handlerButton.js';

const app = (state) => {
  const watcher = onChange(state, (path, validationStatus) => {
    if (path === watcher.resultOfValidation.isValid) {
      view(validationStatus, watcher.resultOfValidation.message);
    }
  });

  const input = document.querySelector('#url-input');
  input.focus();

  handlerButton(watcher, input);
};

export default app;
