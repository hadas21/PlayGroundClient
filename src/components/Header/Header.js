import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link, NavLink } from 'react-router-dom'
import SignIn from '../auth/SignIn'
import SignUp from '../auth/SignUp'
import UpdatePopup from '../location/UpdatePopup'

const Header = ({ user, setUser, msgAlert }) => (
  <Navbar
    className='custom-nav sticky-nav'
    bg='primary'
    variant='dark'
    expand='md'>
    <Navbar.Brand>
      <Link
        to='/map'
        style={{
          color: '#FFF',
          textDecoration: 'none',
          padding: '0 20px',
          fontSize: '30px'
        }}> Playground
      </Link>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls='basic-navbar-nav' />
    <Navbar.Collapse id='basic-navbar-nav'>
      <Nav
        className='ml-auto sticky-top'
        style={{ padding: '0px 20px', fontSize: '18px' }}>
        {user
          ? (
            <Fragment>
              <NavLink to='/change-password' className='nav-link'> Change Password
              </NavLink>
              <NavLink to='/sign-out' className='nav-link'> Sign Out
              </NavLink>
              <UpdatePopup user={user} setUser={setUser} msgAlert={msgAlert} />
            </Fragment>
          )
          : (
            <Fragment>
              <SignIn user={user} setUser={setUser} msgAlert={msgAlert} />
              <SignUp user={user} setUser={setUser} msgAlert={msgAlert} />
            </Fragment>
          )}
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
