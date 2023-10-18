import * as React from 'react';
import SortableGallary from './components/SortableGallary';

class TableDemo extends React.Component {
  get items() {
    return [{ id: 1, name: 'first' }, { id: 2, name: 'second' }];
  }

  render() {
    return <SortableGallary items={this.items} />;
  }
}

export default TableDemo;
