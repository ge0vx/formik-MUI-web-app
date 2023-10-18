import * as React from 'react';
import {
  Paper,
  withStyles,
  WithStyles,
  StyleRulesCallback,
  IconButton
} from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';

type Classes = 'root' | 'field';

const styles: StyleRulesCallback<Classes> = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing.unit * 0.5,
    display: 'flex',
    alignItems: 'center'
  },
  field: {
    width: '100%',
    border: 'none',
    flexGrow: 1,
    padding: theme.spacing.unit
  }
});

interface IProps extends WithStyles<Classes> {
  placeholder?: string;
  value?: string;
  onChange?: (s: string) => void;
  onRequestSearch?: (s: string) => void;
}

interface IState {
  searchText: string;
}

class SearchBar extends React.Component<IProps, IState> {
  state = {
    searchText: this.props.value || ''
  };

  handleRequest = () => {
    const { onRequestSearch } = this.props;
    const { searchText } = this.state;

    if (onRequestSearch) onRequestSearch(searchText);
  };

  handleChange = (e: any) => {
    e.persist();
    const { onChange } = this.props;

    this.setState(
      {
        searchText: e.target.value
      },
      () => {
        if (onChange) {
          onChange(e.target.value);
        }
      }
    );
  };

  render() {
    const { classes, placeholder, onRequestSearch } = this.props;
    const { searchText } = this.state;

    return (
      <Paper className={classes.root}>
        <input
          type="text"
          value={searchText}
          onChange={this.handleChange}
          className={classes.field}
          placeholder={placeholder}
        />
        <IconButton onClick={this.handleRequest} disabled={!onRequestSearch}>
          <SearchIcon />
        </IconButton>
      </Paper>
    );
  }
}

export default withStyles(styles)(SearchBar);
