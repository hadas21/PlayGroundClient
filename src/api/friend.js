import apiUrl from '../apiConfig'
import axios from 'axios'

export const createFriend = (data, user) => {
  console.log(data, user)
  return axios({
    method: 'POST',
    url: apiUrl + '/friends',
    headers: {
      Authorization: `Bearer ${user.token}`
    },
    data: {
      friend: data
    }
  })
}

export const indexFriends = (user) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/friends',
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

export const showFriend = (id, user) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/friends/' + id,
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

export const deleteFriend = (id, user) => {
  return axios({
    url: apiUrl + '/friends/' + id,
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

export const updateFriend = (data, id, user) => {
  console.log(data, id, user)
  return axios({
    url: apiUrl + '/friends/' + id,
    method: 'PATCH',
    data: { friend: data },
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}
