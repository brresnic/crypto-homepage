import React, { Component } from 'react';
import './CryptoCard.css';

// For each cryptocurrency, display
// name, symbol, icon, price, market cap,
// and market movement (has the price/volume gone up/down?),
// and optionally other desired info

class CryptoCard extends React.Component {
    // todo: up or down?
    // todo: icon
    render() {
      console.log('data',this.props.data.long);
      return (
        <div id="Card">
          <h1>{this.props.data.long}</h1>
          <p>{this.props.data.short}</p>
          <p>${Math.round(this.props.data.price)}</p>
          <p>${abbrNum(this.props.data.mktcap,2)}</p>
        </div>
      );
    }
}

// Round with units
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

export default CryptoCard;
