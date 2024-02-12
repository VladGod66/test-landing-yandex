//Скрипт горизонтального слайдера для секции participants

//Находим контейнер слайдера
const sliderImages = document.querySelector('.participant__box');
//Находим кнопку назад
const participantPrevButton = document.querySelector('.participant__prev-button');
//Находим кнопку вперёд
const participantNextButton = document.querySelector('.participant__next-button');
//Создаём массивоподобную коллекцию изображений участников
const participantSlides = sliderImages.querySelectorAll('img');
//Определяем интервал автоматического перелистывания слайдов
const interval = 4000000;
//Определяем количество изображений в массиве
let participantSlideCount = participantSlides.length;
if (window.screen.width >= 1366) {
  participantSlideCount = participantSlides.length/3;
}
//Создаём индекс активного слайда
let paticipantSlideIndex = 0;
//Создаём индекс направления перемещения (1-вперёд, 0-назад)
let paticipantDirectionIndex = 1;


//Функция перемещения флекса массива изображений в окне просмотра на заданное изображение
const paticipantsSlide = () => {
  //Определяем ширину видимой области слайдера в пикселях
  const imageWidth = sliderImages.clientWidth;
  //Рассчитываем сдвиг флекса массива изображений в пикселях
  const slideOffset = paticipantSlideIndex * imageWidth;
  //Сдвигаем флекс массива изображений на рассчитаное количество пикселей
  sliderImages.style.transform = `translateX(${-slideOffset}px)`;
  //Выводим в разметку номер текущего слайда
  document.querySelector('.participant__counter').textContent = paticipantSlideIndex+1;
}

//Функция смены направления перемещения слайдов при необходимости
const paticipantChangeDirection = (slideIndex) => {
  //Если активный слайд первый
  if (slideIndex == 0) {
    //Меняем направление на прямое
    paticipantDirectionIndex = 1;
  }
  //Если активный слайд последний
  if (slideIndex == participantSlideCount-1) {
    //Меняем направление на обратное
    paticipantDirectionIndex = 0;
  }
}

//Суперфункция смены слайда
const paticipantChangeSlide = (slideIndex) => {
  //Перезапускаем функцию для сдвига флекса массива изображений
  paticipantsSlide();
  //Запускаем функцию смены направления перемещения слайдов при необходимости
  paticipantChangeDirection(slideIndex);
}

//Функция перемещения слайдера на один слайд вперёд/назад
const paticipantsNextSlide = () => {
  //Если перемещение слайдов прямое
  if (paticipantDirectionIndex == 1) {
    //Увеличиваем индекс показываемого слайда
  paticipantSlideIndex++;
  //Если нет
  } else {
    //Уменьшаем индекс показываемого слайда
    paticipantSlideIndex--
  }
  //Запускаем суперфункцию смены слайда
  paticipantChangeSlide(paticipantSlideIndex);
}

//При загрузке окна сайта запускаем функцию слайдера
window.addEventListener('load', () => {
  paticipantsSlide();
});

//При увеличении размера вьюпорта до 1366px и выше переставляем слайдер в начальное положение
window.addEventListener('resize', () => {
  if (window.matchMedia('(min-width: 1366px)').matches) {
    paticipantSlideIndex = 0;
    paticipantChangeSlide(0);
    participantSlideCount = participantSlides.length/3;
    document.querySelector('.participant__count').textContent = participantSlideCount;
  } else {
      participantSlideCount = participantSlides.length;
      document.querySelector('.participant__count').textContent = participantSlideCount;
  }
});

//Выводим в разметку количество слайдов в слайдере
document.querySelector('.participant__count').textContent = participantSlideCount;

//Запускаем встроенную в браузер функцию автоматического перелистывания слайдов
setInterval(() => {paticipantsNextSlide()}, interval)


//При клике на кнопку вперёд
participantNextButton.addEventListener('click', () => {
  //Если активный слайд последний
  if (paticipantSlideIndex == participantSlideCount-1) {
    //То переходим к первому слайду
    paticipantSlideIndex = 0;
  } else {
    //Увеличиваем индекс нового активного слайда
    paticipantSlideIndex++;
  }
  //Запускаем суперфункцию смены слайда
  paticipantChangeSlide(paticipantSlideIndex);
});

//При клике на кнопку назад
participantPrevButton.addEventListener('click', () => {
  //Если активный слайд первый
  if (paticipantSlideIndex == 0) {
    //То переходим к последнему слайду
    paticipantSlideIndex = participantSlideCount-1;
  } else {
    //Уменьшаем индекс слайда на единицу
    paticipantSlideIndex--;
  }
  //Запускаем суперфункцию смены слайда
  paticipantChangeSlide(paticipantSlideIndex);
});
