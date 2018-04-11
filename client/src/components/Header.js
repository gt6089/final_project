import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
  <nav className="navbar is-danger" aria-label="main navigation">
    <div className="navbar-brand">
        <NavLink to="/" className="navbar-item has-text-left" id="logo">
          <span className="has-text-white is-size-3">RecRun</span>
        </NavLink>
        <a
          role="button"
          className="navbar-burger has-text-white is-size-2"
          data-target="navMenu"
          aria-label="menu"
          aria-expanded="false"
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </a>
      </div>
    <div className="navbar-menu" id="navMenu">
        <div className="navbar-end has-text-weight-semibold">
          <NavLink to="/events" className="navbar-item">
            <span>Events</span>
          </NavLink>
          <NavLink to="/players" className="navbar-item">
            <span>Players</span>
          </NavLink>
          <NavLink to="/messages" className="navbar-item">
            <span>Messages</span>
          </NavLink>
        </div>
      </div>
  </nav>
);

export default Header;
