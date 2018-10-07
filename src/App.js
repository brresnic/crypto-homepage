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
import Collapse from 'react-collapse';
import cx from 'classnames';

export default class App extends Component {
  constructor(props) {
      super(props);
      this.state = {cryptosData: [], 
        bestPerformingCrypto: {long: "",perc: 0, color: "#FFFFFF"}, 
        worstPerformingCrypto: {long: "",perc: 0, color: "#FFFFFF"},
        isScrolling: false,
      };

      this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
      window.addEventListener('scroll', this.handleScroll);

      // Fetch the top cryptos
      fetch("http://coincap.io/front").then(response => {
          return response.json();
      }).then( data => {
            let topCryptos = data.slice(0,50);
            let bestPerformingCrypto;
            let worstPerformingCrypto;

            // We generate a color for each crypto.
            // This color describes each crypto's daily return, relative to it's peers
            const min = topCryptos.reduce((min, p) => p.perc < min ? p.perc : min, topCryptos[0].perc);
            const max = topCryptos.reduce((max, p) => p.perc > max ? p.perc : max, topCryptos[0].perc);
            for (let i = 0; i < topCryptos.length; i++) {
              topCryptos[i].color = interpolateColors("#16438c","#afceff",((topCryptos[i].perc - min)/max));
              if(max === topCryptos[i].perc) bestPerformingCrypto = topCryptos[i]; // keep track of top performing crypto
              if(min === topCryptos[i].perc) worstPerformingCrypto = topCryptos[i]; // keep track of top performing crypto            
            }
            console.log(min);
            console.log(max);
            console.log(bestPerformingCrypto);
            console.log(worstPerformingCrypto);

            // Filter down on the top 50 results and update state
            this.setState({cryptosData: topCryptos, bestPerformingCrypto: bestPerformingCrypto, worstPerformingCrypto: worstPerformingCrypto});
          });
  }

  handleScroll(event) {
    const scrolling = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100 ? true : false; 

    this.setState({
      isScrolling: scrolling
    });
  }

  render() {

      const headerStyle = cx({
        'header': true,
        'scrolling': this.state.isScrolling,
      });

      return (
          <div id="app">
            <div className="feed">
              <div className={headerStyle}>
                <h1> Crypto Daily Return Spread </h1>
                <Collapse
                        isOpened={!this.state.isScrolling}
                        springConfig={{ stiffness: 200, damping: 23, precision: 0.2 }}>
                  <p> The chart below shows the top 50 cryptos by marketcap. Color coding describes each crypto's daily return, relative to the rest of the cohort. Bubble chart is sized according to market cap.</p>
                </Collapse>
                <div  className="legend">
                  <div className="legendCard">
                    <div>
                      <h1>{this.state.worstPerformingCrypto.perc}%</h1>
                      <h1>{this.state.worstPerformingCrypto.long} </h1>
                    </div>
                    <span style={{backgroundColor: this.state.worstPerformingCrypto.color}}> </span>
                  </div>
                  <div className="colorBlock"> </div>
                  <div className="legendCard">
                    <span style={{backgroundColor: this.state.bestPerformingCrypto.color}}> </span>
                    <div>
                      <h1>{this.state.bestPerformingCrypto.perc}%</h1>
                      <h1>{this.state.bestPerformingCrypto.long} </h1>
                    </div>
                  </div>
                </div>
              </div>
              <CardList data={this.state.cryptosData}/>
            </div>
            <CryptoOverview data={this.state.cryptosData}/>
          </div>
      );
  }
}

