import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as eventActions from '../actions/event';

class AddEventForm extends Component {
  handleSubmit(values) {
    console.log(values);
  }

  render() {
    return (
      <div className="addEventForm">
        <h1>Create new event</h1>
        <form onSubmit={this.handleSubmit}>
        </form>
      </div>
    )
  }
  }

export default AddEventForm;