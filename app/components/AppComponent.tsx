import * as React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';

export default class AppComponent extends React.Component<{}, {}> {
    render() {
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
            </div>
        );
    }
}
