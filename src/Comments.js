import React from 'react';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/mergeMap';
import Comment from './Comment';
import store from './store';

export default class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = { comments: [] };
    this.renderComments = this.renderComments.bind(this);
  }

  componentDidMount() {
    Observable
      .from(store.fetchItem(this.props.match.params.id))
      .mergeMap(item => store.fetchItems(item.kids))
      .subscribe(comments => this.setState({ comments }));
  }

  renderComments() {
    return this.state.comments.map(comment => <Comment key={comment.id} comment={comment} />);
  }

  render() {
    return(
      <ul>{this.renderComments()}</ul>
    );
  }
}
