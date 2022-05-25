import Swiper, { Navigation } from "swiper";
import "swiper/scss";

const swiper = new Swiper(".scroller", {
  modules: [Navigation],
  wrapperClass: "scroller__list",
  slideClass: "scroller__item",
  slidesPerView: "auto",
  spaceBetween: 40,
  initialSlide: 1,
  loop: true,
  loopedSlides: 3,
  centeredSlides: true,

  navigation: {
    nextEl: ".scroller__controls__next",
  },

  // breakpoints: {
  //   // when window width is >= 320px
  //   320: {
  //     spaceBetween: 20,
  //   },
  //   480: {
  //     spaceBetween: 30,
  //   },
  //   640: {
  //     spaceBetween: 40,
  //   },
  // },
});
