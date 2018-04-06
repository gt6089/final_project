import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
  <nav className="top-bar">
    <div className="top-bar-left grid-x grid-padding-x align-justify align-middle">
      <NavLink to="/">
        <span style={{ fontSize: '30px' }}>RecRun</span>
      </NavLink>
      <NavLink to="/events" className="nav-icon">
        <i className="fi-calendar" style={{ fontSize: '40px' }} />
      </NavLink>
      <NavLink to="/players" className="nav-icon">
        <i className="fi-torsos-all" style={{ fontSize: '40px' }} />
      </NavLink>
      <NavLink to="/messages" className="nav-icon">
        <i className="fi-comment-quotes" style={{ fontSize: '40px' }} />
      </NavLink>
    </div>
  </nav>
);

export default Header;
