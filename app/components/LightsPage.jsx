import * as React from 'react';
import { Redirect } from 'react-router-dom';

import CircularProgress from '@material-ui/core/CircularProgress';

import { appStore, actions } from '../store';
import Room from './Room';

export default class LightsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
      loaded: false
    };

    this.unsubscribe = appStore.subscribe(() => {
      const { rooms } = appStore.getState();
      if (this.component) {
        this.setState({ rooms, loaded: true });
      }
    });
  }

  componentDidMount() {
    const { userToken } = appStore.getState();
    if (userToken) {
      actions.getRooms(userToken);
    }
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { rooms, loaded } = this.state;
    let roomsToDisplay;

    if (!appStore.getState().userToken) {
      return <Redirect to="/" />;
    }

    if (rooms.length === 0) {
      roomsToDisplay = (
        <span style={{ fontFamily: 'Roboto', fontSize: '20px' }}>
          No rooms to display
        </span>
      );
    } else {
      roomsToDisplay = rooms.map((r) => <Room key={r.id} {...r} />);
    }

    return (
      <>
        {loaded ? (
          <div
            className="list"
            style={{ margin: '16px' }}
            ref={(c) => {
              this.component = c;
            }}>
            {roomsToDisplay}
          </div>
        ) : (
          <CircularProgress />
        )}
      </>
    );
  }
}
