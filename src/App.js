/***************
// Todos:
// 1. Consume API, filter in on top 50 results
//    (http://coincap.io/front)
//
// 2. For each result, generate a basic card
//    (cryptocurrency, display name, symbol, icon, price, market cap, and market movement)
//
// 3. Create expanded view for each card, with
//      a) a few additional details
//      b) a loading spinner
//      c) a request for timeseries data
//
// 4. Create time-series for expanded card
//
// 5. Add interactive bubble chart
//
// 6. Link the bubble chart to corresponding cards
//
// 7. Clean up design
***************/

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CardList from './CardList';
import CryptoCard from './CryptoCard';


class App extends Component {
  constructor(props) {
      super(props);
      this.state = {cryptoCards: []};
  }

  componentDidMount() {
      // Fetch the top cryptos
      fetch("http://coincap.io/front").then(response => {
          return response.json();
      }).then( data => {
              // Filter down on the top 50 results
              let topCryptos = data.slice(0,50);

              // Create an array of crypto cards from the data
              let cards = topCryptos.map((cryptoDataResult) => {
                console.log(cryptoDataResult);
                return (
                   <CryptoCard data={cryptoDataResult}/>
                )
              });

              this.setState({cryptoCards: cards});
          });
  }

  render() {
      return (
          <div className="App">
            <h1> Top Cryptos </h1>
            <CardList cards={this.state.cryptoCards}/>
          </div>
      );
  }
}

export default App;
