import * as React from 'react';
import * as PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';

const RoomLight = props => (
    <IconButton
        iconClassName="material-icons"
        onTouchTap={() => console.log(props.id)}>
        lightbulb_outline
    </IconButton>
);

RoomLight.propTypes = {
    id: PropTypes.string.isRequired
};

export default RoomLight;
