import * as React from 'react';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';

class LoginPageState {
    name?: string;
    token?: string;
    showLoginSnackbar?: boolean;
    loginMessage?: string;
}

export default class LoginPage extends React.Component<{}, LoginPageState> {
    constructor(props: any) {
        super(props);

        this.state = {
            name: '',
            token: '',
            showLoginSnackbar: false,
            loginMessage: ''
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
    }

    handleNameChange({ currentTarget: { value } }:React.FormEvent<HTMLInputElement>) {
        this.setState({
            name: value.toLowerCase()
        });
    }

    handleRequestClose() {
        this.setState({
            showLoginSnackbar: false
        });
    }

    async handleLogin() {
        try {
            const response = await fetch(`/api/users/login?name=${this.state.name}`);
            console.log(response);
            const resBody = await response.json();
            this.setState({
                token: resBody.token,
                showLoginSnackbar: true,
                loginMessage: 'Login successful'
            });
        }
        catch(e) {
            console.log(e);
        }
    }

    render() {
        return (
            <div>
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
                <Snackbar
                    open={this.state.showLoginSnackbar}
                    message={this.state.loginMessage}
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestClose} />
            </div>
        );
    }
}
