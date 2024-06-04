class TextSlideshow extends HTMLElement {
  constructor() {
    super();
    this.slidesContainer = this.querySelector('[data-text-slide-container]');
    this.slides = this.querySelectorAll('[data-text-slide]');
    this.hiddenSlides = this.querySelectorAll('[data-text-slide]:not(.active)');
    this.nextBtn = this.querySelector('button[name="next"]');
    this.previousBtn = this.querySelector('button[name="previous"]');
    this.pagination = this.querySelector('[data-text-slide-pagination]');
    this.handleSwipe = this.handleSwipe.bind(this);

    this.nextBtn.addEventListener('click', this.onButtonClick.bind(this));
    this.previousBtn.addEventListener('click', this.onButtonClick.bind(this));
    this.pagination.addEventListener('click', this.handlePagination.bind(this));

    // Prevent tabbing to links in hidden slides
    this.hiddenSlides.forEach(hiddenSlide => this.setLinkTabIndex(hiddenSlide, '-1'));

    // Swipe navigation on mobile
    this.slidesContainer.addEventListener('touchstart', e => {
      if (!this.isMobile()) return;
      this.swipeStart = e.changedTouches[0].screenX;
    });
    this.slidesContainer.addEventListener('touchend', e => {
      if (!this.isMobile()) return;
      this.swipeEnd = e.changedTouches[0].screenX;
      this.handleSwipe();
    });
    this.slidesContainer.addEventListener('mousedown', e => {
      if (!this.isMobile()) return;
      this.swipeStart = e.screenX;
    });
    this.slidesContainer.addEventListener('mouseup', e => {
      if (!this.isMobile()) return;
      this.swipeEnd = e.screenX;
      this.handleSwipe();
    });

    // Scroll to slide when block selected in theme editor
    if (window.Shopify.designMode) {
      document.addEventListener('shopify:block:select', this.handleBlockSelect.bind(this));
    }
  }

  onButtonClick(e) {
    const currentSlideIndex = +this.slidesContainer.querySelector('.active').dataset.textSlide;
    const activeSlideIndex = e.currentTarget.name == 'next' ? currentSlideIndex + 1 : currentSlideIndex - 1;
    this.setActiveSlide(activeSlideIndex);
  }

  handlePagination(e) {
    const activeSlideIndex = +e.target.dataset.paginationBtn;
    if (activeSlideIndex >= 0) this.setActiveSlide(activeSlideIndex);
  }

  setActiveSlide(slideIndex) {
    this.currentSlide = this.slidesContainer.querySelector('.active');
    this.currentSlide.classList.remove('active');
    this.setLinkTabIndex(this.currentSlide, '-1');

    this.activeSlide = this.slidesContainer.querySelector(`[data-text-slide="${slideIndex}"]`);
    this.activeSlide.classList.add('active');
    this.setLinkTabIndex(this.activeSlide, '0');

    this.displayButtons(slideIndex);
    this.displayPagination(slideIndex);
  }

  displayButtons(slideIndex) {
    if (slideIndex == 0) {
      this.hideButton(this.previousBtn);
    } else {
      this.showButton(this.previousBtn);
    }
    
    if (slideIndex == this.slides.length - 1) {
      this.hideButton(this.nextBtn);
    } else {
      this.showButton(this.nextBtn);
    }
  }

  hideButton(btn) {
    btn.disabled = true;
    btn.setAttribute('aria-hidden', true);
    btn.setAttribute('tabindex', '-1');
  }

  showButton(btn) {
    btn.disabled = false;
    btn.setAttribute('aria-hidden', false);
    btn.setAttribute('tabindex', '0');
  }

  displayPagination(slideIndex) {
    this.currentPagination = this.pagination.querySelector('.active');
    this.currentPagination.classList.remove('active');

    this.activePagination = this.pagination.querySelector(`[data-pagination-btn="${slideIndex}"]`);
    this.activePagination.classList.add('active');
  }

  setLinkTabIndex(slide, tabIndex) {
    const slideLinks = slide.querySelectorAll('a');
    if (slideLinks.length) {
      slideLinks.forEach(slideLink => slideLink.setAttribute('tabindex', tabIndex));
    }
  }

  handleSwipe() {
    const currentSlideIndex = +this.slidesContainer.querySelector('.active').dataset.textSlide;
    const swipedLeft = this.swipeEnd < this.swipeStart;
    const swipedRight = this.swipeEnd > this.swipeStart;
    const isNotLastSlide = currentSlideIndex != this.slides.length - 1;
    const isNotFirstSlide = currentSlideIndex != 0;

    if (swipedLeft && isNotLastSlide) this.setActiveSlide(currentSlideIndex + 1);
    if (swipedRight && isNotFirstSlide) this.setActiveSlide(currentSlideIndex - 1);
  }

  handleBlockSelect(e) {
    const slideIndex = e.target.dataset.textSlide;
    if (slideIndex) this.setActiveSlide(slideIndex);
  }

  isMobile() {
    return window.matchMedia('only screen and (max-width: 768px)').matches;
  }
}

customElements.define('text-slideshow', TextSlideshow);
