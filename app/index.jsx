import * as React from 'react';
import * as ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import AppComponent from './components/AppComponent';

const App = () => (
  <>
    <CssBaseline />
    <AppComponent />
  </>
);

ReactDOM.render(<App />, document.querySelector('#app'));
