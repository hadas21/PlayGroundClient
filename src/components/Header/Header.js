import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link, NavLink } from 'react-router-dom'
import SignIn from '../auth/SignIn'
import SignUp from '../auth/SignUp'
// import AboutPlayground from '../map/AboutPlayground'
import './../../index.scss'
import ChangePassword from '../auth/ChangePassword'

const Header = ({ user, setUser, msgAlert }) => (
  <div>
    <Navbar>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav>

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
                      fontSize: '4.2vw'
                    }}> Playground
                  </Link>
                </Navbar.Brand>
                {/* <AboutPlayground /> */}
                <ChangePassword
                  user={user}
                  msgAlert={msgAlert}
                />
                <NavLink
                  style={{ color: 'white' }}
                  to='/sign-out'
                  className='nav-link'>Sign Out
                </NavLink>
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
  </div>
)

export default Header
