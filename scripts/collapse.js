document.addEventListener('DOMContentLoaded', function () {
	const collapseItems = document.querySelectorAll('.collapse-item');

	collapseItems.forEach(item => {
		const questionBtn = item.querySelector('.collapse-question');

		questionBtn.addEventListener('click', () => {
			item.classList.toggle('active');
		});
	});
});