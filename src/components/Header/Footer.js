import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './../../index.scss'

class SignUp extends Component {
  constructor (props) {
    super(props)

    this.state = {}
  }

  render () {
    return (
      <section>
        <footer
          className='text-white row'>
          <div className='row'></div>
          <div className='text-left col-6 hover-text'>
            <h5>Discover</h5>
            <a className='text-white' href='https://www.mapbox.com/'>Mapbox</a><br />
            <a className='text-white' href='https://github.com/ProjectPlayGroundLHA/PlayGroundClient/blob/main/ApiDocumentation.md'>Documentation</a>
          </div>
          <div className='text-right col-6 hover-text'>
            <h5>About</h5>
            <a className='text-white' href='https://github.com/ProjectPlayGroundLHA'>Github</a><br />
            <a className='text-white' href='https://github.com/ProjectPlayGroundLHA/PlayGroundClient'>Source Code</a><br />
            <a className='text-white' href='https://github.com/ProjectPlayGroundLHA/PlayGroundApi'>API</a><br />
          </div>
        </footer>
      </section>
    )
  }
}

export default withRouter(SignUp)
