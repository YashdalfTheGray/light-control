import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

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
            const { userToken } = appStore.getState();
            if (userToken) {
                this.props.history.push('/lights');
            }
        });

        this.handleNameChange = this.handleNameChange.bind(this);
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    handleNameChange(event, newValue) {
        actions.setUser(newValue);
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
                            onTouchTap={actions.registerUser} />
                        <FlatButton
                            label="Login"
                            primary
                            onTouchTap={actions.loginUser} />
                    </CardActions>
                </Card>
            </div>
        );
    }
}
