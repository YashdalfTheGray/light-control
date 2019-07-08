import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import MoreVert from '@material-ui/icons/MoreVert';

import LoginPage from './LoginPage';
import LightsPage from './LightsPage';
import { actions, appStore } from '../store';

export default class AppComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showMenu: false,
      showSnackbar: false,
      showDialog: false,
      menuAnchor: null
    };

    this.unsubscribe = appStore.subscribe(() => {
      const { userToken, snackbarMessage } = appStore.getState();
      this.setState({
        showMenu: !!userToken,
        showSnackbar: !!snackbarMessage
      });
    });

    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleDialogOpen = this.handleDialogOpen.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleRequestClose() {
    actions.clearMessage();
    this.setState({ showSnackbar: false });
  }

  handleDialogOpen() {
    this.setState({ showDialog: true });
  }

  handleDialogClose(deleteAccount) {
    const { userToken, user } = appStore.getState();
    if (deleteAccount) {
      actions.deleteAccount(userToken, user);
    }
    this.setState({ showDialog: false });
  }

  handleMenuOpen(event) {
    this.setState({ menuAnchor: event.currentTarget });
  }

  handleMenuClose() {
    this.setState({ menuAnchor: null });
  }

  render() {
    const { showMenu, showSnackbar, showDialog, menuAnchor } = this.state;
    const { snackbarMessage } = appStore.getState();

    const dialogActions = [
      <Button
        primary
        label="Cancel"
        onClick={() => this.handleDialogClose(false)}
      />,
      <Button
        primary
        label="Delete"
        onClick={() => this.handleDialogClose(true)}
      />
    ];

    return (
      <div>
        <AppBar
          title="Light Control"
          iconElementRight={
            showMenu ? (
              <IconButton aria-label="More" onClick={this.handleMenuOpen}>
                <MoreVert />
              </IconButton>
            ) : null
          }
          showMenuIconButton={false}
        />
        <Snackbar
          open={showSnackbar}
          message={snackbarMessage}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
        <Router>
          <div>
            <Route exact path="/" component={LoginPage} />
            <Route path="/lights" component={LightsPage} />
          </div>
        </Router>
        <Dialog
          actions={dialogActions}
          modal={false}
          open={showDialog}
          onRequestClose={this.handleDialogClose}>
          Delete your account?
        </Dialog>
        <Menu
          id="simple-menu"
          anchorEl={menuAnchor}
          keepMounted
          open={Boolean(menuAnchor)}
          onClose={this.handleMenuClose}>
          <MenuItem
            primaryText="Delete Account"
            onClick={this.handleDialogOpen}
          />
          <MenuItem primaryText="Logout" onClick={actions.logoutUser} />
        </Menu>
      </div>
    );
  }
}
