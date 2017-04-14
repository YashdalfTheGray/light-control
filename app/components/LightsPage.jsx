import * as React from 'react';
import { Redirect } from 'react-router-dom';
import Snackbar from 'material-ui/Snackbar';

import Room from './Room';

export default class LightsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rooms: [],
            showSnackbar: false,
            snackbarMessage: ''
        };

        this.handleRequestClose = this.handleRequestClose.bind(this);
    }

    async componentDidMount() {
        try {
            const response = await fetch('/api/rooms', {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('userToken')}`
                }
            });
            const resBody = await response.json();

            this.setState({ // eslint-disable-line react/no-did-mount-set-state
                rooms: resBody
            });
        }
        catch (e) {
            this.setState({ // eslint-disable-line react/no-did-mount-set-state
                showSnackbar: true,
                snackbarMessage: 'There was an error getting the rooms'
            });
        }
    }

    handleRequestClose() {
        this.setState({
            showSnackbar: false,
            snackbarMessage: ''
        });
    }

    render() {
        let roomsToDisplay;

        if (!sessionStorage.getItem('userToken')) {
            return (<Redirect to="/" />);
        }

        if (this.state.rooms.length === 0) {
            roomsToDisplay = (
                <span style={{ fontFamily: 'Roboto', fontSize: '20px' }}>
                    No rooms to display
                </span>
            );
        }
        else {
            roomsToDisplay = this.state.rooms.map(r => (
                <div key={r.id} style={{ fontFamily: 'Roboto', fontSize: '20px' }}>
                    <Room key={r.id} {...r} />
                </div>
            ));
        }

        return (
            <div className="list" style={{ margin: '16px' }}>
                {roomsToDisplay}
                <Snackbar
                    open={this.state.showSnackbar}
                    message={this.state.snackbarMessage}
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestClose} />
            </div>
        );
    }
}
