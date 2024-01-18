const swiper = new Swiper('.hero', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,

  // If we need pagination
  pagination: {
    el: '.hero__slider-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.hero__slider-arrow-next',
    prevEl: '.hero__slider-arrow-prev',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
});