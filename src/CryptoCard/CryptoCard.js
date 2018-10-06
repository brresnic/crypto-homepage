import React, { Component } from 'react';
import './CryptoCard.css';
import LineChart from '../LineChart';

const CollapseCardIcon = ({ className, stroke }) => (
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
// and market movement (has the price/volume gone up/down?),
// and optionally other desired info
export default class CryptoCard extends React.Component {
  constructor(props) {
      super(props);
      this.state = {opened: false};
  }
    // todo: up or down?
    // todo: icon
    render() {

      // Appropriately round the price
      if(this.props.data.price > 100) {
        this.props.data.price = Math.round(this.props.data.price);
      } else if(this.props.data.price > 1) {
        this.props.data.price = Math.round(100 * this.props.data.price) / 100;
      } else {
        this.props.data.price = Math.round(1000 * this.props.data.price) / 1000;
      }

      return (
        <div class="Card Closed">
          <div style={{backgroundColor: this.props.data.color}} class='CardHeader'>
            <div class="CollapseIcon">
              <CollapseCardIcon stroke={'#FFFFFF'} />
            </div>
          </div>
          <h1>{this.props.data.long} ({this.props.data.short})</h1>
          <p>Price: ${this.props.data.price}</p>
          <p>Market Cap: ${abbrNum(this.props.data.mktcap,2)}</p>
          <LineChart />
        </div>
      );
    }
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
             if((number == 1000) && (i < abbrev.length - 1)) {
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
