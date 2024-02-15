"use strict";

// спочатку масив обєктів в яких записано те що змінюється на кожному слайді
const heroSlides = [
{
  id: 1,
  title: 'Die Revolution der Gewürze',
  description: 'Jeden Tag eine gute Tat. Mit unserem direkten Gewürzhandel kommt mehr Geld bei den Erzeuger*innen im Nahen Osten an und soziale Projekte in der Region erhalten 20% vom Umsatz. Zusammen machen wir den Unterschied!',
  color: '#363636',
  colorButton: '#3F3F3F',
  colorButtonHover: '#686868',
  textButton: 'jtz welt retten!',
  sliderArrowsColor: '#585858',
  sliderArrowsColorHover: '#747474',
  options: [],
},
{
  id: 2,
  title: 'KORIANDER',
  description: 'Die blumige, frische Koriandersaat ist geschmacklich nicht mit dem Koriandergrün zu vergleichen. Perfekt um jedes deiner Pfannengerichte abzurunden.',
  color: '#E9CDB1',
  colorButton: '#DDC1A0',
  colorButtonHover: '#e9d3bb',
  textButton: 'MEHR ERFAHREN', 
  sliderArrowsColor: '#efdcc9',
  sliderArrowsColorHover: '#f7eadd',
  options: [
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
  colorButtonHover:  '#e9bfab',
  textButton: 'MEHR ERFAHREN', 
  sliderArrowsColor: '#f2cebb',
  sliderArrowsColorHover: '#f8ded0',
  options: [
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
  colorButtonHover:  '#c27676',
  textButton: 'MEHR ERFAHREN', 
  sliderArrowsColor: '#d79c9c',
  sliderArrowsColorHover: '#e9bbbb',
  options: [
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
const $heroButtonText = document.getElementById('hero-button-text');
const $heroColor = document.getElementById('hero-color');
const $heroPagination = document.getElementById('hero-pagination');
const $heroPrev = document.getElementById('hero-prev');
const $heroNext = document.getElementById('hero-next');
const $heroImgs = document.getElementById('hero-imgs');
const $heroOptionBlock = document.getElementById('hero-option-block');
const $menuBurger = document.getElementById('menu-burger');
const $menuPopup = document.getElementById('menu-popup');
const $burgerCross = document.getElementById('burger-cross');


// в функції спочатку деструктуризуємо по ключам елемент масиву (обєкт); 
// далі записуємо в дата атрибут hero в html ІД обєкту з масиву (щоб фіксувати який слайд на сторінці зараз - потрібно для кнопок вперед/назад);
// також записуємо в змінні данні з обєкту цього масиву - це стає один слайд слайдеру
// передаємо деструктуровані параметри з об (який саме ел масиву) при виклику ф - далі в іншій ф що відповідає за те який слайд є активним
const renderSlide = function renderSlide ({
  id,
  title,
  description,
  color,
  colorButton,
  colorButtonHover,
  textButton,
  sliderArrowsColor,
  sliderArrowsColorHover,
  options
}) {
  $hero.dataset.active = id;
  $heroColor.style.backgroundColor = color;
  $heroButton.style.backgroundColor = colorButton;
  $heroButtonText.innerText = textButton;
  $heroNext.style.backgroundColor = sliderArrowsColor;
  $heroPrev.style.backgroundColor = sliderArrowsColor;

  // const $root = document.querySelector(':root');
  document.documentElement.style.setProperty('--slider-arrow-hover', sliderArrowsColorHover);

  // нижче додаємо колір при наведенні на кнопку - тег style в html перед кнопкою з !important що б перебити інші стилі
  const buttonHoverStyle = document.createElement('style');
  buttonHoverStyle.innerHTML = `
  .hero__button:hover {
    background-color: ${colorButtonHover} !important;
  }`;
  $heroButton.before(buttonHoverStyle)

  // це анімація тесту та заголовку (частина тут, частина в css); це можна було все записати в css і тут додавати/прибирати класи,  але коду менше не буде
  $heroTitle.style.opacity = 0;
  $heroTitle.style.transform = 'translateY(-50%)';
  $heroText.style.opacity = 0;
  $heroText.style.transform = 'translateX(-50%)';
  $heroOptionBlock.style.opacity = 0;
  setTimeout(() => {
    $heroTitle.style.opacity = 1;
    $heroTitle.style.transform = 'translateY(0)';
    $heroText.style.opacity = 1;
    $heroText.style.transform = 'translateX(0)';
    $heroTitle.innerText = title;
    $heroText.innerText = description;
    $heroOptionBlock.style.opacity = 1;
    $heroOptionBlock.innerHTML = options.map((option) => {   // тут option це обєкт масиву options (тобто це не є елементом html)
    return  `<li class="hero__option-column">
    <h4 class="hero__option-title">${option?.name}</h4>
    <p style="color: ${color};" class="hero__option-text">${option?.value}</p>
  </li>`;
    }).join('');
  }, 500)
};

$menuBurger.addEventListener('click', () => {
  $menuPopup.classList.add('active');
  document.body.style.overflow = 'hidden';
});

$burgerCross.addEventListener('click', () => {
  $menuPopup.classList.remove('active');
  document.body.style.overflow = '';
});

// ф нижче спочатку створює 2 класи -start та -end за доп параметрів (вони передаються при її виклику в наступній ф renderImages)
// далі в div обгортку цих картинок додаємо або видаляємо ці класи (класи що містять анімацію в css)
const animateImages = function animateImages($element, name, duration = 500) {
  const classNameStart = `${name}--start`;
  const classNameEnd = `${name}--end`;
  $element.classList.add(classNameStart);
  $element.classList.remove(classNameEnd);
  setTimeout(() => {
    $element.classList.remove(classNameStart);
    $element.classList.add(classNameEnd);
  }, duration);
};


// в ф нижче спочатку робимо масив з картинок що є в середині зарання знайденого елементу (обгортки цих картинок) за доп спред оператора
// далі проходимось по кожному елементу перевіряючи на активний індекс(що в параметрі ф - передаємо цей параметр в ф renderSlideFactory)
// і додаємо йому клас active (в css це робить картинку display: block з display: none) - 
// - робимо це з setTimeout через 500млс - щоб спочатку виконалась анімація а тільки потім зявилось нове фото (інакше воно з'являється ще до анімації)
// також одразу викликаємо ф анімацію для картинки що написана вище
const renderImages = function renderImages(activeIdx) {
  const heroImgs = [...$heroImgs.children];
  heroImgs.forEach((el, idx) => {
    setTimeout(() => {
      if(idx === activeIdx) {
        el.classList.add('hero__img--active');
      } else {
        el.classList.remove('hero__img--active');
      }
    }, 500)
  })
  animateImages($heroImgs, "hero__imgs", 500);
};

// одразу викликали що б зарендерити перше фото 
renderImages();

// функція створює динамічну пагінацію (що залежить від кількості слайдів): робимо змінну що === довжині масиву
// далі створюємо масив (за доп спред оператора - це масив з елементами undefined - це значить його можна перебирати) з цією кількістю елеметів і в кожен мепимо div з класом -item...
// потім в div обгортку що знаходимо в html додаємо всі ці елементи (нові div dots)
// викликаємо одразу цю ф одразу 1 раз
// затім викликаємо її аж в ф renderSlideFactory - яка виконується при натиску на кнопки назад/вперед
const renderPagination = function renderPagination() {
  const size = heroSlides.length;
  const dots = [...new Array(size)].map(() => `<div class='hero__pagtination-item'></div>`).join('');
  $heroPagination.innerHTML = dots;
};

// одразу викликали що б зарендерити на сторінку пагінацію
renderPagination(); 

// в ф нижче дістаємо вкладені div з пагінації (спочатку заспредевши в масив) і перебираємо їх (для цього і спредили)
// якщо індекс === атиивний індекс то додаємо клас active в цей дів; і навпаки видаляємо його коли інд !== інд активний
// робимо це окремою ф а не в ф вище (через ${} і ? :) для створення анімації (вся анімація в css)
// параметр в дужках передеємо при виклику - в ф renderSlideFactory () тобто при кожному кліку вперед/назад буде її виклик
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
// далі перевіряємо: якщо атрибут 1/2/3/4 то знаходимо його індекс (101р., це мб 0/1/2/3), далі знаходимо наступний індекс і перевіряємо його: 
// якщо він(currentIndex) дорівнює довжині масиву(4) то його індекс буде 0 (тобто зарендеремо перший слайд) інакше буде просто наступний індекс (наступний слайд - 106р.), або ж буде останній слайд якщо;
// якщо ж атрибута взагалі нема ще то одразу покажемо на сторінці перший слайд
const renderSlideFactory = function renderSlideFactory(multiply) {
  return function() {
    const activeId = Number($hero.dataset.active);  //  1id / 0idx
    let currentIndex = 0;
    let prevIndex = 0;
  if(activeId) {
    prevIndex = heroSlides.findIndex(({id}) => id === activeId); //  1id / 0idx
    currentIndex = prevIndex + 1 * multiply; 
    console.log('before if:', `current idx: ${currentIndex}`, `prev idx: ${prevIndex}`);
    if(!heroSlides[currentIndex] && multiply > 0) {
      currentIndex = 0;
    }
    if(currentIndex < 0) {
      currentIndex = heroSlides.length - 1;
    }
    renderSlide(heroSlides[currentIndex]);
    console.log('after if:', `current idx: ${currentIndex}`, `prev idx: ${prevIndex}`);
  } else {
  renderSlide(heroSlides[0]);
  }
  changePagination(currentIndex);
  renderImages(currentIndex);
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