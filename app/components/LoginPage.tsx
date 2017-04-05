import * as React from 'react';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

class LoginPageState {
    rooms?: Object[];
}

export default class LoginPage extends React.Component<{}, LoginPageState> {
    async componentDidMount() {
        try {
            const response = await fetch('/api/users/login?name=test');

            console.log(await response.json());
        }
        catch(e) {
            console.log(e);
        }

    }

    render() {
        return (
            <Card style={{ margin: '16px' }}>
                <CardTitle title="Login" />
                <CardText>
                    <TextField
                        floatingLabelText="Name"
                        fullWidth={true} />
                </CardText>
                <CardActions>
                    <FlatButton label="Register" />
                    <FlatButton label="Login" primary={true} />
                </CardActions>
            </Card>
        );
    }
}
