import Swiper, { Navigation, Scrollbar, Pagination } from 'swiper';
Swiper.use([Navigation, Scrollbar, Pagination]);
const swiper = new Swiper('.comments__swiper', {

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    type: 'bullets',
  },
  navigation: {
    nextEl: '.comments__btn-next',
    prevEl: '.comments__btn-prev',
  },

  mousewheel: true,
  keyboard: true,
},
);
