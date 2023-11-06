let center = [56.85271813179018, 60.57948786019621];

function init() {
  let map = new ymaps.Map("map-test", {
    center: center,
    zoom: 16,
    controls: ["routePanelControl"],
  });

  let control = map.controls.get("routePanelControl");
  let city = 'Екатеринбург';

  //   let location = ymaps.geolocation.get();

  //   location.then(function (res) {
  //     let locationText = res.geoObjects.get(0).properties.get("text");
  //     console.log(locationText);


  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  function success(pos) {
    const crd = pos.coords;

    console.log("Your coordinates is: ");
    console.log(`Latitude: ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters`);

    let reverseGeocoder = ymaps.geocode([crd.latitude, crd.longitude]);
    let locationText = null;
    reverseGeocoder.then(function (res) {
      let locationText = res.geoObjects.get(0).properties.get("text");
      console.log(locationText);
    });

    control.routePanel.state.set({
      type: 'masstransit',
      fromEnabled: true,
      from: locationText,
      toEnabled: true,
      to: `${city},`,
    });
    control.routePanel.options.set({
      types: {
        masstransit: true,
        pedestrian: true,
        taxi: true,
      },
    });
  }
  function error(err) {
    console.warn(`Error:( ${err.code}) : ${err.message}`);
  }

  navigator.geolocation.getCurrentPosition(success, error, options);

  //   });

  let placemark = new ymaps.Placemark(
    center,
    {
      balloonContentHeader: "Header Balloon",
      balloonContentBody: "Body balloon content",
      balloonContentFooter: "Footer balloon content",
    },
    {
      iconLayout: "default#image",
      iconImageHref: "https://cdn-icons-png.flaticon.com/512/9547/9547589.png ",
      iconImageSize: [20, 20],
      iconImageOffset: [0, 0],
    }
  );

  let placemark1 = new ymaps.Placemark(
    center,
    {
      balloonContent: `
        <div class="balloon">
            <div class="balloon__address">Яма ЕКБ</div>
            <div class="balloon__contacts">
            <a href = "tel: 79678347101">+79678347101<a/>
            </div>
        </div>
    
    
    `,
    },
    {
      iconLayout: "default#image",
      iconImageHref: "https://cdn-icons-png.flaticon.com/512/9547/9547589.png ",
      iconImageSize: [20, 20],
      iconImageOffset: [0, 0],
    }
  );

  map.controls.remove("geolocationControl"); // удаляем геолокацию
  map.controls.remove("searchControl"); // удаляем поиск
  map.controls.remove("trafficControl"); // удаляем контроль трафика
  map.controls.remove("typeSelector"); // удаляем тип
  map.controls.remove("fullscreenControl"); // удаляем кнопку перехода в полноэкранный режим
  map.controls.remove("zoomControl"); // удаляем контрол зуммирования
  map.controls.remove("rulerControl"); // удаляем контрол правил
  // map.behaviors.disable(['scrollZoom']); // отключаем скролл карты (опционально)

  map.geoObjects.add(placemark); //
  map.geoObjects.add(placemark1);

  // placemark1.balloon.open();
}

ymaps.ready(init);
