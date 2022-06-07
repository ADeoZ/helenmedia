export default class Popup {
  constructor(links, parent, shiftingElements = [], closingElements = []) {
    this.links = links;
    this.parent = parent;
    this.shiftingElements = shiftingElements;
    this.closingElements = closingElements;
    this.displayStyle = "flex";
    this.closeByEsc = this.closeByEsc.bind(this);
  }

  init() {
    // add listeners to links
    this.links.forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        this.openPopup();
      });
    });

    // add listener on closing to wrapper
    this.parent.addEventListener("click", (e) => {
      if (e.target === this.parent) this.closePopup();
    });

    // add listener on closing to all closing elements
    if (this.closingElements) {
      this.closingElements.forEach((element) => {
        element.addEventListener("click", () => this.closePopup());
      });
    }
  }

  openPopup() {
    if (this.opened) return;

    this.parent.style.display = this.displayStyle;
    this.shifting();
    document.querySelector("body").classList.add("body_popup");
    this.opened = true;

    // closing popup on Esc-key
    window.addEventListener("keydown", this.closeByEsc);
  }

  closePopup() {
    if (!this.opened) return;

    this.parent.style.display = "none";
    document.querySelector("body").classList.remove("body_popup");
    this.clearShift();
    window.removeEventListener("keydown", this.closeByEsc);

    this.opened = false;
  }

  closeByEsc(event) {
    if (event.key === "Escape" && this.opened) {
      event.preventDefault();
      this.closePopup();
    }
  }

  // prevention shifting because removing scrollbar
  shifting() {
    let marginSize = window.innerWidth - document.documentElement.clientWidth;
    if (marginSize) {
      document.documentElement.style.marginRight = marginSize + "px";
      this.shiftingElements.forEach((element) => (element.style.marginRight = marginSize + "px"));
    }
  }

  clearShift() {
    document.documentElement.style.marginRight = "";
    this.shiftingElements.forEach((element) => (element.style.marginRight = ""));
  }
}
