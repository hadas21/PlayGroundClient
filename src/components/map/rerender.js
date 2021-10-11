// import 'https://api.mapbox.com/mapbox.js/v2.4.0/mapbox.js'
// import 'https://api.mapbox.com/mapbox.js/v2.4.0/mapbox.css'

// const rerender = () => {
//   mapbox.accessToken = 'pk.eyJ1IjoiZGFuc3dpY2siLCJhIjoiY2l1dTUzcmgxMDJ0djJ0b2VhY2sxNXBiMyJ9.25Qs4HNEkHubd4_Awbd8Og'
//   const map = mapbox.map('map')
//   map.setView([51.50068, -0.1245], 19)

//   L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v9').addTo(map)

//   // Build a marker from a simple GeoJSON object:
//   const marker = L.mapbox
//     .featureLayer({
//       type: 'Feature',
//       geometry: {
//         type: 'Point',
//         coordinates: [-0.12458, 51.50068]
//       },
//       properties: {
//         title: 'Hello world!',
//         'marker-color': '#f86767'
//       }
//     })
//     .on('ready', run)
//     .addTo(map)

//   // Iterate over the featureLayer we've called "marker"
//   // and open its popup and update the popup content
//   function run () {
//     marker.eachLayer(function (l) {
//       l.openPopup()
//       const d = new Date()
//       const h = ('0' + d.getHours()).slice(-2)
//       const m = ('0' + d.getMinutes()).slice(-2)
//       const s = ('0' + d.getSeconds()).slice(-2)

//       const currentTime = 'The current time is: </br><strong>' + h + ':' + m + ':' + s + '</strong>'
//       l.setPopupContent(currentTime)
//     })
//   }

//   // update the popup every second with the new time
//   window.setInterval(function () {
//     run()
//   }, 1000)
// }

// export default rerender
