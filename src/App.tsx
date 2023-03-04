import React from 'react';
import logo from './logo.svg';
import './App.css';

import GetAccountInfo from './components/GetAccountInfo'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <GetAccountInfo></GetAccountInfo>
      </header>
    </div>
  );
}

export default App;
