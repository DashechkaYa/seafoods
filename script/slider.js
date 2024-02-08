

const initSider = function initSider() {
  // дістаємо h2 з блоку зі свайпером (по ньому будемо вичисляти скільки відстань між вікном браузеру і контейнером) -
  // - що б задати гнучку відстань в параметрі свайперу slidesOffsetBefore)
  const containerOffsetSize = document.getElementById('container-offset-size'); 

  // у знайденого елементу дізнаємося цю відстань - точку координат лівого краю елементу - це і є початок контейнеру і це змінна що якраз відповідає за відступ зліва у слайдера (згідно документації)
  const slidesOffsetBefore = containerOffsetSize.getBoundingClientRect().left;

  // ф що повертає слайдер що зарання встановлений з бібліотеки (прибрали його зі змінної - що б зробити ретьорн)
  return new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
 
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },
 
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button__next',
      prevEl: '.swiper-button__prev',
    },
 
    // робить так що б слайди йшли один за одним на одній сторінці одразу, а не кожен з нової
    slidesPerView: 'auto',
 
    // це як gap у слайдера - відстань між слайдами
    spaceBetween: 40,
 
    // відступ зліва до всього слайдеру
    slidesOffsetBefore
  });
}

let slider = initSider();

// цей обробник існує що б відловлювати всі зміни ширини браузера - і кожен раз перезапускати цей слайдер - 
// - що б відстань до нього зліва була як і у контейнера
window.addEventListener('resize', () => {
  slider.destroy();  // ця ф згідно документації видаляє екземпляр слайдера (старий)
  slider = initSider(); // викликаємо нашу ф що повертає слайдер заново
});