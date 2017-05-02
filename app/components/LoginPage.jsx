import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';

import { actions, appStore } from '../store';

export default class LoginPage extends React.Component {
    static propTypes = {
        history: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            showSnackbar: false
        };

        this.unsubscribe = appStore.subscribe(() => {
            const { userToken, snackbarMessage } = appStore.getState();
            if (userToken) {
                this.props.history.push('/lights');
            }
            if (this.page) {
                this.setState({
                    showSnackbar: snackbarMessage.length !== 0
                });
            }
        });

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    handleNameChange(event, newValue) {
        actions.setUser(newValue.toLowerCase());
    }

    handleRequestClose() {
        this.setState({
            showSnackbar: false
        });
    }

    render() {
        const { snackbarMessage } = appStore.getState();
        const { showSnackbar } = this.state;
        return (
            <div ref={lp => (this.page = lp)}>
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
                            onTouchTap={actions.registerUser} />
                        <FlatButton
                            label="Login"
                            primary
                            onTouchTap={actions.loginUser} />
                    </CardActions>
                </Card>
                <Snackbar
                    open={showSnackbar}
                    message={snackbarMessage}
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestClose} />
            </div>
        );
    }
}
