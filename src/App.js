import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CardList from './CardList';
class App extends Component {
  render() {
      return (
          <div className="App">
            <h1> Top Cryptos </h1>
            <CardList />
          </div>
      );
  }
}

export default App;
