import apiUrl from '../apiConfig'
import axios from 'axios'

export const createLocation = (data) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/create-location',
    data: {
      location: data.location,
      description: data.description
    }
  })
}
