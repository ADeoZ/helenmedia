export default class Popup {
  constructor(links, parent) {
    this.links = links;
    this.parent = parent;
    this.displayStyle = "flex";
    this.closeByEsc = this.closeByEsc.bind(this);
  }

  init() {
    // add listeners to links
    for (const link of this.links) {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        this.openPopup();
      });
    }

    // add listener on closing to wrapper
    this.parent.addEventListener("click", (e) => {
      if (e.target === this.parent) this.closePopup();
    });
  }

  openPopup() {
    if (this.opened) return;

    this.parent.style.display = this.displayStyle;

    // prevention shifting because removing scrollbar
    let marginSize = window.innerWidth - document.documentElement.clientWidth;
    if (marginSize) {
      document.documentElement.style.marginRight = marginSize + "px";
    }
    document.querySelector("body").classList.add("body_popup");

    this.opened = true;

    // closing popup on Esc-key
    window.addEventListener("keydown", this.closeByEsc);    
  }

  closePopup() {
    if (!this.opened) return;

    this.parent.style.display = "none";
    document.querySelector("body").classList.remove("body_popup");
    document.documentElement.style.marginRight = "";
    window.removeEventListener("keydown", this.closeByEsc); 

    this.opened = false;
  }

  closeByEsc(event) {
    if (event.key === 'Escape' && this.opened) {
      event.preventDefault();
      this.closePopup();
    }
  }
}
