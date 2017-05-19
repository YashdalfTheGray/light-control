import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Snackbar from 'material-ui/Snackbar';

import LoginPage from './LoginPage';
import LightsPage from './LightsPage';
import { actions, appStore } from '../store';

window.appStore = appStore;
window.actions = actions;

export default class AppComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showMenu: false,
            showSnackbar: false
        };

        this.unsubscribe = appStore.subscribe(() => {
            const { userToken, snackbarMessage } = appStore.getState();
            this.setState({
                showMenu: !!userToken,
                showSnackbar: !!snackbarMessage
            });
        });

        this.handleRequestClose = this.handleRequestClose.bind(this);
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    handleRequestClose() {
        actions.clearMessage();
        this.setState({
            showSnackbar: false
        });
    }

    render() {
        const { showMenu, showSnackbar } = this.state;
        const { snackbarMessage } = appStore.getState();

        const moreButton = (
            <IconButton
                iconClassName="material-icons"
                tooltip="More">
                more_vert
            </IconButton>
        );

        const moreMenu = (
            <IconMenu
                iconButtonElement={moreButton}
                onItemTouchTap={this.handleMenuChange}
                targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'top' }}>
                <MenuItem
                    primaryText="Delete Account"
                    onTouchTap={() => console.log('delete account clicked')} />
                <MenuItem
                    primaryText="Logout"
                    onTouchTap={() => actions.logoutUser()} />
            </IconMenu>
        );

        return (
            <div>
                <AppBar
                    title="Light Control"
                    iconElementRight={showMenu ? moreMenu : null}
                    showMenuIconButton={false} />
                <Snackbar
                    open={showSnackbar}
                    message={snackbarMessage}
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestClose} />
                <Router>
                    <div>
                        <Route exact path="/" component={LoginPage} />
                        <Route path="/lights" component={LightsPage} />
                    </div>
                </Router>
            </div>
        );
    }
}
