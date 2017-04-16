import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';

import RoomLight from './RoomLight';

class Room extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showSnackbar: false,
            expanded: false,
            snackbarMessage: ''
        };

        this.changeLightState = this.changeLightState.bind(this);
        this.turnLightsOn = this.turnLightsOn.bind(this);
        this.turnLightsOff = this.turnLightsOff.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
        this.handleExpandChange = this.handleExpandChange.bind(this);
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

    async changeLightState(state) {
        try {
            await fetch(`/api/rooms/${this.props.id}`, {
                method: 'post',
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('userToken')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(state)
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
        return this.changeLightState({ on: true });
    }

    async turnLightsOff() {
        return this.changeLightState({ on: false });
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
