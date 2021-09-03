import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
// import Button from 'react-bootstrap/Button'
import { Link, NavLink } from 'react-router-dom'
import SignIn from '../auth/SignIn'
import SignUp from '../auth/SignUp'
import UpdatePopup from '../location/UpdatePopup'

// const authenticatedOptions = (
//   <Fragment>
//     <NavLink to='/change-password' className='nav-link'>Change Password
//     </NavLink>
//     <NavLink to='/sign-out' className='nav-link'>Sign Out</NavLink>
//     <Button to='/map/locations/:id/edit' class='btn btn-outline-success' type='button'>Update Location
//     </Button>
//   </Fragment>
// )

// const unauthenticatedOptions = (
//   <Fragment>
//     <SignIn />
//     <SignUp />
//   </Fragment>
// )

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
