//Скрипт горизонтального слайдера для секции stages

//Находим контейнер слайдера
const sliderBox = document.querySelector('.slider__box');
//Находим кнопку назад
const prevButton = document.querySelector('.slider-nav__prev-button');
//Находим кнопку вперёд
const nextButton = document.querySelector('.slider-nav__next-button');
//Создаём массивоподобную коллекцию классов точек индикатора
const dots = document.querySelectorAll('.nav__dot');
//Создаём массив из найденных в контейнере слайдера карточек
const slides = sliderBox.querySelectorAll('.slider__card');
//Определяем количество карточек в массиве
const slideCount = slides.length-4;
//Создаём индекс активного слайда
let slideIndex = 0;
//Создаём индекс направления перемещения (1-вперёд, 0-назад)
let directionIndex = 1;
//Создаём индекс активной точки индикатора
let dotIndex = 0;

//Функция перемещения флекса массива изображений в окне просмотра на заданное изображение
const slide = () => {
  //Определяем ширину видимой области слайдера в пикселях
  const imageWidth = sliderBox.clientWidth;
  //Рассчитываем сдвиг флекса массива изображений в пикселях
  const slideOffset = slideIndex * imageWidth;
  //Сдвигаем флекс массива изображений на рассчитаное количество пикселей
  sliderBox.style.transform = `translateX(${-slideOffset}px)`;
}

//Функция смены активной точки индикатора
const thisSlide = (index) => {
  //Для каждого класса slider__dot в псевдомассиве dots
  for (let nav__dot of dots) {
    //Удаляем класс активной точки индикатора
    nav__dot.classList.remove('nav__dot--active')
  }
  //Добавляем класс активной точки индикатора классу с заданным индексом в псевдомассиве
  dots[index].classList.add('nav__dot--active')
}

//Функция смены направления перемещения слайдов при необходимости
const changeDirection = (slideIndex) => {
  //Если активный слайд первый
  if (slideIndex == 0) {
    //Меняем направление на прямое
    directionIndex = 1;
  }
  //Если активный слайд последний
  if (slideIndex == slideCount-1) {
    //Меняем направление на обратное
    directionIndex = 0;
  }
}

//Суперфункция смены слайда
const changeSlide = (slideIndex) => {
  //Перезапускаем функцию для сдвига флекса массива изображений
  slide();
  //Перезапускаем функцию для смены активной точки индикатора
  thisSlide(slideIndex);
  //Запускаем функцию смены направления перемещения слайдов при необходимости
  changeDirection(slideIndex);
}

//Функция перемещения слайдера на один слайд вперёд/назад
const nextSlide = () => {
  //Если перемещение слайдов прямое
  if (directionIndex == 1) {
    //Увеличиваем индекс показываемого слайда
  slideIndex++;
  //Если нет
  } else {
    //Уменьшаем индекс показываемого слайда
    slideIndex--
  }
  //Запускаем суперфункцию смены слайда
  changeSlide(slideIndex);
}

//При загрузке окна сайта запускаем слайдер
window.addEventListener('load', () => {
  slide();
});

//При увеличении размера вьюпорта до 1366px и выше переставляем слайдер в начальное положение
window.addEventListener('resize', () => {
  if (window.matchMedia('(min-width: 1366px)').matches) {
    slideIndex = 0;
    changeSlide(0);
  }
});

//При клике на кнопку вперёд
nextButton.addEventListener('click', () => {
  //Если активный слайд последний
  if (slideIndex == slideCount-1) {
    //То остаёмся на последнем
    slideIndex = slideCount-1;
    //Добавляем класс неактивной кнопки
    nextButton.classList.add('slider-nav__next-button--disable');
  } else {
    //Увеличиваем индекс нового активного слайда
    slideIndex++;
    //Убираем класс неактивной противоположной кнопки
    prevButton.classList.remove('slider-nav__prev-button--disable');
  }
  //Запускаем суперфункцию смены слайда
  changeSlide(slideIndex);
});

//При клике на кнопку назад
prevButton.addEventListener('click', () => {
  //Если активный слайд первый
  if (slideIndex == 0) {
    //То остаёмся на первом
    slideIndex = 0;
    //Добавляем класс неактивной кнопки
    prevButton.classList.add('slider-nav__prev-button--disable');
  } else {
    //Уменьшаем индекс слайда на единицу
    slideIndex--;
    //Убираем класс противоположной неактивной кнопки
    nextButton.classList.remove('slider-nav__next-button--disable');
  }
  //Запускаем суперфункцию смены слайда
  changeSlide(slideIndex);
});

//Колбэк функция переключения слайдера на кликнутую позицию в индикаторе
//Для каждого элемента массивоподобной коллекции точек индикатора
dots.forEach((slider__dot, index) => {
  //При клике на любую точку индикатора получаем индекс кликнутой точки
  slider__dot.addEventListener('click', () => {
    //Присваеваем индексу слайда индекс кликнутой точки
    slideIndex = index;
    //Убираем класс возможно неактивных кнопок
    nextButton.classList.remove('slider-nav__next-button--disable');
    prevButton.classList.remove('slider-nav__prev-button--disable');
    //Запускаем суперфункцию смены слайда
    changeSlide(slideIndex);
  })
})
