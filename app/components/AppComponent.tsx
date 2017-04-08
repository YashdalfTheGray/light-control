import * as React from 'react';
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';

import LoginPage from './LoginPage';
import LightsPage from './LightsPage';

export default function AppComponent() {
    const moreButton = (
        <IconButton
            iconClassName="material-icons"
            tooltip="More">
            more_vert
        </IconButton>
    );

    return (
        <div>
            <AppBar
                title="Light Control"
                iconElementRight={moreButton}
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
