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

// Popup
const popup = new Popup(
  document.querySelectorAll("[data-popup=order]"),
  document.querySelector("section.popup")
);
popup.init();

// Form "Order"
const order = new Order(document.querySelector("form.form_order"), ["email", "phone"]);
order.init();
