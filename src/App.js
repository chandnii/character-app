import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CharacterList from './component/CharacterList';
import CharacterDetails from './component/CharacterDetails';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<CharacterList />} />
            <Route path="/characters/:id" element={<CharacterDetails />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
