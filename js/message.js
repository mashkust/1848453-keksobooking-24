const isEscapeKey = (evt) => evt.key === 'Escape';

export const showAlert = (message) => {
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
};
