import placemarkImage from '../img/static/yandexmap-placemark.svg';

function init() {
  const coords = [55.784720005752, 37.67216091534409]; // координаты точки

  let map = new ymaps.Map("yandex-map", {
    center: coords,
    zoom: 16,
  });

  // Метка
  let placemark = new ymaps.Placemark(
    coords,
    {
      hintContent: "Helen Media Agency", // подпись в подсказке
    },
    {
      iconLayout: "default#image",
      iconImageHref: placemarkImage,
      iconImageSize: [130, 130],
      iconImageOffset: [-35, -105],
    }
  );
  map.geoObjects.add(placemark);

  map.controls.remove("geolocationControl"); // удаляем геолокацию
  map.controls.remove("searchControl"); // удаляем поиск
  map.controls.remove("trafficControl"); // удаляем контроль трафика
  map.controls.remove("typeSelector"); // удаляем тип
  map.controls.remove("fullscreenControl"); // удаляем кнопку перехода в полноэкранный режим
  // map.controls.remove('zoomControl'); // удаляем контрол зуммирования
  map.controls.remove("rulerControl"); // удаляем контрол правил
  map.behaviors.disable(["scrollZoom"]); // отключаем скролл карты (опционально)
}

ymaps.ready(init);