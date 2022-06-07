import Services from "./Services";
import Popup from "./Popup";
import Order from "./Order";

// "Services" modal blocks
const services = new Services(
  document.querySelector("section.services > ul.services__list"),
  "li.services__item",
  "data-modal-link"
);
services.init();

// Mobile Menu
const menuMobile = new Popup(
  document.querySelectorAll(".menu__mobile"),
  document.querySelector("aside.side__menu"),
  document.querySelectorAll(".header__mobile"),
  [...document.querySelectorAll(".side__menu .menu__item a"), document.querySelector(".side__menu .close")]
);
menuMobile.init();

// Popup
const popup = new Popup(
  document.querySelectorAll("[data-popup=order]"),
  document.querySelector("section.popup"),
  document.querySelectorAll(".header__mobile")
);
popup.init();

// Form "Order"
const order = new Order(document.querySelector("form.form_order"), ["email", "phone"]);
order.init();
