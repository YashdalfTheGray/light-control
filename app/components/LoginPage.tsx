import * as React from 'react';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';

class LoginPageState {
    name?: string;
    token?: string;
    showSnackbar?: boolean;
    snackbarMessage?: string;
}

export default class LoginPage extends React.Component<{}, LoginPageState> {
    constructor(props: any) {
        super(props);

        this.state = {
            name: '',
            token: '',
            showSnackbar: false,
            snackbarMessage: ''
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
            showSnackbar: false
        });
    }

    async handleLogin() {
        try {
            const response = await fetch(`/api/users/login?name=${this.state.name}`);

            if (response.status === 403) {
                throw new Error('Login error');
            }
            else if (response.status === 500) {
                throw new Error('Server encountered and error');
            }
            else {
                const resBody = await response.json();

                this.setState({
                    token: resBody.token,
                    showSnackbar: true,
                    snackbarMessage: 'Login successful'
                });
            }
        }
        catch(e) {
            this.setState({
                showSnackbar: true,
                snackbarMessage: e.message
            });
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
                    open={this.state.showSnackbar}
                    message={this.state.snackbarMessage}
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestClose} />
            </div>
        );
    }
}
