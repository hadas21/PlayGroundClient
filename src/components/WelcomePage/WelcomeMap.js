import React, { Component } from 'react'
import './../../../src/index.scss'
import SlidingGallery from './SlidingGallery'

class WelcomeMap extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <div>
        <div className='welcome-header'>
          <div className='welcome-header-title'>
            <h3
              className='welcome-header-title-sm'
              style={{ fontSize: '3.5vw' }}>
              Welcome to
            </h3>
            <br />
            <h1 style={{ fontSize: '8.5vw' }}>Playground</h1>
          </div>
          <a href='#'>
            <img
              className='welcome-header-arrow'
              src='https://i.imgur.com/94fEE77.png'
            />
          </a>
        </div>

        <div className='welcome-secondary row'>
          <div className='col-lg-6 col-md-12 col-sm-12'>
            <h2 style={{ lineHeight: '.8em' }}>About</h2>
            <h1 style={{ fontSize: '3em', color: '#16212B' }}>Playground</h1>
            <br />
          </div><br />
          <div className='col-lg-6 col-md-7 col-sm-12'>
            <h3 style={{ color: '#16212B' }}>Get Started</h3>
            <p>
              When logged in, find the location you would like to bookmark by
              either dragging the marker to that location or typing the address
              in the search box. Once the location is found fill in a
              description and click add to make it your own.
              <br />
              <i>
              Please note that Playground currently optimized for desktop
              interaction. Mobile interactions are still in development and
              should be ready shortly.
              </i>
            </p><br />
            <h3 style={{ color: '#16212B' }}>Learn More</h3>
            <p>
                This app was built with the vision of connecting people across the
                world, sharing experiences and locations with each other, despite
                their distance. This is inspired by the founders, based in York
                and Israel. This is a full stack, interactive app with a Mapbox integration. We invite you to contribute to the project by visiting our open source repository <a href='https://github.com/ProjectPlayGroundLHA'> here</a>.
            </p>
          </div>
        </div>
        <SlidingGallery />
      </div>
    )
  }
}

export default WelcomeMap
