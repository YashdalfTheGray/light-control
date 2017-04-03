import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as injectTapEventPlugin from 'react-tap-event-plugin';

const AppComponent = () => (
    <h1>React app loaded</h1>
);

injectTapEventPlugin();

ReactDOM.render(
    <AppComponent />,
    document.querySelector('#app')
);
