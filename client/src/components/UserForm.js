import React from 'react';
import timezones from '../data/timezones';
import map from 'lodash/map';
import * as userActions from '../actions/user';

class UserForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      passwordConfirmation: '',
      timezone: '',
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    const { dispatch } = props;
    this.boundActionCreators = bindActionCreators(userActions, dispatch);
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  onSubmit(event) {
    event.preventDefault();

    this.props
      .createUser(this.state)
      .then(() => {})
      .catch(err => this.setState({ errors: err.data }));
  }

  render() {
    const options = map(timezones, (val, key) => (
      <option key={val} value={val}>
        {key}
      </option>
    ));
    return (
      <form className="form" onSubmit={this.onSubmit}>
        <div className="field">
          <label className="label" htmlFor="email">
            Email
          </label>
          <input
            className="input"
            name="email"
            type="text"
            value={this.state.email}
            onChange={this.onChange}
          />
        </div>
        <div className="field">
          <label className="label" htmlFor="password">
            Password
          </label>
          <input
            className="input"
            name="password"
            value={this.state.password}
            onChange={this.onChange}
            type="password"
          />
        </div>
        <div className="field">
          <label className="label" htmlFor="passwordConfirmation">
            Password confirmation
          </label>
          <input
            className="input"
            name="passwordConfirmation"
            value={this.state.passwordConfirmation}
            onChange={this.onChange}
            type="password"
          />
        </div>
        <div className="field">
          <label className="label" htmlFor="timezone">
            Timezone
          </label>
          <div className="select">
            <select
              name="timezone"
              type="input"
              value={this.state.timezone}
              onChange={this.onChange}
            >
              <option value="" disabled>
                Choose your timezone
              </option>
              {options}
            </select>
          </div>
        </div>
        <div className="field">
          <input className="control button" name="submit" type="submit" />
        </div>
      </form>
    );
  }
}

export default UserForm;
