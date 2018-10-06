import React, { Component } from 'react';
import Highcharts from 'highcharts';
import {default as UUID} from "node-uuid";
import './LineChart.css';

export default class LineChart extends Component {

  componentWillMount() {
    this.id = UUID.v4();
  }

  componentDidMount() {
    Highcharts.chart(this.id, {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Placeholder Bar Graph'
        },
        xAxis: {
            categories: ['Lorum', 'Ipsum', 'Oranges']
        },
        yAxis: {
            title: {
                text: 'Fruit eaten'
            }
        },
        series: [{
            name: 'Jane',
            data: [1, 0, 4]
        }, {
            name: 'John',
            data: [5, 7, 3]
        }]
    });
  }

  render() {

      return (
          <div id={this.id}>
          </div>
      );
  }
}
