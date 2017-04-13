import * as React from 'react';
import IconButton from 'material-ui/IconButton';

class RoomLightProps {
    id: string;
}

const RoomLight: React.SFC<RoomLightProps> = props => (
    <IconButton
        iconClassName="material-icons"
        onTouchTap={() => console.log(props.id)}>
        lightbulb_outline
    </IconButton>
);

export default RoomLight;
