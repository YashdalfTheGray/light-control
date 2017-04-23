import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

import LoginPage from './LoginPage';
import LightsPage from './LightsPage';
import { appStore } from '../store';

function isUserLoggedIn() {
    return !!sessionStorage.getItem('userToken');
}

async function handleMenuChange(event) {
    console.log(event.currentTarget.innerText, isUserLoggedIn());
}

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
        onItemTouchTap={handleMenuChange}
        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}>
        <MenuItem
            primaryText="Delete Account" />
        <MenuItem
            primaryText="Logout" />
    </IconMenu>
);

export default function AppComponent() {
    return (
        <div>
            <AppBar
                title="Light Control"
                iconElementRight={moreMenu}
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

window.appStore = appStore;
