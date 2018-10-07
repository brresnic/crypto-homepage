import React, { Component } from 'react';
import './CryptoCard.css';
import LineChart from '../LineChart';
import Collapse from 'react-collapse';
import cx from 'classnames';

const ArrowIcon = ({ className, stroke }) => (
  <a href="javascript:;">
    <svg
      aria-label="Close Result Card"
      className={className}
      width="24"
      height="14"
      viewBox="0 0 24 14">
      <title>Close Result Card</title>
      <path
        stroke={stroke}
        d="M1 12.88L11.94 2 23 13"
        strokeWidth="2"
        fill="none"
        fillRule="evenodd"
      />
    </svg>
  </a>
);

// For each cryptocurrency, display
// name, symbol, icon, price, market cap,
// and market movement (has the price/volume gone up/down?).
// 
// When card is open, display a line chart and some additional info.
export default class CryptoCard extends React.Component {
  constructor(props) {
      super(props);
      this.state = {isOpened: false, hasOpened: false, visData: false};
      this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // when first opened, load the line chart
    if(!this.state.hasOpened) {
      fetch("http://coincap.io/history/"+this.props.data.short).then(response => {
          return response.json();
      }).then( data => {
        const refinedData = data.price.map((datapoint) => {
        return (
          [datapoint[0],roundNum(datapoint[1])]
        )
        });
        this.setState({visData: refinedData});
      });
    }

    this.setState(state => ({
      isOpened: !state.isOpened,
      hasOpened: true
    }));
  }

  // todo: up or down?
  // todo: icon
  render() {

    const arrowStyle = cx({
      'collapseIcon': true,
      'rotate': this.state.isOpened,
    });

    return (
      <div className="Card" onClick={this.handleClick}>
        <div style={{backgroundColor: this.props.data.color}} className='CardHeader'>
          <div className={arrowStyle}>
            <ArrowIcon stroke={'#FFFFFF'} />
          </div>
        </div>
        <div className="summary">
          <div>
            <h1>{this.props.data.long} ({this.props.data.short})</h1>
            <p>Price: ${roundNum(this.props.data.price)}</p>
            <p>Market Cap: ${abbrNum(this.props.data.mktcap,2)}</p>
          </div>
          <div>
            <h1>{this.props.data.perc}%</h1>
          </div>
        </div>

        <Collapse
          isOpened={this.state.isOpened}
          springConfig={{ stiffness: 200, damping: 23, precision: 0.2 }}>
          <p>Volume: ${abbrNum(this.props.data.volume,2)}</p>
          <p>Supply: ${abbrNum(this.props.data.supply,2)}</p>
          <p> Volume Weighted Price: ${roundNum(this.props.data.vwapData)} </p>
          <LineChart data={this.state.visData} cryptoName={this.props.data.short}/>
        </Collapse>
      </div>
    );
  }
}

// Round numbers differently, depending on their order of magnitude
function roundNum(price) {
  if(price > 100) {
    price = Math.round(price);
  } else if(price > 1) {
    price = Math.round(100 * price) / 100;
  } else {
    price = Math.round(1000 * price) / 1000;
  }
  return price;
}

// This function rounds market caps, appending units
// (https://stackoverflow.com/questions/2685911/is-there-a-way-to-round-numbers-into-a-reader-friendly-format-e-g-1-1k)
function abbrNum(number, decPlaces) {
    // 2 decimal places => 100, 3 => 1000, etc
    decPlaces = Math.pow(10,decPlaces);
    // Enumerate number abbreviations
    var abbrev = [ "K", "M", "B", "T" ];
    // Go through the array backwards, so we do the largest first
    for (var i=abbrev.length-1; i>=0; i--) {
        // Convert array index to "1000", "1000000", etc
        var size = Math.pow(10,(i+1)*3);
        // If the number is bigger or equal do the abbreviation
        if(size <= number) {
             // Here, we multiply by decPlaces, round, and then divide by decPlaces.
             // This gives us nice rounding to a particular decimal place.
             number = Math.round(number*decPlaces/size)/decPlaces;
             // Handle special case where we round up to the next abbreviation
             if((number === 1000) && (i < abbrev.length - 1)) {
                 number = 1;
                 i++;
             }
             // Add the letter for the abbreviation
             number += abbrev[i];
             // We are done... stop
             break;
        }
    }
    return number;
}
