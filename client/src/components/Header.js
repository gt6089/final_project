import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
  <nav className="navbar is-danger is-fullwidth" role="navigation" aria-label="main navigation">
    <div className="container">
      <div className="navbar-brand">
        <NavLink to="/" className="navbar-item">
          <span className="title is-2">RecRun</span>
        </NavLink>
        <a
          role="button"
          className="navbar-burger"
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
    </div>
  </nav>
);

export default Header;
