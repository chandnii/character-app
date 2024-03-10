import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CharacterList from "./component/CharacterList/CharacterList";
import CharacterDetails from "./component/CharacterDetail/CharacterDetails";
import Header from "./component/Header/Header";
import "./App.css";

function App() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    console.log("Theme toggled:", theme);
  };

  return (
    <Router>
      <div className={`app ${theme}`}>
        <Header onThemeToggle={toggleTheme} />
        <Routes>
          <Route path="/" element={<CharacterList />} />
          <Route path="/characters/:id" element={<CharacterDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
