import React, { Component } from 'react';
import './CryptoCard.css';


class CryptoCard extends React.Component {
        render() {
        return (
          <div>
                <h1>{this.props.title}</h1>
                <p>{this.props.description}</p>
          </div>
        );
    }
}

export default CryptoCard;
