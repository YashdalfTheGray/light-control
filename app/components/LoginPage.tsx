import * as React from 'react';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

class LoginPageState {
    name?: string;
}

export default class LoginPage extends React.Component<{}, LoginPageState> {
    constructor(props: any) {
        super(props);

        this.state = {
            name: ''
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleNameChange({ currentTarget: { value } }:React.FormEvent<HTMLInputElement>) {
        this.setState({
            name: value
        });
    }

    async handleLogin() {
        console.log(this.state);
    }

    render() {
        return (
            <Card style={{ margin: '16px' }}>
                <CardTitle title="Login" />
                <CardText>
                    <TextField
                        floatingLabelText="Name"
                        fullWidth={true}
                        onChange={this.handleNameChange} />
                </CardText>
                <CardActions>
                    <FlatButton label="Register" />
                    <FlatButton
                        label="Login"
                        primary={true}
                        onTouchTap={this.handleLogin} />
                </CardActions>
            </Card>
        );
    }
}
