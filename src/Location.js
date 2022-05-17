/*global kakao*/
import React, { useEffect } from 'react'
import { markerdata } from "./data/markerData";

const Location = () => {
  useEffect(() => {
    const container = document.getElementById('location');

    const options = {
      // 초기값 동작구청 
      center: new kakao.maps.LatLng(37.512462244674055, 126.93936257789952),
      level: 5
    };
    const map = new kakao.maps.Map(container, options);

    /* 현재 위치 표시 */

    // function getCurrentPos() {
    //   navigator.geolocation.getCurrentPosition(function (pos) {
    //     let curLat = pos.coords.latitude, curLon = pos.coords.longitude;
    //     let curPos = new kakao.maps.LatLng(curLat, curLon);

    //     displayMarker(curPos);
    //   });

    //   function displayMarker(curPos){
    //     // const curMarker = new kakao.maps.Marker({
    //     //   map: map,
    //     //   position: curPos
    //     // });
    //     map.setCenter(curPos);
    //   }
    // }

    /* 데이터 보여주기 */
    // lat->latitude, lng->longitude, title->place

    let markers = [];

    markerdata.forEach((el) => {
      const marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(el.LATITUDE, el.LONGITUDE),
      });
      
      marker.setMap(map);
      markers.push(marker);
      
      let infowindow = new kakao.maps.InfoWindow({
        content: el.PLACE, // 인포윈도우에 표시할 내용
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
      <div id="location" style={{ width: "100%", height: "80vh" }}></div>
      <div className='MapControlView'>
        <div className='accessLocation'>
          <span className='screen_out'>현위치</span>
          <span className='coach_accessLocation'></span>
        </div>
      </div>
    </div>
  )
}

export default Location;

/*
  주소-좌표 변환 객체: 주소가 들어가면 좌표가 나오는건데 안쓸거같지만 유용해보여서
  const geocoder = new kakao.maps.services.Geocoder();
*/