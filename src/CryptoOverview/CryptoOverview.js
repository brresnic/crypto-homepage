import React, { Component } from 'react';
import BubbleChart from '../BubbleChart';
import './CryptoOverview.css';

export default class CryptoOverview extends Component {
  constructor(props) {
      super(props);
      this.state = {width: 500, height: 500};
  }


  static defaultProps = {
    data: false
  };


  componentDidMount() {
    const height = document.getElementById('overview').clientHeight;
    const width = document.getElementById('overview').clientWidth;

    this.setState({height: height, width: width});
  }

  render() {
	const bubbleClick = (label) =>{
	  console.log("Custom bubble click func")
	}

	const bubbleData = this.props.data.map(d => ({
	  label: d.short,
	  value: d.mktcap,
	  color: d.color
	}));
	console.log(this.state.width);

	return (
      <div id="overview">
		<BubbleChart
		  graph= {{
		    zoom: 1,
		    offsetX: -0.05,
		    offsetY: -0.01,
		  }}
		  width={this.state.width}
		  height={this.state.height}
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
		  bubbleClickFunc={this.bubbleClick}
		  data={bubbleData}
		/>
      </div>
  );
  }
}
