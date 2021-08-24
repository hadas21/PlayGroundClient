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

export const showLocation = (user) => {
  console.log(user)
  return axios({
    method: 'GET',
    url: `${apiUrl}/locations${user.id}`,
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}
