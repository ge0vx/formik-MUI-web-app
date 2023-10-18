import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import {
  AppBar,
  Button,
  Toolbar,
  WithStyles,
  withStyles,
  StyleRulesCallback
} from '@material-ui/core';
import { NavLink, Redirect } from 'react-router-dom';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import { compose } from 'redux';

import FormikDemo from './FormikDemo';
import TableDemo from './TableDemo';
import UIDemo from './UIDemo';
import ReactDndDemo from './ReactDndDemo';

type Classes = 'link';

const styles: StyleRulesCallback<Classes> = theme => ({
  link: {
    color: '#fff',
    textDecoration: 'none'
  }
});

interface IProps extends WithStyles<Classes> {}

const App: React.SFC<IProps> = ({ classes }) => (
  <React.Fragment>
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit">
          <NavLink to="/formik" className={classes.link}>
            Formik
          </NavLink>
        </Button>
        <Button color="inherit">
          <NavLink to="/table" className={classes.link}>
            Table
          </NavLink>
        </Button>
        <Button color="inherit">
          <NavLink to="/ui-elements" className={classes.link}>
            UI Elements
          </NavLink>
        </Button>
        <Button color="inherit">
          <NavLink to="/react-dnd" className={classes.link}>
            React DND
          </NavLink>
        </Button>
      </Toolbar>
    </AppBar>
    <Switch>
      <Redirect exact={true} from="/" to="/formik" />
      <Route exact path="/formik" component={FormikDemo} />
      <Route exact path="/table" component={TableDemo} />
      <Route exact path="/ui-elements" component={UIDemo} />
      <Route exact path="/react-dnd" component={ReactDndDemo} />
    </Switch>
  </React.Fragment>
);

const enhance = compose(
  withStyles(styles),
  DragDropContext(HTML5Backend)
);

export default enhance(App);
