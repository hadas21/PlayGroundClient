import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link, NavLink } from 'react-router-dom'
import SignIn from '../auth/SignIn'
import SignUp from '../auth/SignUp'
import UpdatePopup from '../location/UpdatePopup'

const Header = ({ user, setUser, msgAlert }) => (
  <Navbar
    color='white'
    expand='md'>
    <Navbar.Brand>
      <Link
        to='/map'
        style={{
          color: 'white',
          textDecoration: 'none',
          textTransform: 'uppercase',
          padding: '0 10px',
          fontSize: '30px'
        }}>
          Playground
      </Link>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls='basic-navbar-nav' />
    <Navbar.Collapse id='basic-navbar-nav'>
      <Nav className='ml-auto'>
        {user
          ? (
            <Fragment>
              <NavLink style={{ color: 'white' }} to='/change-password' className='nav-link'> Change Password
              </NavLink>
              <NavLink style={{ color: 'white' }} to='/sign-out' className='nav-link'> Sign Out
              </NavLink>
              <UpdatePopup style={{ color: 'white' }} user={user} setUser={setUser} msgAlert={msgAlert} />
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
