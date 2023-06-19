"use strict";

// Data drop-off sampah (contoh data)
var dropOffPoints = [
  {
    name: "TPA Bantar gebang",
    lat: -6.3493,
    lng: 106.9983,
  },
  {
    name: "TPA Cipeucang",
    lat: -6.32481,
    lng: 106.65943,
  },
  {
    name: "TPA Jatibarang",
    lat: -6.3503,
    lng: 107.0009,
  },
  {
    name: "TPA Piyungan",
    lat: -7.86999,
    lng: 110.43007,
  },
  {
    name: "TPA Sukawinatan",
    lat: -2.91196,
    lng: 104.74931,
  },
  {
    name: "TPA Benowo",
    lat: -7.21978,
    lng: 112.62993,
  },
];

var map = L.map("map").setView([-6.1754, 106.8272], 12);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
  maxZoom: 18,
}).addTo(map);

// Tambahkan marker untuk setiap drop-off point
dropOffPoints.forEach(function (point, index) {
  var marker = L.marker([point.lat, point.lng]).addTo(map);
  marker.bindPopup(
    '<div class="popup-content">' +
      "<h3>" +
      point.name +
      "</h3>" +
      '<button class="popup-button" onclick="navigateToDropOff(' +
      index +
      ')">Drop-off</button>' +
      "</div>"
  );
});

// Fungsi untuk mengarahkan ke drop-off point saat tombol Drop-off pada card ditekan
function navigateToDropOff(index) {
  var dropOffPoint = dropOffPoints[index];
  map.setView([dropOffPoint.lat, dropOffPoint.lng], 15);
  alert("Anda telah memilih drop-off point: " + dropOffPoint.name);
}
