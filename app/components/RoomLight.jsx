import * as React from 'react';
import * as PropTypes from 'prop-types';
import { grey400, grey900 } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';

const RoomLight = props => (
    <IconButton
        iconStyle={{ color: props.lightState ? grey900 : grey400 }}
        iconClassName="material-icons"
        onTouchTap={props.toggleState}>
        lightbulb_outline
    </IconButton>
);

RoomLight.propTypes = {
    toggleState: PropTypes.func.isRequired,
    lightState: PropTypes.bool.isRequired
};

export default RoomLight;
