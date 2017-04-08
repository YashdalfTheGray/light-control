import * as React from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';

interface Room {
    id: string;
    name: string;
    lightIds: string[];
    state: {};
}

class LightsPageState {
    rooms: Room[];
}

export default class LightsPage extends React.Component<RouteComponentProps<any>, {}> {
    render() {
        if (!sessionStorage.getItem('userToken')) {
            return (<Redirect to="/" />);
        }

        return (
            <div>
                <h3 style={{ fontFamily: 'Roboto' }}>Lights Page</h3>
            </div>
        );
    }
}
