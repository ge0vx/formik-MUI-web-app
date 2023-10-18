import * as React from 'react';
import { TableHead, TableRow, TableCell, Checkbox } from '@material-ui/core';

export interface ITableColumnHead {
  id: string;
  disablePadding: boolean;
  numeric: boolean;
  label: string;
}

interface ITableHeadProps {
  onSelectAllClick: (event: any, checked: boolean) => void;
  numSelected: number;
  rowCount: number;
  columns: ITableColumnHead[];
}

class EnhancedTableHead extends React.Component<ITableHeadProps> {
  render() {
    const { onSelectAllClick, numSelected, rowCount, columns } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {columns.map(column => (
            <TableCell
              key={column.id}
              padding={column.disablePadding ? 'none' : 'default'}
            >
              {column.label}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }
}

export default EnhancedTableHead;
