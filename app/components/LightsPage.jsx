import * as React from 'react';
import { Redirect } from 'react-router-dom';

import { appStore, actions } from '../store';
import Room from './Room';

export default class LightsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rooms: []
        };

        this.unsubscribe = appStore.subscribe(() => {
            const { rooms } = appStore.getState();
            this.setState({ rooms });
        });
    }

    componentWillMount() {
        actions.getRooms(appStore.getState().userToken);
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const { rooms } = this.state;
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
            </div>
        );
    }
}
