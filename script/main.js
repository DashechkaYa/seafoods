"use strict";

// спочатку масив обєктів в яких записано те що змінюється на кожному слайді
const heroSlides = [
{
  id: 1,
  title: 'Die Revolution der Gewürze',
  description: 'Jeden Tag eine gute Tat. Mit unserem direkten Gewürzhandel kommt mehr Geld bei den Erzeuger*innen im Nahen Osten an und soziale Projekte in der Region erhalten 20% vom Umsatz. Zusammen machen wir den Unterschied!',
  color: '#363636',
  colorButton: '#3F3F3F',
  textButton: 'jtz welt retten!',
  image: '',
  option: [],
},
{
  id: 2,
  title: 'KORIANDER',
  description: 'Die blumige, frische Koriandersaat ist geschmacklich nicht mit dem Koriandergrün zu vergleichen. Perfekt um jedes deiner Pfannengerichte abzurunden.',
  color: '#E9CDB1',
  colorButton: '#DDC1A0',
  textButton: 'MEHR ERFAHREN', 
  image: '',
  option: [
    {name: 'HERKUNFT', value: 'SYRIEN'},
    {name: 'REGION', value: 'NAHER OSTEN'},
    {name: 'VERARBEITUNG', value: 'GESCHROTET'},
    {name: 'GESCHMACK', value: 'FRUCHTIG'},
  ],
},
{
  id: 3,
  title: 'KREUZ KÜMMEL',
  description: 'Die frische Schärfe des Kreuzkümmels ist fester Bestandteil der orientalischen Küche. Ob im Hummus oder Falafel, Kreuzkümmel ist eine Geschmacksreise in die Tiefe des Orients.',
  color: '#E9B79D',
  colorButton: '#E0AB90',
  textButton: 'MEHR ERFAHREN', 
  image: '',
  option: [
    {name: 'HERKUNFT', value: 'SYRIEN'},
    {name: 'REGION', value: 'NAHER OSTEN'},
    {name: 'VERARBEITUNG', value: 'GESCHROTET'},
    {name: 'GESCHMACK', value: 'FRUCHTIG'},
  ],
},
{
  id: 4,
  title: 'PAPRIKA',
  description: 'Unser fruchtig warmer Paprika bringt Sonne in deine Küche. Dieses Gewürz rundet viele Gerichte ab. Im Gulasch oder im Dip - Paprika bringt dir die nötige Wärme.',
  color: '#BA6969',
  colorButton: '#AE5E5E',
  textButton: 'MEHR ERFAHREN', 
  image: '',
  option: [
    {name: 'HERKUNFT', value: 'SYRIEN'},
    {name: 'REGION', value: 'NAHER OSTEN'},
    {name: 'VERARBEITUNG', value: 'PULVER'},
    {name: 'GESCHMACK', value: 'FRUCHTIG'},
  ],
}
];

// дістаємо пусті елементи html
const $hero = document.getElementById('hero');
const $heroTitle = document.getElementById('hero-title');
const $heroText = document.getElementById('hero-text');
const $heroButton = document.getElementById('hero-button');
const $heroColor = document.getElementById('hero-color');
const $heroPagination = document.getElementById('hero-pagination');
const $heroPrev = document.getElementById('hero-prev');
const $heroNext = document.getElementById('hero-next');

// в функції спочатку деструктуризуємо по ключам елемент масиву (обєкт); 
// далі записуємо в дата атрибут hero в html ІД обєкту з масиву (щоб фіксувати який слайд на сторінці зараз - потрібно для кнопок вперед/назад);
// також записуємо в змінні данні з обєкту цього масиву - це стає один слайд слайдеру
const renderSlide = function renderSlide ({
  id,
  title,
  description,
  color,
  colorButton,
  textButton,
  image,
  option,
}) {
  $hero.dataset.active = id;
  $heroColor.style.backgroundColor = color;
  $heroButton.style.backgroundColor = colorButton;
  $heroButton.innerText = textButton;

  // це анімація тесту та заголовку (частина тут, частина в css)
  $heroTitle.style.opacity = 0;
  $heroTitle.style.transform = 'translateY(-50%)';
  $heroText.style.opacity = 0;
  $heroText.style.transform = 'translateX(-50%)';
  setTimeout(() => {
    $heroTitle.style.opacity = 1;
    $heroTitle.style.transform = 'translateY(0)';
    $heroText.style.opacity = 1;
    $heroText.style.transform = 'translateX(0)';
    $heroTitle.innerText = title;
    $heroText.innerText = description;
  }, 500)
};

// функція створює динамічну пагінацію (що залежить від кількості слайдів): робимо змінну що === довжині масиву
// далі створюємо масив з цією кількістю елеметів і в кожен мепимо div з класом -item...
// потім в div що знаходимо в html додаємо всі ці елементи (нові div dots)
// викликаємо одразу цю ф одразу 1 раз
// викликаємо її аж в ф renderSlideFactory - яка виконується при натиску на книпки назад/вперед
const renderPagination = function renderPagination() {
  const size = heroSlides.length;
  const dots = [...new Array(size)].map(() => `<div class='hero__pagtination-item'></div>`).join('');
  $heroPagination.innerHTML = dots;
  console.log(new Array(4), [...new Array(4)]); // НЕ РОЗУМІЮ ???
};

renderPagination(); 

const changePagination = function changePagination(activeIdx) {
  [...$heroPagination.children].forEach((el, idx) => {
    if(idx === activeIdx) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  })
};

// функція нижче повертає нову функцію - для того що б далі присвоїти зміним які відповідають за кнопки вперед/назад (пояснення далі)
// в функції спочатку отримуємо ІД слайду з дата атрибуту hero (в ф вище записували його) + одразу перетвор в число;
// далі перевіряємо: якщо атрибут 1/2/3/4 то знаходимо його індекс (101р./це мб 0/1/2/3), далі знаходимо наступний індекс і перевіряємо його: 
// якщо він(nextIndex) дорівнює довжині масиву(4) то його індекс буде 0 (тобто зарендеремо перший слайд) інакше буде просто наступний індекс (наступний слайд - 106р.), або ж буде останній слайд якщо;
// якщо ж атрибута взагалі нема ще то одразу покажемо на сторінці перший слайд (113р.)
const renderSlideFactory = function renderSlideFactory(multiply) {
  return function() {
    const activeId = Number($hero.dataset.active);
    let nextIndex = 0;
  if(activeId) {
    const index = heroSlides.findIndex(({id}) => id === activeId);
    nextIndex = index + 1 * multiply;
    if(nextIndex === heroSlides.length && multiply > 0) {
      nextIndex = 0;
    }
    if(nextIndex === heroSlides.length && multiply < 0) {
      nextIndex = heroSlides.length - 1;
    }
    renderSlide(heroSlides[nextIndex]);
  } else {
  renderSlide(heroSlides[0]);
  }
  changePagination(nextIndex);
  }
}

// рішення про повернення ф із ф для того що б не дублювати код, адже все що відрізняє це multiply параметр який міняє знак (-/+);
const renderNextSlide = renderSlideFactory(1);
const renderPrevSlide = renderSlideFactory(-1);

// викликаємо цю функцію одразу один раз щоб показати той перший слайд
renderNextSlide();

// повісили обробники подій на кнопку "далі" з колбек функцією що написана вище
$heroNext.addEventListener('click', renderNextSlide);
$heroPrev.addEventListener('click', renderPrevSlide);