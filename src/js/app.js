const modal = document.querySelector('.modal');
const link = document.querySelector('.services__internet__link');
link.addEventListener('click', (e) => {
  e.preventDefault();
  // modal.classList.toggle('modal__animation');
  collapseJS(modal);
});

function collapseJS(modal) {
  const start = Date.now();
  const duration = 250;
  const targetElem = modal;

  if (modal.offsetHeight === 0) {
    modal.style.display = 'grid';
    const result = modal.offsetHeight;
    modal.style.height = '0px';
    requestAnimationFrame(function drawJS() {
      let progress = (Date.now() - start) / duration;
      progress = progress > 1 ? 1 : progress;
      targetElem.style.height = `${progress * result}px`;

      if (progress < 1) {
        requestAnimationFrame(drawJS);
      }
    });
  } else if (modal.style.display === 'grid') {
    const result = modal.offsetHeight;
    requestAnimationFrame(function drawJS() {
      let progress = (duration - (Date.now() - start)) / duration;
      progress = progress < 0 ? 0 : progress;
      targetElem.style.height = `${progress * result}px`;

      if (progress > 0) {
        requestAnimationFrame(drawJS);
      }
      if (progress === 0) {
        targetElem.style.display = 'none';
        targetElem.style.height = '';
      }
    });
  }
}
  