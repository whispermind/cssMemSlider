class Slider {
  position = 0;
  constructor(elem) {
    this.slider = elem;
    this.container = elem.querySelector('div:first-child');
    this.controls = document.querySelector('.slider > div:last-child');
    this.items = this.container.querySelectorAll('div');
    this.description = document.querySelector('.controls > div:last-child');

    this.controls.addEventListener('click', (event) => {
      const thumbContainer = event.target.closest('.thumb-container');
      if (!thumbContainer) return
      this.container.style.transition = 'transform 1s ease-in-out';
      this.position = thumbContainer.dataset.position;
      this.sliderMove();
      this.descriptionReplace();
      this.changeActive(thumbContainer.querySelector('.thumb'));
    });

    window.addEventListener('resize', () => {
      this.container.style.transition = 'none';
      this.sliderMove()
    });
  }
  sliderMove() {
    this.container.style.transform = `translate(-${this.position * getComputedStyle(this.container).width.match(/\d+\.?\d*/)[0]}px)`;
  }
  descriptionReplace() {
    this.description.style.opacity = 0;
    this.description.addEventListener('transitionend', (event) => {
      this.description.textContent = this.items[this.position].dataset.description;
      this.description.style.opacity = '';
    }, { once: true });
  }
  changeActive(thumb) {
    document.querySelector('.thumb-active').classList.remove('thumb-active');
    thumb.classList.add('thumb-active');
  }
}
let slider = new Slider(document.querySelector('.slider'));