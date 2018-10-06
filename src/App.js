/***************
// Todos:
//
// 1. Add daily price change (with arrow SVG)
// (1.5 hours)
//
// 2. Create expanded view for each card, with
//      a) a few additional details
//      c) timeseries chart
// (3 hours)
//
// 3. Add interactive bubble chart
// (3 hours)
//
// 4. Link the bubble chart to corresponding cards on scroll (with blue outline)
// (1 hour)
//
// 5. Link crypto of the day
// (30 mins)
//
// 7. Clean up design
// (3 hours)
//
// total: 12 hours
***************/

import React, { Component } from 'react';
import './App.css';
import CryptoOverview from './CryptoOverview/CryptoOverview'; // An overview of cryptos
import CardList from './CardList/CardList'; // A list of the top 50 cryptos
import { interpolateColors } from './Utils/interpolateColors';

export default class App extends Component {
  constructor(props) {
      super(props);
      this.state = {cryptosData: [], topCrypto: ""};
  }

  componentDidMount() {
      // Fetch the top cryptos
      fetch("http://coincap.io/front").then(response => {
          return response.json();
      }).then( data => {
            let topCryptos = data.slice(0,50);
            let topCrypto;

            // We generate a color for each crypto.
            // This color describes each crypto's daily return, relative to it's peers
            const min = topCryptos.reduce((min, p) => p.perc < min ? p.perc : min, topCryptos[0].perc);
            const max = topCryptos.reduce((max, p) => p.perc > max ? p.perc : max, topCryptos[0].perc);
            for (let i = 0; i < topCryptos.length; i++) {
              topCryptos[i].color = interpolateColors("#f44242","#41f45c",((topCryptos[i].perc - min)/max));
              if(max == topCryptos[i].perc) topCrypto = topCryptos[i]; // keep track of top performing crypto
            }

            // Filter down on the top 50 results and update state
            this.setState({cryptosData: topCryptos, topCrypto: topCrypto});
          });
  }

  render() {
      return (
          <div id="App">
            <div class="Header">
              <h1> Crypto of the Day: </h1>
              <div class="TopCryptoCard">
                <div style={{backgroundColor: this.state.topCrypto.color}}> </div>
                <h1>{this.state.topCrypto.long} </h1>
              </div>
              <p> The chart below shows the top 50 cryptos by marketcap. Color coding describes each crypto's daily return, relative to today's top performer. </p>
            </div>
            <div id="MainContentContainer">
              <CryptoOverview data={this.state.cryptosData}/>
              <CardList data={this.state.cryptosData}/>
            </div>
          </div>
      );
  }
}

