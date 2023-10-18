import * as React from 'react';
import {
  withStyles,
  StyleRulesCallback,
  WithStyles
} from '@material-ui/core/styles';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Checkbox,
  TablePagination
} from '@material-ui/core';

import EnhancedTableHead, { ITableColumnHead } from './EnhancedTableHead';
import EnhancedTableToolbar from './EnhancedTableToolbar';

type TableToolbarClassNames = 'root' | 'tableWrapper';

interface IData {
  id: number;
  cellData: any[];
}

let counter = 0;
function createData(data = []): IData {
  counter += 1;
  return { id: counter, cellData: data };
}

const styles: StyleRulesCallback<TableToolbarClassNames> = theme => ({
  root: {
    width: '100%'
  },
  tableWrapper: {
    overflowX: 'auto'
  }
});

interface IOptions {
  page?: number;
  rowsPerPage?: number;
  pagination?: boolean;
}

interface IProps extends WithStyles<TableToolbarClassNames> {
  columnsHead: ITableColumnHead[];
  data: any[];
  title?: string;
  options?: IOptions;
}

interface IState {
  selected: number[];
  tableData: any[];
  page: number;
  rowsPerPage: number;
}

class EnhancedTable extends React.Component<IProps, IState> {
  state = {
    selected: [],
    tableData: [],
    page: 0,
    rowsPerPage: 5
  };

  static defaultProps = {
    options: {
      pagination: false,
      page: 0,
      rowsPerPage: 5
    }
  };

  static getDerivedStateFromProps({ data, options }: IProps) {
    const newState: Partial<IState> = {
      tableData: data.map(row => createData(row))
    };

    if (options && options.page) {
      newState.page = options.page;
    }

    if (options && options.rowsPerPage) {
      newState.rowsPerPage = options.rowsPerPage;
    }

    return newState;
  }

  handleSelectAllClick = (event: any, checked: boolean) => {
    if (checked) {
      this.setState(state => ({ selected: state.tableData.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event: any, id: number) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected: any[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    this.setState({ selected: newSelected });
  };

  isSelected = (id: number): boolean => {
    const index: number = this.state.selected.indexOf(id);

    return index !== -1;
  };

  handleChangePage = (event: any, page: number) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = (event: any) => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const { classes, columnsHead, title, options } = this.props;
    const { tableData, selected, rowsPerPage, page } = this.state;

    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar numSelected={selected.length} title={title} />
        <div className={classes.tableWrapper}>
          <Table aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              onSelectAllClick={this.handleSelectAllClick}
              rowCount={tableData.length}
              columns={columnsHead}
            />
            <TableBody>
              {tableData.map(({ cellData = [], id }: IData) => {
                const isSelected = this.isSelected(id);
                return (
                  <TableRow
                    hover={true}
                    onClick={event => this.handleClick(event, id)}
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={id}
                    selected={isSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox checked={isSelected} />
                    </TableCell>
                    {cellData.map((cell: any, index: number) => (
                      <TableCell key={index}>{cell}</TableCell>
                    ))}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        {options &&
          options.pagination && (
            <TablePagination
              component="div"
              count={tableData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              backIconButtonProps={{
                'aria-label': 'Previous Page'
              }}
              nextIconButtonProps={{
                'aria-label': 'Next Page'
              }}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
          )}
      </Paper>
    );
  }
}

export default withStyles(styles)(EnhancedTable);
