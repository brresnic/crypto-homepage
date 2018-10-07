import React, { Component } from 'react';
import './CardList.css';
import CryptoCard from '../CryptoCard'; // A card containing info on a crypto

export default class CardList extends Component {

  render() {
      // Create an array of crypto cards from the data
      const cards = this.props.data.map((cryptoDataResult, index) => {
        return (
           <CryptoCard data={cryptoDataResult} key={index}/>
        )
      });

      return (
          <div className="CardList">
              {cards}
          </div>
      );
  }
}

