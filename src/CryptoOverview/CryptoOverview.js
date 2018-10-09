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
    console.log(height);
    const width = document.getElementsByClassName('overview')[0].clientWidth;

    this.setState({visHeight: height, visWidth: width*.8});
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(label) {
  	console.log(label);
  }

  render() {

	const bubbleData = this.props.data.map(d => ({
	  label: d.short,
	  value: d.mktcap,
	  color: d.color
	}));

	return (
      <div class="overview" style={{padding: this.state.visHeight*.0625+"px " +this.state.visWidth*.0625 +"px"}}>
      	<div class="bubbleContainer">
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
			  bubbleClickFun={(label) => {this.handleClick(label)}}
			  data={bubbleData}
			/>
		</div>
      </div>
  );
  }
}
