// Header.js

import React from 'react';
import './Header.css';

function Header({ onThemeToggle }) {
  return (
    <header>
      <h1>Rick and Morty API</h1>
      <div className="switcher">
        <button className="switcher-button" onClick={onThemeToggle}>Switch Theme</button>
      </div>
    </header>
  );
}

export default Header;
