/***************
// Legend
// 
// This component renders an interactive legend, highlighting the values encoded in a heatmap
***************/

import React, { Component } from 'react';
import './Legend.css';

export default class Legend extends Component {

  render() {
    return (
      <div  className="legend">
        <div className="legend__Card" onClick={() => this.props.onSelectCrypto(this.props.worstPerforming.short)}>
          <h2>{this.props.worstPerforming.perc}%</h2>
          <p> Worst Return </p>
        </div>
        <div className="legend__ColorBlock"> </div>
        <div className="legend__Card" onClick={() => this.props.onSelectCrypto(this.props.bestPerforming.short)}>
          <h2>{this.props.bestPerforming.perc}%</h2>
          <p> Best Return </p>
        </div>
      </div>  
    );
  }
}

    


