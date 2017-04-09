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

export default class LightsPage extends React.Component<RouteComponentProps<any>, LightsPageState> {
    constructor(props: any) {
        super(props);

        this.state = {
            rooms: []
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
            }, () => {
                console.log(this.state);
            });
        }
        catch(e) {
            console.log(e);
        }
    }

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
