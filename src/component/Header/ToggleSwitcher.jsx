// components/ThemeSwitcher.js
import React from 'react';

function ThemeSwitcher({ isDarkTheme, toggleTheme }) {
  return (
    <div className="theme-switcher">
      <button onClick={toggleTheme}>
        {isDarkTheme ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
      </button>
    </div>
  );
}

export default ThemeSwitcher;
