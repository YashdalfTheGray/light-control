import * as React from 'react';
import * as PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';

const RoomLight = props => (
    <IconButton
        iconClassName="material-icons"
        onTouchTap={props.toggleState}>
        lightbulb_outline
    </IconButton>
);

RoomLight.propTypes = {
    toggleState: PropTypes.func.isRequired
};

export default RoomLight;
