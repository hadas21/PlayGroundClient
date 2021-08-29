import apiUrl from '../apiConfig'
import axios from 'axios'

export const createLocation = (data, user) => {
  console.log(data, user)
  return axios({
    method: 'POST',
    url: apiUrl + '/locations',
    headers: {
      Authorization: `Bearer ${user.token}`
    },
    data: {
      location: data
    }
  })
}

export const indexLocations = (user) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/locations',
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

export const indexFriendLocations = (token) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/locations',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}
export const indexAllLocations = () => {
  return axios({
    method: 'GET',
    url: apiUrl + '/locations-all'
  })
}

export const showLocation = (id, user) => {
  return axios({
    method: 'GET',
    url: `${apiUrl}/locations/${id}`,
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

export const deleteLocation = (id, user) => {
  return axios({
    url: apiUrl + '/locations/' + id,
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

export const updateLocation = (data, id, user) => {
  console.log(data, id, user)
  return axios({
    url: apiUrl + '/locations/' + id,
    method: 'PATCH',
    data: { location: data },
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}
