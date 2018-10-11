/***************
// Daily Hot Cryptos
//
// a webpage which serves fundamental visualizations on various crypto assets.
//
// Allows users to 
// 1) consume an overview of the most popular crypto assets and 
// 2) drill into a specific crypto asset in order to see a more detailed visualization of its information.
//
// This particular implementation highlights daily changes in the price of assets.
//
***************/

import React, { Component } from 'react';
import './App.css';
import CryptoOverview from './Components/CryptoOverview/CryptoOverview'; // An overview of cryptos
import CardList from './Components/CardList/CardList'; // A list of the top 50 cryptos
import Legend from './Components/Legend/Legend'; // An interactive legend
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

            // These two lines of code gets rid of empr coin. There's something messed up about the API for that crypto
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
              topCryptos[i].color = interpolateColors("#4199F1","#46e038",((topCryptos[i].perc - min)/(max - min))); // generate a color
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
          <div className="app">
            <div className="app__Feed">
              <div className="app__Header">
                <h1> Daily Hot Cryptos <i class="em em-money_with_wings"></i> </h1>
                <Collapse
                        isOpened={!this.state.isScrolling}
                        springConfig={{ stiffness: 200, damping: 23, precision: 0.2 }}>
                  <p> Below, you'll find a list of the top 50 largest cryptos. Click on a crypto to learn more about it!</p>
                  <p> Each crypto is color coded according to it's daily return, relative it's peers.</p> 
                  <p> Cryptos are listed in descending order by market cap. The bubble chart on the right is sized by market cap.</p>
                </Collapse>
                <Legend bestPerforming={this.state.bestPerformingCrypto} worstPerforming={this.state.worstPerformingCrypto} onSelectCrypto={this.onSelectCrypto}/>
                <div className="app__DividerLine"> </div>
              </div>
              <CardList data={this.state.cryptosData} onSelectCrypto={this.onSelectCrypto} selectedCrypto={this.state.selectedCrypto}/>
            </div>
            <CryptoOverview data={this.state.cryptosData} onSelectCrypto={this.onSelectCrypto} selectedCrypto={this.state.selectedCrypto}/>
            <link href="https://afeld.github.io/emoji-css/emoji.css" rel="stylesheet" />
          </div>
      );
  }
}