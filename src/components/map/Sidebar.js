import React, { Component } from 'react'
import './Sidebar.scss'
import './../../index.scss'
import CreateLocation from '../location/CreateLocation'
import CreateFriend from '../friend/CreateFriend'

class Sidebar extends Component {
  constructor (props) {
    super(props)

    this.state = {}
  }

  render () {
    const { user, msgAlert, address, lng, lat, setMarkerColor } = this.props
    return (
      <>
        <div id='this.map.current'>
          <div id='left' className='sidebar flex-center left collapsed'>
            <div className='sidebar-content rounded-rect flex-center'>
              <>
                <CreateLocation
                  setMarkerColor={setMarkerColor}
                  msgAlert={msgAlert}
                  user={user}
                  address={address}
                  lng={lng}
                  lat={lat}
                /><br />
                <CreateFriend
                  setMarkerColor={setMarkerColor}
                  msgAlert={msgAlert}
                  user={user}
                  address={address}
                  lng={lng}
                  lat={lat}
                />
              </>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Sidebar
