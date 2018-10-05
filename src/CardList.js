import React, { Component } from 'react';
import './CardList.css';
import CryptoCard from './CryptoCard';

class CardList extends Component {
  constructor(props) {
      super(props);
      this.state = {dataResults: []};
  }

  componentDidMount() {
      // fetch adapted from
      // https://developers.google.com/web/updates/2015/03/introduction-to-fetch
      // https://blog.hellojs.org/fetching-api-data-with-react-js-460fe8bbf8f2
      fetch("http://public.enigma.com/api/datasets/").then(response => {
          return response.json();
      }).then( data => {
              let cards = data[0].ancestors.map((cryptoDataResult) => {
                  return (
                      <CryptoCard title={cryptoDataResult.display_name} description={cryptoDataResult.description}/>
                 )});

              this.setState({dataResults: cards});
          });
  }

  render() {
      return (
          <div className="App">
            <header className="App-header">
              <p>
                Edit <code>src/App.js</code> and save to reload.
              </p>
              <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn React
              </a>
            </header>
          </div>
          //<div id='cards'>
          //    {this.state.dataResults}
          // </div>
      );
  }
}

export default CardList;
