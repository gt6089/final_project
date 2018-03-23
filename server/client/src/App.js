import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './actions';

import Header from './components/Header';
import Dashboard from './components/Dashboard';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="grid-y medium-grid-frame">
        <div className="App grid-container">
          <div className="grid x grid-margin-x">
            <div class="cell">
              <Header />
            </div>
            <div class="cell">
              <BrowserRouter>
                <Switch>
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
