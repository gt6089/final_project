import React, { Component } from 'react';

class PlayerForm extends Component {
  render() {
    return (
      <div className="PlayerForm">
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="first_name">First name</label>
            <input
              type="text"
              name="first_name"
              value={this.props.player.first_name}
              onChange={this.props.onChange}
            />
          </div>
          <div>
            <label htmlFor="last_name">Last name</label>
            <input
              type="text"
              name="last_name"
              value={this.props.player.last_name}
              onChange={this.props.onChange}
            />
          </div>
          <div>
            <label htmlFor="phone">Phone number</label>
            <input
              type="text"
              name="phone"
              value={this.props.player.phone}
              onChange={this.props.onChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={this.props.player.email}
              onChange={this.props.onChange}
            />
          </div>
          <div>
            <input type="submit" className="button" onClick={this.props.onSave} />
          </div>
        </form>
      </div>
    );
  }
}

export default PlayerForm;
