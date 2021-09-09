import axios from 'axios'

const apiUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
const token = '.json?access_token=pk.eyJ1IjoibGF1cmFhbHlzb24iLCJhIjoiY2tzcDJleWVkMDF0NjMxcGhwMzM1Mm1tMiJ9.27PwqNrg2-gZnMmuS1vOww'

export const getAddress = (lng, lat) => {
  return axios({
    method: 'GET',
    url: apiUrl + lng + ',' + lat + token
  })
}

export const findLocation = (address) => {
  const encodedAddress = encodeURIComponent(address)
  console.log('address is: ' + encodedAddress)
  return axios({
    method: 'GET',
    url: apiUrl + encodedAddress + token
  })
}

// export const indexLocations = (user) => {
//   return axios({
//     method: 'GET',
//     url: apiUrl + '/locations',
//     headers: {
//       Authorization: `Bearer ${user.token}`
//     }
//   })
// }

// export const showLocation = (id, user) => {
//   return axios({
//     method: 'GET',
//     url: `${apiUrl}/locations/${id}`,
//     headers: {
//       Authorization: `Bearer ${user.token}`
//     }
//   })
// }

// export const deleteLocation = (id, user) => {
//   return axios({
//     url: apiUrl + '/locations/' + id,
//     method: 'DELETE',
//     headers: {
//       Authorization: `Bearer ${user.token}`
//     }
//   })
// }

// export const updateLocation = (data, id, user) => {
//   console.log(data, id, user)
//   return axios({
//     url: apiUrl + '/locations/' + id,
//     method: 'PATCH',
//     data: { location: data },
//     headers: {
//       Authorization: `Bearer ${user.token}`
//     }
//   })
// }
