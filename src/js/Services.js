export default class Services {
  constructor(parent, linkItem, dataAttr) {
    this.parent = parent;
    this.dataAttr = dataAttr;
    this.links = this.parent.querySelectorAll(`a[${this.dataAttr}]`);
    this.linkListItemClass = linkItem;
    this.displayStyle = "grid";

    this.closeModal = this.closeModal.bind(this);
  }

  init() {
    // add listeners to links
    for (const link of this.links) {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        if (this.currentLink === link) {
          this.closeModal();
        } else {
          this.closeModal();
          this.currentLink = link;
          this.showModal();
        }
      });
    }
  }

  // open block
  showModal() {
    // get name of dataset variable from attribute
    const dataSetName = this.dataAttr
      .toLowerCase()
      .split("-")
      .slice(1)
      .map((a, i) => (i === 0 ? a : a.charAt(0).toUpperCase() + a.slice(1)))
      .join("");

    // get modal by link
    this.modal = this.parent.querySelector(`li.${this.currentLink.dataset[dataSetName]}`);

    // positioning modal block in list
    this.calcPosition(this.currentLink.closest(this.linkListItemClass)).after(this.modal);

    // show modal
    this.modal.querySelector("button.close").addEventListener("click", this.closeModal);
    this.modal.style.display = this.displayStyle;

    // animation
    const targetElem = this.modal;
    const result = this.modal.offsetHeight;
    this.modal.style.height = "0px";
    this.animateIt(150, (progress) => {
      targetElem.style.height = `${progress * result}px`;
    });

    window.scrollTo(0, this.modal.offsetTop - 150);
  }

  // close block
  closeModal() {
    if (!this.modal) return;

    // animation
    const targetElem = this.modal;
    const result = this.modal.offsetHeight;
    this.animateIt(
      200,
      (progress) => {
        targetElem.style.height = `${(1 - progress) * result}px`;
      },
      () => {
        targetElem.style.display = "none";
        targetElem.style.height = "";
      }
    );

    // remove links
    this.modal.querySelector("button.close").removeEventListener("click", this.closeModal);
    this.modal = null;
    this.currentLink = null;
  }

  // calculate position to insert block
  calcPosition(listItem) {
    let sibling = listItem.nextElementSibling;
    return !sibling || listItem.offsetTop !== sibling.offsetTop ? listItem : this.calcPosition(sibling);
  }

  // animation for opening and closing
  animateIt(duration, progressFunc, endFunc) {
    const start = Date.now();
    requestAnimationFrame(function drawJS() {
      let progress = (Date.now() - start) / duration;
      progress = progress > 1 ? 1 : progress;
      progressFunc && progressFunc(progress);
      if (progress < 1) {
        requestAnimationFrame(drawJS);
      } else {
        endFunc && endFunc();
      }
    });
  }
}
