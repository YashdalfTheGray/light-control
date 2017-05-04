import * as React from 'react';
import { Redirect } from 'react-router-dom';
import Snackbar from 'material-ui/Snackbar';

import { appStore, actions } from '../store';
import Room from './Room';

export default class LightsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showSnackbar: false
        };

        this.unsubscribe = appStore.subscribe(() => {
            this.setState({ showSnackbar: !!appStore.getState().snackbarMessage });
        });

        this.handleRequestClose = this.handleRequestClose.bind(this);
    }

    componentWillMount() {
        actions.getRooms(appStore.getState().userToken);
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    handleRequestClose() {
        this.setState({
            showSnackbar: false
        });
    }

    render() {
        const { rooms, snackbarMessage } = appStore.getState();
        let roomsToDisplay;

        if (!appStore.getState().userToken) {
            return (<Redirect to="/" />);
        }

        if (rooms.length === 0) {
            roomsToDisplay = (
                <span style={{ fontFamily: 'Roboto', fontSize: '20px' }}>
                    No rooms to display
                </span>
            );
        }
        else {
            roomsToDisplay = rooms.map(r => (<Room key={r.id} {...r} />));
        }

        return (
            <div className="list" style={{ margin: '16px' }}>
                {roomsToDisplay}
                <Snackbar
                    open={this.state.showSnackbar}
                    message={snackbarMessage}
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestClose} />
            </div>
        );
    }
}
