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
          <div id="cards">
            <h1>{this.props.data.long}</h1>
            <p>{this.props.data.short}</p>
            <p>{this.props.data.price}</p>
            <p>{this.props.data.mktcap}</p>
          </div>
        );
    }
}

export default CryptoCard;
