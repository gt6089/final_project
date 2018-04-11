import React, { Component } from 'react';

class PlayerForm extends Component {
  render() {
    return (
      <div className="PlayerForm">
        <form onSubmit={this.handleSubmit}>
          <div className="field">
            <label htmlFor="first_name" className="label">First name</label>
            <input
            className="input"
              type="text"
              name="first_name"
              value={this.props.player.first_name}
              onChange={this.props.onChange}
            />
          </div>
          <div className="field">
            <label htmlFor="last_name" className="label">Last name</label>
            <input
            className="input"
              type="text"
              name="last_name"
              value={this.props.player.last_name}
              onChange={this.props.onChange}
            />
          </div>
          <div className="field">
            <label htmlFor="phone" className="label">Phone number</label>
            <input
            className="input"
              type="text"
              name="phone"
              value={this.props.player.phone}
              onChange={this.props.onChange}
            />
          </div>
          <div className="field">
            <label htmlFor="email" className="label">Email</label>
            <input
            className="input"
              type="email"
              name="email"
              value={this.props.player.email}
              onChange={this.props.onChange}
            />
          </div>
          <div className="control">
            <input type="submit" className="button" onClick={this.props.onSave} />
          </div>
        </form>
      </div>
    );
  }
}

export default PlayerForm;
