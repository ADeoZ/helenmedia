export default class Animations {
  constructor(elements) {
    this.elements = elements;

    this.animationsClasses = {
      slidedown: (element) => this.addAnimationClass(element, "slidedown"),
      countup: (element) => this.startCounter(element),
    };

    this.observerCallback = this.observerCallback.bind(this);
  }

  init() {
    this.observer = new IntersectionObserver(this.observerCallback, { threshold: 0.25 });
    this.elements.forEach((element) => this.observer.observe(element));
  }

  // callback for intersection observer
  observerCallback(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        this.animationsClasses[entry.target.dataset.animation](entry.target);
        observer.unobserve(entry.target);
      }
    });
  }

  // add animation css-class
  addAnimationClass(element, addClass) {
    element.classList.add(`animations-${addClass}`);
  }

  // animate count-up
  startCounter(element) {
    const endValue = element.innerText;
    element.style.width = `${element.offsetWidth}px`;
    this.addAnimationClass(element, "countup");
    element.innerText = "0";
    this.animateIt(
      1500,
      (progress) => {
        element.innerText = Math.floor(parseInt(endValue) * progress);
      },
      () => {
        element.innerText = endValue;
        element.style.width = "";
      }
    );
  }

  // async animation func
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
