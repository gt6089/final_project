import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as eventActions from '../actions/event';
import * as playerActions from '../actions/player';
import * as messageActions from '../actions/message';
import jwtDecode from 'jwt-decode';

import Header from './Header';
import Dashboard from './Dashboard';
import EventIndex from './EventIndex';
import EventShow from './EventShow';
import EventNew from './EventNew';
import PlayerIndex from './PlayerIndex';
import PlayerShow from './PlayerShow';
import PlayerNew from './PlayerNew';
import MessageIndex from './MessageIndex';

import '../assets/css/foundation.css';
import '../assets/css/app.css';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(eventActions.fetchAll());
    this.props.dispatch(playerActions.fetchAll());
    this.props.dispatch(messageActions.fetchAll());
  }

  render() {
    return (
      <BrowserRouter>
        <div className="grid-y medium-grid-frame">
          <div className="cell">
            <Header />
          </div>
          <div className="App grid-container fluid">
            <div className="grid x grid-margin-x">
              <div className="cell">
                <Switch>
                  <Route exact path="/messages" component={MessageIndex} />
                  <Route exact path="/events" component={EventIndex} />
                  <Route exact path="/events/new" component={EventNew} />
                  <Route path="/events/:id" component={EventShow} />
                  <Route exact path="/players" component={PlayerIndex} />
                  <Route exact path="/players/new" component={PlayerNew} />
                  <Route path="/players/:id" component={PlayerShow} />
                  <Route exact path="/" component={Dashboard} />
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({
  events: state.events.events,
  players: state.players.players,
});

export default connect(mapStateToProps)(App);
