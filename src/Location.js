/*global kakao*/
import React, { useEffect } from 'react'
import { markerdata } from "./data/markerData";

const Location = () => {
  useEffect(() => {
    const container = document.getElementById('location');
    const options = {
      center: new kakao.maps.LatLng(37.365264512305174, 127.10676860117488),
      level: 3
    };
    const map = new kakao.maps.Map(container, options);

    /* 
    주소-좌표 변환 객체: 주소가 들어가면 좌표가 나오는건데 안쓸거같지만 유용해보여서
    const geocoder = new kakao.maps.services.Geocoder();
    */

    markerdata.forEach((el) => {
      const marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(el.lat, el.lng),
      });

      let infowindow = new kakao.maps.InfoWindow({
        content: el.title, // 인포윈도우에 표시할 내용
      });

      // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록
      kakao.maps.event.addListener(
        marker,
        "mouseover",
        makeOverListener(map, marker, infowindow)
      );
      kakao.maps.event.addListener(
        marker,
        "mouseout",
        makeOutListener(infowindow)
      );
    });

    function makeOverListener(map, marker, infowindow) {
      return function () {
        infowindow.open(map, marker);
      };
    }

    function makeOutListener(infowindow) {
      return function () {
        infowindow.close();
      };
    }
  }, [])


  return (
    <div>
      <div id="location" style={{ width: "100%", height: "100vh" }}></div>
    </div>
  )
}

export default Location;