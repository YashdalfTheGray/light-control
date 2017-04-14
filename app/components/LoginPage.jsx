import * as React from 'react';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            showSnackbar: false,
            snackbarMessage: ''
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
    }

    handleNameChange(event, newValue) {
        this.setState({
            name: newValue.toLowerCase()
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

            if (response.status === 400) {
                throw new Error('Bad login request');
            }
            else if (response.status === 403) {
                throw new Error('Login error');
            }
            else if (response.status === 500) {
                throw new Error('Server encountered and error');
            }
            else {
                const { token } = await response.json();

                sessionStorage.setItem('userToken', token);
                this.setState({
                    showSnackbar: true,
                    snackbarMessage: 'Login successful'
                }, () => {
                    this.props.history.push('/lights');
                });
            }
        }
        catch (e) {
            this.setState({
                showSnackbar: true,
                snackbarMessage: e.message
            });
        }
    }

    async handleRegister() {
        try {
            const response = await fetch('/api/users/register', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: this.state.name
                })
            });

            if (response.status === 500) {
                throw new Error('The server encountered an error');
            }
            else if (response.status === 400) {
                throw new Error('There was an error with your request');
            }
            else {
                throw new Error('Registration successful, please contact the admin for verification');
            }
        }
        catch (e) {
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
                            fullWidth
                            onChange={this.handleNameChange} />
                    </CardText>
                    <CardActions>
                        <FlatButton
                            label="Register"
                            onTouchTap={this.handleRegister} />
                        <FlatButton
                            label="Login"
                            primary
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
