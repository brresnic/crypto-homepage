import React, { Component } from 'react';
import './CardList.css';
import CryptoCard from '../CryptoCard'; // A card containing info on a crypto

export default class CardList extends Component {

  render() {
      // Create an array of crypto cards from the data
      let cards = this.props.data.map((cryptoDataResult) => {
        console.log(cryptoDataResult);
        return (
           <CryptoCard data={cryptoDataResult}/>
        )
      });

      return (
          <div class="CardList">
              {cards}
          </div>
      );
  }
}

