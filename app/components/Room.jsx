import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

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
    actions.getLightStates(
      appStore.getState().userToken,
      ...this.props.lightIds
    );
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
    actions.setLightState(appStore.getState().userToken, id, {
      on: !this.state.lights[id]
    });
  }

  turnLightsOn() {
    actions.setOneRoom(appStore.getState().userToken, this.props.id, {
      on: true
    });
  }

  turnLightsOff() {
    actions.setOneRoom(appStore.getState().userToken, this.props.id, {
      on: false
    });
  }

  render() {
    return (
      <Card
        expanded={this.state.expanded}
        initiallyExpanded={false}
        onExpandChange={this.handleExpandChange}
        ref={c => (this.component = c)}>
        <CardTitle showExpandableButton title={this.props.name} />
        <CardText expandable>
          {this.props.lightIds.map(id => (
            <RoomLight
              key={id}
              lightState={this.state.lights[id] || false}
              toggleState={this.changeOneLight.bind(this, id)}
            />
          ))}
        </CardText>
        <CardActions>
          <FlatButton label="All Off" onTouchTap={this.turnLightsOff} />
          <FlatButton label="All On" primary onTouchTap={this.turnLightsOn} />
        </CardActions>
      </Card>
    );
  }
}
