import React, { Component } from 'react';
import './CardList.css';

class CardList extends Component {

  render() {
      return (
          <div className="App">
            <div id='cards'>
              {this.props.cards}
            </div>
          </div>
      );
  }
}

export default CardList;
