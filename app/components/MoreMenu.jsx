import * as React from 'react';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

const moreButton = (
    <IconButton
        iconClassName="material-icons"
        tooltip="More">
        more_vert
    </IconButton>
);

export default (
    <IconMenu
        iconButtonElement={moreButton}
        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}>
        <MenuItem primaryText="Delete Account" />
        <MenuItem primaryText="Logout" />
    </IconMenu>
);
