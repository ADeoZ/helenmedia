export default class Animations {
  constructor(elements) {
    this.elements = elements;

    // callbacks for animation types
    this.animationsClasses = {
      slidedown: (element) => this.addAnimationClass(element),
      countup: (element) => this.startCounter(element),
    };

    this.observerCallback = this.observerCallback.bind(this);
  }

  init() {
    this.observer = new IntersectionObserver(this.observerCallback, { rootMargin: "-15%" });
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
  addAnimationClass(element) {
    element.classList.add(`animations-${element.dataset.animation}`);
    element.style.animationDuration = `${element.dataset.animationDuration}s` || "";
    element.style.animationDelay = `${element.dataset.animationDelay}s` || "";
  }

  // animate count-up
  startCounter(element) {
    const endValue = element.innerText;
    element.style.width = `${element.offsetWidth}px`;
    this.addAnimationClass(element, "countup");
    element.innerText = "0";
    setTimeout(() => {
      this.animateIt(
        element.dataset.animationDuration * 1000 || 1500,
        (progress) => {
          element.innerText = Math.floor(parseInt(endValue) * progress);
        },
        () => {
          element.innerText = endValue;
          element.style.width = "";
        }
      );
    }, element.dataset.animationDelay * 1000 || 0);
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
