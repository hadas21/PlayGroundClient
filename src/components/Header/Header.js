import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link, NavLink } from 'react-router-dom'

const authenticatedOptions = (
  <Fragment>
    <NavLink to='/change-password' className='nav-link'>Change Password
    </NavLink>
    <NavLink to='/sign-out' className='nav-link'>Sign Out
    </NavLink>
    <NavLink exact to='/map' className='nav-link'>Map</NavLink>
    <NavLink to='/map/locations' className='nav-link'>Show Locations
    </NavLink>
    <NavLink to='/create-friend' className='nav-link'>Add a Friend
    </NavLink>
    <NavLink to='/friends' className='nav-link'>Show Friends
    </NavLink>
  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment>
    <NavLink to='/sign-up' className='nav-link'>Sign Up</NavLink>
    <NavLink to='/sign-in' className='nav-link'>Sign In</NavLink>
  </Fragment>
)

const Header = ({ user }) => (
  <Navbar className='sticky-top' bg='primary' variant='dark' expand='md'>
    <Navbar.Brand>
      <Link
        to='/'
        style={{
          color: '#FFF',
          textDecoration: 'none',
          padding: '0 20px',
          fontSize: '30px'
        }}>Playground
      </Link>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls='basic-navbar-nav' />
    <Navbar.Collapse id='basic-navbar-nav'>
      <Nav
        className='ml-auto sticky-top'
        style={{ padding: '0px 20px', fontSize: '18px' }}>
        {user && (
          <span className='navbar-text mr-2'>Hey there, {user.username}.</span>
        )}
        {user ? authenticatedOptions : unauthenticatedOptions}
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
