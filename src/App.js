/* eslint-disable no-tabs */
// react
import React, { Component, Fragment } from "react";
import { Route } from "react-router-dom";
import { v4 as uuid } from "uuid";
// Authentication

import AuthenticatedRoute from "./components/AuthenticatedRoute/AuthenticatedRoute";
// user messages
import AutoDismissAlert from "./components/AutoDismissAlert/AutoDismissAlert";
// header logic
import Header from "./components/Header/Header";

// auth CRUD
import SignUp from "./components/auth/SignUp";
import SignIn from "./components/auth/SignIn";
import SignOut from "./components/auth/SignOut";
import ChangePassword from "./components/auth/ChangePassword";

// location CRUD
import ShowLocation from "./components/location/ShowLocation";

import UpdatePopup from "./components/location/UpdatePopup";

// map logic
import WelcomeMap from "./components/WelcomePage/WelcomeMap";
import Map from "./components/map/Map";

// mapbox
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import AboutPlayground from "./components/map/AboutPlayground";
import Footer from "./components/Header/Footer";
mapboxgl.accessToken =
  "pk.eyJ1IjoibGF1cmFhbHlzb24iLCJhIjoiY2tzcDJleWVkMDF0NjMxcGhwMzM1Mm1tMiJ9.27PwqNrg2-gZnMmuS1vOww";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      msgAlerts: [],
    };
  }

  setUser = (newUser) => this.setState({ user: newUser });

  clearUser = () => this.setState({ user: null });

  deleteAlert = (id) => {
    this.setState((state) => {
      return { msgAlerts: state.msgAlerts.filter((msg) => msg.id !== id) };
    });
  };

  msgAlert = ({ heading, message, variant }) => {
    const id = uuid();
    this.setState((state) => {
      return {
        msgAlerts: [...state.msgAlerts, { heading, message, variant, id }],
      };
    });
  };

  render() {
    const { msgAlerts, user } = this.state;

    return (
      <Fragment>
        {msgAlerts.map((msgAlert) => (
          <AutoDismissAlert
            key={msgAlert.id}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
            id={msgAlert.id}
            deleteAlert={this.deleteAlert}
          />
        ))}
        <Header
          msgAlert={this.msgAlert}
          setUser={this.setUser}
          user={user}
          className="container-fluid"
        >
          <Route
            path="/sign-up"
            render={() => (
              <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
            )}
          />
          <Route
            path="/sign-in"
            render={() => (
              <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
            )}
          />
        </Header>

        <main className="container-fluid">
          <Route exact path="/" render={() => <WelcomeMap />} />
          <AuthenticatedRoute
            user={user}
            path="/sign-out"
            render={() => (
              <SignOut
                msgAlert={this.msgAlert}
                clearUser={this.clearUser}
                user={user}
              />
            )}
          />
          <AuthenticatedRoute
            user={user}
            path="/change-password"
            render={() => (
              <ChangePassword msgAlert={this.msgAlert} user={user} />
            )}
          />
          <AuthenticatedRoute
            msgAlert={this.msgAlert}
            user={user}
            exact
            path="/map/locations/:id"
            render={() => <ShowLocation msgAlert={this.msgAlert} user={user} />}
          />
          <AuthenticatedRoute
            msgAlert={this.msgAlert}
            user={user}
            path="/map/locations/:id/edit"
            render={() => <UpdatePopup msgAlert={this.msgAlert} user={user} />}
          />
          <AuthenticatedRoute render={() => <AboutPlayground />} />
          <AuthenticatedRoute
            user={user}
            path="/map"
            render={() => (
              <Map
                msgAlert={this.msgAlert}
                clearUser={this.clearUser}
                user={user}
              />
            )}
          />
          <Route path="/" render={() => <Footer />} />
        </main>
      </Fragment>
    );
  }
}
export default App;
