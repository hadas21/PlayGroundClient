import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { NavDropdown } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'
import SignIn from '../auth/SignIn'
import SignUp from '../auth/SignUp'
import AboutPlayground from '../map/AboutPlayground'
import './../../index.scss'
import ChangePassword from '../auth/ChangePassword'

const Header = ({ user, setUser, msgAlert }) => (
  <Navbar
    className='justify-content-center' color='white'>
    <Navbar.Toggle aria-controls='basic-navbar-nav' />
    <Navbar.Collapse id='basic-navbar-nav'>
      <Nav className='justify-content-center'>
        {user
          ? (
            <Fragment>
              <Navbar.Brand>
                <Link
                  className='nav-header justify-content-center'
                  to='/map'
                  style={{
                    color: 'white',
                    textDecoration: 'none',
                    textTransform: 'uppercase',
                    fontSize: '2em'
                  }}>Playground
                </Link>
              </Navbar.Brand>
              <AboutPlayground />
              <NavDropdown title='Account' id='basic-nav-dropdown' className='justify-content-center'>
                <ChangePassword
                  user={user}
                  msgAlert={msgAlert}
                  style={{ color: 'white' }}
                />
                <NavLink
                  style={{ color: 'white' }}
                  to='/sign-out'
                  className='nav-link'>Sign Out
                </NavLink>
              </NavDropdown>
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
