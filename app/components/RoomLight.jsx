import * as React from 'react';
import * as PropTypes from 'prop-types';
import grey from '@material-ui/core/colors/grey';
import IconButton from '@material-ui/core/IconButton';

const grey400 = grey[400];
const grey900 = grey[900];

const RoomLight = ({ lightState, toggleState }) => (
  <IconButton
    iconStyle={{ color: lightState ? grey900 : grey400 }}
    iconClassName="material-icons"
    onTouchTap={toggleState}>
    lightbulb_outline
  </IconButton>
);

RoomLight.propTypes = {
  toggleState: PropTypes.func.isRequired,
  lightState: PropTypes.bool.isRequired
};

export default RoomLight;
