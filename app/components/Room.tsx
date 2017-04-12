import * as React from 'react';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';

export interface RoomData {
    id: string;
    name: string;
    lightIds: string[];
    state: {};
}

class RoomState {
    showSnackbar: boolean;
    snackbarMessage: string;
}

export default class Room extends React.Component<RoomData, RoomState> {
    constructor(props: any) {
        super(props);

        this.state = {
            showSnackbar: false,
            snackbarMessage: ''
        };

        this.changeLightState = this.changeLightState.bind(this);
    }

    handleRequestClose() {
        this.setState({
            showSnackbar: false,
            snackbarMessage: ''
        });
    }

    async changeLightState(state: { on: boolean }) {
        try {
            const response = await fetch(`/api/rooms/${this.props.id}`, {
                method: 'post',
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('userToken')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(state)
            });
        }
        catch(e) {
            this.setState({
                showSnackbar: true,
                snackbarMessage: `An error occured while turning ${state.on ? 'on' : 'off'} lights`
            });
        }
    }

    render() {
        return (
            <div>
                <Card>
                    <CardTitle title={this.props.name} />
                    <CardText>
                        {this.props.lightIds.join(' ')}
                    </CardText>
                    <CardActions>
                        <FlatButton
                            label="All Off"
                            onTouchTap={this.changeLightState.bind(this, { on: false })} />
                        <FlatButton
                            label="All On"
                            primary={true}
                            onTouchTap={this.changeLightState.bind(this, { on: true })} />
                    </CardActions>
                </Card>
                <Snackbar
                    open={this.state.showSnackbar}
                    message={this.state.snackbarMessage}
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestClose} />
            </div>
        );
    }
}
