import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

import LoginPage from './LoginPage';
import LightsPage from './LightsPage';
import { actions, appStore } from '../store';

window.appStore = appStore;
window.actions = actions;

export default class AppComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showMenu: false
        };

        this.unsubscribe = appStore.subscribe(() => {
            console.log(appStore.getState());
            this.setState({
                showMenu: !!appStore.getState().userToken
            });
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    handleMenuChange(event) {
        console.log(event.currentTarget.innerText, this.state.showMenu);
    }

    render() {
        const { showMenu } = this.state;

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
                    primaryText="Delete Account" />
                <MenuItem
                    primaryText="Logout" />
            </IconMenu>
        );

        return (
            <div>
                <AppBar
                    title="Light Control"
                    iconElementRight={showMenu ? moreMenu : null}
                    showMenuIconButton={false} />
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
