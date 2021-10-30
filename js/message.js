const isEscapeKey = (evt) => evt.key === 'Escape';

const showAlert = (message) => {
  const alertContainer = document.createElement('section');
  const messageServer  = message.cloneNode(true);
  document.body.appendChild(alertContainer).appendChild(messageServer);
  const onPopupEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
    }
  };
  document.addEventListener('keydown',() => {
    onPopupEscKeydown;
    alertContainer.style.display = 'none';
  });
  document.addEventListener('click', () => {
    alertContainer.style.display = 'none';
  });
  document.querySelector('.error__button').addEventListener('click', () => {
    alertContainer.style.display = 'none';
  });
};
export { showAlert, isEscapeKey};
