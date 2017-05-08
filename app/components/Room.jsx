import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { assign } from 'lodash';

import { appStore } from '../store';
import RoomLight from './RoomLight';

const getOneLightState = async id => fetch(`/api/lights/${id}`, {
    headers: {
        Authorization: `Bearer ${appStore.getState().userToken}`,
        'Content-Type': 'application/json'
    }
});

const getAllLightStates = async (lightIds) => {
    const responses = await Promise.all(lightIds.map(i => getOneLightState(i)));
    const lightStates = await Promise.all(responses.map(r => r.json()));
    return lightStates.reduce((acc, { id, state: { on } }) => ({ ...acc, [id]: on }), {});
};

export default class Room extends React.Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        lightIds: PropTypes.array.isRequired
    };

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
                snackbarMessage: 'Could not get light details'
            });
        }
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
                    Authorization: `Bearer ${appStore.getState().userToken}`,
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
                snackbarMessage: `Cannot turn lights ${state.on ? 'on' : 'off'}`
            });
        }
    }

    async changeOneLight(id) {
        try {
            await fetch(`api/lights/${id}`, {
                method: 'post',
                headers: {
                    Authorization: `Bearer ${appStore.getState().userToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ on: !this.state.lights[id] })
            });
            const response = await getOneLightState(id);
            const { id: lightId, state: { on } } = await response.json();
            this.setState({
                lights: assign({}, this.state.lights, { [lightId]: on })
            });
        }
        catch (e) {
            this.setState({
                showSnackbar: true,
                snackbarMessage: 'Cannot change light state'
            });
        }
    }

    async turnLightsOn() {
        return this.changeRoomState({ on: true });
    }

    async turnLightsOff() {
        return this.changeRoomState({ on: false });
    }

    render() {
        return (
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
        );
    }
}
