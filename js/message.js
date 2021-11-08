const ALERT_SHOW_TIME = 2000;

const isEscapeKey = (evt) => evt.key === 'Escape';

export const showAlert = (message) => {
  const alertContainer = document.createElement('section');
  const messageServer  = message.cloneNode(true);
  document.body.appendChild(alertContainer).appendChild(messageServer);
  const setPopupEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
    }
  };
  document.addEventListener('keydown',() => {
    setPopupEscKeydown;
    alertContainer.style.display = 'none';
  });
  document.addEventListener('click', () => {
    alertContainer.style.display = 'none';
  });
};

export const showAlertError = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'gray';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};
