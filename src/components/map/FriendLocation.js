import React, { Component } from 'react'
// import axios from 'axios'
// import apiUrl from '../apiConfig'
// import { Link } from 'react-router-dom'
import { indexFriendLocations } from '../../api/location.js'
// import '../index.scss'

class FriendLocation extends Component {
  constructor (props) {
    super(props)

    this.state = {
      token: ''
    }
  }

  componentDidMount () {
    indexFriendLocations(this.props.token)
      .then((res) => console.log(res))
    //   .then((res) => this.setState({ token }))
      .catch((err) => console.log(err))
  // }
  }

  render () {
    return (
      <p></p>
    )
  }
}

export default FriendLocation
