
//Функция "бегущая строка"
const ticker = (selector, speed) => {
  const parentSelector = document.querySelector(selector);
  const clone = parentSelector.innerHTML;
  const firstElement = parentSelector.children[0];
  let i = 0;
  parentSelector.insertAdjacentHTML('beforeend', clone);
  parentSelector.insertAdjacentHTML('beforeend', clone);

  setInterval(() => {
    firstElement.style.marginLeft = `-${i}px`;
    if (i > firstElement.clientWidth) {
      i = 0;
    }
    i = i + speed;
  }, 0);
}

//При загрузке окна запускаем ,бегущую строку для двух селекторов
window.addEventListener('load', ticker('.header__ticker', 0.4));
window.addEventListener('load', ticker('.footer__ticker', 0.4))
