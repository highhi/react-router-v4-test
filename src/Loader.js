import React from 'react';
import store from './store';

export default class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: false };
    this.update = this.update.bind(this);
  }

  componentWillMount() {
    store.on('loading', this.update);
  }

  componentWillUnmount() {
    store.removeListener('loading', this.update);
  }

  update(loading) {
    this.setState({ loading })
  }

  render() {
    return this.state.loading ? <p>Loading...</p> : null;
  }
}
