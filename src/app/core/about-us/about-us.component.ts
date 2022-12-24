import { Component, OnInit } from '@angular/core';

declare const L: any;

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    if (!navigator.geolocation) {
      console.log('location is not supported');
    }

    navigator.geolocation.getCurrentPosition((position) => {
      const coords = position.coords;
      console.log(`lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`);
      let map = L.map('map').setView([coords.latitude, coords.longitude], 13);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
         maxZoom: 19,
         attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);
      let marker = L.marker([coords.latitude, coords.longitude]).addTo(map);
      marker.bindPopup('<b>I am here!</b>').openpopup();
      let popup = L.popup()
        .setLatLng([coords.latitude, coords.longitude])
        .setContent("I am here!")
        .openOn(map);
    });

    this.watchposition();
  }

  watchposition() {
    let desLat = 0;
    let desLon = 0;
    let id = navigator.geolocation.watchPosition((position) => {
      console.log(`lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`);
      if (position.coords.latitude === desLat) {
        navigator.geolocation.clearWatch(id);
      }
    }, (err) => {
      console.log(err);
    }, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    })
  }
}
