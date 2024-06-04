var isDefined = customElements.get('blog-nav-banner');

if (!isDefined) {
  class BlogNavBanner extends HTMLElement {
    constructor() {
      super();

      this.navWrapper = document.querySelectorAll('blog-nav-banner');

      this.navWrapper.forEach((element, index) => {
        let navExpand = element.querySelector(`.nav-expand`);
        let navCollapse = element.querySelector(`.nav-collapse`);
        let expandedContent = element.querySelector('.banner-links--mobile-expanded');
        let collapsedContent = element.querySelector('.banner-links--mobile-collapsed');

        if (navExpand) {
          this.handleClick('expand', navExpand, expandedContent, collapsedContent);
        }

        if (navCollapse) {
          this.handleClick('collapse', navCollapse, expandedContent, collapsedContent);
        }
      });
    }

    handleClick(actionType, navType, expandedContent, collapsedContent) {
      if (actionType == 'expand') {
        navType.addEventListener('click', (event) => {
          event.preventDefault();
          expandedContent.style.display = 'flex';
          collapsedContent.style.display = 'none';
        });
      } else if (actionType == 'collapse') {
        navType.addEventListener('click', (event) => {
          event.preventDefault();
          expandedContent.style.display = 'none';
          collapsedContent.style.display = 'flex';
        });
      }
    }
  }

  customElements.define('blog-nav-banner', BlogNavBanner);
}
