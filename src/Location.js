/*global kakao*/
import React, { useEffect, useState } from 'react'
import { markerdata } from "./data/markerData";
import { locals } from "./data/locals";

const Location = () => {
  useEffect(() => {
    const container = document.getElementById('location');
    const options = {
      // 초기값 동작구청 
      center: new kakao.maps.LatLng(37.512462244674055, 126.93936257789952),
      level: 5
    };
    const map = new kakao.maps.Map(container, options);
    let markers = [];

    addMarker();
    
    /* 데이터 보여주기 */
    function addMarker() {
      markerdata.동작구.forEach((el) => {
        const marker = new kakao.maps.Marker({
          position: new kakao.maps.LatLng(el.LATITUDE, el.LONGITUDE),
        });

        marker.setMap(map);
        markers.push(marker);

        let infowindow = new kakao.maps.InfoWindow({
          content: el.PLACE, // 인포윈도우에 표시할 내용
        });

        // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록
        kakao.maps.event.addListener(marker, 'click', function () {
          infowindow.setContent('<div style="padding:5px;font-size:12px;">' + el.PLACE + '</div>');
          infowindow.open(map, marker);
          //console.log(where);
        });

        kakao.maps.event.addListener(marker, "mouseout", function () {
          infowindow.close();
        });
      });
    }


    // function displayMarker(places){
    //   let order = document.getElementsByClassName('select-1').
    // }

    // function addMarker(position){
    //   const marker = new kakao.maps.Marker({
    //     position: position
    //   });

    //   marker.setMap(map);
    //   markers.push(marker);

    //   return marker;
    // }

    // function removeMarker(){
    //   for(let i=0; i<markers.length; i++){
    //     markers[i].setMap(null);
    //   }
    //   markers = [];
    // }

    /* 현재 위치 표시*/
    // function getCurrentPos() {
    //   navigator.geolocation.getCurrentPosition(function (pos) {
    //     let curLat = pos.coords.latitude, curLon = pos.coords.longitude;
    //     const curPos = {
    //       center: new kakao.maps.LatLng(curLat, curLon),
    //       level: 5
    //     };
    //     const curMap = new kakao.maps.Map(container, curPos);
    //     map.center(curMap);
    //   });
    // }

  }, [])

  function CurrentPos(props) {
    return (
      <div className='MapControlView' onClick={() => props.getCurrentPos()}>
        <div className='accessLocation'>
          <span className='screen_out'>현위치</span>
          <span className='coach_accessLocation'></span>
        </div>
      </div >
    )
  }

  return (
    <div>
      <div id="location" style={{ width: "100%", height: "80vh" }}></div>
      <CurrentPos />
    </div>
  )
}

export default Location;

/*
  주소-좌표 변환 객체: 주소가 들어가면 좌표가 나오는건데 안쓸거같지만 유용해보여서
  const geocoder = new kakao.maps.services.Geocoder();
*/


