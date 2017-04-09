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
    showSnackbar: boolean;
    snackbarMessage: string;
}

export default class LightsPage extends React.Component<RouteComponentProps<any>, LightsPageState> {
    constructor(props: any) {
        super(props);

        this.state = {
            rooms: [],
            showSnackbar: false,
            snackbarMessage: ''
        };
    }

    async componentDidMount() {
        try {
            const response = await fetch(`/api/rooms`, {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('userToken')}`
                }
            });
            const resBody = await response.json();

            this.setState({
                rooms: resBody
            });
        }
        catch(e) {
            this.setState({
                showSnackbar: true,
                snackbarMessage: 'There was an error getting the rooms'
            });
        }
    }

    render() {
        if (!sessionStorage.getItem('userToken')) {
            return (<Redirect to="/" />);
        }

        return (
            <div
                style={{ fontFamily: 'Roboto', margin: '16px', fontSize: '20px' }}>
                No rooms to display
            </div>
        );
    }
}
