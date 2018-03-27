import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './actions';
import axios from 'axios';

import Header from './components/Header';
import Dashboard from './components/Dashboard';
import EventIndex from './components/EventIndex';

import './App.css';

class App extends Component {
  state = {
    events: []
  };

  componentDidMount() {
    fetch('http://localhost:5000/events')
      .then(res => res.json())
      .then(result => {
        console.log('======= FETCHED =======', result);
        this.setState({
          isLoaded: true,
          events: result.events
        });
      });
  }

  render() {
    return (
      <div className="grid-y medium-grid-frame">
        <div className="App grid-container">
          <div className="grid x grid-margin-x">
            <div className="cell">
              <Header />
            </div>
            <div className="cell">
              <BrowserRouter>
                <Switch>
                  <Route path="/events" component={EventIndex}}/>
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
