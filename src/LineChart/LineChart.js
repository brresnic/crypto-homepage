import React, { Component } from 'react';
import Highcharts from 'highcharts';
import {default as UUID} from "node-uuid";
import './LineChart.css';

export default class LineChart extends Component {

  static defaultProps = {
    data: false,
    cryptoName: ""
  };

  componentWillMount() {
    this.id = UUID.v4();
  }

  componentDidMount() {
    if(this.props.data) {
              Highcharts.chart(this.id, {
          chart: {
              type: 'line',
              backgroundColor: '#DCDCDD'
          },
          credits: {
            enabled: false
          },
          title: {
              text: ''
          },
          xAxis: {
            type: 'datetime',
          },
          tooltip: {
            valueDecimals: 2,
            valuePrefix: '$',
            valueSuffix: ' USD'
          },
          yAxis: {
              title: {
                  text: ''
              },
              labels: {
                formatter: function() {
                    return '$'+this.value;
                }
              }
          },
          series: [{
              name: this.props.cryptoName + ' price over time',
              data: this.props.data
          }]
        });
    }

  }

  componentDidUpdate(prevProps) {
    if(this.props.data) {
              Highcharts.chart(this.id, {
          chart: {
              type: 'line',
              backgroundColor: '#DCDCDD'
          },
          credits: {
            enabled: false
          },
          title: {
              text: ''
          },
          xAxis: {
            type: 'datetime',
          },
          tooltip: {
            valueDecimals: 2,
            valuePrefix: '$',
            valueSuffix: ' USD'
          },
          yAxis: {
              title: {
                  text: ''
              },
              labels: {
                formatter: function() {
                    return '$'+this.value;
                }
              }
          },
          series: [{
              name: this.props.cryptoName + ' price over time',
              data: this.props.data
          }]
        });
    }
  }


  render() {
      return (
          <div id={this.id}>
            <div id={this.id}></div>
            <div className="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
          </div>
      );
  }
}
