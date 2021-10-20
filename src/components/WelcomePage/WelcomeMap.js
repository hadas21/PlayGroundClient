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
            <h3 className='welcome-header-title-sm' style={{ fontSize: '3.5vw' }}>Welcome to </h3><br />
            <h1 style={{ fontSize: '8.5vw' }}>Playground</h1>
          </div>
          <a href='#'><img className='welcome-header-arrow' src='https://i.imgur.com/94fEE77.png'/></a>
        </div>

        <div className='welcome-secondary row'>
          <div className='col-6'>
            <h2 style={{ lineHeight: '.8em' }}>About</h2>
            <h1 style={{ fontSize: '4vw', color: '#16212B' }}>Playground</h1>
          </div>
          <div className='col-6'>
            <h3 style={{ color: '#16212B' }}>Get Started</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <br />
            <h3 style={{ color: '#16212B' }}>Learn More</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          </div>
        </div>
        <SlidingGallery />
      </div>
    )
  }
}

export default WelcomeMap
