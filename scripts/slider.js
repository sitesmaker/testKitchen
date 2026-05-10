document.addEventListener('DOMContentLoaded', function () {
	const swiperContainer = document.querySelector('.swiper-container');
	const slidesDesktop = parseInt(swiperContainer.dataset.swipeDesktop) || 3;
	const slidesMobile = parseInt(swiperContainer.dataset.swiperMobile) || 1;
	const slidesTablet = 2;

	let swiper = null;

	function initSwiper() {
		if (swiper) {
			swiper.destroy(true, true);
		}

		swiper = new Swiper(swiperContainer, {
			slidesPerView: slidesMobile,
			spaceBetween: 10,
			loop: true,
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},
			breakpoints: {
				0: {
					slidesPerView: slidesMobile,
					spaceBetween: 10,
				},
				480: {
					slidesPerView: 2,
					spaceBetween: 12,
				},
				768: {
					slidesPerView: slidesDesktop,
					spaceBetween: 16,
				},
			},
			speed: 800,
		});
	}

	initSwiper();

	let resizeTimeout;
	window.addEventListener('resize', function () {
		clearTimeout(resizeTimeout);
		resizeTimeout = setTimeout(initSwiper, 180);
	});
});