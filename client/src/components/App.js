import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as eventActions from '../actions/event';
import * as playerActions from '../actions/player';
import * as messageActions from '../actions/message';
import * as userActions from '../actions/user';
import jwtDecode from 'jwt-decode';
import { Token } from '../requests/tokens';

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
import UserNew from './UserNew';

import '../assets/mystyles.css';
import '../assets/css/App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };

    const { dispatch } = props;
    this.boundActionCreators = bindActionCreators(userActions, dispatch);

    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }
  componentDidMount() {
    this.props.dispatch(eventActions.fetchAll());
    this.props.dispatch(playerActions.fetchAll());
    this.props.dispatch(messageActions.fetchAll());
    this.props.dispatch(eventActions.getNextEvent());
  }

  componentWillMount() {
    this.signIn();
  }

  signIn() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      const payload = jwtDecode(jwt);
      this.props
        .dispatch(userActions.setUser(payload))
        .then(() => this.setState({ loading: false }));
    } else {
      this.setState({ loading: false });
    }
  }

  signOut() {
    localStorage.removeItem('jwt');
    this.props.dispatch(userActions.deleteUser);
  }

  render() {
    const { loading } = this.state;

    if (loading) {
      return (
        <div>
          <h2>Loading...</h2>
        </div>
      );
    }

    return (
      <BrowserRouter>
        <div>
          <div>
            <Header {...this.boundActionCreators} />
          </div>
          <div className="section">
            <div className="container is-fluid">
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
                <Route path="/users/new" component={UserNew} />
                <Route exact path="/" component={Dashboard} />
              </Switch>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('state:', state);
  return {
    events: state.events.events,
    players: state.players.players,
    user: {
      email: 'tony@gmail.com'
    },
  };
};

export default connect(mapStateToProps)(App);
