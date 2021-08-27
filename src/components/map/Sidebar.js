import React, { Component } from 'react'
import './Sidebar.scss'
import './../../index.scss'
import CreateLocation from '../location/CreateLocation'
//, { useRef, useEffect, useState }
// import mapboxgl from '!mapbox-gl'

class Sidebar extends Component {
  render () {
    const { user, msgAlert } = this.props
    return (
      <>
        <div id='this.map.current'>
          <div id='left' className='sidebar flex-center left collapsed'>
            <div className='sidebar-content rounded-rect flex-center'><CreateLocation
              msgAlert={msgAlert}
              user={user}
              address={this.address}
            />
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Sidebar
