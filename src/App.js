/***************
// Todos:
//
// add callback and state for selected crypto (25mins)
// add yellow outline for selected to card and circle (25mins)
// make best and worst clickable (15mins)
// add scroll and open on select (20mins)
// add a yellow bar on the top thing (20mins)
// add numbers one through fifty to crypto cards (15mins)
// add "plus" to positive returns (10mins)
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
            // Filter in on top cryptos. 
            let topCryptos = data.slice(0,50);

            // get rid of empr coin, there's something messed up about the API for this one
            //const toDelete = new Set(['EMPR']);
            //topCryptos = topCryptos.filter(obj => !toDelete.has(obj.short));

            let bestPerformingCrypto;
            let worstPerformingCrypto;

            // We generate a color for each crypto.
            // This color describes each crypto's daily return, relative to it's peers
            const min = topCryptos.reduce((min, p) => p.perc < min ? p.perc : min, topCryptos[0].perc);
            const max = topCryptos.reduce((max, p) => p.perc > max ? p.perc : max, topCryptos[0].perc);
            
            for (let i = 0; i < topCryptos.length; i++) {
              if(max === topCryptos[i].perc) bestPerformingCrypto = topCryptos[i]; // keep track of top performing crypto
              if(min === topCryptos[i].perc) worstPerformingCrypto = topCryptos[i]; // keep track of top performing crypto            
              topCryptos[i].color = interpolateColors("#4199F1","#F46720",((topCryptos[i].perc - min)/(max - min)));
              console.log((topCryptos[i]));

            }

            //              topCryptos[i].color = interpolateColors("#afceff","#16438c",((topCryptos[i].perc - min)/(max - min)));
            // for (let i = 0; i < topCryptos.length; i++) {
            // }
              // console.log(topCryptos[i].short);
              // console.log((topCryptos[i].perc - min)/max);


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

      return (
          <div id="app">
            <div className="feed">
              <div className="header">
                <h1> Daily Hot Cryptos </h1>
                <Collapse
                        isOpened={!this.state.isScrolling}
                        springConfig={{ stiffness: 200, damping: 23, precision: 0.2 }}>
                  <p> Below, you'll find a list of the top 50 largest cryptos. Click on a crypto to learn more about it!</p>
                  <p> Each crypto is color coded according to it's daily return, relative it's peers.</p> 
                  <p> Cyptos are listed in descending order by market cap. The bubble chart on the right is sized by market cap.</p>
                </Collapse>
                <div  className="legend">
                  <div className="legendCard">
                    <h2>{this.state.worstPerformingCrypto.perc}%</h2>
                    <p> worst return </p>
                  </div>
                  <div className="colorBlock"> </div>
                  <div className="legendCard">
                    <h2>{this.state.bestPerformingCrypto.perc}%</h2>
                    <p> best return </p>
                  </div>
                </div>
                <div className="dividerLine"> </div>
              </div>
              <CardList data={this.state.cryptosData}/>
            </div>
            <CryptoOverview data={this.state.cryptosData}/>
          </div>
      );
  }
}

// https://stackoverflow.com/questions/16491758/remove-objects-from-array-by-object-property
const filterInPlace = (array, predicate) => {
    let end = 0;

    for (let i = 0; i < array.length; i++) {
        const obj = array[i];

        if (predicate(obj)) {
            array[end++] = obj;
        }
    }

    array.length = end;
};


