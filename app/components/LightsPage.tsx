import * as React from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import Snackbar from 'material-ui/Snackbar';

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

        this.handleRequestClose = this.handleRequestClose.bind(this);
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

    handleRequestClose() {
        this.setState({
            showSnackbar: false,
            snackbarMessage: ''
        });
    }

    render() {
        if (!sessionStorage.getItem('userToken')) {
            return (<Redirect to="/" />);
        }

        return (
            <div style={{ margin: '16px' }}>
                <span style={{ fontFamily: 'Roboto', fontSize: '20px' }}>
                    No rooms to display
                </span>
                <Snackbar
                    open={this.state.showSnackbar}
                    message={this.state.snackbarMessage}
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestClose} />
            </div>
        );
    }
}
