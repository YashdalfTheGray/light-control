import * as React from 'react';
import * as PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import CardText from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { actions, appStore } from '../store';

export default class LoginPage extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.unsubscribe = appStore.subscribe(() => {
      const { history } = this.props;
      const { userToken } = appStore.getState();

      if (userToken) {
        history.push('/lights');
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <Card style={{ margin: '16px' }}>
        <CardHeader title="Login" />
        <CardText>
          <TextField
            floatingLabelText="Name"
            fullWidth
            onChange={(e, v) => actions.setUser(v)}
          />
        </CardText>
        <CardActions>
          <Button label="Register" onClick={actions.registerUser} />
          <Button label="Login" primary onClick={actions.loginUser} />
        </CardActions>
      </Card>
    );
  }
}
