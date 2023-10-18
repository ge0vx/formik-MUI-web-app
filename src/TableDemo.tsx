import * as React from 'react';
import EnhancedTable from './components/EnhancedTable';

const columnData = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Dessert (100g serving)'
  },
  { id: 'calories', numeric: true, disablePadding: false, label: 'Calories' },
  { id: 'fat', numeric: true, disablePadding: false, label: 'Fat (g)' },
  { id: 'carbs', numeric: true, disablePadding: false, label: 'Carbs (g)' },
  { id: 'protein', numeric: true, disablePadding: false, label: 'Protein (g)' }
];

const data = [['Cupcake', 305, 3.7, 67, 4.3], ['Donut', 452, 25.0, 51, 4.9]];

class TableDemo extends React.Component {
  get options() {
    return {
      pagination: true
    };
  }

  render() {
    return (
      <EnhancedTable
        columnsHead={columnData}
        data={data}
        options={this.options}
      />
    );
  }
}

export default TableDemo;
