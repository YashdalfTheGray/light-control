import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';

import LoginPage from './LoginPage';
import LightsPage from './LightsPage';
import MoreMenu from './MoreMenu';

export default function AppComponent() {
    return (
        <div>
            <AppBar
                title="Light Control"
                iconElementRight={MoreMenu}
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
