import * as React from 'react';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

export interface RoomData {
    id: string;
    name: string;
    lightIds: string[];
    state: {};
}

const Room: React.SFC<RoomData> = (props) => {

    return (
        <Card>
            <CardTitle title={props.name} />
            <CardText>
                {props.lightIds.join(' ')}
            </CardText>
            <CardActions>
                <FlatButton label="All Off" />
                <FlatButton label="All On" />
            </CardActions>
        </Card>
    );
}

export default Room;
