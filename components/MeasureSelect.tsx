import { Select } from '@mantine/core';
import { Component } from 'react';

export default class MeasureSelect extends Component {
  measures: string[];
  constructor(props: {}) {
    super(props);
    this.measures = ['exm-104', 'exm-105', 'exm-124', 'exm-125'];
  }

  render() {
    return <Select placeholder="Measure ID" data={this.measures} />;
  }
}
