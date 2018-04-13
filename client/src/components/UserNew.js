import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../actions/user';
import UserForm from './UserForm';
import axios from 'axios';

class UserNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: '',
        password: '',
        yesMsg: '',
        noMsg: '',
        maybeMsg: '',
      },
      saving: false,
    };
    const { dispatch } = props;
    this.boundActionCreators = bindActionCreators(userActions, dispatch);

    this.saveUser = this.saveUser.bind(this);
    this.updateUserState = this.updateUserState.bind(this);
  }

  updateUserState(event) {
    const field = event.target.name;
    const newUser = this.state.user;
    newUser[field] = event.target.value;

    return this.setState({
      user: newUser,
    });
  }

  saveUser(event) {
    event.preventDefault();

    let currentState = this.props.user;

    axios
      .post('http://localhost:5000/api/signup', this.state.user)
      .then((createdUser) => {
        currentState = {
          user: createdUser,
        };

        this.props
          // .dispatch(userActions.login(currentState.user))
          .then(() => this.props.history.push('/'));
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  render() {
    return (
      <div>
        <h1>Create account</h1>
        <UserForm
          {...this.boundActionCreators}
          user={this.state.user}
          onSave={this.saveUser}
          onChange={this.updateUserState}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(UserNew);
