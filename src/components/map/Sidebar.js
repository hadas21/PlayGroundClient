import React, { Component } from 'react'
// style
import './Sidebar.scss'
import './../../index.scss'
// components
import CreateLocation from '../location/CreateLocation'
// import CreateFriend from '../friend/CreateFriend'

class Sidebar extends Component {
  constructor (props) {
    super(props)

    this.state = {}
  }

  render () {
    const { user, msgAlert, address, lng, lat, setAddress } = this.props
    return (
      <>
        <div id='this.map.current'>
          <div id='left' className='sidebar flex-center left collapsed'>
            <div className='sidebar-content rounded-rect flex-center'>
              <>
                <CreateLocation
                  msgAlert={msgAlert}
                  user={user}
                  setAddress={setAddress}
                  address={address}
                  lng={lng}
                  lat={lat}
                />
                <br />
              </>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Sidebar
