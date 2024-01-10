"use strict";

/* Прокручивание к контактам */
const anchors = document.querySelectorAll('a[href*==#"]')
for (let anchor of anchors) {
anchor.addEventListener("click", function(event) { event. preventDefault();
const blockID = anchor.getAttribute("href")
document.query5elector(** + blockID).scrollIntoView({
behavior: "smooth",
blockt "start"
})
})
}

/* Копирование номера телефона */
const phoneNumberBlock = document.getElementById('phone_number');
const phoneNumber = phoneNumberBlock.getAttribute('data-phone-number');

phoneNumberBlock.addEventListener('click', function() {
	navigator.clipboard.writeText(phoneNumber) // Копируем номер телефона в буфер обмена
		.then(() => {
			alert('Номер телефона скопирован'); // При необходимости выводим сообщение об успешном копировании
		})
		.catch(error => {
			console.error('Ошибка копирования ' + error);
		});

	const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent); // Определяем платформу устройства
	if (isMobileDevice) { // Если устройство мобильное, открываем приложение мобильного телефона
		window.location.href = `tel:${phoneNumber}`;
	}
});

/* YMap settings */
const LOCATION = {
	center: [37.65284277869125,55.73873495100129],
	zoom: 18,
	mode: 'vector'
};

const POINTS = [
	{
		coordinates: LOCATION.center,
		//color: '#339593',
		title: '<strong>Родной<strong>',
		subtitle: 'пн – вс <br>10:00 – 22:00',
		draggable: false
	}
];

window.map = null;

main();
async function main() {
	await ymaps3.ready;
	const {
		YMap,
		YMapDefaultSchemeLayer,
		YMapMarker,
		YMapControls,
		YMapDefaultFeaturesLayer,
		YMapControlButton,
		YMapCollection,
		YMapTileDataSource,
		YMapPlacemark
	} = ymaps3;

	const {YMapZoomControl, YMapGeolocationControl} = await ymaps3.import('@yandex/ymaps3-controls@0.0.1');
	const {YMapOpenMapsButton} = await ymaps3.import('@yandex/ymaps3-controls-extra');
	const {YMapDefaultMarker} = await ymaps3.import('@yandex/ymaps3-markers@0.0.1');

	map = new YMap(document.getElementById('map'), {location: LOCATION});

	map.addChild(new ymaps3.YMapDefaultSchemeLayer({theme: 'light', visible: true, source: 'scheme'}));
	map.addChild(new YMapDefaultFeaturesLayer());
	map.addChild(new YMapControls({position: 'bottom left'}).addChild(new YMapOpenMapsButton({})));
	map.addChild(new YMapControls({position: 'right'}).addChild(new YMapZoomControl({})));
	map.addChild(new YMapControls({position: 'bottom right'}).addChild(new YMapGeolocationControl({})));

	const button = new YMapControlButton({
		text: 'Родной',
		onClick: () => {
			map.setLocation({
				center: [37.65284277869125,55.73873495100129],
				zoom: 18,
				duration: 1000
			});
		}
	})
	map.addChild(new YMapControls({position: 'top right'}).addChild(button));

	// кастомная метка
	// const el = document.createElement('img');
	// el.className = 'my-marker';
	// el.src = '../img/pin.svg';
	// el.onclick = () => map.update({location: {...LOCATION, duration: 400}});
	// map.addChild(new YMapMarker({coordinates: LOCATION.center}, el));

	POINTS.forEach((point) => {
		if (point.element) {
			map.addChild(new YMapMarker(point, point.element(point)));
		} else {
			map.addChild(new YMapDefaultMarker(point));
		}
	});

	function tiltCamera(angle) {
		map.update({
			camera: {
				azimuth: map.azimuth,
				tilt: map.tilt + angle,
				duration: 1000
			}
		});
	}

	function rotateCamera(angle) {
		map.update({
			camera: {
				azimuth: map.azimuth + angle,
				tilt: map.tilt,
				duration: 500
			}
		});
	}

	let is3DMode = false;

	const button_3d = new YMapControlButton({
		text: '3D',
		onClick: () => {
			if (is3DMode) {
				button_3d.update({ text: '3D' });
				map.update({
					camera: {
						azimuth: 0,
						tilt: 0,
						duration: 500
					}
				});
			} else {
				button_3d.update({ text: '2D' });
				map.update({
					camera: {
						azimuth: 2.7,
						tilt: 1,
						duration: 500
					}
				});
			}
			is3DMode = !is3DMode;
		}
	});

	map.addChild(new YMapControls({position: 'top left'}).addChild(button_3d));
}