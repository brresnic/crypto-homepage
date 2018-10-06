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
import './App.css';
import CryptoOverview from './CryptoOverview'; // An overview of cryptos
import CardList from './CardList'; // A list of the top 50 cryptos

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {cryptosData: []};
  }

  componentDidMount() {
      // Fetch the top cryptos
      fetch("http://coincap.io/front").then(response => {
          return response.json();
      }).then( data => {
            // TODO generate color from green to red
            // https://codepen.io/njmcode/pen/axoyD/

            // Filter down on the top 50 results and update state
            this.setState({cryptosData: data.slice(0,50)});
          });
  }

  render() {
      return (
          <div id="App">
            <h1> Top Cryptos </h1>
            <div id="MainContentContainer">
              <CryptoOverview data={this.state.cryptosData}/>
              <CardList data={this.state.cryptosData}/>
            </div>
          </div>
      );
  }
}

export default App;
