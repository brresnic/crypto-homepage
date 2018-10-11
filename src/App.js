/***************
// Todos:
//
// add a yellow bar on the top thing (20mins)
// use BEM style convention
// split app into multiple components
// add mandatory props
//
***************/

import React, { Component } from 'react';
import './App.css';
import CryptoOverview from './CryptoOverview/CryptoOverview'; // An overview of cryptos
import CardList from './CardList/CardList'; // A list of the top 50 cryptos
import { interpolateColors } from './Utils/interpolateColors';
import Collapse from 'react-collapse';

export default class App extends Component {
  constructor(props) {
      super(props);
      this.state = {cryptosData: [], 
        bestPerformingCrypto: {long: "",perc: 0, color: "#FFFFFF"}, 
        worstPerformingCrypto: {long: "",perc: 0, color: "#FFFFFF"},
        isScrolling: false,
        currentlySelectedCryptoID: null
      };

      this.handleScroll = this.handleScroll.bind(this);
      this.onSelectCrypto = this.onSelectCrypto.bind(this);
  }

  componentDidMount() {
      window.addEventListener('scroll', this.handleScroll);

      // Fetch the top cryptos
      fetch("http://coincap.io/front").then(response => {
          return response.json();
      }).then( data => {
            // Filter in on top cryptos. 
            let topCryptos = data.slice(0,51);

            // These two lines of code gets rid of empr coin. There's something messed up about the API for this crypto
            const toDelete = new Set(['EMPR']);
            topCryptos = topCryptos.filter(obj => !toDelete.has(obj.short));

            let bestPerformingCrypto;
            let worstPerformingCrypto;

            // We generate a color for each crypto.
            // This color describes each crypto's daily return, relative to it's peers
            const min = topCryptos.reduce((min, p) => p.perc < min ? p.perc : min, topCryptos[0].perc);
            const max = topCryptos.reduce((max, p) => p.perc > max ? p.perc : max, topCryptos[0].perc);
            
            for (let i = 0; i < topCryptos.length; i++) {
              if(max === topCryptos[i].perc) bestPerformingCrypto = topCryptos[i]; // keep track of top performing crypto
              if(min === topCryptos[i].perc) worstPerformingCrypto = topCryptos[i]; // keep track of worst performing crypto            
              topCryptos[i].color = interpolateColors("#4199F1","#F46720",((topCryptos[i].perc - min)/(max - min)));
              topCryptos[i].selected = false;
            }

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

  onSelectCrypto(short) {
    this.setState({
      selectedCrypto: short
    });
  }

  render() {

      return (
          <div id="app">
            <div className="feed">
              <div className="header">
                <h1> Daily Hot Cryptos <i class="em em-fire"></i> </h1>
                <Collapse
                        isOpened={!this.state.isScrolling}
                        springConfig={{ stiffness: 200, damping: 23, precision: 0.2 }}>
                  <p> Below, you'll find a list of the top 50 largest cryptos. Click on a crypto to learn more about it!</p>
                  <p> Each crypto is color coded according to it's daily return, relative it's peers.</p> 
                  <p> Cyptos are listed in descending order by market cap. The bubble chart on the right is sized by market cap.</p>
                </Collapse>
                <div  className="legend">
                  <div className="legendCard" onClick={() => this.onSelectCrypto(this.state.worstPerformingCrypto.short)}>
                    <h2>{this.state.worstPerformingCrypto.perc}%</h2>
                    <p> Worst Return </p>
                  </div>
                  <div className="colorBlock"> </div>
                  <div className="legendCard" onClick={() => this.onSelectCrypto(this.state.bestPerformingCrypto.short)}>
                    <h2>{this.state.bestPerformingCrypto.perc}%</h2>
                    <p> Best Return </p>
                  </div>
                </div>
                <div className="dividerLine"> </div>
              </div>
              <CardList data={this.state.cryptosData} onSelectCrypto={this.onSelectCrypto} selectedCrypto={this.state.selectedCrypto}/>
            </div>
            <CryptoOverview data={this.state.cryptosData} onSelectCrypto={this.onSelectCrypto} selectedCrypto={this.state.selectedCrypto}/>
            <link href="https://afeld.github.io/emoji-css/emoji.css" rel="stylesheet" />
          </div>
      );
  }
}

// https://stackoverflow.com/questions/16491758/remove-objects-from-array-by-object-property
// This util can be uncommented to remove messed up cryptos 
// const filterInPlace = (array, predicate) => {
//     let end = 0;

//     for (let i = 0; i < array.length; i++) {
//         const obj = array[i];

//         if (predicate(obj)) {
//             array[end++] = obj;
//         }
//     }

//     array.length = end;
// };


