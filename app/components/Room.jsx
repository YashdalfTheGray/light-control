import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';

import RoomLight from './RoomLight';

const getOneLightState = async id => fetch(`/api/lights/${id}`, {
    headers: {
        Authorization: `Bearer ${sessionStorage.getItem('userToken')}`,
        'Content-Type': 'application/json'
    }
});

const getAllLightStates = async (lightIds) => {
    const responses = await Promise.all(lightIds.map(i => getOneLightState(i)));
    const lightStates = await Promise.all(responses.map(r => r.json()));
    return lightStates.reduce((acc, { id, state: { on } }) => ({ ...acc, [id]: on }), {});
};

class Room extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showSnackbar: false,
            expanded: false,
            snackbarMessage: '',
            lights: []
        };

        this.changeRoomState = this.changeRoomState.bind(this);
        this.turnLightsOn = this.turnLightsOn.bind(this);
        this.turnLightsOff = this.turnLightsOff.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
        this.handleExpandChange = this.handleExpandChange.bind(this);
    }

    async componentWillMount() {
        try {
            const lightStates = await getAllLightStates(this.props.lightIds);
            this.setState({
                lights: lightStates
            });
        }
        catch (e) {
            console.log(e);
            this.setState({
                showSnackbar: true,
                snackbarMessage: 'Couldn\'t get the state of each light'
            });
        }
    }

    handleRequestClose() {
        this.setState({
            showSnackbar: false,
            snackbarMessage: ''
        });
    }

    handleExpandChange(newState) {
        this.setState({
            expanded: newState
        });
    }

    async changeRoomState(state) {
        try {
            await fetch(`/api/rooms/${this.props.id}`, {
                method: 'post',
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('userToken')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(state)
            });
            const lightStates = await getAllLightStates(this.props.lightIds);
            this.setState({
                lights: lightStates
            });
        }
        catch (e) {
            this.setState({
                showSnackbar: true,
                snackbarMessage: `An error occured while turning ${state.on ? 'on' : 'off'} lights`
            });
        }
    }

    async changeOneLight(id) {
        console.log(this.state);
        console.log(id);
    }

    async turnLightsOn() {
        return this.changeRoomState({ on: true });
    }

    async turnLightsOff() {
        return this.changeRoomState({ on: false });
    }

    render() {
        return (
            <div>
                <Card
                    expanded={this.state.expanded}
                    initiallyExpanded={false}
                    onExpandChange={this.handleExpandChange}>
                    <CardTitle
                        showExpandableButton
                        title={this.props.name} />
                    <CardText
                        expandable>
                        {this.props.lightIds.map(id => (
                            <RoomLight key={id} toggleState={this.changeOneLight.bind(this, id)} />
                        ))}
                    </CardText>
                    <CardActions>
                        <FlatButton
                            label="All Off"
                            onTouchTap={this.turnLightsOff} />
                        <FlatButton
                            label="All On"
                            primary
                            onTouchTap={this.turnLightsOn} />
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

Room.propTypes = {
    name: PropTypes.string.isRequired,
    lightIds: PropTypes.array.isRequired
};

export default Room;
