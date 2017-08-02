import React from 'react';
import store from './store';

export default class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = { childComments: [] };
    this.renderChildComments = this.renderChildComments.bind(this);
  }

  componentDidMount() {
    store.fetchItems(this.props.comment.kids)
      .then(childComments => this.setState({ childComments }));
  }

  renderChildComments() {
    const comments = this.state.childComments
      .map(comment => <Comment key={comment.id} comment={comment} />);

    return <ul>{comments}</ul>;
  }

  render() {
    const { comment } = this.props;

    return(
      <li>
        {comment.text}
        {comment.kids ? this.renderChildComments() : null}
      </li>
    );
  }
}
