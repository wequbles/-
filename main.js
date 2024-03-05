"use strict";

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
	},
	{passive: true});
});

function scrollTo(targetId) {
	document.querySelector(targetId).scrollIntoView({
		behavior: 'smooth'
	});
}

/* ripple эффект для кнопки */
function rippleEffect(event) {
	const button = event.currentTarget;
	const ripple = document.createElement('span');
	const rect = button.getBoundingClientRect();
	const size = Math.max(rect.width, rect.height);
	const x = event.clientX - rect.left - size / 2;
	const y = event.clientY - rect.top - size / 2;

	ripple.style.width = ripple.style.height = `${size}px`;
	ripple.style.left = `${x}px`;
	ripple.style.top = `${y}px`;

	ripple.classList.add('ripple');

	button.appendChild(ripple);

		ripple.addEventListener('animationend', () => {
			ripple.remove();
		});
};

const fixedButton = document.getElementById('fixed__btn');
setInterval(() => {
	rippleEffect({
		currentTarget: fixedButton,
		clientX: fixedButton.getBoundingClientRect().left + fixedButton.offsetWidth / 2,
		clientY: fixedButton.getBoundingClientRect().top + fixedButton.offsetHeight / 2,
	});
}, 4000);


document.querySelectorAll('.ripple_btn').forEach(button => {
	button.addEventListener('click', rippleEffect);
});

/* Переключатель кнопки связи */
const activeCont = document.getElementById('fixed');
const activeBtn = document.getElementById('fixed__btn');
activeBtn.addEventListener('click', () => {
	if (activeCont.getAttribute('data-active') == 'true') {
		activeCont.setAttribute('data-active', 'false');
	} else {
		activeCont.setAttribute('data-active', 'true');
	}
});
document.addEventListener('mouseover', (event) => {
	if (!activeCont.contains(event.target)) {
		activeCont.setAttribute('data-active', 'false');
	}
});

document.addEventListener('mouseout', (event) => {
	if (!activeCont.contains(event.target)) {
		activeCont.setAttribute('data-active', 'false');
	}
});

/* Кнопка "Показать еще" */
const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent); // Определяем платформу устройства
document.addEventListener('DOMContentLoaded', function() {
	const portfolioElement = document.getElementById('portfolio');
	const gridItems = portfolioElement.children;
	const showMoreButton = document.getElementById('showMoreButton');
	let itemsPerClick;
	if (isMobileDevice) {
		itemsPerClick = 3;
	} else {
		itemsPerClick = 8;
	}
	let visibleItems = itemsPerClick;

	for (let i = itemsPerClick; i < gridItems.length; i++) { // Скрыть все элементы, кроме первых itemsPerClick
		gridItems[i].style.display = 'none';
	}

	showMoreButton.addEventListener('click', function() {
		for (let i = visibleItems; i < visibleItems + itemsPerClick && i < gridItems.length; i++) {
			gridItems[i].style.display = 'block';
		}
		visibleItems += itemsPerClick;
		if (visibleItems >= gridItems.length) {
			showMoreButton.style.display = 'none';
		}
	});

	if (visibleItems >= gridItems.length) {
		showMoreButton.style.display = 'none'; // Скрыть кнопку, если больше нет элементов для отображения
	}
});

/* Копирование номера телефона */
const phoneNumberBlock = document.getElementById('phone_number');
const phoneNumber = phoneNumberBlock.getAttribute('data-phone-number');

phoneNumberBlock.addEventListener('click', function() {
	navigator.clipboard.writeText(phoneNumber) // Копируем номер телефона в буфер обмена
		.catch(error => {
			console.error('Ошибка копирования ' + error);
		});

	if (isMobileDevice) { // Если устройство мобильное, открываем приложение мобильного телефона
		window.location.href = `tel:${phoneNumber}`;
	} else {
		alert('Номер телефона скопирован');
	}
});