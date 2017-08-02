import React from 'react';
import Item from './Item';
import Loader from './Loader';
import Nav from './Nav';
import store from './store';

export default class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [] };
    this.update = this.update.bind(this);
  }

  componentWillMount() {
    this.update();
    store.on('topstories-updated', this.update);
  }

  componentWillUnmount() {
    store.removeListener('topstories-updated', this.update);
  }

  componentWillReceiveProps(nextProps) {
    const nextPage = nextProps.match.params.page;
    if (this.props.match.params.page === nextPage) return;
    this.update();
  }

  update() {
    store.loading(true);
    store.fetchItemsByPage(this.props.match.params.page).then(items => {
      this.setState({ items });
      store.loading(false);
    });
  }

  renderItems() {
    return this.state.items.map(item => (
      <Item
        key={item.id}
        title={item.title}
        url={item.url}
        commentsUrl={`/item/${item.id}`}
      />
    ));
  }

  render() {
    return(
      <div>
        <Loader />
        <ul>{this.renderItems()}</ul>
        <Nav page={this.props.match.params.page} />
      </div>
    );
  }
}
