import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="top-bar">
      <div className="top-bar-left">
        <h2 className="menu-text">RecRun</h2>
        <NavLink to='/'>Dashboard</NavLink>
        <NavLink to='/events'>Events</NavLink>
        <NavLink to='/players'>Players</NavLink>
        <NavLink to='/messages'>Messages</NavLink>
      </div>
    </nav>
  )
}

export default Header;