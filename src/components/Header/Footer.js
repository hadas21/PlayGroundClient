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
            <a className='text-white' href='https://github.com/'>Github</a><br />
            <a className='text-white' href='https://github.com/'>Email</a><br />
            <a className='text-white' href='https://github.com/'>MapBox API</a>
          </div>
          <div className='text-right col-6 hover-text'>
            <h5>Contact</h5>
            <a className='text-white' href='https://github.com/'>Github</a><br />
            <a className='text-white' href='https://github.com/'>Source Code</a><br />
          </div>
        </footer>
      </section>
    )
  }
}

export default withRouter(SignUp)
