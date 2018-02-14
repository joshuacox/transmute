import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import { MenuItem } from 'material-ui/Menu';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import ChevronRightIcon from 'material-ui-icons/ChevronRight';
import { LinearProgress } from 'material-ui/Progress';
import Button from 'material-ui/Button';

import { Link } from "react-router-dom";
import { push } from "react-router-redux";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { toastMessage } from "../store/toast/actionCreators";

import { default as Routes, routes as pages } from "../pages";
import Header from "./header";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    width: '100%',
    height: 430,
    zIndex: 1,
    overflow: 'hidden',
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  appBar: {
    position: 'absolute',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'appBarShift-left': {
    marginLeft: drawerWidth,
  },
  'appBarShift-right': {
    marginRight: drawerWidth,
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    height: '100%',
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    width: '100%',
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64,
    },
  },
  'content-left': {
    marginLeft: -drawerWidth,
  },
  'content-right': {
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'contentShift-left': {
    marginLeft: 0,
  },
  'contentShift-right': {
    marginRight: 0,
  },
});

const Progress = ({ search }) => {
  return search.fetching && search.text ? (
    <div style={{ width: "100%" }}>
      <LinearProgress />
    </div>
  ) : (
    <div />
  );
};

class App extends React.Component {
  state = {
    open: false,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, theme, location, firebase, dispatchRaw, redirectToPath, search, toastMessage } = this.props;
    const { open } = this.state;

    const drawer = (
      <Drawer
        variant="persistent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
        open={open}
      >
        <div className={classes.drawerInner}>
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
          <List component="nav">
            <ListItem button containerElement={<Link to={pages.home.path} />}>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button containerElement={<Link to={pages.search.path} />}>
              <ListItemText primary="Search" />
            </ListItem>
          </List>
        </div>
      </Drawer>
    );

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar
            position="static"
            className={classNames(classes.appBar, {
              [classes.appBarShift]: open,
              [classes[`appBarShift-left`]]: open,
            })}
          >
            <Toolbar disableGutters={!open}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(classes.menuButton, open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="title" color="inherit" className={classes.flex} containerElement={<Link to={pages.home.path} />}>
                Transmute ReadModel Demo
              </Typography>
            </Toolbar>
          </AppBar>
          {drawer}
          <main
            className={classNames(classes.content, classes[`content-left`], {
              [classes.contentShift]: open,
              [classes[`contentShift-left`]]: open,
            })}
          >
            <Typography>{'You think water moves fast? You should see ice.'}</Typography>
          </main>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    firebase: state.firebase,
    location: state.routing.location,
    search: state.search
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      dispatchRaw: action => {
        return action;
      },
      toastMessage,
      redirectToPath: somePath => push(somePath)
    },
    dispatch
  );

App.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(App));
