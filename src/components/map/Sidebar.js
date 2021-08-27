import React, { Component } from 'react'
import './Sidebar.scss'
import './../../index.scss'
import CreateLocation from '../location/CreateLocation'
// import { createLocation } from '../../api/location.js'
// import { createLocationSuccess, createLocationFailure } from '../AutoDismissAlert/messages'

class Sidebar extends Component {
  constructor (props) {
    super(props)

    this.state = {}
  }

  render () {
    const { user, msgAlert, address } = this.props
    return (
      <>
        <div id='this.map.current'>
          <div id='left' className='sidebar flex-center left collapsed'>
            <div className='sidebar-content rounded-rect flex-center'>
              <CreateLocation
                msgAlert={msgAlert}
                user={user}
                address={address}
              />
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Sidebar
