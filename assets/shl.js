const setTopForMainNavigation = () => {
	const announcementBar = document.getElementById('shopify-section-announcement-bar');
	const mainNavigation = document.getElementById('shopify-section-header');
	if (announcementBar.offsetHeight > 0) {
		mainNavigation.style.top = (announcementBar.clientHeight - 1) + '.px';
	}
};
const initialCaroulsel = (content) => {
	const el = content.querySelector('.collection-carousel');
	const next = content.querySelector('.nav-next');
	const prev = content.querySelector(('.nav-prev'));
	new Glider(el, {
		slidesToShow: 2,
		slidesToScroll: 2,
		rewind: true,
		draggable: true,
		arrows: {
			prev: next,
			next: prev
		},
		responsive: [
			{
				// screens greater than >= 775px
				breakpoint: 775,
				settings: {
					// Set to `auto` and provide item width to adjust to viewport
					slidesToShow: 'auto',
					slidesToScroll: 'auto',
				}
			}, {
				// screens greater than >= 1024px
				breakpoint: 1024,
				settings: {
					slidesToShow: 5,
					slidesToScroll: 5,
				}
			}
		]
	});
};
window.onload = function () {
	setTopForMainNavigation();
	const tabsContainers = document.querySelectorAll(".collection-tabs");
	const collectionScrolling = document.querySelectorAll(".collection-scrolling");
	if (collectionScrolling) {
		collectionScrolling.forEach((content) => {
			initialCaroulsel(content);
		});
	}
	if (tabsContainers) {
		tabsContainers.forEach((tabsContainer) => {
			const tabsParent = tabsContainer.parentElement;
			const tabContents = tabsParent.querySelectorAll(".tab-content .tab-pane");
			const tabTogglers = tabsContainer.querySelectorAll("li a");
			if (tabTogglers) {
				initialCaroulsel(tabContents[0]);
				tabTogglers.forEach(el => el.addEventListener('click', (e) => {
					e.preventDefault();
					const tabName = el.getAttribute("href");
					tabContents.forEach((content) => {
						content.classList.remove("hidden");
						if ("#" + content.id !== tabName) {
							content.classList.add(('hidden'));
						} else {
							initialCaroulsel(content);
						}
					});
					tabTogglers.forEach((link) => {
						link.classList.remove('border-green-mist', 'text-green-mist');
						link.classList.add('border-orange-dark', 'text-orange-dark');
					});
					el.classList.remove('border-orange-dark', 'text-orange-dark');
					el.classList.add('border-green-mist', 'text-green-mist')
				}));
			};
		});
	}
	if (typeof INSTGRAM_TOKEN != 'undefined') {
		var feed = new Instafeed({
			accessToken: INSTGRAM_TOKEN,
			limit: 4,
			template: '<div class="w-full"><a class="animation" href="{{link}}"><img src="{{image}}" class="transition duration-150 ease-in-out" /></a></div>'
		});
		feed.run();
	}
};
window.addEventListener('resize', function (_event) {
	setTopForMainNavigation();
}, true);
