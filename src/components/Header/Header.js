import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { NavDropdown } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'
import SignIn from '../auth/SignIn'
import SignUp from '../auth/SignUp'
// import AboutPlayground from '../map/AboutPlayground'
import './../../index.scss'
import ChangePassword from '../auth/ChangePassword'

const Header = ({ user, setUser, msgAlert }) => (
  <div>
    <Navbar>
      {user
        ? (
          <></>
        )
        : (
          <Navbar.Brand style={{ paddingTop: '2em', paddingBottom: '0em' }}>
            <Link
              className='nav-header'
              to='/map'
              style={{
                color: 'white',
                textDecoration: 'none',
                textTransform: 'uppercase',
                fontSize: '2.2em',
                lineHeight: '0'
              }}> Playground
            </Link>
          </Navbar.Brand>
        )}
    </Navbar>
    <Navbar >
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav style={{ paddingBottom: '1em' }}>
          {user
            ? (
              <Fragment>
                <Navbar.Brand>
                  <Link
                    className='nav-header'
                    to='/map'
                    style={{
                      color: 'white',
                      textDecoration: 'none',
                      textTransform: 'uppercase',
                      fontSize: '1.3em',
                      lineHeight: '0'
                    }}>Playground
                  </Link>
                </Navbar.Brand>
                {/* <AboutPlayground /> */}
                <NavDropdown title='Account' id='basic-nav-dropdown' >
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
              <Fragment style={{ padding: '0px', margin: '0px' }}>
                <SignIn user={user} setUser={setUser} msgAlert={msgAlert} />
                <SignUp user={user} setUser={setUser} msgAlert={msgAlert} />
              </Fragment>
            )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </div>
)

export default Header
