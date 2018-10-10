import React, { Component } from 'react';
import './CardList.css';
import CryptoCard from '../CryptoCard'; // A card containing info on a crypto
import { Link, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';
import _ from "underscore";

export default class CardList extends Component {
  constructor(props) {
      super(props);

      this.state = {cardElements: []};

      this.registerCard = this.registerCard.bind(this);
      this.unregisterCard = this.unregisterCard.bind(this);
  }
å
  componentWillReceiveProps(nextProps) {
    if(nextProps.selectedCrypto != null) {
      if(nextProps.selectedCrypto !== this.props.selectedCrypto) {

        let scrollPosition;
        if(this.props.selectedCrypto != null) {
            console.log('here');
            console.log('current', this.state.cardElements[this.props.selectedCrypto][1]);
            console.log('next',this.state.cardElements[nextProps.selectedCrypto][1]);

          if(this.state.cardElements[this.props.selectedCrypto][1] < this.state.cardElements[nextProps.selectedCrypto][1]) {
            console.log('here');
            scrollPosition = this.state.cardElements[nextProps.selectedCrypto][0].offsetTop - 235;
          } else {
            scrollPosition = this.state.cardElements[nextProps.selectedCrypto][0].offsetTop + 145;
          }
        } else {
          scrollPosition = this.state.cardElements[nextProps.selectedCrypto][0].offsetTop + 145;
        }
        

        scroll.scrollTo(scrollPosition, {
           duration: 300,
           smooth: "easeInOutQuint",
         });

        // scroll.scrollTo(this.state.cardElements[nextProps.selectedCrypto].getBoundingClientRect().top, {
        //   duration: 300,
        //   smooth: "easeInOutQuint",
        // });
      }
      //window.scrollTo(210);// + this.state.cardElements[nextProps.selectedCrypto].getBoundingClientRect().top);
      // scrollIntoView(this.state.cardElements[nextProps.selectedCrypto], {
      //   time: 300,
      //   align: {
      //     top: .97
      //   }
      // });
    }
  }

  registerCard(short, ref, index) {
    let newCardElements = this.state.cardElements;
    newCardElements[short] = [ref,index];
    this.setState({cardElements: newCardElements});
  }

  unregisterCard(short) {
    this.setState({ cardElements: _.omit(this.state.cardElements, 'short') });
  }

  render() {
      // Create an array of crypto cards from the data
      const cards = this.props.data.map((cryptoDataResult, index) => {
        if(this.props.selectedCrypto === cryptoDataResult.short) {
          return (<CryptoCard 
                    onSelectCrypto={this.props.onSelectCrypto}
                    data={cryptoDataResult} 
                    key={index}
                    index={index} 
                    registerCard={this.registerCard}
                    unregisterCard={this.unregisterCard}
                    isSelected={true}/>)
        }
        return (<CryptoCard 
                  onSelectCrypto={this.props.onSelectCrypto}
                  data={cryptoDataResult} 
                  key={index} 
                  index={index} 
                  registerCard={this.registerCard}
                  unregisterCard={this.unregisterCard}
                  isSelected={false}/>)
      });

      return (
          <div className="CardList">
              {cards}
          </div>
      );
  }
}

