/***************
// CryptoOverview
// 
// The component provides a visual overview of the biggest cryptos
***************/

import React, { Component } from 'react';
import BubbleChart from '../BubbleChart';
import './CryptoOverview.css';

export default class CryptoOverview extends Component {
  constructor(props) {
      super(props);
      this.state = {visWidth: 500, visHeight: 500};
  }


  static defaultProps = {
    data: false
  };


  componentDidMount() {
    const height = document.getElementsByClassName('overview')[0].clientHeight;
    const width = document.getElementsByClassName('overview')[0].clientWidth;

    this.setState({visHeight: height, visWidth: width*.8});
  }

  render() {

	let bubbleData = this.props.data.map(d => ({
	  label: d.short,
	  value: d.mktcap,
	  color: d.color,
	  selected: false
	}));

	for(let i=0; i < bubbleData.length; i++) {
		if(bubbleData[i].label === this.props.selectedCrypto) {
			bubbleData[i].selected = true;
		}
	}

	// Note: Having a few containers proved to be helpful in order to properly size and position the bubble chart 
	return (
      <div className="overview" style={{padding: this.state.visHeight*.075+"px " +this.state.visWidth*.0625 +"px"}}>
      	<div className="overview__BubblePositioningContainer">
	      	<div className="overview__BubbleContainer">
				<BubbleChart
				  graph= {{
				    zoom: 1,
				    offsetX: 0,
				    offsetY: -0.01,
				  }}
				  width={this.state.visWidth}
				  height={this.state.visHeight}
				  showLegend={false} 
				  valueFont={{
				        family: 'Arial',
				        size: 12,
				        color: '#fff',
				        weight: 'bold',
				      }}
				  labelFont={{
				        family: 'Arial',
				        size: 16,
				        color: '#fff',
				        weight: 'bold',
				      }}
				  bubbleClickFun={(label) => {this.props.onSelectCrypto(label)}}
				  data={bubbleData}
				/>
			</div>
		</div>
      </div>
  );
  }
}
