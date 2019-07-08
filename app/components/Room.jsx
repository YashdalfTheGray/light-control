import * as React from 'react';
import * as PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import CardText from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

import { appStore, actions } from '../store';
import RoomLight from './RoomLight';

export default class Room extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    lightIds: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
      lights: {}
    };

    this.unsubscribe = appStore.subscribe(() => {
      const { lights } = appStore.getState();
      if (this.component) {
        this.setState({ lights });
      }
    });

    this.turnLightsOn = this.turnLightsOn.bind(this);
    this.turnLightsOff = this.turnLightsOff.bind(this);
    this.handleExpandChange = this.handleExpandChange.bind(this);
  }

  componentWillMount() {
    const { lightIds } = this.props;

    actions.getLightStates(appStore.getState().userToken, ...lightIds);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleExpandChange(newState) {
    this.setState({
      expanded: newState
    });
  }

  changeOneLight(id) {
    const { lights } = this.state;

    actions.setLightState(appStore.getState().userToken, id, {
      on: !lights[id]
    });
  }

  turnLightsOn() {
    const { id } = this.props;

    actions.setOneRoom(appStore.getState().userToken, id, {
      on: true
    });
  }

  turnLightsOff() {
    const { id } = this.props;

    actions.setOneRoom(appStore.getState().userToken, id, {
      on: false
    });
  }

  render() {
    const { expanded, lights } = this.state;
    const { lightIds, name } = this.props;

    return (
      <Card
        expanded={expanded}
        initiallyExpanded={false}
        onExpandChange={this.handleExpandChange}
        ref={c => {
          this.component = c;
        }}>
        <CardHeader showExpandableButton title={name} />
        <CardText expandable>
          {lightIds.map(id => (
            <RoomLight
              key={id}
              lightState={lights[id] || false}
              toggleState={this.changeOneLight.bind(this, id)}
            />
          ))}
        </CardText>
        <CardActions>
          <Button label="All Off" onClick={this.turnLightsOff} />
          <Button label="All On" primary onClick={this.turnLightsOn} />
        </CardActions>
      </Card>
    );
  }
}
