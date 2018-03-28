import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import jwtDecode from 'jwt-decode';

import Header from './Header';
import Dashboard from './Dashboard';
import EventIndex from './EventIndex';

import '../assets/css/App.css';

class App extends Component {
  state = {
    events: [],
    user: null
  };

  componentDidMount() {
    this.signIn();
  }

  signIn() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      const payload = jwtDecode(jwt);
      this.setState({
        user: payload
      })
    }
  }

  render() {
    const { user } = this.state;
    return (
      <div className="grid-y medium-grid-frame">
        <div className="App grid-container">
          <div className="grid x grid-margin-x">
            <div className="cell">
              <Header user={user}/>
            </div>
            <div className="cell">
              <BrowserRouter>
                <Switch>
                  <Route path="/events" component={EventIndex}/>
                  <Route path="/" component={Dashboard} />
                </Switch>
              </BrowserRouter>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, actions)(App);
