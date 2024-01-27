"use strict";

const lightBtn = document.getElementById('light');
lightBtn.addEventListener('click', () => {
	if (lightBtn.getAttribute('data-light') == 'true') {
		lightBtn.setAttribute('data-light', 'false');
	} else {
		lightBtn.setAttribute('data-light', 'true');
	}
});

/* Прокручивание к контактам */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function (e) {
		e.preventDefault();
		const targetId = this.getAttribute('href');
		scrollTo(targetId);
	});

	anchor.addEventListener('touchstart', function (e) {
		e.preventDefault();
		const targetId = this.getAttribute('href');
		scrollTo(targetId);
	});
});

function scrollTo(targetId) {
	document.querySelector(targetId).scrollIntoView({
		behavior: 'smooth'
	});
}

/*  */

/* Копирование номера телефона */
const phoneNumberBlock = document.getElementById('phone_number');
const phoneNumber = phoneNumberBlock.getAttribute('data-phone-number');

phoneNumberBlock.addEventListener('click', function() {
	navigator.clipboard.writeText(phoneNumber) // Копируем номер телефона в буфер обмена
		.catch(error => {
			console.error('Ошибка копирования ' + error);
		});

	const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent); // Определяем платформу устройства
	if (isMobileDevice) { // Если устройство мобильное, открываем приложение мобильного телефона
		window.location.href = `tel:${phoneNumber}`;
	} else {
		alert('Номер телефона скопирован');
	}
});