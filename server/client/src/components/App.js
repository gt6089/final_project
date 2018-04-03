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
import EventEdit from './EventEdit';
import PlayerIndex from './PlayerIndex';
import PlayerShow from './PlayerShow';
import PlayerNew from './PlayerNew';
import PlayerEdit from './PlayerEdit';
import MessageIndex from './MessageIndex';
import MessageNew from './MessageNew';

import '../assets/css/foundation.css';
import '../assets/css/foundation-icons.css';
import '../assets/css/app.css';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(eventActions.fetchAll());
    this.props.dispatch(playerActions.fetchAll());
    this.props.dispatch(messageActions.fetchAll());
    this.props.dispatch(eventActions.getNextEvent());
  }

  render() {
    return (
      <BrowserRouter>
        <div className="grid-y medium-grid-frame grid-padding-y">
          <div className="cell">
            <Header />
          </div>
          <div className="medium-cell-block-container">
            <div className="grid x grid-margin-x grid-padding-x">
              <div className="cell">
                <Switch>
                  <Route exact path="/messages/new" component={MessageNew} />
                  <Route exact path="/messages" component={MessageIndex} />
                  <Route exact path="/events" component={EventIndex} />
                  <Route exact path="/events/new" component={EventNew} />
                  <Route exact path="/events/:id/edit" component={EventEdit} />
                  <Route path="/events/:id" component={EventShow} />
                  <Route exact path="/players/:id/edit" component={PlayerEdit} />
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
