document.addEventListener('DOMContentLoaded', function () {
	const form = document.getElementById('bookingForm');

	Inputmask({
		mask: '+7 (999) 999-99-99',
		showMaskOnHover: false,
		showMaskOnFocus: true,
		placeholder: ' ',
		clearIncomplete: true
	}).mask(document.getElementById('phone'));

	function showError(input, message) {
		const formGroup = input.closest('.form-group');
		const errorDiv = formGroup.querySelector('.error-message');
		input.classList.add('error');
		errorDiv.textContent = message;
		errorDiv.classList.add('show');
	}

	function hideError(input) {
		const formGroup = input.closest('.form-group');
		const errorDiv = formGroup.querySelector('.error-message');
		input.classList.remove('error');
		errorDiv.classList.remove('show');
		errorDiv.textContent = '';
	}

	function validateName(input) {
		const value = input.value.trim();
		if (value === '') {
			showError(input, 'Пожалуйста, укажите имя');
			return false;
		}
		if (value.length < 2) {
			showError(input, 'Имя должно содержать минимум 2 символа');
			return false;
		}
		if (!/^[А-Яа-яA-Za-z\s-]+$/.test(value)) {
			showError(input, 'Имя может содержать только буквы');
			return false;
		}
		hideError(input);
		return true;
	}

	function validateLastName(input) {
		const value = input.value.trim();
		if (value === '') {
			showError(input, 'Пожалуйста, укажите фамилию');
			return false;
		}
		if (value.length < 2) {
			showError(input, 'Фамилия должна содержать минимум 2 символа');
			return false;
		}
		if (!/^[А-Яа-яA-Za-z\s-]+$/.test(value)) {
			showError(input, 'Фамилия может содержать только буквы');
			return false;
		}
		hideError(input);
		return true;
	}

	function validateEmail(input) {
		const value = input.value.trim();
		const emailRegex = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/;

		if (value === '') {
			showError(input, 'Пожалуйста, укажите email');
			return false;
		}
		if (!emailRegex.test(value)) {
			showError(input, 'Введите корректный email (пример: name@domain.ru)');
			return false;
		}
		hideError(input);
		return true;
	}

	function validatePhone(input) {
		const value = input.value;
		const phoneRegex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;

		if (value === '') {
			showError(input, 'Пожалуйста, укажите телефон');
			return false;
		}
		if (!phoneRegex.test(value)) {
			showError(input, 'Введите полный номер телефона в формате +7 (XXX) XXX-XX-XX');
			return false;
		}
		hideError(input);
		return true;
	}

	form.addEventListener('submit', function (event) {
		event.preventDefault();
		event.stopPropagation();

		const firstName = document.getElementById('firstName');
		const lastName = document.getElementById('lastName');
		const email = document.getElementById('email');
		const phone = document.getElementById('phone');

		const isFirstNameValid = validateName(firstName);
		const isLastNameValid = validateLastName(lastName);
		const isEmailValid = validateEmail(email);
		const isPhoneValid = validatePhone(phone);

		if (isFirstNameValid && isLastNameValid && isEmailValid && isPhoneValid) {
			Swal.fire({
				title: 'Заявка отправлена',
				text: 'Спасибо! Мы свяжемся с Вами в ближайшее время для подтверждения брони.',
				confirmButtonText: 'Закрыть',
				confirmButtonColor: '#E8DFD4',
				background: '#FFFFFF',
			}).then(() => {
				form.reset();
				const phoneInput = document.getElementById('phone');
				phoneInput.value = '';
				Inputmask({
					mask: '+7 (999) 999-99-99',
					showMaskOnHover: false,
					showMaskOnFocus: true,
					placeholder: ' ',
					clearIncomplete: true
				}).mask(phoneInput);
			});
		} else {
			const firstError = document.querySelector('.form-group .error');
			if (firstError) {
				firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
			}
		}

		return false;
	});

	document.getElementById('firstName').addEventListener('input', function () {
		validateName(this);
	});
	document.getElementById('lastName').addEventListener('input', function () {
		validateLastName(this);
	});
	document.getElementById('email').addEventListener('input', function () {
		validateEmail(this);
	});
	document.getElementById('phone').addEventListener('input', function () {
		if (this.value.includes('_')) {
			hideError(this);
		} else {
			validatePhone(this);
		}
	});
});