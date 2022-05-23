/*global kakao*/
import markerdata from "./data.js";
const container = document.getElementById('container-map');

const options = {
  // 초기값 서울시
  center: new kakao.maps.LatLng(37.55644462406969, 126.97812329831663),
  level: 7
};
const map = new kakao.maps.Map(container, options);

/* 데이터 보여주기 */

for (let i = 0; i < markerdata.length; i++) {
  let marker = new kakao.maps.Marker({
    map: map,
    position: new kakao.maps.LatLng(markerdata[i].LATITUDE, markerdata[i].LONGITUDE),
    clickable: true
  });

  let place = markerdata[i].PLACE;
  let address = markerdata[i].ADDRESS;
  let price = Math.round((markerdata[i].PRICE / (markerdata[i].MEMBER)) * 100 / 100);
  let link = markerdata[i].LINK;

  let iwcontent = '<div class="customoverlay">' +
    '  <a class="link" href=' + link + '>' +
    '    <p class="place">' + place + '</p>' +
    '  </a>' +
    '    <p class="address">' + address + '</p>' +
    '    <p class="price"> 1인 식대: ' + price + '</p>' +
    '</div>',
    iwRemovable = true;

  let infowindow = new kakao.maps.InfoWindow({
    content: iwcontent,
    removable: iwRemovable
  });

  kakao.maps.event.addListener(marker, 'click', makeClickListener(map, marker, infowindow));
}

function makeClickListener(map, marker, infowindow) {
  return function () {
    infowindow.open(map, marker);
  };
}

function panTo(inputValue) {
  // 이동할 위도 경도 위치를 생성합니다 
  var moveLatLon = new kakao.maps.LatLng(inputValue[0], inputValue[1]);
  map.setLevel(5);
  // 지도 중심을 부드럽게 이동시킵니다
  // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
  map.panTo(moveLatLon);
}

var click1 = document.querySelector('.select-1');
click1.addEventListener("change", (e) => {
  var location = click1.value;
  panTo(locationList[location - 1]);
});

const accessPos = document.getElementById('accessLocation');
accessPos.addEventListener('click', getCurrentPos);

function getCurrentPos() {
  navigator.geolocation.getCurrentPosition(function (position) {

    var lat = position.coords.latitude, lon = position.coords.longitude;

    var locPosition = new kakao.maps.LatLng(lat, lon);

    displayMarker(locPosition);
  });
}

function displayMarker(locPosition) {

  let marker = new kakao.maps.Marker({
    map: map,
    position: locPosition
  });

  map.setCenter(locPosition);
}

const locationList = [
  [37.49487667726306, 127.05648440449762],//강남구
  [37.552972208697476, 127.14308030693192],//강동구
  [37.634135561340166, 127.01776994286176],//강북구
  [37.56344435475896, 126.82687725535739],//강서구
  [37.476992859580214, 126.95125636280525],//관악구
  [37.54415230879632, 127.08346972396191],//광진구
  [37.49891296069053, 126.86728562972444],//구로구
  [37.46210633341603, 126.89357424120678],//금천구
  [37.659559258214394, 127.0710869993508],//노원구
  [37.66570096442262, 127.03881347115147],//도봉구
  [37.58943364991308, 127.05788617624526],//동대문구
  [37.50431028652004, 126.94861477849003],//동작구
  [37.557193694113366, 126.9096459500816],//마포구
  [37.578978811914716, 126.93570297112471],//서대문구
  [37.48442462780135, 127.02478975112187],//서초구
  [37.55693207930265, 127.04310292787203],//성동구
  [37.60342883286659, 127.02378732369858],//성북구
  [37.50827280557709, 127.1077240790639],//송파구
  [37.52676807047352, 126.86384239992468],//양천구
  [37.5235654862361, 126.90593076570009],//영등포구
  [37.533909953625404, 126.98964195927617],//용산구
  [37.61497680295177, 126.92611254927114],//은평구
  [37.585733987820994, 126.97958091816983],//종로구
  [37.561733104768145, 126.9941201500962],//중구
  [37.60011537590587, 127.09250088826505]//중랑구
];

