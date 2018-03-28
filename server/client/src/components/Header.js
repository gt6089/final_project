import React from 'react';

const Header = (props) => {
  const { user = '' } = props;
  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <h2 className="menu-text">RecRun</h2>
        <h4>Welcome to RecRun ${user}</h4>
      </div>
    </div>
  )
}

export default Header;