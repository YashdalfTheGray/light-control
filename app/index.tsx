import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import AppComponent from './components/AppComponent';

const App = () => (
    <MuiThemeProvider>
        <AppComponent />
    </MuiThemeProvider>
);

injectTapEventPlugin();

ReactDOM.render(
    <App />,
    document.querySelector('#app')
);
