import * as React from 'react';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import {
  WithStyles,
  StyleRulesCallback,
  Toolbar,
  Typography,
  Tooltip,
  IconButton,
  withStyles
} from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import classNames from 'classnames';

type ClassNames = 'root' | 'highlight' | 'spacer' | 'actions' | 'title';

const toolbarStyles: StyleRulesCallback<ClassNames> = theme => ({
  root: {
    paddingRight: theme.spacing.unit
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  spacer: {
    flex: '1 1 100%'
  },
  actions: {
    color: theme.palette.text.secondary
  },
  title: {
    flex: '0 0 auto'
  }
});

interface ITableToolbarProps extends WithStyles<ClassNames> {
  numSelected: number;
  title?: string;
}

const EnhancedTableToolbar = ({
  numSelected,
  classes,
  title
}: ITableToolbarProps) => {
  const renderTitle = (): JSX.Element | null => {
    if (!title) {
      return null;
    }
    return (
      <Typography variant="title" id="tableTitle">
        {title}
      </Typography>
    );
  };

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subheading">
            {numSelected} selected
          </Typography>
        ) : (
          renderTitle()
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 && (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </Toolbar>
  );
};

export default withStyles(toolbarStyles)(EnhancedTableToolbar);
